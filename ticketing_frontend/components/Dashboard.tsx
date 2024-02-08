import React from 'react';
import styles from './Dashboard.module.scss';


interface TaskCounts {
  open: number;
  close: number;
  inprogress: number;
  reject: number;
}

interface DashboardProps {
  taskCounts: TaskCounts;
}

const Dashboard: React.FC<DashboardProps> = ({ taskCounts }) => {
  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["box"]} id="open">
        <div className={styles["count"]}>{taskCounts.open}</div>
        <div className={styles["label"]}>Open Tasks</div>
      </div>
      <div className={styles["box"]} id="close">
        <div className={styles["count"]}>{taskCounts.close}</div>
        <div className={styles["label"]}>Close Tasks</div>
      </div>
      <div className={styles["box"]} id="inprogress">
        <div className={styles["count"]}>{taskCounts.inprogress}</div>
        <div className={styles["label"]}>In Progress Tasks</div>
      </div>
      <div className={styles["box"]} id="reject">
        <div className={styles["count"]}>{taskCounts.reject}</div>
        <div className={styles["label"]}>Rejected Tasks</div>
      </div>
    </div>
  );
};

export default Dashboard;
