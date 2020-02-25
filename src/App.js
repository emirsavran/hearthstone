import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Mechanics from './screens/Mechanics';
import Cards from './screens/Cards';

const {Navigator, Screen} = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Mechanics" component={Mechanics} />
        <Screen
          name="Cards"
          component={Cards}
          options={({route}) => ({title: route.params.name})}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
