import React from 'react';
import {
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from './../helps/RootNavigation';
import {FadeInView} from './../assets/styles/FadeView';
import {selectVerticalNav, setVerticalNav} from '../redux/verticalNavSlice';
import {jwtManager} from '../helps/jwtManager';
import {clearUser} from '../redux/userReducer/userSlice';
import {styles} from '../assets/styles/styles.module';
import {primaryBgColor, primaryTxtColor} from '../constants/colors';
import {CloseSolid, FormRegular, HomeRegular, UserRegular} from '../constants/icons.tsx';
import {setHistory} from '../redux/appSlice.tsx';
import Divider from '../components/Divider.tsx';

export default function VerticalNav() {
  const verticalNav = useSelector(selectVerticalNav);
  const dispatch = useDispatch();

  const ListItems = [
    {
      title: 'Trang chủ',
      tab: 'Home',
      icon: <HomeRegular width={32} height={28} />,
    },
    {
      title: 'Tài khoản',
      tab: 'Profile',
      icon: <UserRegular width={32} height={28} />,
    },
    {
      title: 'Danh sách phiếu',
      tab: 'Borrows',
      icon: <FormRegular width={32} height={28} />,
    },
    {
      title: 'Danh sách phòng',
      tab: 'Rooms',
      icon: <UserRegular width={32} height={28} />,
    },
    {
      title: 'Đăng xuất',
      tab: 'Logout',
      icon: <UserRegular width={32} height={28} />,
    },
  ];

  const onClickNav = (tab: any) => {
    dispatch(setHistory({})) &&
      dispatch(setVerticalNav(!verticalNav)) &&
      navigate(`${tab}`);
  };

  const handleLoggout = async () => {
    (await jwtManager).clear();
    dispatch(clearUser());
    dispatch(setVerticalNav(!verticalNav));
    navigate('Login');
  };

  return (
    <>
      {verticalNav && (
        <TouchableOpacity
          style={[styles.modelForm, {alignItems: 'flex-end'}]}
          onPress={() => {
            dispatch(setVerticalNav(!verticalNav));
          }}>
          <TouchableHighlight>
            <FadeInView style={styles.nav}>
              <FlatList
                data={[...ListItems]}
                style={{bottom: 40, marginTop: 100}}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item}: any) => (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        item.tab === 'Logout'
                          ? handleLoggout()
                          : onClickNav(item.tab)
                      }>
                      <View style={[styles.navItem]}>
                        <View
                          style={{
                            backgroundColor: primaryTxtColor,
                            borderRadius: 5,
                            marginRight: 5,
                          }}>
                          {item.icon}
                        </View>
                        <Text style={[styles.txtSecondaryColor]}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Divider color={primaryTxtColor} />
                  </>
                )}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  marginTop: 10,
                  marginLeft: 5,
                  marginHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={[
                    {
                      borderRadius: 8,
                      backgroundColor: `${primaryBgColor}`,
                    },
                    styles.midCenter,
                  ]}
                  onPress={() => {
                    dispatch(setHistory({}));
                    dispatch(setVerticalNav(!verticalNav));
                  }}>
                  <CloseSolid width={37} height={37} />
                </TouchableOpacity>
              </View>
            </FadeInView>
          </TouchableHighlight>
        </TouchableOpacity>
      )}
    </>
  );
}
