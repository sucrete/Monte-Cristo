import { cn } from '@/utils/cn';

const PATH = "M4258.71-1.71H-.13v181.09h1879.6c3.1,0,5.62,2.52,5.62,5.62h0c0,3.11,2.52,5.62,5.62,5.62h14.14c5.13,0,9.28,4.18,9.25,9.31h0c-.06,9.94,7.98,18.04,17.93,18.04h395.35c9.94,0,17.99-8.09,17.93-18.04h0c-.03-5.13,4.12-9.31,9.24-9.31h17.68c3.11,0,5.62-2.52,5.62-5.62h0c0-3.11,2.52-5.62,5.62-5.62h1875.24V-1.71Z";

const Azteca = ({ className = '' }) => {
  return (
    <div className={cn('relative', className)}>
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4258.85 240.17">
        <defs>
          <style>{`
            .cls-1 { filter: url(#drop-shadow-1); }
            .cls-2 { fill: rgba(255, 255, 255, 0.95); }
          `}</style>
          <filter id="drop-shadow-1" x="-15.25" y="-9.91" width="4289.04" height="250.08" filterUnits="userSpaceOnUse">
            <feOffset dx="0" dy="7" />
            <feGaussianBlur result="blur" stdDeviation="5" />
            <feFlood floodColor="#231f20" floodOpacity=".1" />
            <feComposite in2="blur" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g className="cls-1">
          <path className="cls-2" d={PATH} />
        </g>
      </svg>
    </div>
  );
};

export default Azteca;