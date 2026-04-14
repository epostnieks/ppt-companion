"use client";
import dynamic from 'next/dynamic';

const PSTBreaker = dynamic(() => import('../../src/PSTBreaker'), { ssr: false });

export default function PSTBreakerClient() {
  return <PSTBreaker />;
}
