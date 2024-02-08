import React, { useState } from 'react';
import LeftMenu from '../common/LeftMenu';
import RightContent from '../common/RightContent';
import styles from './App.module.scss';

const Home: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Dashboard');

  const handleMenuSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className={styles["app-container"]} >
      <LeftMenu onSelect={handleMenuSelect} />
      <RightContent selectedItem={selectedItem} />
    </div>
  );
};

export default Home;
