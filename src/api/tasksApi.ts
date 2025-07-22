import { fetch } from 'react-native-ssl-pinning';
import { Task } from '../types/Task';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20', {
    method: 'GET',
    timeoutInterval: 10000, 
    sslPinning: {
      certs: ['jsonplaceholder'], 
    },
    headers: {
      Accept: 'application/json',
    },
  });

const data = JSON.parse(response.bodyString!);

  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    completed: item.completed,
    description: '',
  }));
};
