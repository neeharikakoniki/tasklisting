import React from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'> & {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
};

const TaskListScreen: React.FC<Props> = ({ navigation, tasks, updateTask, deleteTask }) => {
  const toggleTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask({ ...task, completed: !task.completed });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item,index}) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(index)}
            onPress={() => navigation.navigate('TaskDetails', { task: item })}
          />
        )}
        ListEmptyComponent={<View style={{ padding: 20 }}><Button title="No Tasks. Add some!" onPress={() => navigation.navigate('AddTask')} /></View>}
      />
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
});
