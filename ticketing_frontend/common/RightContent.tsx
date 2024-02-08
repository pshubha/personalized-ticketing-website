import React from 'react';
import styles from './RightContent.module.scss'
import TaskList from '../components/TaskList';
import Dashboard from '../components/Dashboard';
import DepartmentList from '../components/Department';
import CategoryList from '../components/Category';

interface RightContentProps {
  selectedItem: string;
}

const RightContent: React.FC<RightContentProps> = ({ selectedItem }) => {
    const taskCounts = {
        open: 10,
        close: 3,
        inprogress: 5,
        reject: 2,
      }; 

    console.log("selectedItem",selectedItem)
  return (
    <div className={styles["right-content"]}>
      <h2>{selectedItem}</h2>
      {/* Add content specific to each menu item */}
      {selectedItem === 'Dashboard' && (<><Dashboard taskCounts={taskCounts}/></>)}
      {selectedItem === 'Tickets' && <p><TaskList /></p>}
      {selectedItem === 'Department' && <p><DepartmentList /></p>}
      {selectedItem === 'Category' && <p><CategoryList /></p>}
      {selectedItem === 'Report' && <p>This is the Report page</p>}
    </div>
  );
};

export default RightContent;
