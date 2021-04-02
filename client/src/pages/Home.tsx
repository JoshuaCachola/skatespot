import React from 'react';
import { Header } from './Header';

interface Props {

}

export const Home: React.FC<Props> = () => {
  return (
    <>
      <h1>Home</h1>
      <Header />
    </>
  );
};
