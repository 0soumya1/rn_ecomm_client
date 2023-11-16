import React, {useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContext} from './app/AuthContext';
import Routes from './app/routes';

export default function App() {
  const [store, setStore] = useState({});
  const [cart, setCart] = useState({});

  return (
    <>
      <AuthContext.Provider value={{store, setStore, cart, setCart}}>
        <SafeAreaProvider>
          <PaperProvider>
            <Routes />
          </PaperProvider>
        </SafeAreaProvider>
      </AuthContext.Provider>
    </>
  );
}
