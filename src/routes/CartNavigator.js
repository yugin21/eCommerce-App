import { createStackNavigator } from 'react-navigation';
import MainHome from '../components/MainHome';
import Cart from '../components/Cart';
import MainShipping from '../components/MainShipping';
import Order from '../components/Order';
import Invoice from '../components/Invoice';
import TransferConfirm from '../components/TransferConfirm';

export default Navigator = createStackNavigator({
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
    MainHome: {
        screen: MainHome,
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
    }
})