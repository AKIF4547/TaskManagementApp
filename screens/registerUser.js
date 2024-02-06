import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Icon, Input} from '@ui-kitten/components';

import auth from '@react-native-firebase/auth';
import Person from '../svgComponents/person';
import Lock from '../svgComponents/lock';

export default function RegisterUser({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [login, setLogin] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!email) {
        setEmailError('Email is Required');
      } else {
        setEmailError(false);
      }

      if (!password) {
        setPasswordError('Password is Required');
      } else {
        setPasswordError(false);
      }

      if (password !== confirmPassword) {
        setError("Passwords don't match");
        setEmailError(false);
        Alert.alert(
          "Passwords don't match",
          'Please enter matching passwords.',
        );
        return;
      }
      setLoading(true);
     
      // await auth().createUserWithEmailAndPassword(email, password);
      if (email && password && confirmPassword) {
        setLoading(true);
       await auth().createUserWithEmailAndPassword(email, password);
      }
      // navigation.navigate('login');
   
    } catch (error) {
      console.log('Registration error:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  //Authentication

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  const renderLockIcon = props =>(
    <Lock/>
  );
  const renderProfileIcon = props => (
    <View style={{height:30, justifyContent: 'center'}}>

      <Person/>
    </View>

  );

  const renderEmailCaption = () => {
    return emailError ? (
      <View style={styles.captionContainer}>
        <Text style={styles.errorMessage}>{emailError}</Text>
      </View>
    ) : null;
  };
  const renderPasswordCaption = () => {
    return passwordError ? (
      <View style={styles.captionContainer}>
        <Text style={styles.errorMessage}>Password is Required</Text>
      </View>
    ) : null;
  };

  // const renderCaption = () => {
  //   return (
  //     <>
  //       {emailError && (
  //         <View style={styles.captionContainer}>
  //           <Text style={styles.errorMessage}>{emailError}</Text>
  //         </View>
  //       )}
  //       {passwordError && (
  //         <View style={styles.captionContainer}>
  //           <Text style={styles.errorMessage}>{passwordError}</Text>
  //         </View>
  //       )}
  //     </>
  //   );
  // };
  return (
    <View style={styles.parentCont}>
      <View style={styles.boxContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
          <Image
            source={require('../assets/checkList.png')}
            style={{height: 100, marginRight: 15, marginLeft:15}}
          />
          <Image source={require('../assets/management.png')} />
          <Image source={require('../assets/notepad.png')} />
        </View>
        <Text style={styles.header}>Welcome to Task Management</Text>
        <Text style={styles.credText}>Enter details for Registration</Text>
        {/* <Text style={styles.text}>Email</Text> */}
        <Input
          style={styles.emailInput}
          placeholder="Email"
          caption={renderEmailCaption}
          onChangeText={setEmail}
          accessoryLeft={renderProfileIcon}
        />

        {/* <Text style={styles.text}>Full Name</Text>
        <Input
          style={styles.emailInput}
          placeholder="Username / Email"
          caption={renderCaption}
          onChangeText={setEmail}
        /> */}

        {/* <Text style={styles.text}>Password</Text> */}
        <Input
          style={styles.emailInput}
          placeholder="Password"
          caption={renderPasswordCaption}
          accessoryRight={renderIcon}
          accessoryLeft={renderLockIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={setPassword}
        />

        {/* <Text style={styles.text}>Confirm Password</Text> */}
        <Input
          style={styles.emailInput}
          placeholder="Confirm Password"
          // caption={renderCaption}
          accessoryRight={renderIcon}
          accessoryLeft={renderLockIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={setConfirmPassword}
        />
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp} disabled={loading}>
          
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signup}>
          <Text style={styles.signupText1}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.signupText2}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentCont: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C72AD',
  },
  boxContainer: {
    // flexShrink: 0,
    borderRadius: 27,
    backgroundColor: '#FFFEFF',
    shadowColor: '#55406F',
    shadowOpacity: 0.53,
    shadowRadius: 46,
    elevation: 10, // Android shadow
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  header: {
    color: 'rgba(143, 122, 171, 0.67)',
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.36,
    marginTop: 20,
  },
  credText: {
    color: '#6F598C',
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.36,
    marginVertical: 25,
  },
  text: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  emailInput: {
    borderRadius: 6,
    borderWidth: 1.6,
    borderColor: '#8C72AD',
    backgroundColor: '#FDFCFF',
    marginBottom: 10,
  },
  captionContainer: {
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: 5,
    backgroundColor: '#8C72AD',
    shadowColor: '#9C7CB2',
    shadowOpacity: 0.77,
    shadowRadius: 8,
    elevation: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Lato',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  errorMessage: {
    color: '#DD0F0F',
    fontFamily: 'Nunito',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
  signup: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText1: {
    color: '#000',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  signupText2: {
    color: '#7269E3',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
});
