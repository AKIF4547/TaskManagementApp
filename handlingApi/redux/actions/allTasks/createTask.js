import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { Alert } from 'react-native';

export const createNewTask = createAsyncThunk(
  'createTask',
  async (Obj, {dispatch}) => {
    try {
      const user = auth().currentUser;
      const { task, deadline, projectName, taskName } = Obj;
      // setLoading(true);
      dispatch(addTaskLoadingState());

      await firestore()
        .collection('tasks')
        .add({
          task: task,
          deadline: moment(deadline).format('DD-MM-YYYY'),
          projectName: projectName,
          createdAt: moment(firestore.FieldValue.serverTimestamp()).format(
            'DD-MM-YYYY',
          ),
          userId: user.uid,
          taskName: taskName,
        });
      Alert.alert('Success', 'Task is Successfully Added');
    //   navigation.navigate('homeScreen');
      dispatch(addTaskSuccessState());
    }catch (error) {
      console.error('Error adding task:', error.message);
      dispatch(addTaskFailedState());
    }
  },
);

const addNewTask = createSlice({
  name: 'createTask',
  initialState: {
    // stateName : null,
    addTaskLoader: false,
    isAddTask: null,
    isAddTaskFailed: false,
    clearAddTask: false,
    addTaskStatus: 'idle',
  },
  reducers: {
    addTaskSuccessState: (state, action) => {
      (state.addTaskLoader = false),
        (state.isAddTask = action.payload),
        (state.isAddTaskFailed = false),
        (state.clearAddTask = false);
      state.addTaskStatus = 'success';
    },
    addTaskLoadingState: (state, action) => {
      (state.addTaskLoader = true),
        (state.isAddTask = null),
        (state.isAddTaskFailed = false),
        (state.clearAddTask = false);
      state.addTaskStatus = 'loading';
    },
    addTaskFailedState: (state, action) => {
      (state.addTaskLoader = false),
        (state.isAddTask = null),
        (state.isAddTaskFailed = true),
        (state.clearAddTask = false),
        (state.addTaskStatus = 'failed');
    },
    addTaskClearState: (state, action) => {
        state.addTaskLoader = false,
        state.isAddTask = null ,
        state.isAddTaskFailed = false,
        state.clearAddTask = false
        state.addTaskStatus = 'idle'
    },
  },
});
export const {addTaskSuccessState, addTaskLoadingState, addTaskFailedState, addTaskClearState} =
  addNewTask.actions;
export default addNewTask.reducer;
