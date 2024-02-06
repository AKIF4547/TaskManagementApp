import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ProjName from '../svgComponents/projName';
import Time from '../svgComponents/time';
import moment from 'moment';

import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EditTask from '../screens/editTask';
import { useNavigation } from '@react-navigation/native';

import { useSharedSelector, useSharedDispatch, actionsApi } from '../handlingApi'
import getAllTasks, { AllTasks } from '../handlingApi/redux/actions/allTasks/getAllTasks';


export default function TaskBox({ selectedTab }) {



//   useEffect(()=>{
//     appDispatcher(actionsApi.AllTasks())
//   },[]);

// console.log(isAllPosts)




  const navigation = useNavigation();
  // const [myData, setMyData] = useState(null);
  // const user = auth().currentUser;

  // const isMounted = useRef(true);
  // const unsubscribeRef = useRef(null);


  // const dispatch = useDispatch();
  // const { isAllPosts, loader, isPostFailed } = useSelector((state) => state.allTasks);


  const {isAllPosts, loader, isPostFailed, clearState, status} = useSharedSelector(state => state.allTasks)
  const appDispatcher = useSharedDispatch(); 

  useEffect(() => {
    // appDispatcher(AllTasks(selectedTab));
    appDispatcher(actionsApi.AllTasks(selectedTab))
    
  }, [appDispatcher, selectedTab]);

  useEffect(() => {
    console.log('status:', status);
    console.log('isAllPosts1:', isAllPosts);
    console.log('date:', moment(isAllPosts[1]?.createdAt?.seconds).format("DD-MM-YYYY"));
  }, [status, isAllPosts]);

  // useEffect(() => {
  //   const unsubscribe = getAllTasks();

  //   console.log(myData);
  //   // Cleanup function to unsubscribe when the component unmounts
  //   return () => unsubscribe && unsubscribe();
  // }, [selectedTab]);

  // useEffect(() => {
  //   // Update isMounted ref when the component mounts
  //   isMounted.current = true;

    // const fetchData = async () => {
    //   try {
    //     const unsubscribe = AllTasks();

    //     // Ensure that the component is still mounted before updating the state
    //     if (isMounted.current) {
    //       console.log(myData);
    //     }

    //     // Set the unsubscribe function in a ref
    //     unsubscribeRef.current = unsubscribe;
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

  //   // Call fetchData function
  //   fetchData();

  //   // Cleanup function
  //   return () => {
  //     // Update isMounted ref when the component unmounts
  //     isMounted.current = false;

  //     // Unsubscribe using the ref
  //     if (unsubscribeRef.current && typeof unsubscribeRef.current === 'function') {
  //       unsubscribeRef.current();
  //     }
  //   };
  // }, [selectedTab]);


  


  // const getAllTasks = async () => {
  //   try {
  //     let query = null;
  //     if (selectedTab === 'AllTasks'){
  //       query = firestore().collection('tasks').where('userId', '==', user.uid);
  //       // querySnapshot = await firestore()
  //       //   .collection('tasks')
  //       //   .where('userId', '==', user.uid)
  //       //   .get();
  //     }else if (selectedTab === 'InProgress') {
  //       query = firestore().collection('tasks').where('userId', '==', user.uid).where('status', '==', 'inProgress');
  //     } else if (selectedTab === 'Completed') {
  //       query = firestore().collection('tasks').where('userId', '==', user.uid).where('status', '==', 'completed');
  //     }
  //     // const tasksData = querySnapshot && querySnapshot.docs.map(doc => ({
  //     //   id: doc.id,
  //     //   ...doc.data(),
  //     // }));
  //     // setMyData(tasksData);
  //     const unsubscribe = query.onSnapshot((querySnapshot) => {
  //       const tasksData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setMyData(tasksData);
  //       console.log('tasks datas',tasksData)
  //     });
  //     return unsubscribe;
  //   } catch (err) {
  //     console.error('Error fetching tasks:', err);
  //   }
  // };

  const handleDeleteTask = async (taskId) => {
    try {
      await firestore().collection('tasks').doc(taskId).delete();
      Alert.alert('Success', 'Task is successfully deleted.');
      // setMyData(prevData => prevData.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error.message);
      Alert.alert('Error', 'An error occurred while deleting the task.');
    }
  };

  const renderItem = ({item}) => {
    // {console.log('items checking deadline',moment(item.deadline).format('MMMM Do YYYY'))}
    // const formattedDeadline = item.deadline ? (
    //   item.deadline instanceof firebase.firestore.Timestamp
    //     ? moment(item.deadline.toDate()).format('MMMM Do YYYY')
    //     : moment(item.deadline).format('MMMM Do YYYY')
    // ) : 'Loading...';
  
    return(
    
    <View style={styles.taskBox}>
      <Text style={styles.taskNameText}>{item.taskName}</Text>
      <Text>{item.task}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:5}}>
            <ProjName />
            <Text style={{marginLeft: 10}}>{item.projectName}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Time />
            <Text style={{marginLeft: 10}}>{item.deadline}</Text>
            {/* <Text style={{marginLeft: 10}}>{item.deadline? moment(item.deadline).format('MMMM Do YYYY') : 'Loading...'}</Text> */}
            {/* <Text style={{marginLeft: 10}}>{formattedDeadline}</Text> */}
          </View>
        </View>
        <View>
          <TouchableOpacity style = {{marginBottom:5}} onPress={() => navigation.navigate('editTask',{taskId: item.id})}>
            <Text style={styles.taskBoxTag}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
            <Text style={styles.taskBoxTag}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )};
  console.log('status:', status); 
  console.log('isAllPosts1:', isAllPosts);
  return (
    <FlatList
      data={isAllPosts}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      refreshing={loader}
      onRefresh={() => appDispatcher(AllTasks(selectedTab))}
    />
  );
}

const styles = StyleSheet.create({
  taskBox: {
    padding: 12,
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCE1EF',
    backgroundColor: '#FFF',
    marginVertical: 3,
  },
  taskBoxTag: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 40,
    backgroundColor: '#F0EDFD',
    color: '#613BE7',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16.8,
  },
  taskNameText: {
    color: '#0D101C',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20.8,
    letterSpacing: -0.32,
  },
});
