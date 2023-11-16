import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Header from './pages/Header';
import Footer from './pages/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

const stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Header />
        <stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="home">
          <stack.Screen name="home" component={Home} />
          <stack.Screen name="signup" component={SignUp} />
          <stack.Screen name="login" component={Login} />
          <stack.Screen name="cart" component={Cart} />
          <stack.Screen name="orders" component={Orders} />
        </stack.Navigator>
        <Footer />
      </NavigationContainer>
    </>
  );
};

export default Routes;
