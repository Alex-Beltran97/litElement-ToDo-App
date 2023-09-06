import http from '../http/http';
import { v4 as uuidv4 } from 'uuid';

const PATH = "/tasks";

export const getAllTasks = async () =>await http.getAll(PATH);

export const createATask = async (data) =>await http.post(PATH, {...data, id: uuidv4() });

export const completeTask = async (data, id) =>await http.patch(PATH, id, { completed: data });

export const deleteTask = async (id) =>await http.delete(PATH, id);