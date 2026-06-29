import { BushwoodLogoScript } from '../../svg-components/BushwoodLogos';
import Image from 'next/image';
import MCLogo from '@public/images/shared/logos/monte-cristo-logo-full.svg';
import MCLogoPlaque from '@public/images/shared/logos/monte-cristo-logo.svg';
import { cn } from '@/utils/cn';
import Link from 'next/link';

interface BushwoodLogoBoxProps {
  isScrolled?: boolean;
}

const LogoBox = ({ isScrolled }: BushwoodLogoBoxProps) => {
  return (
    <div
      className={cn(
        'absolute transition-[width] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[175px] sm:w-[200px]  duration-400',
        isScrolled ? 'md:w-[300px]' : 'md:w-[270px]',
      )}>
      <Link href="/">
        <span className="sr-only">Home</span>
        <figure className="relative">
          <Image
            className={cn(
              'duration-300 transition-opacity absolute top-[45px] left-1/2 -translate-x-1/2 -translate-y-1/2',
              isScrolled ? 'opacity-0' : 'opacity-100',
            )}
            src={MCLogo}
            width={400}
            height={400}
            alt=""
          />
          <Image
            className={cn(
              'duration-400 transition-[opacity,top] absolute top-[95px] left-1/2 -translate-x-1/2 -translate-y-1/2',
              isScrolled ? 'opacity-100 top-[10px]' : 'opacity-0',
            )}
            src={MCLogoPlaque}
            width={400}
            height={200}
            alt=""
          />
        </figure>
      </Link>
    </div>
  );
};

export default LogoBox;
