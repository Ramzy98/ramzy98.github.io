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

const CustomCursor = dynamic(() => import('@/app/_components/custom-cursor'), {
  ssr: false,
});

const CommandPalette = dynamic(() => import('@/app/_components/command-palette'), {
  ssr: false,
});

const GraffitiCanvas = dynamic(() => import('@/app/_components/GraffitiCanvas'), {
  ssr: false,
});

export default function DynamicComponents() {
  return (
    <>
      <StarryBackground />
      <GraffitiCanvas />
      <CustomCursor />
      <CommandPalette />
      <ScrollProgress />
      <NavBar />
    </>
  );
}
