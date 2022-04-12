/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomeScreen from './source/screens/HomeScreen'
import PartyMemberScreen from './source/screens/PartyMemberScreen'
import TimeMangerScreen from './source/screens/TimeManagerScreen'
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PartyMemberLockScreen from './source/screens/PartyMemberLockScreen';
import CombatCardsScreen from './source/screens/CombatCardsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeManagerScreen from './source/screens/TimeManagerScreen';
import EventDetailScreen from './source/screens/EventDetailScreen';
import { Provider } from 'react-redux';
import configureStore from './source/store/configStore';
const store = configureStore()
const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='PartyMember' component={PartyMemberScreen} />
          <Stack.Screen name='TimeManager' component={TimeManagerScreen} />
          <Stack.Screen name='CombatCard' component={CombatCardsScreen} />
          <Stack.Screen name='EventDetail' component={EventDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
