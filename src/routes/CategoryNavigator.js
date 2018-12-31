import { createStackNavigator } from 'react-navigation';
import Authorization from '../components/Authorization';
import MainHome from '../components/MainHome';
import MenCategory from '../components/MenCategory';
import LadiesCategory from '../components/LadiesCategory';
import MainCategory from '../components/MainCategory';
import MenSubCategory from '../components/MenSubCategory';
import LadiesSubCategory from '../components/LadiesSubCategory';
import Order from '../components/Order';
import Cart from '../components/Cart';
import MainShipping from '../components/MainShipping';
import Invoice from '../components/Invoice';
import TransferConfirm from '../components/TransferConfirm';

export default Navigator = createStackNavigator({
    MainCategory: {
        screen: MainCategory,
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
    MenCategory: {
        screen: MenCategory,
        navigationOptions: {
            header: null
        }
    },
    MenSubCategory: {
        screen: MenSubCategory,
        navigationOptions: {
            header: null
        }
    },
    LadiesCategory: {
        screen: LadiesCategory,
        navigationOptions: {
            header: null
        }
    },
    LadiesSubCategory: {
        screen: LadiesSubCategory,
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
    Authorization: {
        screen: Authorization,
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
    }

})