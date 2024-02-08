import { useEffect, useState } from 'react';
import styles from './Category.module.scss';
import { getCategoryList, createCategoryList, deleteCategory } from '../pages/api/category';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Category{
  id: number;
  categoryName: string;
}

const CategoryList: React.FC = () => {
  const [categorys, setCategory] = useState<Category[]>([]);
  const [callCreate, setCallCreate] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const categoryList = await getCategoryList();
        console.log(categoryList)
        setCategory(categoryList);
      } catch (error) {
        // Handle the error if needed
        console.error('Error getting task list:', error);
      }
    };

    fetchCategoryList();
  }, []);

  const handleCategoryName = (event :React.ChangeEvent<HTMLInputElement>) =>{
    setCategoryName(event.target.value);
  }

  const handleCreate = () =>{
    setCallCreate(true);
  }

  const handleCreateCategory = () =>{
    const body = {categoryName:categoryName};
    const resp = createCategoryList(body);
    console.log(resp);
    setCallCreate(false);
  }

  const handleDeleteCategory = (id:number) =>{
    const resp = deleteCategory(id);
    console.log(resp, "success")
  }

  return(
    <>
      <div className={styles["task-link"]}><p className={callCreate ? styles["link-white"]: styles["link-green"]} onClick={()=>setCallCreate(false)} >Category</p><p>{`${'>'}`}</p><p className={callCreate ? styles["link-green"]: styles["link-white"]} onClick={()=>setCallCreate(true)}>Create</p></div>
      <div className={styles["task-container"]}>
      {callCreate ? 
          <div>
            <p className={styles["add-header"]}>Add Category</p>
            <hr></hr>
            <div className={styles["input-fields"]}>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Category Name</label>
                <input className={styles["ticket-input"]} type="text"  value={categoryName} onChange={handleCategoryName}/>
              </div>
            </div>
            <div className={styles["create-button"]}>
              <button className={styles["cancel-button"]} onClick={()=>setCallCreate(false)} >Cancel</button>
              <button className={styles["ticket-button"]} onClick={handleCreateCategory} >Submit</button>
            </div>
          </div> :
          <>
            <div className={styles["task-header"]}>
              <h1>Category List</h1>
              <p> <button className={styles["ticket-button"]}  onClick={handleCreate} >Add Category</button></p>
            </div>
            <table className={styles.taskTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {categorys.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.categoryName}</td>
                  <td className={styles["action-btn"]}>
                    <button className={styles["edit-btn"]}><EditIcon /></button>
                    <button className={styles["delete-btn"]} onClick={() => handleDeleteCategory(category.id)}>
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
}

export default CategoryList