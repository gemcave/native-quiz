import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Quiz from './screens/Quiz';
import QuizIndex from './screens/QuizIndex';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="QuizIndex"
        screenOptions={{ title: 'Quiz' }}
      >
        <Stack.Screen name="QuizIndex" component={QuizIndex} />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={({ route }) => ({
            title: route.params.title,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: route.params.color,
              borderBottomColor: route.params.color,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
