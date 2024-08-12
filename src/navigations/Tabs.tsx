import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../helps/RootNavigation";
import { BorrowingScreen, HomeScreen, LoginScreen, ProfileScreen, RegisterScreen, BorrowedScreen, ItemScreen } from "../screens";
import SplashScreen from "../screens/Splash.screen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFileWaveform, faFlaskVial, faHouseChimneyMedical, faUser, faList } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from "react-native";
const Tabs = createBottomTabNavigator();

export default function BottomNav() {
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
                    }
                }}
            >
                <Tabs.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        tabBarButton: () => null,
                        tabBarStyle: {
                            display: "none"
                        }
                    }}
                />
                <Tabs.Screen
                    name="Registration"
                    component={RegisterScreen}
                    options={{
                        tabBarButton: () => null,
                        tabBarStyle: {
                            display: "none"
                        }
                    }}
                />
                <Tabs.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{
                        tabBarButton: () => null,
                        tabBarStyle: {
                            display: "none"
                        }
                    }}
                />
                <Tabs.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: () => (<FontAwesomeIcon color="white" size={34} icon={faHouseChimneyMedical} />)
                    }}
                />
                <Tabs.Screen
                    name="Items"
                    component={ItemScreen}
                    options={{
                        tabBarIcon: () => (<FontAwesomeIcon color="white" size={34} icon={faFlaskVial} />)
                    }}
                />
                <Tabs.Screen
                    name="Borrowing"
                    component={BorrowingScreen}
                    options={{
                        tabBarIcon: () => (<FontAwesomeIcon color="white" size={34} icon={faFileWaveform} />)
                    }}
                />
                <Tabs.Screen
                    name="Borrows"
                    component={BorrowedScreen}
                    options={{
                        tabBarIcon: () => (<FontAwesomeIcon color="white" size={34} icon={faList} />)
                    }}
                />
                <Tabs.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: () => (<FontAwesomeIcon color="white" size={34} icon={faUser} />)
                    }}
                />
            </Tabs.Navigator>
        </NavigationContainer>

    )
}