'use client';

import dynamic from 'next/dynamic';

const StarryBackground = dynamic(() => import('@/app/_components/starry-background'), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import('@/app/_components/scroll-progress'), {
  ssr: false,
});

const NavBar = dynamic(() => import('@/app/_components/nav-bar/nav-bar'), {
  ssr: false,
});

export default function DynamicComponents() {
  return (
    <>
      <StarryBackground />
      <ScrollProgress />
      <NavBar />
    </>
  );
}
