import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const findTask = tasks.find(
      (taskItem: Task) => taskItem.title === data.title
    );
    if (!findTask) {
      setTasks((prevTask) => [...prevTask, data]);
    } else {
      Alert.alert("Houve um Erro", "Você já tem uma tarefa com esse nome!");
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTaskList = tasks.map((taskInfo: Task) =>
      taskInfo.id === id
        ? {
            ...taskInfo,
            done: !taskInfo.done,
          }
        : {
            ...taskInfo,
          }
    );
    setTasks(updatedTaskList);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const updatedTaskList = tasks.filter(
              (taskInfo: Task) => taskInfo.id !== id
            );
            setTasks(updatedTaskList);
          },
        },
      ]
    );
  }

  function handleSkillEdit(taskInfo: Task) {
    const updatedTaskList = tasks.map((taskItem: Task) =>
      taskItem.id === taskInfo.id ? { ...taskInfo } : { ...taskItem }
    );
    setTasks(updatedTaskList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editSkill={(task) => handleSkillEdit(task)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
