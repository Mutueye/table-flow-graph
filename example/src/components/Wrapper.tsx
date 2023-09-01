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
    'min-w-1366px',
    'overflow-hidden',
    'flex',
    'flex-col',
    'items-center',
    'justify-start',
    'h-100vh',
    'bg-white',
    'relative',
    'overflow-x-hidden',
    'overflow-y-auto',
    className,
  ].join(' ');
  return (
    <div className={style}>
      <div className="flex flex-col w-1200px">{children}</div>
    </div>
  );
};

export default Wrapper;
