import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { Datepicker, Icon, IconElement, Layout } from '@ui-kitten/components';

import {useDispatch} from 'react-redux';
import moment from 'moment';
import { useSharedSelector, useSharedDispatch, actionsApi } from '../handlingApi'
import { createNewTask } from '../handlingApi/redux/actions/allTasks/createTask';
// import { addTask } from '../slice';

const CalendarIcon = (props)=> (
  <Icon
    {...props}
    name='calendar'
  />
);

export default function AddTask({navigation}) {
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');

  const [loading, setLoading] = useState(false);

  const [taskError, setTaskError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');
  const [projectNameError, setProjectNameError] = useState('');
  const [taskNameError, setTaskNameError] = useState('');
  //   const dispatch = useDispatch();
  
  const {isAddTask, addTaskLoader, isAddTaskFailed, clearAddTask, addTaskStatus} = useSharedSelector(state => state.createTask)

  const appDispatcher = useSharedDispatch(); 

  // useEffect(() => {
  //   appDispatcher(actionsApi.createNewTask())
    
  // }, appDispatcher);

  const handleAddTask = async () => {
    try {
      const user = auth().currentUser;
      
      setLoading(true);
      if (!user) {
        // User is not authenticated, handle accordingly
        return;
      }
      // if (task.trim() === '' || projectName.trim() === '' || deadline.trim() === '' || taskName.trim()=== '') {
      //   Alert.alert('Empty', 'Empty Fields cannot be added');
      //   return;
      // }
      
      let isError = false;

      if (task.trim() === '') {
        setTaskError('Task description cannot be empty');
        isError = true;
      } else {
        setTaskError('');
      }

      if (taskName.trim() === '') {
        setTaskNameError('Task name cannot be empty');
        isError = true;
      } else {
        setTaskNameError('');
      }

      if (projectName.trim() === '') {
        setProjectNameError('Project name cannot be empty');
        isError = true;
      } else {
        setProjectNameError('');
      }

      if (!deadline) {
        setDeadlineError('Deadline cannot be empty');
        isError = true;
      } else {
        setDeadlineError('');
      }

      if (isError) {
        return;
      }
      // console.log(moment(createdAt))
     
      // await firestore().collection('tasks').add({
      //   task: task,
      //   deadline: moment(deadline).format("DD-MM-YYYY"),
      //   projectName: projectName,
      //   createdAt: moment(firestore.FieldValue.serverTimestamp()).format("DD-MM-YYYY"),
      //   userId: user.uid,
      //   taskName: taskName,
      // });

      appDispatcher(actionsApi.createNewTask({
        task: task,
        deadline: deadline,
        projectName: projectName,
        userId: user.uid,
        taskName: taskName,
      }));

      // Alert.alert('Success', 'Task is Successfully Added');
      // navigation.navigate('homeScreen');
      // Clear the input field after adding the task
      setTask('');
      setDeadline(null);
      setProjectName('');
      setTaskName('');
    } catch (error) {
      console.error('Error adding task:', error.message);
    } finally {
      setLoading(false);
    }
  };
  // const formattedDeadline = deadline ? deadline.toDate().toLocaleDateString() : '';
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
          value={task}
          multiline={true}
          // numberOfLines={5}
          onChangeText={text => {
            setTask(text);
            setTaskError('');
          }}
        />
        <Text style={styles.errorText}>{taskError}</Text>
        <Text style={styles.text}>Task name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Task Name"
          value={taskName}
          // numberOfLines={5}
          onChangeText={text => {
            setTaskName(text);
            setTaskNameError('');
          }}
        />
         <Text style={styles.errorText}>{taskNameError}</Text>
        <Text style={styles.text}>Project name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Project Name"
          value={projectName}
          // numberOfLines={5}
          onChangeText={text =>  {
            setProjectName(text);
            setProjectNameError('');
          }}
        />
        <Text style={styles.errorText}>{projectNameError}</Text>
        <Text style={styles.text}>Deadline</Text>
        <Datepicker
        size='large'
        placeholder='Enter Task Deadline'
        date={deadline}
        onSelect={nextDate => setDeadline(nextDate)}
        accessoryRight={CalendarIcon}
      />
        {/* <TextInput
          style={styles.input}
          placeholder="Enter Task Deadline"
          value={deadline}
          onChangeText={text => {
            setDeadline(text);
            setDeadlineError('');
          }}
        /> */}
        <Text style={styles.errorText}>{deadlineError}</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          {addTaskLoader ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Create New Task</Text>
          )}
        </TouchableOpacity>
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
    marginVertical: 3,
  },
  input: {
    // height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // marginBottom: 20,
    paddingHorizontal: 10,
    // marginVertical:20,
    // height:50,
    width: '100%',
    borderRadius: 20,
    // minHeight: 100,
  },
  button: {
    backgroundColor: '#8C72AD',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
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
    // marginBottom: 5,
  },
});
