import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import TaskBox from '../components/taskBox';
import Setting from '../svgComponents/setting';
import { useNavigation } from '@react-navigation/native';
import LogoutModal from '../components/logoutModal';
// import { useDispatch } from 'react-redux';
import { useSharedSelector, useSharedDispatch, actionsApi } from '../handlingApi';
// import { actionApi } from '../handlingApi/redux/actionsAPI';


const HomeScreen = props => {
  // const dispatch = useDispatch()
//   const {isAllPosts} = useSharedSelector(state => state.allTasks)
//   const appDispatcher = useSharedDispatch(); 


//   useEffect(()=>{
//     appDispatcher(actionsApi.AllTasks())
//   },[]);

// console.log(isAllPosts)
// const handleRedux = ()=> {
//     alert("dispatched")
//     appDispatcher(actionsApi.AllTasks())
//   }


  const navigation = useNavigation();
  // const [myData, setMyData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('AllTasks');

  const [modalVisible, setModalVisible] = useState(false);

  const [currentDate, setCurrentDate] = useState('');

  const showLogoutModal = () => {
    setModalVisible(true);
  };

  var monthNames = [ 'January', 'February', 'March', 'April', 'May','June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = monthNames [new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year

    setCurrentDate(
      date + ' ' + month + ' ' + year 
    );
  }, []);
  return (
    <View style={styles.parentCont}>
      <View style={styles.header}>
        <View>
          <Text>Good Morning</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        <TouchableOpacity onPress={showLogoutModal}>
          <Setting/>
        </TouchableOpacity>
      </View>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Summary</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.status}>
            <Text>Assigned Tasks</Text>
            <Text style={styles.statusNumber}>21</Text>
          </View>
          <View style={styles.status}>
            <Text>Completed Tasks</Text>
            <Text style={styles.statusNumber}>32</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={styles.summaryText}>Today Tasks</Text>
      <Text style={styles.taskBoxTag} onPress={() => navigation.navigate('addTask')}>Create New Task</Text>
      </View>

      {/* <View style={styles.statusTab}>
        <Text>All Tasks</Text>
        <Text>In Progress</Text>
        <Text>Completed</Text>
      </View> */}

<View style={styles.statusTab}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('AllTasks');
          }}
         
          style={[styles.tabButton, {backgroundColor: selectedTab === 'AllTasks'?'#8C72AD':'#FFF'}]}
        >
          <Text style={[styles.statusTabText, {color: selectedTab === 'AllTasks'?'#FFF':'#6E7591'}]} >All Tasks</Text>
        
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('InProgress');
          }}
          style={[
            styles.tabButton,
            selectedTab === 'InProgress' && { backgroundColor: '#8C72AD'},
          ]}
        >
          <Text style={[styles.statusTabText, selectedTab === 'InProgress' && { color: '#FFF'},]}>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Completed');
          }}
          style={[
            styles.tabButton,
            selectedTab === 'Completed' && { backgroundColor: '#8C72AD' },
          ]}
        >
          <Text style={[styles.statusTabText, selectedTab === 'Completed' && { color: '#FFF' },]}>Completed</Text>
        </TouchableOpacity>
      </View>
{console.log('Selct wala tab',selectedTab,)}
      <TaskBox selectedTab = {selectedTab}/>

      {/* <TaskBox/> */}

      {/* <View style={styles.taskBox}>
        <Text style={styles.dateText}>Homepage Redesign</Text>
        <Text>
          Redesign the homepage of our website to improve user engagement and
          align with our updated branding guidelines. Focus on creating an
          intuitive user interface with enhanced visual appeal.
        </Text>
        <View style = {{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ProjName />
          <Text style={{marginLeft: 10}}>Website Rewamp</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Time />
          <Text style={{marginLeft: 10}}>October 15, 2023</Text>
        </View>
        </View>
      <Text style={styles.taskBoxTag}>New Task</Text>
        </View>

      </View> */}
   
      <LogoutModal modalVisible={modalVisible} setModalVisible={setModalVisible}/> 
      

    </View>
  );
}

const styles = StyleSheet.create({
  parentCont: {
    flex: 1,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#DCE1EF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    // paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#0D101C',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 20.8,
    letterSpacing: -0.32,
  },
  summaryBox: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 20,
  },
  summaryText: {
    color: '#0D101C',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 26,
    letterSpacing: -0.4,
  },
  status: {
    padding: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '48%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCE1EF',
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  statusNumber: {
    color: '#0D101C',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 37, // Adjusted for React Native
    letterSpacing: -0.48,
  },
  statusTab: {
    paddingVertical: 6,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: '#DCE1EF',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 6,
    borderRadius: 42,
    // borderWidth: 1,
    // borderColor: '#DCE1EF',
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statusTabText: {
    color: '#6E7591',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 19.6,
  },
  taskBox: {
    padding: 12,
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCE1EF',
    backgroundColor: '#FFF',
    marginVertical: 3,
  },
  taskBoxTag:{
  paddingVertical: 6,
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
  text: {
    color: 'black',
  },
  logoutbtn: {
    borderRadius: 5,
    backgroundColor: '#8C72AD',
    shadowColor: '#9C7CB2',
    shadowOpacity: 0.77,
    shadowRadius: 8,
    elevation: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 5,
    // width: '100%',
  },
  logoutText: {
    color: '#FFF',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
});

export default HomeScreen