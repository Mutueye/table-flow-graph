import React, { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

const Wrapper: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
  const style = [
    'w-screen',
    'h-screen',
    'overflow-hidden',
    'bg-gray-700',
    'relative',
    className,
  ].join(' ');
  return <div className={style}>{children}</div>;
};

export default Wrapper;
