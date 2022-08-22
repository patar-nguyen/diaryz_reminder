import React, {useState, useContext, createContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Display from './src/screens/Display';
import Create from './src/screens/Create';

const Stack = createNativeStackNavigator();

export const stackContext = createContext();
export const addStackContext = createContext();
export const completeStackContext = createContext();

const App = () => {

  const [stack, setStack] = useState([]);

  const completeStack = (index) => {
    setStack(prev => {
      let current = [...prev];
      current[index].completed = !current[index].completed
      return current;
    })
  }
  
  const addStack = (param) => {
    setStack([...stack, param]);
  }
  
  return (
    <stackContext.Provider value={stack}>
      <addStackContext.Provider value={addStack}>
        <completeStackContext.Provider value={completeStack}>
          <SafeAreaView style={styles.root}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Display" component={Display} />
                <Stack.Screen name="Create" component={Create} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView> 
        </completeStackContext.Provider>
    </addStackContext.Provider>
    </stackContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default App;
