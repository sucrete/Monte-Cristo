import localFont from 'next/font/local';

export const engraversFont = localFont({
  src: '../../public/fonts/engravers.woff2',
  // You can define a CSS variable name here to use in Tailwind
  variable: '--font-engravers', 
  display: 'swap',
});

export const spaceMono = localFont({
  src: '../..public/fonts/spacemono.woff2',
  variable: '--font-space-mono', 
  display: 'swap',
})