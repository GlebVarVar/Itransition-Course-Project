import { FC, PropsWithChildren } from 'react';
import { NavBar } from '../shared';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
