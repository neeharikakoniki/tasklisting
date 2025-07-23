import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Task } from '../types/Task';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'> & {
  updateTask?: (task: Task) => void;  
  deleteTask?: (id: number) => void;
};

const TaskDetailsScreen: React.FC<Props> = ({ route, navigation, updateTask, deleteTask }) => {
  const { task } = route.params;

  const handleToggleStatus = () => {
    if (updateTask) {
      updateTask({ ...task, completed: !task.completed });
      Alert.alert('Task Updated', `Marked as ${!task.completed ? 'Completed' : 'Pending'}`);
    } else {
      Alert.alert('Info', 'Update function not provided yet.');
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (deleteTask) {
            deleteTask(task.id);
            navigation.goBack();
          } else {
            Alert.alert('Info', 'Delete function not provided yet.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.status}>
        Status: <Text style={{ fontWeight: 'bold' }}>{task.completed ? 'Completed' : 'Pending'}</Text>
      </Text>
      <Text style={styles.description}>
        {task.description ? task.description : 'No description available.'}
      </Text>

      <View style={styles.buttons}>
        <Button title={task.completed ? 'Mark as Pending' : 'Mark as Completed'} onPress={handleToggleStatus} />
        <Button title="Delete Task" onPress={handleDelete} color="#d9534f" />
      </View>
    </View>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  status: {
    fontSize: 18,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
