import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../helps/RootNavigation';
import {
  BorrowedScreen,
  BorrowingScreen,
  HomeScreen,
  ItemDetail,
  ListItem,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
} from '../screens';
import SplashScreen from '../screens/Splash.screen';
import {
  CameraRegular,
  CameraSolid,
  FlaskRegular,
  FlaskSolid,
  HomeRegular,
  HomeSolid,
  UserRegular,
  UserSolid,
} from '../constants/icons.tsx';
import {useState} from 'react';

const Tabs = createBottomTabNavigator();

export default function BottomNavigator() {
  const [isActive, setIsActive] = useState<any>('home');

  return (
    <NavigationContainer ref={navigationRef}>
      <Tabs.Navigator
        initialRouteName="Splash"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 48,
            position: 'relative',
            backgroundColor: '#8fa0cb',
          },
        }}>
        <Tabs.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="Signup"
          component={RegisterScreen}
          options={{
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="ItemDetail"
          component={ItemDetail}
          options={{
            tabBarButton: () => null,
            // tabBarStyle: {
            //   display: 'none',
            // },
          }}
        />
        <Tabs.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          listeners={{
            tabPress: () => setIsActive('home'),
          }}
          options={{
            tabBarIcon: () =>
              isActive === 'home' ? (
                <HomeSolid width={34} />
              ) : (
                <HomeRegular width={34} />
              ),
          }}
        />
        <Tabs.Screen
          name="Items"
          component={ListItem}
          listeners={{
            tabPress: () => setIsActive('items'),
          }}
          options={{
            tabBarIcon: () =>
              isActive === 'items' ? (
                <FlaskSolid width={34} />
              ) : (
                <FlaskRegular width={34} />
              ),
          }}
        />
        <Tabs.Screen
          name="Borrowing"
          component={BorrowingScreen}
          listeners={{
            tabPress: () => setIsActive('borrowing'),
          }}
          options={{
            tabBarIcon: () =>
              isActive === 'borrowing' ? (
                <CameraSolid width={34} />
              ) : (
                <CameraRegular width={34} />
              ),
          }}
        />
        <Tabs.Screen
          name="Borrows"
          component={BorrowedScreen}
          listeners={{
            tabPress: () => setIsActive('borrows'),
          }}
          options={{
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={{
            tabPress: () => setIsActive('profile'),
          }}
          options={{
            tabBarIcon: () =>
              isActive === 'profile' ? (
                <UserSolid width={34} />
              ) : (
                <UserRegular width={34} />
              ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
