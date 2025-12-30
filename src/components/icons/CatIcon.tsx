import React from 'react';

type Props = { className?: string };

export default function CatIcon({ className = 'w-8 h-8' }: Props) {
  const breadSrc = import.meta.env.BASE_URL + 'pic/bread-svgrepo-com_2.svg';
  return (
    <img
      src={breadSrc}
      alt="Bread Icon"
      role="img"
      aria-label="Bread Icon"
      className={className + ' object-contain'}
    />
  );
}