import {View, Text, FlatList, ToastAndroid} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';
import axios from 'axios';
import {BASE_URL} from '../Const';
import style from '../style';
import {AuthContext} from '../AuthContext';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Cart = () => {
  const {store, setStore} = useContext(AuthContext);
  const {cart, setCart} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    handleTotal(cart);
  }, [cart]);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  const handleQtyInc = i => {
    let arr = [...cart];
    arr[i].qty = arr[i].qty + 1;
    arr[i].amount = arr[i].qty * arr[i].price;
    setCart(arr);
    handleTotal(arr);
  };

  const handleQtyDec = i => {
    let arr = [...cart];
    if (arr[i].qty > 1) {
      arr[i].qty = arr[i].qty - 1;
      arr[i].amount = arr[i].qty * arr[i].price;
      setCart(arr);
      handleTotal(arr);
    }
  };

  const handleClear = i => {
    let arr = [...cart];
    arr.splice(i, 1);
    setCart(arr);
    handleTotal(arr);
  };

  const handleTotal = arr => {
    let sum = 0;
    arr.map(a => {
      sum = sum + a.amount;
    });
    setTotal(sum);
  };

  const handleSave = () => {
    setLoading(true);
    let arr = [...cart];
    arr.map(a => {
      a.orderQty = a.qty;
      a.finalPrice = a.amount;
    });

    let data = {
      userId: store.user._id,
      userName: store.user.name,
      orderDate: new Date(),
      total: total,
      itemList: arr,
    };

    axios
      .post(BASE_URL + 'addOrder', data)
      .then(resp => {
        // console.log(resp.data, 'addOrder data');
        if (resp.data) {
          setLoading(false);
          toast('Order placed successfully');
          setCart([]);
          navigation.navigate('home');
          setStore({...store, path: 'FoodCart'});
        } else {
          setLoading(false);
          toast('error in placing order');
        }
      })
      .catch(err => {
        toast('err in api');
      });
  };

  return (
    <View>
      {cart?.length > 0 && (
        <FlatList
          data={cart}
          renderItem={({item, index}) => (
            <View style={style.card}>
              <Text style={{width: 80}}>{item?.name}</Text>

              <Entypo
                onPress={() => handleQtyDec(index)}
                name="circle-with-minus"
                size={30}
                color="#87CEFA"
              />
              <Text>{item?.qty} </Text>

              <Ionicons
                onPress={() => handleQtyInc(index)}
                name="add-circle"
                size={30}
                color="#87CEFA"
              />

              <Text style={{width: 55, textAlign: 'right'}}>
                ₹ {item?.qty * item?.price}{' '}
              </Text>

              <Entypo
                onPress={() => handleClear(index)}
                name="circle-with-cross"
                size={24}
                color="black"
              />
            </View>
          )}
        />
      )}
      {cart?.length > 0 ? (
        <View style={style.footer}>
          <Button onPress={() => setCart([])}>
            <MaterialIcons
              name="remove-shopping-cart"
              size={20}
              color="black"
            />
          </Button>
          <Text>Total: ₹ {total}</Text>
          {!loading && (
            <Button
              style={{backgroundColor: '#87CEFA'}}
              onPress={() => handleSave()}
              mode="contained-tonal">
              Order
            </Button>
          )}
          {loading && <ActivityIndicator animating={true} />}
        </View>
      ) : (
        <Text style={{alignSelf: 'center'}}>Cart Empty</Text>
      )}
    </View>
  );
};

export default Cart;
