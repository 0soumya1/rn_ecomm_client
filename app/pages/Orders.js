import {View, Text, FlatList, ToastAndroid} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Dialog, Portal} from 'react-native-paper';
import axios from 'axios';
import {BASE_URL} from '../Const';
import style from '../style';
import {AuthContext} from '../AuthContext';

const Orders = () => {
  const {store, setStore} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [info, setInfo] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if (store?.user?._id) {
      axios
        .get(BASE_URL + 'userOrders/' + store?.user?._id)
        .then(resp => {
          // console.log(resp.data, 'userorder resp.data');
          setOrders(resp?.data);
        })
        .catch(err => {
          toast('err in api');
        });
    }
  }, []);
  return (
    <View>
      {/* {console.log(items, 'items')} */}
     
      <FlatList
        data={orders}
        renderItem={({item}) => (
          <View style={style.card}>
            <Button
              onPress={() => {
                setInfo(true);
                setItems(item?.itemList);
              }}>
              <Text>{item?.orderId}</Text>
            </Button>
            <Text>{item?.orderDate.substring(0, 10)}</Text>
            <Text style={{width: 60}}>₹ {item?.total}</Text>
          </View>
        )}
      />
      <Portal>
        <Dialog
          visible={info}
          onDismiss={() => {
            setInfo(false);
            setItems([]);
          }}>
          <Dialog.Title>Items:</Dialog.Title>
          <Dialog.Content>
            <FlatList
              data={items}
              renderItem={({item}) => (
                <View style={style.row}>
                  <Text>{item?.orderQty} x {item?.name}</Text>
                  <Text>₹ {item?.finalPrice}</Text>
                </View>
              )}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Orders;
