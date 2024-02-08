
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Make a GET request to the /task endpoint
//     const response = await axios.get('http://localhost:3000/tasks'); // Replace with your actual endpoint

//     // Handle the response data
//     const data = response.data;
//     console.log(data)
//     res.status(200).json({ data });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
export const getTaskList = async () => {
  try {
    const resp = await axios.get('http://localhost:3000/tasks');
    return resp.data;
  } catch (error) {
    console.error('Error fetching task list:', error);
    throw error; 
  }
};

export const createTastList = async(body: any) =>{
  try {
    const resp = await axios.post('http://localhost:3000/tasks', body);
    return resp.data;
  } catch (error) {
    console.error('Error fetching task list:', error);
    throw error; 
  }
};

export const deleteTask = async(id:number) =>{
  try {
    const resp = await axios.delete(`http://localhost:3000/tasks/${id}`);
    return resp.data;
  } catch (error) {
    console.error('Error fetching task list:', error);
    throw error; 
  }
};

export const getTask = async(id:number) =>{
  try {
    const resp = await axios.get(`http://localhost:3000/tasks/${id}`);
    return resp.data;
  } catch (error) {
    console.error('Error fetching task list:', error);
    throw error; 
  }
};

export const editTask = async(id:number, body: any) => {
  try {
    const resp = await axios.put(`http://localhost:3000/tasks/${id}`, body );
    return resp.data;
  } catch (error) {
    console.error('Error fetching task list:', error);
    throw error; 
  }
};
