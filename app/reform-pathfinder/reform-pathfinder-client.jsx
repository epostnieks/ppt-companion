"use client";
import dynamic from 'next/dynamic';

const ReformPathfinder = dynamic(() => import('../../src/PSTBreaker'), { ssr: false });

export default function ReformPathfinderClient() {
  return <ReformPathfinder />;
}
