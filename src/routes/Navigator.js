import { createStackNavigator } from 'react-navigation';
import Authentication from '../components/Authentication';
import Authorization from '../components/Authorization';
import MainHome from '../components/MainHome';
import Profile from '../components/Profile';
import Order from '../components/Order';
import Cart from '../components/Cart';
import MainShipping from '../components/MainShipping';
import Invoice from '../components/Invoice';
import TransferConfirm from '../components/TransferConfirm';

export default Navigator = createStackNavigator({
    MainHome: {
        screen: MainHome,
        navigationOptions: {
            header: null
        }
    },
    Authorization: {
        screen: Authorization,
        navigationOptions: {
            header: null
        }
    },
    Authentication: {
        screen: Authentication,
        navigationOptions: {
            header: null
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    Order: {
        screen: Order,
        navigationOptions: {
            header: null
        }
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
            header: null
        }
    },
    MainShipping: {
        screen: MainShipping,
        navigationOptions: {
            header: null
        }
    },
    Invoice: {
        screen: Invoice,
        navigationOptions: {
            header: null
        }
    },
    TransferConfirm: {
        screen: TransferConfirm,
        navigationOptions: {
            header: null
        }
    },
})