'use client';

import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { splitMenuLeft, splitMenuRight } from '@/data/header';
import { cn } from '@/utils/cn';
import { prefersReducedMotion } from '@/utils/reducedMotion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import NavCTAButton from './header/NavCTAButton';

const MobileMenu = () => {
  const { isOpen, closeMenu } = useMobileMenuContext();
  const sidebarRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (!isOpen) return;
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const focusableSelectors = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(sidebar.querySelectorAll<HTMLElement>(focusableSelectors));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const firstFocusable = sidebar.querySelector<HTMLElement>(focusableSelectors);
    firstFocusable?.focus();

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // Blur overlay animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (isOpen) {
      gsap.set(overlay, { display: 'block' });
      const tween = gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
      );
      return () => { tween.kill(); };
    } else {
      const tween = gsap.to(overlay, {
        opacity: 0,
        duration: 0.275,
        ease: 'power2.in',
        onComplete: () => { gsap.set(overlay, { display: 'none' }); },
      });
      return () => { tween.kill(); };
    }
  }, [isOpen]);

  // Menu items stagger animation
  useEffect(() => {
    const items = listRef.current ? Array.from(listRef.current.querySelectorAll('li')) : [];
    const cta = ctaRef.current;
    const targets = cta ? [...items, cta] : items;
    if (isOpen) {
      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 });
      } else {
        const tween = gsap.fromTo(
          targets,
          { opacity: 0, y: 4 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.05, delay: 0.1, ease: 'power2.out' },
        );
        return () => { tween.kill(); };
      }
    } else {
      gsap.set(targets, { opacity: 0, y: 4 });
    }
  }, [isOpen]);

  const menuContent = (
    <aside
      ref={sidebarRef}
      id="mobile-menu"
      role="dialog"
      aria-modal={true}
      aria-label="Site menu"
      inert={!isOpen || undefined}
      className={cn(
        'fixed top-0 right-0 z-[999] h-screen w-[85%] bg-white transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] sm:w-[360px] xl:hidden flex flex-col',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      )}>
      <div className="flex items-center justify-between px-6 py-3 sm:px-6 sm:py-6">
        <div className="monospaced off-black">menu</div>
        <button
          onClick={closeMenu}
          className="relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-all duration-200"
          aria-label="Close mobile menu">
          <span className="sr-only">Close Menu</span>
          <span className="absolute block h-0.5 w-4 bg-[#2c2c2c] rotate-45" />
          <span className="absolute block h-0.5 w-4 bg-[#2c2c2c] -rotate-45" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 sm:px-8">
        <ul ref={listRef}>
          {splitMenuLeft
            .filter((item) => !item.hasDropdown)
            .map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href!}
                  onClick={closeMenu}
                  className="block py-3 text-[14px] text-black/60 hover:text-black transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}

          {splitMenuRight.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href!}
                onClick={closeMenu}
                className="block py-3 text-[14px] text-black/60 hover:text-black transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div ref={ctaRef} className="pt-6 pb-6 sm:pb-8">
          <NavCTAButton
            href="/book-tee-time"
            className="flex"
            btnClassName="btn-header-bushwood hover:btn-white-dark w-full justify-center"
            label="Book Tee Time"
            onClick={closeMenu}
          />
        </div>
      </nav>
    </aside>
  );

  return (
    <>
      {mounted && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[998] bg-black/20 hidden xl:hidden"
          style={{ backdropFilter: 'blur(4px)' }}
          aria-hidden="true"
        />,
        document.body,
      )}
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
};

export default MobileMenu;
