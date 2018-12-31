import React, { Component } from 'react';
import TabBar from 'react-native-nav-tabbar';
import Navigator from '../routes/Navigator';
import ProfileNavigator from './ProfileNavigator';
import CategoryNavigator from './CategoryNavigator';
import CartNavigator from './CartNavigator';

const homeIcon = require('../assets/logo.png')
const categoryIcon = require('../assets/grid.png')
const categoryIconActive = require('../assets/grid(1).png')
const bagIcon = require('../assets/bag.png')
const bagIconActive = require('../assets/bag(1).png')
const profileIcon = require('../assets/user.png')
const profileIconActive = require('../assets/user(1).png')

export default class TabNavigator extends Component {

    render() {
        return (
            <TabBar>
                <TabBar.Item
                    icon={homeIcon}
                    selectedIcon={homeIcon}
                    title="Home"
                >
                    <Navigator />
                </TabBar.Item>


                <TabBar.Item
                    icon={categoryIcon}
                    selectedIcon={categoryIconActive}
                    title="Category"
                >
                    <CategoryNavigator />
                </TabBar.Item>


                <TabBar.Item
                    icon={bagIcon}
                    selectedIcon={bagIconActive}
                    title="Bag"
                >
                    <CartNavigator />
                </TabBar.Item>

                <TabBar.Item
                    icon={profileIcon}
                    selectedIcon={profileIconActive}
                    title="Profile"
                >
                    <ProfileNavigator />
                </TabBar.Item>
            </TabBar>
        )
    };
}