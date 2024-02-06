import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedTask, setUpdatedTask] = useState('');
  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .collection('tasks')
        .where('userId', '==', user.uid)
        .onSnapshot((querySnapshot) => {
          const tasksData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(tasksData);
        });

      return () => unsubscribe();
    }
  }, [user]);

  const handleDeleteTask = async (taskId) => {
    try {
      await firestore().collection('tasks').doc(taskId).delete();
      Alert.alert('Success', 'Task is successfully deleted.');
    } catch (error) {
      console.error('Error deleting task:', error.message);
      Alert.alert('Error', 'An error occurred while deleting the task.');
    }
  };

  const handleEditTask = async () => {
    try {
      if (updatedTask.trim() === '') {
        Alert.alert('Empty', 'Field cannot be empty');
        return;
      }

      await firestore().collection('tasks').doc(selectedTask.id).update({
        task: updatedTask,
      });

      setModalVisible(false);
      Alert.alert('Success', 'Task is successfully updated.');
    } catch (error) {
      console.error('Error updating task:', error.message);
      Alert.alert('Error', 'An error occurred while updating the task.');
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setUpdatedTask(task.task);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks:</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.task}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Edit Task Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter updated task"
              value={updatedTask}
              onChangeText={(text) => setUpdatedTask(text)}
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Update Task" onPress={handleEditTask} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FDFCFF',
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  editText: {
    color: 'blue',
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
