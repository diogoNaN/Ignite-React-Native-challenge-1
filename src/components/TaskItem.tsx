import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'

import { Task } from "./TasksList";

export interface TaskItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  editTask: (data: { id:number, title: string }) => boolean;
  removeTask: (id: number) => void;
};


export function TaskItem(props: TaskItemProps) {
  const {
    index,
    item,
    toggleTaskDone,
    editTask,
    removeTask
  } = props;

  const textInputRef = useRef<TextInput>(null);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  const handleStartEditing = useCallback(() => {
    setEditing(true);
  }, []);

  const handleCancelEditing = useCallback(() => {
    setTitle(item.title);
    setEditing(false);
  }, [item]);

  const handleSubmitEditing = useCallback(() => {
    const success = editTask({
      id: item.id,
      title,
    });

    if(!success) {
      setTitle(item.title);
    }

    setEditing(false);
  }, [item, title]);

  useEffect(() => {
    if(editing) {
      textInputRef.current?.focus();
    }

    textInputRef.current?.blur();
  }, [editing]);

  useEffect(() => {
    setTitle(item.title);
  }, [item])


  return (
    <Fragment>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done
              ? styles.taskMarkerDone
              : styles.taskMarker
            }
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={[
              {
                flex: 1,
              },
              item.done
                ? styles.taskTextDone
                : styles.taskText
            ]}
            ref={textInputRef}
            value={title}
            onChangeText={setTitle}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.taskButtonContainer}>

        {editing
          ? (
            <TouchableOpacity
              testID={`edit-${index}`}
              style={{ justifyContent: "center", paddingHorizontal: 8 }}
              onPress={handleCancelEditing}
            >
              <Icon 
                name="x"
                size={20}
                color="#b2b2b2"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              testID={`edit-${index}`}
              style={{ justifyContent: "center", paddingHorizontal: 8 }}
              onPress={handleStartEditing}
            >
              <Icon 
                name="edit"
                size={20}
                color="#b2b2b2"
              />
            </TouchableOpacity>
          )
        }

        <View style={{ backgroundColor: "rgba(196, 196, 196, 0.24)", width: 1, height: 24 }}/>

        <TouchableOpacity
          disabled={editing}
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 8, marginRight: 16 }}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: editing ? 0.2 : 1 }}/>
        </TouchableOpacity>

      </View>

    </Fragment>
  )
}

const styles = StyleSheet.create({
  taskButtonContainer: {
    flexDirection: "row",
  },

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})