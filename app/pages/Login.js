import React, {useEffect, useState, useContext} from 'react';
import {BASE_URL} from '../Const';
import axios from 'axios';
import {View, Text, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('Sign In');

  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const auth = store?.user;

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if (store.user) {
      setName(store.user?.name);
      setPassword(store.user?.password);
    }
    // console.log(store, 'store login');
    // console.log(auth, "auth")
  }, [store]);

  const handleLogin = () => {
    setLoading(true);
  
    let data = {
      name: name.trim(),
      password: password.trim(),
    };
    // console.log(data, 'data');

    axios
      .post(BASE_URL + 'login', data)
      .then(resp => {
        // console.log(resp?.data, 'resp.data');
        if (resp?.data?.auth) {          
          setStore({
            ...store,
            user: resp?.data?.user,
            token: resp?.data?.auth,
            path: "FoodCart",
          });
          toast('SignIn Successful');
          navigation.navigate('home');
          setLoading(false);
        } else {
          toast('please enter correct details');
          setLoading(false);
        }
      })
      .catch(err => {
        toast('err in api');
        setLoading(false);
      });
  };

  const handleFlickType = () => {
    if (type == 'Sign In') {
      setType('Sign Up');
      navigation.navigate('signup');
    } else {
      setType('Sign In');
    }
  };
  return (
    <View>
      <TextInput
        style={style.inputs}
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={e => setName(e)}
      />

      <TextInput
        style={style.inputs}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={e => setPassword(e)}
      />
    
      {!loading && (
        <Button
          textColor="black"
          style={style.btn}
          onPress={() => handleLogin()}>
          Sign In
        </Button>
      )}

      {!store.user && (
        <Text
          style={{margin: 20, alignSelf: 'center'}}
          onPress={handleFlickType}>
          {'New Here? Sign Up'}
        </Text>
      )}
      {loading && <ActivityIndicator animating={true} />}
    </View>
  );
};

export default Login;
