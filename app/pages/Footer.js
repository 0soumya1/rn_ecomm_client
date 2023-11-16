import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Badge, Button} from 'react-native-paper';
import style from '../style';
import {AuthContext} from '../AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Footer = () => {
  const navigation = useNavigation();
  const {store, setStore} = useContext(AuthContext);
  const {cart, setCart} = useContext(AuthContext);
  return (
    <View style={style.footer}>
      <>
        <Button
          onPress={() => {
            navigation.navigate('home');
            setStore({...store, path: 'FoodCart'});
          }}>
          <Ionicons name="home-outline" size={18} color="black" />
        </Button>

        {store?.user && (
          <Button
            onPress={() => {
              navigation.navigate('orders');
              setStore({...store, path: 'Orders'});
            }}>
            <Ionicons name="list-circle-outline" size={22} color="black" />
          </Button>
        )}

        <View>
          <Button
            onPress={() => {
              navigation.navigate('cart');
              setStore({...store, path: 'Cart'});
            }}>
            <Ionicons name="cart-outline" size={20} color="black" />
          </Button>
          <Badge style={style.badge}>{cart?.length}</Badge>
        </View>
      </>
    </View>
  );
};

export default Footer;
