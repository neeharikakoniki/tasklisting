import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Task } from '../types/Task';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'> & {
  onAddTask: (task: Task) => void;
};

const AddTaskScreen: React.FC<Props> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required');
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };
    onAddTask(newTask);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title (required)"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description (optional)"
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
});
