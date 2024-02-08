import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export const getCategoryList = async () => {
  try {
    const resp = await axios.get('http://localhost:3000/category');
    return resp.data;
  } catch (error) {
    // Handle the error if needed
    console.error('Error fetching task list:', error);
    throw error; // You may want to throw the error to be handled where the function is used
  }
}

export const createCategoryList = async(body: any) =>{
  try {
    const resp = await axios.post('http://localhost:3000/category', body);
    return resp.data;
  } catch (error) {
    // Handle the error if needed
    console.error('Error fetching task list:', error);
    throw error; // You may want to throw the error to be handled where the function is used
  }
}

export const deleteCategory = async(id:number) =>{
  try {
    const resp = await axios.delete(`http://localhost:3000/category/${id}`);
    return resp.data;
  } catch (error) {
    // Handle the error if needed
    console.error('Error fetching task list:', error);
    throw error; // You may want to throw the error to be handled where the function is used
  }
};