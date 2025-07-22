import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from './src/screens/TaskListScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';
import LoginScreen from './src/screens/LoginScreen';
import { Task } from './src/types/Task';
import { fetchTasks } from './src/api/tasksApi'; 

export type RootStackParamList = {
  Login: undefined;
  TaskList: undefined;
  AddTask: undefined;
  TaskDetails: { task: Task };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const apiTasks = await fetchTasks();
        setTasks(apiTasks);
      } catch (error) {
        console.error('Failed to load tasks with SSL pinning:', error);
      }
    };
    loadTasks();
  }, []);

  const addTask = (task: Task) => setTasks(prev => [task, ...prev]);
  const updateTask = (updated: Task) =>
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  const deleteTask = (index: number) =>
    setTasks(prev => prev.filter((_, i) => i !== index));

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TaskList">
          {props => (
            <TaskListScreen
              {...props}
              tasks={tasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddTask">
          {props => (
            <AddTaskScreen
              {...props}
              onAddTask={task => {
                addTask(task);
                props.navigation.goBack();
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TaskDetails">
          {props => (
            <TaskDetailsScreen {...props} updateTask={updateTask} deleteTask={deleteTask} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
