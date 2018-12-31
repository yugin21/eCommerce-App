import { createMaterialTopTabNavigator } from "react-navigation";
import MenProducts from './MenProducts';
import LadiesProducts from './LadiesProducts';


const MainHome = createMaterialTopTabNavigator({
  Men: { screen: MenProducts },
  Ladies: { screen: LadiesProducts },
},
  {
    tabBarOptions: {
      activeTintColor: '#3478C0',

      labelStyle: {
        fontSize: 14,
        color: '#3478C0'
      },
      style: {
        backgroundColor: '#fff',
      },
    }
  });

export default MainHome;