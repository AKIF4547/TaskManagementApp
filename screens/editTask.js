import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Datepicker, Icon, IconElement, Layout } from '@ui-kitten/components';

import moment from 'moment';


const CalendarIcon = (props)=> (
  <Icon
    {...props}
    name='calendar'
  />
);
export default function EditTask({route, navigation}) {
  const {taskId} = route.params;
  const [editedTask, setEditedTask] = useState('');
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedProjectName, setEditedProjectName] = useState('');
  const [editedDeadline, setEditedDeadline] = useState(null);

  const [loading, setLoading] = useState(false);

  const [taskError, setTaskError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');
  const [projectNameError, setProjectNameError] = useState('');
  const [taskNameError, setTaskNameError] = useState('');


  useEffect(() => {
    // Fetch the task details for the given taskId and update the state
    const fetchTaskDetails = async () => {
      
      try {
        const taskDocument = await firestore()
          .collection('tasks')
          .doc(taskId)
          .get();
        const taskData = taskDocument.data();
        setEditedTask(taskData.task);
        setEditedTaskName(taskData.taskName);
        setEditedProjectName(taskData.projectName);
        // setEditedDeadline(taskData.deadline);
        // setEditedDeadline(taskData.deadline.toDate());
        
        setEditedDeadline(moment(taskData.deadline, 'DD-MM-YYYY').toDate());
        
        {console.log('load Edited',editedDeadline)}


      } catch (error) {
        console.error('Error fetching task details:', error.message);
        // Handle the error (e.g., show an alert)
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleEditTask = async () => {
    try {
      // if (editedTask.trim() === '') {
      //   Alert.alert('Empty', 'Fields cannot be empty');
      //   return;
      // }
      setLoading(true);

      let isError = false;

      if (editedTask.trim() === '') {
        setTaskError('Task description cannot be empty');
        isError = true;
      } else {
        setTaskError('');
      }
  
      if (editedTaskName.trim() === '') {
        setTaskNameError('Task name cannot be empty');
        isError = true;
      } else {
        setTaskNameError('');
      }
  
      if (editedProjectName.trim() === '') {
        setProjectNameError('Project name cannot be empty');
        isError = true;
      } else {
        setProjectNameError('');
      }
  
      if (!editedDeadline) {
        setDeadlineError('Deadline cannot be empty');
        isError = true;
      } else {
        setDeadlineError('');
      }
      

      if (isError) {
        return;
      }

      // Update the task in Firebase Firestore
      await firestore().collection('tasks').doc(taskId).update({
        task: editedTask,
        taskName: editedTaskName,
        projectName: editedProjectName,
        deadline:  moment(editedDeadline).format("DD-MM-YYYY"),
        
       
      });

      Alert.alert('Success', 'Task is successfully updated.');
      // Navigate back to the previous screen (ViewTasks)
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error.message);
      Alert.alert('Error', 'An error occurred while updating the task.');
    }finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Mobile App Interface {'\n'}Optimization
        </Text>
        <Text style={styles.text}>Task description</Text>
        <TextInput
          style={[styles.input, {height: 100}]}
          placeholder="Enter your Task Description"
          value={editedTask}
          multiline={true}
          // numberOfLines={5}
          onChangeText={text => {setEditedTask(text); setTaskError('')}}
        />
        <Text style={styles.errorText}>{taskError}</Text>
        <Text style={styles.text}>Task name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Task Name"
          value={editedTaskName}
          // numberOfLines={5}
          onChangeText={text => {setEditedTaskName(text); setTaskNameError('');}}
        />
         <Text style={styles.errorText}>{taskNameError}</Text>
        <Text style={styles.text}>Project name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Project Name"
          value={editedProjectName}
          // numberOfLines={5}
          onChangeText={text => {setEditedProjectName(text);setProjectNameError('');}}
        />
         <Text style={styles.errorText}>{projectNameError}</Text>
        <Text style={styles.text}>Deadline</Text>
        <Datepicker
        size='large'
        placeholder='Enter Task Deadline'
        date={editedDeadline}
        onSelect={nextDate => setEditedDeadline(nextDate)}
        accessoryRight={CalendarIcon}
      />
      <Text style={styles.errorText}>{deadlineError}</Text>
        <View style ={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.goBack();Alert.alert('Update Cancelled');}}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEditTask}>
          <Text style={styles.buttonText}>Update Task</Text>
        </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#DCE1EF',
  },
  content: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    color: '#0D101C',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 33.6,
    letterSpacing: -0.48,
    paddingBottom: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#DCE1EF',
    marginBottom: 10,
  },
  text: {
    color: '#0D101C',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 18.2,
    letterSpacing: -0.28,
    marginVertical: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#8C72AD',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Poppins',
    fontSize: 11,
  },
});
