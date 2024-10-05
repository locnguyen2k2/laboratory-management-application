import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {jwtManager} from '../../helps/jwtManager.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearUser,
  selectUser,
  setUser,
} from '../../redux/userReducer/userSlice.tsx';
import * as RootNavigation from '../../helps/RootNavigation';
import React, {useEffect, useState} from 'react';
import {IUser} from '../interfaces/User.interface.ts';
import {styles} from '../../assets/styles/styles.module.tsx';
import {LinearGradient} from 'react-native-linear-gradient';
import {
  maxWidth,
  primaryBtnHeight,
  radPrimary,
} from '../../constants/sizes.tsx';
import VerticalNav from '../../navigations/VerticalNav.tsx';
import TopNavigator from '../../navigations/TopNavigator.tsx';
import {primaryTxtColor, secondaryBgColor} from '../../constants/colors.tsx';
import Divider from '../../components/Divider.tsx';
import InputCus from '../../components/InputCus.tsx';
import {authService} from '../../services/auth.service.tsx';
import {ButtonCusPrimary} from '../../components/ButtonCus.tsx';
import * as _ from 'lodash';
import {setLoading} from '../../redux/loadingSlice.tsx';

export default function Profile() {
  const dispatch = useDispatch();
  const selectUserInfo = useSelector(selectUser);

  const [userInfo, setUserInfo] = useState<IUser>();

  const [activeTabs, setActiveTabs] = useState<[1, 2, 3, 4, 5, 6] | []>([]);

  const [updateInfo, setUpdateInfo] = useState<any>({
    firstName: '',
    lastName: '',
    address: '',
    photo: '',
  });

  const [resetPasswordInfo, setResetPasswordInfo] = useState<any>({
    oldPassword: '',
    newPassword: '',
  });

  const listItems = [
    {title: 'Cập nhật thông tin', id: 1},
    {title: 'Đổi mật khẩu', id: 2},
    {
      title: 'Nhận thông báo',
      id: 3,
    },
    {title: 'Giao diện tối', id: 4},
    {title: 'Ngôn ngữ/Languague', id: 5},
    {title: 'Thông tin ứng dụng', id: 6},
  ];

  const handleLogout = async () => {
    (await jwtManager).clear();
    dispatch(clearUser());
    RootNavigation.navigate('Login');
  };

  const onChangeActiveTab = (id: number) => {
    const index = activeTabs.findIndex(tab => tab === id);
    let newActiveTabs: any = [];
    if (index !== -1) {
      newActiveTabs = activeTabs.filter(tab => tab !== id);
    } else {
      newActiveTabs = [...activeTabs, id];
    }

    setActiveTabs(newActiveTabs);
  };

  const changeUpdateInfo = (name: string, value: string) => {
    setUpdateInfo({...updateInfo, [name]: value});
  };

  const onUpdateInfo = () => {
    dispatch(setLoading(true));
    authService
      .updateInfo({
        ...(!_.isEmpty(updateInfo.firstName) && {
          firstName: updateInfo.firstName,
        }),
        ...(!_.isEmpty(updateInfo.lastName) && {
          lastName: updateInfo.lastName,
        }),
        ...(!_.isEmpty(updateInfo.address) && {
          address: updateInfo.address,
        }),
      })
      .then((result: any) => onUpdateInfoCompleted(result))
      .catch((error: any) => {
        Alert.alert(_.isArray(error) ? error[0] : error);
        dispatch(setLoading(false));
      });
  };

  const changeResetPasswordInfo = (name: string, value: string) => {
    setResetPasswordInfo({...resetPasswordInfo, [name]: value});
  };

  const onUpdatePassword = () => {
    dispatch(setLoading(true));
    authService
      .resetPassword(resetPasswordInfo)
      .then((result: any) => onResetPassowrdCompleted(result))
      .catch((error: any) => {
        Alert.alert(_.isArray(error) ? error[0] : error);
        dispatch(setLoading(false));
      });
  };

  const onUpdateInfoCompleted = (data: any) => {
    const newUserInfo = {
      ...userInfo,
      ...(data.firstName && {firstName: data.firstName}),
      ...(data.lastName && {lastName: data.lastName}),
      ...(data.address && {address: data.address}),
    };
    setUserInfo(newUserInfo);
    dispatch(setUser({...newUserInfo, isLoggedIn: true}));
    dispatch(setLoading(false));
  };

  const onResetPassowrdCompleted = (data: any) => {
    Alert.alert('Thành công!', 'Vui lòng đăng nhập lại hệ thống!', [
      {
        text: 'Tiếp tục',
        onPress: () => handleLogout(),
      },
    ]);
    dispatch(setLoading(false));
  };

  const getDigitalNumbsForPassword = () => {
    authService
      .fotGotPassword(userInfo?.email)
      .then((result: any) => {
        if (result.code === 200) {
          Alert.alert(result.message);
        }
      })
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    setUserInfo(selectUserInfo);
    setResetPasswordInfo({oldPassword: '', newPassword: ''});
    setUpdateInfo({
      ...updateInfo,
      firstName: selectUserInfo?.firstName,
      lastName: selectUserInfo?.lastName,
      address: selectUserInfo?.address,
    });
  }, [selectUserInfo]);
  return (
    <View style={[{flex: 1}]}>
      <TopNavigator />
      <VerticalNav />
      <LinearGradient colors={['#5b74b3', '#7e91c3', '#F9F9F9']}>
        <View
          style={[
            {
              height: 160,
              width: maxWidth,
              alignItems: 'center',
            },
          ]}>
          <View
            style={[
              {
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 22,
                width: 350,
                height: 69,
                borderRadius: radPrimary,
                backgroundColor: '#FFFFFF',
              },
            ]}>
            <View
              style={[
                styles.midCenter,
                {
                  width: 55,
                  height: 55,
                  marginLeft: 10,
                  marginRight: 7,
                  borderRadius: 35,
                  backgroundColor: 'yellow',
                },
              ]}></View>
            {userInfo && (
              <>
                <View style={[{width: '67%'}]}>
                  <Text style={[styles.txtPrimaryColor]}>
                    {userInfo.firstName} {userInfo.lastName}
                  </Text>
                  <Text style={[styles.txtPrimaryColor]} numberOfLines={1}>
                    {userInfo.email}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleLogout()}
                  style={{
                    borderTopEndRadius: radPrimary,
                    borderBottomLeftRadius: radPrimary,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    padding: 5,
                    backgroundColor: secondaryBgColor,
                  }}>
                  <Text>Đăng xuất</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
      <Divider left={true} content={'Cài đặt'} />
      <FlatList
        data={[...listItems]}
        contentContainerStyle={{
          alignItems: 'center',
          height: 'auto',
          minHeight: 775 - (308 + primaryBtnHeight),
        }}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}: any) => (
          <TouchableOpacity
            onPress={() => onChangeActiveTab(item.id)}
            style={[
              styles.justMiddle,
              {
                marginVertical: 5,
                borderRadius: 8,
                paddingHorizontal: 5,
                width: maxWidth - 10,
                backgroundColor: secondaryBgColor,
              },
            ]}>
            <View>
              <Text
                style={[
                  {
                    minHeight: 48,
                    color: primaryTxtColor,
                    textAlignVertical: 'center',
                  },
                ]}>
                {item.title}
              </Text>
              {activeTabs.find(tab => tab === item.id && tab === 1) && (
                <View>
                  <View style={[styles.verMgPrimary]}>
                    <InputCus
                      placeholder="Họ và tên đệm"
                      value={updateInfo.firstName}
                      name="firstName"
                      handleValue={changeUpdateInfo}
                    />
                  </View>
                  <View style={[styles.verMgPrimary]}>
                    <InputCus
                      placeholder="Tên"
                      value={updateInfo.lastName}
                      name="lastName"
                      handleValue={changeUpdateInfo}
                    />
                  </View>
                  <View style={[styles.verMgPrimary]}>
                    <InputCus
                      placeholder="Địa chỉ"
                      value={updateInfo.address}
                      name="address"
                      handleValue={changeUpdateInfo}
                    />
                  </View>
                  <View style={[styles.verMgPrimary]}>
                    <InputCus
                      placeholder="Ảnh đại diện"
                      value={updateInfo.photo}
                      name="photo"
                      handleValue={changeUpdateInfo}
                    />
                  </View>
                  <View
                    style={[
                      styles.verMgPrimary,
                      {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      },
                    ]}>
                    <ButtonCusPrimary
                      style={{
                        width: 100,
                        height: 'auto',
                        padding: 6,
                        color: primaryTxtColor,
                        borderColor: primaryTxtColor, // backgroundColor: primaryBgColor,
                      }}
                      title="Cập nhật"
                      onPress={onUpdateInfo}
                    />
                    <ButtonCusPrimary
                      style={{
                        width: 100,
                        height: 'auto',
                        padding: 6,
                        color: 'red',
                        borderColor: 'red', // backgroundColor: primaryBgColor,
                      }}
                      title="Đóng"
                      onPress={() => onChangeActiveTab(item.id)}
                    />
                  </View>
                </View>
              )}
              {activeTabs.find(tab => tab === item.id && tab === 2) && (
                <View>
                  <View style={[styles.verMgPrimary]}>
                    <InputCus
                      hidden={true}
                      placeholder="Mật khẩu hiện tại"
                      value={resetPasswordInfo.oldPassword}
                      name="oldPassword"
                      handleValue={changeResetPasswordInfo}
                    />
                  </View>
                  <View style={[styles.verMgPrimary]}>
                    <InputCus
                      hidden={true}
                      placeholder="Mật khẩu mới"
                      value={resetPasswordInfo.newPassword}
                      name="newPassword"
                      handleValue={changeResetPasswordInfo}
                    />
                  </View>
                  <View
                    style={[
                      styles.verMgPrimary,
                      {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      },
                    ]}>
                    <ButtonCusPrimary
                      style={{
                        width: 100,
                        height: 'auto',
                        padding: 6,
                        color: primaryTxtColor,
                        borderColor: primaryTxtColor, // backgroundColor: primaryBgColor,
                      }}
                      title="Cập nhật"
                      onPress={onUpdatePassword}
                    />
                    <ButtonCusPrimary
                      style={{
                        width: 100,
                        height: 'auto',
                        padding: 6,
                        color: 'red',
                        borderColor: 'red', // backgroundColor: primaryBgColor,
                      }}
                      title="Đóng"
                      onPress={() => onChangeActiveTab(item.id)}
                    />
                  </View>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
