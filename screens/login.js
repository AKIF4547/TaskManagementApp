import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon, Input} from '@ui-kitten/components';

import auth from '@react-native-firebase/auth';
// import {actionsAPI, useSharedDisptach, useSharedSelector} from '../handlingApi';
import Person from '../svgComponents/person';
import Lock from '../svgComponents/lock';


export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  // const [login, setLogin] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  //Authentication

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(newUser => {
      setUser(newUser);
      // Handle the user object, including the token, here
      if (newUser) {
        navigation.navigate('homeScreen');
        newUser.getIdToken().then(token => {
          console.log('User Token:', token);
          // useSharedDisptach(actionsAPI.AllPosts())
        });
      }
    });

    // Cleanup the event listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      if (!email) {
        setEmailError('Email is Required');
      } else {
        setEmailError(false);
      }

      if (!password) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }

      if (email && password) {
        setLoading(true);
        await auth().signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log('Authentication error:', error.message);
      setError('Invalid Credentials');
      // setPasswordError(true);
      // Handle authentication errors (e.g., display an error message to the user)
    } finally {
      setLoading(false); // Stop showing the activity indicator
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

  // const {loader, isAllPosts} = useSharedSelector(state => state.allPosts);
  // console.log(loader);
  // React.useEffect(() => {

  //   useSharedDisptach(actionsAPI.AllPosts())

  // }, [])

  //Redux
  // const appDispatcher = useSharedDisptach();
  // const handleRedux = ()=> {
  //   alert("dispatche")
  //   appDispatcher(actionsAPI.AllPosts())
  // }
  //Redux

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
        <Text style={styles.credText}>Enter your credential below</Text>
        {/* <Text style={styles.text}>Email</Text> */}
        <Input
          style={styles.emailInput}
          placeholder="Email"
          caption={renderEmailCaption}
          accessoryLeft={renderProfileIcon}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
            setError('');
          }}
        />
        {/* {!error ? null : <Text style = {styles.errorMessage}>Email is Required</Text>} */}
        {/* <Text style={styles.text}>Password</Text> */}

        <Input
          style={styles.emailInput}
          placeholder="Password"
          caption={renderPasswordCaption}
          accessoryRight={renderIcon}
          accessoryLeft={renderLockIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={text => {
            setPassword(text);
            setPasswordError('');
            setError('');
          }}
        />

        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signup}>
          <Text style={styles.signupText1}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('registerUser')}>
            <Text style={styles.signupText2}>Sign Up</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={()=>{handleRedux()}}>
            <Text style={styles.signupText2}>dispatcher</Text>
          </TouchableOpacity> */}
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
    marginVertical: 20,
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
    marginBottom: 25,
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
    marginTop: 5,
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

// onPress={() => {
//   if (!email) {
//     setEmailError(true);
//   } else {
//     setEmailError(false);
//   }

//   if (!value) {
//     setPasswordError(true);
//   } else {
//     setPasswordError(false);
//   }

//   if (email && value) {
//     setLogin(true);
//     navigation.navigate('registerUser');
//   }
// }}
