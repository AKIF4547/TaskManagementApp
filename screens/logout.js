import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function Logout() {
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
    <View style={styles.container}>
    <Text style={styles.text}>Are you sure you want to logout?</Text>
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      
    {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={styles.buttonText}>Logout</Text>
      )}
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#8C72AD',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
    },
  });