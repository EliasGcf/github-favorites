import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Users } from './pages/Users';

const Stack = createStackNavigator();

export const Routes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'Roboto_400Regular' },
        }}
      >
        <Stack.Screen
          options={{
            title: 'Usuários',
            cardStyle: { backgroundColor: colors.background },
          }}
          name="Users"
          component={Users}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
