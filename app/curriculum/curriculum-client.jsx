"use client";
import dynamic from 'next/dynamic';

const Curriculum = dynamic(() => import('../../src/Curriculum'), { ssr: false });

export default function CurriculumClient() {
  return <Curriculum />;
}
