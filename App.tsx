import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import BottomNav from "./src/navigations/Tabs";
import axiosConfig from "./src/helps/axiosConfig";
import { Provider } from "react-redux";
import { stores } from "./src/redux/stores";
import { Loading } from "./src/components/Loading";

axiosConfig()
export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor('#FF573300');
    StatusBar.setTranslucent(true)
  },)
  return (
    <Provider store={stores}>
      <SafeAreaView style={{ flex: 1 }} >
        <BottomNav />
        <Loading />
      </SafeAreaView>
    </Provider >
  )
}