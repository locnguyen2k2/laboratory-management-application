import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import BottomNav from './src/navigations/Tabs';
import axiosConfig from './src/helps/axiosConfig';
import {Provider} from 'react-redux';
import {stores} from './src/redux/stores';
import {Loading} from './src/components/Loading';
import {SafeAreaView} from 'react-native-safe-area-context';
import {primaryBgColor} from './src/constants/colors.tsx';

axiosConfig();
export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor(primaryBgColor);
    StatusBar.setTranslucent(true);
  }, []);
  return (
    <Provider store={stores}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <BottomNav />
          <Loading />
        </View>
      </SafeAreaView>
    </Provider>
  );
}
