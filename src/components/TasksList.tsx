import React from "react";
import { FlatList, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editSkill: (task: Task) => void;
}

export function TasksList({
  editSkill,
  tasks,
  toggleTaskDone,
  removeTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem
            index={index}
            task={item}
            removeTask={() => removeTask(item.id)}
            toggleTaskDone={() => toggleTaskDone(item.id)}
            editSkill={(task) => editSkill(task)}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
