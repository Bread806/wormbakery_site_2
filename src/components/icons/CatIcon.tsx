import React from 'react';
import BreadSvg from '../../../public/pic/bread-svgrepo-com_2.svg';

type Props = { className?: string };

export default function CatIcon({ className = 'w-8 h-8' }: Props) {
  return (
    <img
      src={BreadSvg}
      alt="Bread Icon"
      role="img"
      aria-label="Bread Icon"
      className={className + ' object-contain'}
    />
  );
}