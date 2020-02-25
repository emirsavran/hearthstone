import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Mechanics from './screens/Mechanics';

const {Navigator, Screen} = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Mechanics" component={Mechanics} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
