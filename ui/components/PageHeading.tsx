import React, { ReactNode } from 'react';

interface PageHeadingProps {
  children: ReactNode;
}

export default function PageHeading({ children }: PageHeadingProps) {
  return (
<h1 className="text-3xl font-semibold leading-7 text-blue-500 sm:truncate sm:text-4xl sm:tracking-tight flex items-center justify-center h-16">{children}</h1>

  )
}
