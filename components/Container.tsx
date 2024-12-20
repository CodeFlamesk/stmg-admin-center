import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;  
  styles: string;
}

const Container: React.FC<ContainerProps> = ({ children,styles }) => {
  return (
    <div className={`w-full max-w-[1470px]  mx-auto px-[15px] bg-white ${styles} `}>
      {children}
    </div>
  );
}
export default Container;