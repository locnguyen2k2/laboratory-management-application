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
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getHistory, popHistory, setHistory} from '../redux/appSlice.tsx';
import * as RootNavigation from './../helps/RootNavigation';

const Tabs = createBottomTabNavigator();

export default function BottomNavigator() {
  const dispatch = useDispatch();
  const selectHistory = useSelector(getHistory);
  const [isActive, setIsActive] = useState<any>();

  const onTabClick = (tabName: any) => {
    dispatch(setHistory({}));
    setIsActive(tabName);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      if (selectHistory.length > 0) {
        const currentTab = RootNavigation.navigationRef.getCurrentRoute()?.name;
        let tabName = '';
        let id = '';

        if (selectHistory[selectHistory.length - 1].split('-').length > 1) {
          tabName += `${selectHistory[selectHistory.length - 1].split('-')[0]}`;
          id += `${selectHistory[selectHistory.length - 1].split('-')[1]}`;
        } else {
          tabName += `${selectHistory[selectHistory.length - 1]}`;
        }

        if (currentTab !== tabName) {
          if (id.length > 0) {
            RootNavigation.navigate(`${tabName}`, {id: id});
          } else {
            RootNavigation.navigate(`${tabName}`);
          }
        }
        dispatch(popHistory());
      }
      return true;
    });
  }, [selectHistory]);

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
          name="Home"
          component={HomeScreen}
          listeners={{
            tabPress: () => onTabClick('home'),
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
            tabPress: () => onTabClick('items'),
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
          name="ItemDetail"
          component={ItemDetail}
          options={{
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="Borrowing"
          component={BorrowingScreen}
          listeners={{
            tabPress: () => onTabClick('borrowing'),
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
            tabPress: () => onTabClick('borrows'),
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
            tabPress: () => onTabClick('profile'),
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
