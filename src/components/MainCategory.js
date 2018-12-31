import { createMaterialTopTabNavigator } from "react-navigation";
import MenCategory from './MenCategory';
import LadiesCategory from './LadiesCategory';


const MainCategory = createMaterialTopTabNavigator({
  Men: { screen: MenCategory },
  Ladies: { screen: LadiesCategory },
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

export default MainCategory;