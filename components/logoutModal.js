import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Modal } from '@ui-kitten/components';

export default function LogoutModal({modalVisible, setModalVisible}) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
          setLoading(true);
          await auth().signOut();
          // Redirect to login screen or any other screen
          navigation.navigate('login');
        } catch (error) {
          console.error('Logout error:', error.message);
          // Handle logout error
        } finally {
          setLoading(false);
        }
      };
  return (
    <Modal
      backdropStyle={styles.backdrop}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalView}>
        <View style = {{justifyContent: 'center',alignContent:'center',alignItems:'center',marginVertical:20,}}>
            <Image style={{marginVertical:40,}} source={require('../assets/file.png')}/>
          <Text style={styles.headingText}>Oh no! You're leaving...</Text>
          <Text style={styles.headingText}>Are you sure?</Text>
          
         
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>

          <Text style={styles.buttonText}>Naah, Just Kidding</Text>
        
      </TouchableOpacity>
        <TouchableOpacity style={styles.logoutbtn} onPress={handleLogout}>
      
    {loading ? (
        <ActivityIndicator size="small" color="#8C72AD" />
      ) : (
        <Text style={styles.logoutbtnTxt}>Yes, Log Me Out</Text>
      )}
    </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    // marginTop: 80,
    //  margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 9,
    elevation: 5,
    // width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    padding:15,
    paddingHorizontal: 30,
    // flex:1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headingText: {
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginHorizontal: 15,
    
  },
  button: {
    backgroundColor: '#8C72AD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom:10,
    // width: '100%',
    alignItems:'center',
    marginTop:5,
  },
  logoutbtn:{
    backgroundColor:'#FFF',
    borderColor:'#8C72AD',
    borderWidth:1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom:10,
    // width: '80%',
    alignItems:'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  logoutbtnTxt:{
    color: '#8C72AD',
    fontSize: 16,
    
  }
});
