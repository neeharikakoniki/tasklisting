import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Task } from '../types/Task';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <CheckBox value={task.completed} onValueChange={onToggle} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.status}>{task.completed ? 'Completed' : 'Pending'}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff4d4d',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
