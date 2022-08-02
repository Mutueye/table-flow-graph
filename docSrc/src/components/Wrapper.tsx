import React, { PropsWithChildren } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

type Props = {
  className?: string;
};

const Wrapper: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
  const style = [
    'w-full',
    'min-h-screen',
    'min-w-1300px',
    'overflow-hidden',
    'flex',
    'flex-col',
    'items-center',
    'justify-start',
    'bg-white',
    'relative',
    className,
  ].join(' ');
  return (
    <div className={style}>
      <div className="w-1200px flex flex-col">{children}</div>
    </div>
  );
};

export default Wrapper;
