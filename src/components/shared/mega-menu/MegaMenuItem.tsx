import { MegaMenuItem as MegaMenuItemType } from '@/data/header';
import { cn } from '@/utils/cn';
import Link from 'next/link';

interface MegaMenuItemProps {
  item: MegaMenuItemType;
}

const MegaMenuItem = ({ item }: MegaMenuItemProps) => {
  return (
    <li>
      <Link
        href={item.href}
        className="text-secondary/80 text-[15px] group/item text-tagline-1 hover:text-secondary py-[8px] px-[15px] hover:bg-[#90909010] rounded-[5px] flex items-center gap-1 transition-all duration-200">
        <span>{item.label}</span>
        <span
          className={cn(
            item.newPage ? 'group-hover/item:translate-x-1' : 'group-hover/item:translate-x-2',
            'opacity-0 transition-all duration-200  group-hover/item:opacity-100',
          )}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 12L12 8L8 4"
              className="stroke-secondary dark:stroke-accent"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {item.newPage && (
          <span className="inline-block text-nowrap text-xs bg-ns-green text-secondary/80 backdrop-blur-[20px] rounded-full px-2 py-0.5">
            new
          </span>
        )}
      </Link>
    </li>
  );
};

export default MegaMenuItem;
