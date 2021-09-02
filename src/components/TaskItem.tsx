import React, { createRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import { ItemWrapper } from "./ItemWrapper";
import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen/pen.png";
import Icon from "react-native-vector-icons/Feather";
import closeIcon from "../assets/icons/close/close.png";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

type TaskItemProps = {
  task: Task;
  index: number;
  removeTask: () => void;
  toggleTaskDone: () => void;
  editSkill: (task: Task) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  removeTask,
  toggleTaskDone,
  editSkill,
}) => {
  const [skillText, setSkillText] = useState<string>(task.title);
  const [editable, setEditable] = useState(false);
  const inputRef = createRef<TextInput>();

  const handleEditPress = (): void => {
    setEditable(!editable);
    inputRef.current?.focus();
  };

  const onFinishEditing = (task: Task): void => {
    setEditable(false);
    const data = {
      ...task,
      title: skillText,
    };

    editSkill(data);
  };

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={toggleTaskDone}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            defaultValue={task.title}
            onChangeText={setSkillText}
            onSubmitEditing={() => onFinishEditing(task)}
            onEndEditing={() => onFinishEditing(task)}
            ref={inputRef}
            selectTextOnFocus={true}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inlineContainer}>
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          //TODO - use onPress (remove task) prop
          onPress={handleEditPress}
        >
          <Image source={!editable ? penIcon : closeIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          //TODO - use onPress (remove task) prop
          onPress={removeTask}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
};

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: "row",
  },

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});

export default TaskItem;
