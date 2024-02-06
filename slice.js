// // src/features/taskSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import firestore from '@react-native-firebase/firestore';

// // Define the initial state
// const initialState = {
//   tasks: [],
//   status: 'idle',
//   error: null,
// };

// // Define the asynchronous thunk for fetching tasks
// export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId) => {
//   const querySnapshot = await firestore().collection('tasks').where('userId', '==', userId).get();
//   const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   return tasks;
// });

// // Define the task slice
// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTasks.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.tasks = action.payload;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// // Export the actions and reducer
// export const { addTask } = taskSlice.actions;
// export default taskSlice.reducer;
