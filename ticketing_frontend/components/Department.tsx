import { useEffect, useState } from 'react';
import styles from './Department.module.scss';
import { getDepartmentList, createDepartmentList, deleteDepartment } from '../pages/api/department';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Department{
  id: number;
  deptName: string;
}

const DepartmentList: React.FC = () => {
  const [department, setDepartment] = useState<Department[]>([]);
  const [callCreate, setCallCreate] = useState<boolean>(false);
  const [departmentName, setDeptName] = useState('');

  useEffect(() => {
    const fetchDeptList = async () => {
      try {
        const deptList = await getDepartmentList();
        console.log(deptList)
        setDepartment(deptList);
      } catch (error) {
        // Handle the error if needed
        console.error('Error getting task list:', error);
      }
    };

    fetchDeptList();
  }, []);

  const handleCreate = () =>{
    setCallCreate(true);
  }

  const handleDeptName = (event :React.ChangeEvent<HTMLInputElement>) =>{
    setDeptName(event.target.value);
  }

  const handleCreateDept = () =>{
    const body = {deptName:departmentName};
    const resp = createDepartmentList(body);
    console.log(resp);
    setCallCreate(false);
  }

  const handleDeleteDept = (id:number)=>{
    const resp = deleteDepartment(id);
    console.log(resp, "success")
  }

  return (
    <>
      <div className={styles["task-link"]}><p className={callCreate ? styles["link-white"]: styles["link-green"]} onClick={()=>setCallCreate(false)} >Department</p><p>{`${'>'}`}</p><p className={callCreate ? styles["link-green"]: styles["link-white"]} onClick={()=>setCallCreate(true)}>Create</p></div>
      <div className={styles["task-container"]}>
      {callCreate ? 
          <div>
            <p className={styles["add-header"]}>Add Department</p>
            <hr></hr>
            <div className={styles["input-fields"]}>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Department Name</label>
                <input className={styles["ticket-input"]} type="text"  value={departmentName} onChange={handleDeptName}/>
              </div>
            </div>
            <div className={styles["create-button"]}>
              <button className={styles["cancel-button"]} onClick={()=>setCallCreate(false)} >Cancel</button>
              <button className={styles["ticket-button"]} onClick={handleCreateDept} >Submit</button>
            </div>
          </div> :
          <>
            <div className={styles["task-header"]}>
              <h1>Department List</h1>
              <p> <button className={styles["ticket-button"]}  onClick={handleCreate} >Add Department</button></p>
            </div>
            <table className={styles.taskTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {department.map((dept) => (
                <tr key={dept.id}>
                  <td>{dept.id}</td>
                  <td>{dept.deptName}</td>
                  <td className={styles["action-btn"]}>
                    <button className={styles["edit-btn"]}><EditIcon /></button>
                    <button className={styles["delete-btn"]} onClick={() => handleDeleteDept(dept.id)}>
                      <DeleteIcon />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </> 
        }
      </div>
    </>
  )
};

export default DepartmentList;