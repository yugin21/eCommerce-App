import { createStackNavigator } from 'react-navigation';
import Authentication from '../components/Authentication';
import Authorization from '../components/Authorization';
import MainHome from '../components/MainHome';
import Profile from '../components/Profile';
import Order from '../components/Order';
import ChangePassword from '../components/ChangePassword';
import Invoice from '../components/Invoice';
import TransferConfirm from '../components/TransferConfirm';
import WaitingPayment from '../components/WaitingPayment';
import WaitingConfirm from '../components/WaitingConfirm';
import EditProfile from '../components/EditProfile';
import OrderOnProcess from '../components/OrderOnProcess';
import OrderOnShipping from '../components/OrderOnShipping';
import OrderReceived from '../components/OrderReceived';
import Upload from '../components/Upload';

export default Navigator = createStackNavigator({
    Profile: {
        screen: Profile,
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
    Order: {
        screen: Order,
        navigationOptions: {
            header: null
        }
    },
    ChangePassword: {
        screen: ChangePassword,
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
    WaitingPayment: {
        screen: WaitingPayment,
        navigationOptions: {
            header: null
        }
    },
    WaitingConfirm: {
        screen: WaitingConfirm,
        navigationOptions: {
            header: null
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null
        }
    },
    OrderOnProcess: {
        screen: OrderOnProcess,
        navigationOptions: {
            header: null
        }
    },
    OrderOnShipping: {
        screen: OrderOnShipping,
        navigationOptions: {
            header: null
        }
    },
    OrderReceived: {
        screen: OrderReceived,
        navigationOptions: {
            header: null
        }
    },
    Upload: {
        screen: Upload,
        navigationOptions: {
            header: null
        }
    }
})