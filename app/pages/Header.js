import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {Appbar, Dialog, Portal, Headline} from 'react-native-paper';
import {Button, Menu} from 'react-native-paper';
import style from '../style';
import {AuthContext} from '../AuthContext';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleProfile = () => {
    if (store.user) {
      showDialog();
    } else {
      navigation.navigate('login');
    }
  };

  const handleLogout = () => {
    setStore({});
    hideDialog();
    navigation.navigate('home');
  };

  return (
    <>
      <Appbar.Header style={style.navbar}>
      <Appbar.Content title={store?.path ? store.path : "FoodCart"} />

        <Button onPress={() => handleProfile()}>
          {store.user ? (
            store?.user?.name
          ) : (
            <Ionicons name="person" size={20} />
          )}
        </Button>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Logout ?</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={hideDialog}>No</Button>
              <Button onPress={handleLogout}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal> 
      </Appbar.Header>
    </>
  );
};

export default Header;
