import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface handleEditTaskProps {
  id: number,
  title: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existentTask = tasks.find(task => task.title === newTaskTitle);

    if(existentTask) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const newTask: Task = {
      id: Math.random(),
      done: false,
      title: newTaskTitle,
    };

    setTasks(oldState => [
      ...oldState,
      newTask
    ])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTaskList = tasks.map(task => {
      if(task.id === id) {
        return {
          ...task,
          done: !task.done,
        }
      }

      return task;
    });

    setTasks(updatedTaskList);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Sim", onPress: () => removeTask(id) },
        { text: "Não" },
      ]
    )

    const removeTask = (taskId: number) => {
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      setTasks(filteredTasks);
    }
  }

  function handleEditTask(editTask: handleEditTaskProps) {
    const { id, title } = editTask;

    const existentTask = tasks.find(task => task.title === editTask.title);

    if(existentTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode renomear uma task para um nome já existente"
      );

      return false;
    }

    const updatedTaskList = tasks.map(task => {
      if(task.id === id) {
        return {
          ...task,
          title,
        }
      }

      return task;
    });

    setTasks(updatedTaskList);

    return true;
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})