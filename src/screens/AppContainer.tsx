import { PescaTabBar } from '@moneyboy/components/general/navigation/PescaTabBar';
import { SettingsPanel } from '@moneyboy/components/settings/SettingsPanel';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { useSettings } from '@moneyboy/hooks/useSettings';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { LoginView } from '@moneyboy/screens/auth/Login';
import { RegisterView } from '@moneyboy/screens/auth/Register';
import { EventView } from '@moneyboy/screens/Events';
import { GroupView } from '@moneyboy/screens/Groups';
import { HistoryView } from '@moneyboy/screens/History';
import { MainView } from '@moneyboy/screens/Main';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

const Tab = createBottomTabNavigator();

type AppContainerProps = unknown;

/**
 * Container for the app and the navigation.
 */
export const AppContainer: React.FC<AppContainerProps> = () => {
  const { loggedIn, ready } = useAuth();
  const { theme } = useSettings();
  const systemTheme = useColorScheme();

  const { Content } = useStyle();
  const styles = StyleSheet.create({
    outterContainer: {
      flex: 1,
      backgroundColor: Content.background.bg0,
    },
    sceneContainer: {
      backgroundColor: 'transparent',
    },
  });

  return (
    <>
      <StatusBar barStyle={(theme ?? systemTheme) === 'light' ? 'dark-content' : 'light-content'} />
      <View style={[styles.outterContainer]}>
        <NavigationContainer>
          {ready && (
            <Tab.Navigator
              detachInactiveScreens={false}
              tabBar={props => loggedIn && <PescaTabBar {...props} />}
              screenOptions={{
                headerShown: false,
              }}
              sceneContainerStyle={[styles.sceneContainer]}>
              {loggedIn ? (
                <>
                  <Tab.Screen name="Overview" component={MainView} initialParams={{ icon: 'home-outline' }} />
                  <Tab.Screen
                    name="Groups"
                    component={GroupView}
                    initialParams={{ icon: 'account-multiple-outline' }}
                  />
                  <Tab.Screen
                    name="Events"
                    component={EventView}
                    initialParams={{ icon: 'calendar-multiple', disabled: true }}
                  />
                  <Tab.Screen name="History" component={HistoryView} initialParams={{ icon: 'history' }} />
                </>
              ) : (
                <>
                  <Tab.Screen name="login" component={LoginView} />
                  <Tab.Screen name="register" component={RegisterView} />
                </>
              )}
            </Tab.Navigator>
          )}
        </NavigationContainer>
        <SettingsPanel />
      </View>
    </>
  );
};
