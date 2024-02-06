import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const AllTasks = createAsyncThunk('allTasks', async (selectedTab, { dispatch }) => {
try {
    dispatch(loadingState());

    let query = null;
    const user = auth().currentUser;

    if (selectedTab === 'AllTasks') {
      query = firestore().collection('tasks').where('userId', '==', user.uid);
    } else if (selectedTab === 'InProgress') {
      query = firestore().collection('tasks').where('userId', '==', user.uid).where('status', '==', 'inProgress');
    } else if (selectedTab === 'Completed') {
      query = firestore().collection('tasks').where('userId', '==', user.uid).where('status', '==', 'completed');
    }

    const querySnapshot = await query.get();
    const tasksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Redux mushkil hai',tasksData)
    dispatch(successState(tasksData));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    dispatch(failedState());
  }

       });
const fetchAllTasksData = createSlice({
    name: 'allTasks',
    initialState: {
        // stateName : null,
        loader : false,
        isAllPosts: [],
        isPostFailed: false,
        clearAllPosts: false, 
        status: 'idle',
    },
    reducers: {
        // resetState: (state, action) => {
        //     state.stateName = null;
        // },
        clearState: (state, action) => {
            state.loader = false,
            state.isAllPosts = [],
            state.isPostFailed = false,
            state.clearAllPosts = false
            state.status = 'idle'
        },
        successState: (state,action) => {
            
            state.loader = false,
            state.isAllPosts = action.payload,
            state.isPostFailed = false,
            state.clearAllPosts = false
            state.status = 'success'
        },
        loadingState: (state,action) => {
            state.loader = true,
            state.isAllPosts = [],
            state.isPostFailed = false,
            state.clearAllPosts = false
            state.status = 'loading'
        },
        failedState: (state,action) => {
            state.loader = false,
            state.isAllPosts = [],
            state.isPostFailed = true,
            state.clearAllPosts = false,
            state.status = 'failed'
        }
	//Add More reducers...
    },
})
export const {clearState,successState,loadingState,failedState } = fetchAllTasksData.actions;
export default fetchAllTasksData.reducer;