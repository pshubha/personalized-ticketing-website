// components/TaskList.tsx
import { useEffect, useState } from 'react';
import styles from './TaskList.module.scss';
import  { getTaskList, createTastList, deleteTask, getTask, editTask }  from '../pages/api/tasks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCategoryList } from '../pages/api/category';
import { getDepartmentList } from '../pages/api/department';

interface Task {
  id: number;
  taskName: string;
  emailId: string;
  subject: string;
  category: string;
  status: string;
  department: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [callCreate, setCallCreate] = useState<boolean>(false);
  const [callUpdate, setCallUpdate] = useState<boolean>(false);
  const priority = ["Urgent","High", "Medium", "Low"];
  const [selectedPriority, setSelectedPriority] = useState('');
  const [description, setDescription] = useState('');

  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketSub, setTicketSub] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [selectedStatus, setSelectedStatus] = useState('Select Status');
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('Select Department');
  const [updateId, setUpdateId] = useState<number>()


  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const taskList = await getTaskList();
        console.log(taskList)
        setTasks(taskList);
      } catch (error) {
        console.error('Error getting task list:', error);
      }
    };

    fetchTaskList();
  }, []); 

  useEffect(() => {
    // Fetch category list from your API
    const fetchCategoryList = async () => {
      try {
        const response = await getCategoryList();
        setCategoryList(response);
      } catch (error) {
        console.error('Error fetching category list:', error);
      }
    };

    fetchCategoryList();
  }, []); 

  useEffect(() => {
    // Fetch category list from your API
    const fetchDepartmentList = async () => {
      try {
        const response = await getDepartmentList();
        setDepartmentList(response); 
      } catch (error) {
        console.error('Error fetching category list:', error);
      }
    };

    fetchDepartmentList();
  }, []);

  const handleCreate = () =>{
    setCallCreate(true);

  }

  const handleFormat = (format: string) => {
    // Get the selected text within the textarea
    const textarea = document.getElementById('description') as HTMLTextAreaElement;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `<b>${selectedText}</b>`;
        break;
      case 'italic':
        formattedText = `<i>${selectedText}</i>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      default:
        formattedText = selectedText;
        break;
    }
    document.execCommand('insertHTML', false, formattedText);
    // Insert the formatted text at the cursor position
    // const startPos = textarea.selectionStart;
    // const endPos = textarea.selectionEnd;
    // const newText = textarea.value.substring(0, startPos) + formattedText + textarea.value.substring(endPos);
    // setDescription(newText);
  };

  const handleTicketName = (event :React.ChangeEvent<HTMLInputElement>) =>{
    setTicketName(event.target.value)
  }

  const handleTicketEmail = (event :React.ChangeEvent<HTMLInputElement>) =>{
    setTicketEmail(event.target.value)
  }

  const handleTicketSub = (event :React.ChangeEvent<HTMLInputElement>) =>{
    setTicketSub(event.target.value)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setSelectedCategory(e.target.value);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value);
  };

  const handleCreateTicket = () =>{
    const body = {taskName:ticketName, emailId:ticketEmail, subject:ticketSub, category: selectedCategory, status: selectedStatus, department: selectedDepartment, priority: selectedPriority, description: description };
    const resp = createTastList(body);
    console.log(resp);
    setCallCreate(false);
  }

  const handleUpdateTicket = () =>{
    const updateBody = {taskName:ticketName, emailId:ticketEmail, subject:ticketSub, category: selectedCategory, status: selectedStatus, department: selectedDepartment, priority: selectedPriority, description: description };
    const resp = editTask(updateId, updateBody);
    console.log(resp, "success")
    setCallCreate(false);
    setCallUpdate(false);
  }

  const handleDeleteTask = (id:number)=>{
    const resp = deleteTask(id);
    console.log(resp, "success")
  }

  const handleEditTask = async(id:number) => {
    const updateData = await getTask(id);
    setCallCreate(true);
    setCallUpdate(true);
    setUpdateId(id)
    console.log("updated data",updateData);
    setTicketName(updateData.taskName);
    setTicketEmail(updateData.emailId)
    setTicketSub(updateData.subject);
    setSelectedCategory(updateData.category);
    setSelectedDepartment(updateData.department);
    setSelectedStatus(updateData.status);
    setSelectedPriority(updateData.priority);
    setDescription(updateData.description);
  }

  return (
    <>
      <div className={styles["task-link"]}><p className={callCreate ? styles["link-white"]: styles["link-green"]} onClick={()=>setCallCreate(false)} >Ticket</p><p>{`${'>'}`}</p><p className={callCreate ? styles["link-green"]: styles["link-white"]} onClick={()=>setCallCreate(true)}>Create</p></div>
      <div className={styles["task-container"]}>
        {callCreate ? 
          <div>
            <p className={styles["add-header"]}>Add Ticket</p>
            <hr></hr>
            <div className={styles["input-fields"]}>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Name</label>
                <input className={styles["ticket-input"]} type="text"  value={ticketName} onChange={handleTicketName}/>
              </div>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Email</label>
                <input className={styles["ticket-input"]} type="email"  value={ticketEmail} onChange={handleTicketEmail}/>
              </div>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Subject</label>
                <input className={styles["ticket-input"]} type="subject" value={ticketSub} onChange={handleTicketSub} />
              </div>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Category</label>
                <select className={styles["ticket-input"]}
                  value={selectedCategory} 
                  onChange={handleCategoryChange}
                >
                  <option >Select Category</option>
                  {categoryList.map((category) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
                </select>
              </div>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Status</label>
                <select className={styles["ticket-input"]}
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option>Select Status</option>
                  <option value="status1">Status 1</option>
                  <option value="status2">Status 2</option>
                </select>
              </div>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Department</label>
                <select className={styles["ticket-input"]}
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option >Select Department</option>
                  {departmentList.map((department) => (
                  <option key={department.id} value={department.deptName}>
                    {department.deptName}
                  </option>
                ))}
                </select>
              </div>
              <div className={styles["ticket-row"]}>
                <label className={styles["ticket-label"]}>Priority</label>
                <select className={styles["ticket-input"]} value={selectedPriority} onChange={handlePriority}>
                {priority.map((priorityOption, index) => (
                  <option key={index} value={priorityOption}>{priorityOption}</option>
                ))}
                </select>
              </div>
            </div>
            <div>
            <label className={styles["ticket-label"]}>Description</label>
              <div className={styles["format-options"]}>
                <button onClick={() => handleFormat('bold')}><b>B</b></button>
                <button onClick={() => handleFormat('italic')}><i>I</i></button>
                <button onClick={() => handleFormat('underline')}><u>U</u></button>
              </div>
              <textarea
                id="description"
                className={styles["description-textbox"]}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type your description here..."
              />
            </div>
            <div className={styles["create-button"]}>
              <button className={styles["cancel-button"]} onClick={()=>setCallCreate(false)} >Cancel</button>
              <button className={styles["ticket-button"]} onClick={callUpdate ? handleUpdateTicket :handleCreateTicket} >Submit</button>
            </div>
          </div> :
          <>
            <div className={styles["task-header"]}>
              <h1>Ticket List</h1>
              <p> <button className={styles["ticket-button"]}  onClick={handleCreate} >Add Ticket</button></p>
            </div>
            <table className={styles.taskTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Name</th>
                <th>Email ID</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
                <th>Department</th>
                <th>Priority</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.taskName}</td>
                  <td>{task.emailId}</td>
                  <td>{task.subject}</td>
                  <td>{task.category}</td>
                  <td>{task.status}</td>
                  <td>{task.department}</td>
                  <td>{task.priority}</td>
                  <td>{task.createdAt}</td>
                  <td className={styles["action-btn"]}>
                    <button className={styles["edit-btn"]} onClick={()=> handleEditTask(task.id)}><EditIcon /></button>
                    <button className={styles["delete-btn"]} onClick={() => handleDeleteTask(task.id)}>
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
  );
};

export default TaskList;
