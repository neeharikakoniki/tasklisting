import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Task } from '../types/Task';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'> & {
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
};

const TaskDetailsScreen: React.FC<Props> = ({ route, navigation, updateTask, deleteTask }) => {
  const { task } = route.params;

  const toggleStatus = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const confirmDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.status}>Status: {task.completed ? 'Completed' : 'Pending'}</Text>
      <Text style={styles.description}>
        Description: {task.description ? task.description : 'No description'}
      </Text>
      <View style={styles.buttons}>
        <Button title="Toggle Status" onPress={toggleStatus} />
        <Button title="Delete Task" onPress={confirmDelete} color="red" />
      </View>
    </View>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  status: { fontSize: 18, marginBottom: 12 },
  description: { fontSize: 16, marginBottom: 24 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
});
