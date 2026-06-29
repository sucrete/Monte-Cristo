// src/components/shared/Map.tsx
'use client';

import { useState, useEffect } from 'react';

const Map = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a skeleton or placeholder that matches the SSR dimensions
    return <div className="w-full h-full bg-gray-200 animate-pulse" />;
  }

  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.0101786134096!2d-98.11788589999999!3d26.3261699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8665988bdbf82d73%3A0xc6c28859903a52d0!2sMonte%20Cristo%20Golf%20%26%20Country%20Club!5e0!3m2!1sen!2sus!4v1782339066873!5m2!1sen!2sus"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Maps"
      className="min-h-[300px] lg:min-h-[450px]"
    />
  );
};

export default Map;
