'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const TuringBackground = dynamic(() => import('@/components/TuringBackground'), {
  ssr: false
});

const TuringPage: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <TuringBackground />
    </div>
  );
};

export default TuringPage;