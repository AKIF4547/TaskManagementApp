import 'react-native-gesture-handler';

import React from 'react';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {View, Text} from 'react-native';
import Login from './screens/login';
import RegisterUser from './screens/registerUser';
import HomeScreen from './screens/homeScreen';
import Logout from './screens/logout';
import AddTask from './screens/addTask';
import ViewTasks from './screens/viewTasks';


//Redux
// import { Store } from './redux/Store'
import { Provider } from 'react-redux'
// import { store, useSharedSelector } from './handlingApi';
import EditTask from './screens/editTask';
import { store } from './handlingApi';
// import store from './src/store';


const Stack = createNativeStackNavigator();





function App() {
// you can use File Name e.g LoadAllData.js (state => state.LoadAllData)

  return (
<Provider store={store}>

    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
          <Stack.Screen
            name="login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="registerUser"
            component={RegisterUser}
            options={{headerShown: false}}
          />
            <Stack.Screen
            name="homeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="addTask"
            component={AddTask}
            options={{headerShown: true, headerTitle: 'Create New Task',headerTransparent: true}}
          />
          <Stack.Screen
            name="editTask"
            component={EditTask}
            options={{headerShown: true, headerTitle: 'Edit Task',headerTransparent: true}}
          />
           <Stack.Screen
            name="viewTasks"
            component={ViewTasks}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="logout"
            component={Logout}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
</Provider>
  );
}

export default App;
