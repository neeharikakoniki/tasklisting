import React from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TaskItem from '../components/TaskItem';
import { RootStackParamList } from '../../App';
import { useGetTasksQuery } from '../store/tasksApi';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const { data: tasks = [], isLoading, refetch } = useGetTasksQuery();

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      {isLoading ? (
        <Button title="Loading..." onPress={refetch} />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => {}}
              onDelete={() => {}}
              onPress={() => navigation.navigate('TaskDetails', { task: item })}
            />
          )}
        />
      )}
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
});
