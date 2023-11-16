import {View, Text, FlatList, ToastAndroid} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {Searchbar, ActivityIndicator, Button} from 'react-native-paper';
import axios from 'axios';
import {BASE_URL} from '../Const';
import style from '../style';
import {AuthContext} from '../AuthContext';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [itemList, setItemList] = useState([]);
  const [itemList2, setItemList2] = useState([]);

  const {store, setStore} = useContext(AuthContext);
  const {cart, setCart} = useContext(AuthContext);
  const navigation = useNavigation();

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  let url = BASE_URL + 'items';

  useEffect(() => {
    handleGetItems();
  }, []);

  useEffect(() => {
    console.log(cart, 'cart');
  }, [cart]);

  const handleGetItems = () => {
    // console.log(url, "url")
    axios
      .get(url)
      .then(resp => {
        // console.log(resp.data, 'resp.data');
        setItemList(resp.data);
        setItemList2(resp.data);
      })
      .catch(err => {
        toast('err in api');
      });
  };

  const handleAddToCart = item => {
    // console.log(item, 'item');
    if (store.user) {
      item.qty = 1;
      item.amount = item.price;
      setCart([item]);
      if (cart.length == 0) {
        setCart([item]);
      } else {
        let exist = cart.some(a => a._id == item._id);
        // console.log(exist, 'exist');
        if (!exist) {
          setCart([...cart, item]);
        }
      }
    } else {
      navigation.navigate('login');
    }
  };

  const handleSearch = key => {
    let search = key.toLowerCase();
    let result = itemList2.filter(a => {
      return (
        a?.name?.toLowerCase().match(search) ||
        a?.price?.toString().match(search)
      );
    });
    setItemList(result);
  };

  return (
    <View>
      <>
        {/* {console.log(itemList, 'itemlist')} */}

        <View style={style.searchBar}>
          <Searchbar placeholder="Search" onChangeText={e => handleSearch(e)} />
        </View>

        {itemList.length > 0 ? (
          <FlatList
            data={itemList}
            renderItem={({item}) => (
              <View style={style.card}>
                <Text style={{width: 70}}>{item?.name}</Text>
                <Text style={{width: 40}}>₹ {item?.price}</Text>
                <Button
                  style={{backgroundColor:"#87CEFA"}}
                  mode="contained-tonal"
                  onPress={() => handleAddToCart(item)}>
                  Add
                </Button>
              </View>
            )}
          />
        ) : (
          <ActivityIndicator animating={true} />
        )}
      </>
    </View>
  );
};

export default Home;
