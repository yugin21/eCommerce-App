import React, { Component } from 'react';
import { Image, } from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import Shipping from './Shipping';
import Review from './Review';

const firstIcon = <Image source={require('../assets/first.png')} style={{ width: 17, height: 17 }} />
const secondIcon = <Image source={require('../assets/second.png')} style={{ width: 17, height: 17 }} />

const MainShipping = createMaterialTopTabNavigator({
  Shipping: {
    screen: Shipping,
    navigationOptions: {
      tabBarIcon: firstIcon
    }
  },
  Review: {
    screen: Review,
    navigationOptions: {
      tabBarIcon: secondIcon
    }
  },
},
  {
    tabBarOptions: {
      activeTintColor: '#3478C0',
      showIcon: true,

      iconStyle: {
        activeTintColor: '#3478C0'
      },

      labelStyle: {
        fontSize: 14,
        color: '#3478C0'
      },
      style: {
        backgroundColor: '#fff',
      },
    }
  });

export default MainShipping;