import React, { useState } from 'react';
import styles from './LeftMenu.module.scss'

interface LeftMenuProps {
  onSelect: (selectedItem: string) => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ onSelect }) => {
  const menuItems = ['Dashboard', 'Tickets', 'Department', 'Category', 'Report'
];
const [selectedItem, setSelectedItem] = useState<string | null>('Dashboard');

const handleItemClick = (item: string) => {
  onSelect(item);
  setSelectedItem(item);
};

  return (
    <div className={styles["left-menu"]}>
      <ul>
        {menuItems.map((item) => (
          <li key={item} 
          onClick={() => handleItemClick(item)}
          className={selectedItem === item ? styles['selected'] : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;
