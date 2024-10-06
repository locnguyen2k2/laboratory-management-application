import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputCus from '../../components/InputCus.tsx';
import {ButtonCusPrimary} from '../../components/ButtonCus.tsx';
import {authService} from '../../services/auth.service.tsx';
import {useEffect, useState} from 'react';
import * as RootNavigation from '../../helps/RootNavigation';
import {CtuetLogo, LabBackground} from '../../constants/images.tsx';
import {styles} from '../../assets/styles/styles.module.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/loadingSlice.tsx';
import {maxHeight, maxWidth} from '../../constants/sizes.tsx';
import * as _ from 'lodash';
import {primaryTxtColor, secondaryBgColor} from '../../constants/colors.tsx';
import {ItemStyle} from '../../assets/styles/ItemStyle.module.tsx';
import {getFormSignup} from '../../redux/appSlice.tsx';

export const studentEmailReg = /^[a-zA-Z0-9._%+-]+@student\.ctuet\.edu\.vn$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

interface IRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const formError = useSelector(getFormSignup);

  const [registerInfo, setRegisterInfo] = useState<IRegister>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });
  const handleRegister = async () => {
    if (
      _.isEmpty(registerInfo.email.trim()) ||
      _.isEmpty(registerInfo.password.trim()) ||
      _.isEmpty(registerInfo.confirmPassword.trim()) ||
      _.isEmpty(registerInfo.firstName.trim()) ||
      _.isEmpty(registerInfo.lastName.trim())
    ) {
      Alert.alert('Vui lòng nhập đủ thông tin theo yêu cầu!');
    } else if (registerInfo.confirmPassword !== registerInfo.password) {
      Alert.alert('Nhập lại mật khẩu không hợp lệ!');
    } else {
      dispatch(setLoading(true));
      await authService
        .registration({
          email: registerInfo.email,
          firstName: registerInfo.firstName,
          lastName: registerInfo.lastName,
          password: registerInfo.password,
        })
        .then(async (res: any) => {
          Alert.alert('Đăng ký thành công! Mã xác thực đã được gửi qua email');
          dispatch(setLoading(false));
          RootNavigation.navigate('Home');
        })
        .catch((error: any) => {
          Alert.alert(_.isArray(error) ? error[0] : error);
          dispatch(setLoading(false));
        });
    }
  };
  const handleRegisterInfo = (name: string, value: string) => {
    setRegisterInfo({...registerInfo, [name]: value});
  };

  useEffect(() => {}, [formError]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.txtCen,
        {height: maxHeight, width: maxWidth},
      ]}>
      <LabBackground
        style={[
          {
            backgroundColor: 'rgba(211,202,202,0.43)',
            opacity: 0.67,
          },
          styles.backgroundImg,
        ]}
      />
      {/* Logo */}
      <View style={[styles.midCenter, {flexDirection: 'row', marginTop: 100}]}>
        <Image
          source={CtuetLogo}
          style={{width: 76, height: 76, marginRight: 5}}
        />
        <View
          style={{
            alignItems: 'center',
            borderLeftWidth: 2,
            borderLeftColor: 'black',
            padding: 8,
          }}>
          <Text style={[styles.txtPrimaryColor]}>
            Tham gia ngay với chúng tôi!
          </Text>
          <Text style={[styles.txtPrimaryColor]}>
            Đăng ký theo các bước bên dưới
          </Text>
        </View>
      </View>
      <View style={[styles.verMgPrimary]}>
        {/* Form */}
        <>
          <View style={[styles.verMgPrimary]}>
            <InputCus
              formName={'formSignup'}
              isRequired={true}
              style={{margin: 12}}
              hidden={false}
              placeholder="Họ và tên đệm"
              value={registerInfo.firstName}
              name="firstName"
              handleValue={handleRegisterInfo}
            />
          </View>
          <View style={[styles.verMgPrimary]}>
            <InputCus
              formName={'formSignup'}
              style={{margin: 12}}
              isRequired={true}
              hidden={false}
              placeholder="Tên"
              value={registerInfo.lastName}
              name="lastName"
              handleValue={handleRegisterInfo}
            />
          </View>
          <View style={[styles.verMgPrimary]}>
            <InputCus
              formName={'formSignup'}
              isEmail={true}
              isRequired={true}
              minLength={23}
              maxLength={320}
              message={'Vui lòng nhập email hợp lệ (@student.ctuet.edu.vn)!'}
              style={{margin: 12}}
              hidden={false}
              placeholder="Email"
              value={registerInfo.email}
              name="email"
              handleValue={handleRegisterInfo}
            />
          </View>
          <View style={[styles.verMgPrimary]}>
            <InputCus
              formName={'formSignup'}
              hidden={true}
              isRequired={true}
              isPassword={true}
              minLength={6}
              maxLength={16}
              placeholder="Mật khẩu"
              value={registerInfo.password}
              name="password"
              handleValue={handleRegisterInfo}
            />
          </View>
          <View style={[styles.verMgPrimary]}>
            <InputCus
              formName={'formSignup'}
              style={{margin: 12}}
              hidden={true}
              minLength={6}
              maxLength={16}
              isPassword={true}
              isRequired={true}
              placeholder="Nhập lại mật khẩu"
              value={registerInfo.confirmPassword}
              name="confirmPassword"
              handleValue={handleRegisterInfo}
            />
          </View>
          <View style={[styles.verMgPrimary]}>
            <View style={[ItemStyle.blockContent]}>
              <Text style={[styles.txtPrimaryColor]}>Quay lại trang </Text>
              <TouchableOpacity
                onPress={() => RootNavigation.navigate('Login')}>
                <Text
                  style={[
                    styles.txtPrimaryColor,
                    {textDecorationLine: 'underline'},
                  ]}>
                  đăng nhập?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.verMgPrimary]}>
            <ButtonCusPrimary
              style={{
                borderWidth: 0,
                color: primaryTxtColor,
                backgroundColor: secondaryBgColor,
              }}
              disabled={formError}
              title="Đăng ký"
              onPress={handleRegister}
            />
          </View>
        </>
      </View>
    </ScrollView>
  );
}
