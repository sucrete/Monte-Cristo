import { golfLessonsMenuItems } from '@/data/header';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import MegaMenuItem from './MegaMenuItem';

interface GolfLessonsMenuProps {
  className?: string;
  isScrolled?: boolean;
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const GolfLessonsMenu = ({ className, isOpen = false, onMouseEnter, onMouseLeave }: GolfLessonsMenuProps) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div
        className={cn(
          `shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.05),_0_4px_6px_-4px_rgba(0,0,0,0.05)] pointer-events-none absolute top-[90%] left-[-1rem] z-50 w-full min-w-[500px] translate-y-2 opacity-0 transition-all duration-300 rounded-[20px] border border-solid border-[#00000007] bg-[#ffffffe4]`,
          isOpen && 'pointer-events-auto translate-y-0 opacity-100',
          className,
        )}>
        <div className="flex flex-row p-2 overflow-hidden">
          <div className="w-[60%] bg-[#fff] rounded-[13px] p-2 mr-2 bg-[url('/images/shared/dreamy-green-2.jpg')] bg-cover relative overflow-hidden shadow-[inset_0_0_50px_20px_white]
">
            <div className="w-full h-full absolute inset-0 bg-white-scrim"></div>
            <ul className="h-full relative z-20">
              {golfLessonsMenuItems.map((item) => (
                <MegaMenuItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
          <Image
            src="/images/shared/golf-instructor.webp"
            width={333}
            height={600}
            className="rounded-[13px] w-[200px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default GolfLessonsMenu;
