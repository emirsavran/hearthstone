import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Mechanics from './screens/Mechanics';
import Cards from './screens/Cards';
import Search from './screens/Search';

import SearchButton from './components/SearchButton';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={({navigation}) => ({
        headerRight: () => <SearchButton navigation={navigation} />,
      })}>
      <MainStack.Screen name="Mechanics" component={Mechanics} />
      <MainStack.Screen
        name="Cards"
        component={Cards}
        options={({route}) => ({title: route.params.name})}
      />
    </MainStack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="Search" component={Search} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
