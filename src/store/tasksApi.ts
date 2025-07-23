import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../types/Task';

export const tasksApi = createApi({
  reducerPath: 'tasksApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Tasks'], 
  endpoints: (builder) => ({
  
    getTasks: builder.query<Task[], void>({
      query: () => 'todos?_limit=20',
      providesTags: ['Tasks'],
      transformResponse: (response: any[]) =>
        response.map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
          description: '',
        })),
    }),

  
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: 'todos',
        method: 'POST',
        body: newTask,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Tasks'], 
    }),
  }),
});


export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;
