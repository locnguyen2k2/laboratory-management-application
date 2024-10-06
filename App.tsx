import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import BottomNavigator from './src/navigations/BottomNavigator.tsx';
import axiosConfig from './src/helps/axiosConfig';
import {Provider} from 'react-redux';
import {stores} from './src/redux/stores';
import {Loading} from './src/components/Loading';
import {SafeAreaView} from 'react-native-safe-area-context';

axiosConfig();
export default function App() {
  useEffect(() => {
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <Provider store={stores}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <BottomNavigator />
          <Loading />
        </View>
      </SafeAreaView>
    </Provider>
  );
}
