import {View, Text, ToastAndroid} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {AuthContext} from '../AuthContext';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import style from '../style';

const Profile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Sign In');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if (store.user) {
      setName(store?.user?.name);
      setPhone(store?.user?.phone?.toString());
      setPassword(store?.user?.password);
    }
    // console.log(store, 'store signup');
  }, [store]);

  const handleSignUp = () => {
    // console.log(name,phone,password);
    setLoading(true);
    if ((!name, !phone, !password)) {
      setLoading(false);
      setError(true);
      return false;
    }

    let data = {
      name: name.trim(),
      phone: Number(phone.trim()),
      password: password.trim(),
    };
    // console.log(data, 'data');

    axios
      .post(BASE_URL + 'signUp', data)
      .then(resp => {
        // console.log(resp?.data, 'resp.data signup');
        if (resp?.data?.auth) {        
          setStore({
            ...store,
            user: resp?.data?.result,
            token: resp?.data?.auth,
            path: "FoodCart",
          });
          toast('SignUp Successful');
          navigation.navigate('home');
        } else {
          toast('please enter correct details');
        }
      })
      .catch(err => {
        toast('err in api');
      });
  };

  const handleFlickType = () => {
    if (type == 'Sign Up') {
      setType('Sign In');
      navigation.navigate('login');
    } else {
      setType('Sign Up');
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
      {error && !name && <Text style={style.invalid}>Enter Valid Name</Text>}

      <TextInput
        style={style.inputs}
        mode="outlined"
        label="Phone"
        inputMode="numeric"
        value={phone}
        onChangeText={e => setPhone(e)}
      />
      {error && !phone && <Text style={style.invalid}>Enter Valid Phone</Text>}

      <TextInput
        style={style.inputs}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={e => setPassword(e)}
      />
      {error && !password && (
        <Text style={style.invalid}>Enter Valid Password</Text>
      )}

      {!loading && (
        <Button
          textColor="black"
          style={style.btn}
          onPress={() => handleSignUp()}>
          Sign Up
        </Button>
      )}

      {!store.user && (
        <Text
          style={{margin: 20, alignSelf: 'center'}}
          onPress={handleFlickType}>
          {'Already have account? Sign In'}
        </Text>
      )}
      {loading && <ActivityIndicator animating={true} />}
    </View>
  );
};

export default Profile;
