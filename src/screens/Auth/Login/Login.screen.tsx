import {Alert, Image, ScrollView, Text, View} from 'react-native';
import InputCus from '../../../components/InputCus.tsx';
import {ButtonCusPrimary} from '../../../components/ButtonCus.tsx';
import {authService} from '../../../services/auth.service.tsx';
import {useEffect, useState} from 'react';
import {ILogin} from '../../interfaces/Login.interface.ts';
import {jwtManager} from '../../../helps/jwtManager.tsx';
import * as RootNavigation from '../../../helps/RootNavigation';
import {CtuetLogo, LabBackground} from '../../../constants/images.tsx';
import {GoogleSolid} from '../../../constants/icons.tsx';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {styles} from '../../../assets/styles/styles.module.tsx';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../../redux/loadingSlice.tsx';
import {maxHeight, maxWidth} from '../../../constants/sizes.tsx';

export default function LoginScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      webClientId:
        '32122222188-516p9bu5vs0q3qvg5hn1rj95vjv853du.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  const [loginInfo, setLoginInfo] = useState<ILogin>({email: '', password: ''});
  const handleLogin = async () => {
    dispatch(setLoading(true));
    await authService
      .login({email: loginInfo.email, password: loginInfo.password})
      .then(async (res: any) => {
        (await jwtManager).set(res.access_token);
        Alert.alert('Login successful');
        dispatch(setLoading(false));
        RootNavigation.navigate('Home');
      })
      .catch((error: any) => {
        dispatch(setLoading(false));
        Alert.alert(error.isString ? error : error[0]);
      });
  };
  const handleLoginWithGoogle = async () => {
    dispatch(setLoading(true));
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const accessToken = (await GoogleSignin.getTokens()).accessToken;

      await authService
        .loginWithGoogle({
          email: userInfo.user.email,
          firstName: `${userInfo.user.familyName}`,
          lastName: `${userInfo.user.givenName}`,
          photo: `${userInfo.user.photo}`,
          accessToken: `${accessToken}`,
        })
        .then(async (res: any) => {
          await (await jwtManager).set(res.access_token);
          dispatch(setLoading(false));
          Alert.alert('Login successful');
          RootNavigation.navigate('Home');
        })
        .catch((error: any) => {
          dispatch(setLoading(false));
          Alert.alert(error);
        });
    } catch (error: any) {
      dispatch(setLoading(false));
      Alert.alert(error?.message);
    }
  };
  const handleUserInfo = (name: string, value: string) => {
    setLoginInfo({...loginInfo, [name]: value});
  };
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
      <View style={[styles.justMiddle, {flexDirection: 'row', marginTop: 100}]}>
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
          <Text style={[styles.txtPrimaryColor]}>Welcome Back</Text>
          <Text style={[styles.txtPrimaryColor]}>
            Ctuet's labs management system
          </Text>
        </View>
      </View>
      <View style={[styles.verMgPrimary]}>
        {/* Form */}
        <>
          <View style={[styles.verMgPrimary]}>
            <InputCus
              style={{margin: 12}}
              hidden={false}
              placeholder="Email"
              value={loginInfo.email}
              name="email"
              handleValue={handleUserInfo}
            />
          </View>
          <View style={[styles.verMgPrimary]}>
            <InputCus
              hidden={true}
              placeholder="Password"
              value={loginInfo.password}
              name="password"
              handleValue={handleUserInfo}
            />
          </View>
          <View style={[styles.verMgPrimary]}>
            <Text style={[styles.txtPrimaryColor]}>
              Forgot password?
              <Text style={{textDecorationLine: 'underline'}}>
                Reset your password
              </Text>
            </Text>
          </View>
          <View style={[styles.verMgPrimary]}>
            <Text style={[styles.txtPrimaryColor]}>
              Don't have an account?
              <Text
                onPress={() => RootNavigation.navigate('Signup')}
                style={{textDecorationLine: 'underline'}}>
                Sign up
              </Text>
            </Text>
          </View>
          <View style={[styles.verMgPrimary]}>
            <ButtonCusPrimary
              style={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(94,93,93,0.62)',
              }}
              title="Sign in"
              onPress={handleLogin}
            />
          </View>
        </>
        {/* Google Login */}
        <View>
          <View style={[styles.justMiddle, {width: '100%'}]}>
            <Text style={[styles.txtPrimaryColor]}>Or better yet...</Text>
            <Text
              style={{
                left: 5,
                height: 2,
                top: '50%',
                width: '32%',
                position: 'absolute',
                backgroundColor: 'black',
              }}
            />
            <Text
              style={{
                right: 5,
                height: 2,
                top: '50%',
                width: '32%',
                position: 'absolute',
                backgroundColor: 'black',
              }}
            />
          </View>
          <View style={[styles.verMgPrimary]}>
            <View style={[styles.btnPrimaryIcon, {zIndex: 999}]}>
              <GoogleSolid width={22} />
            </View>

            <ButtonCusPrimary
              style={{
                zIndex: 998,
                color: '#ffffff',
                backgroundColor: 'rgba(94,93,93,0.62)',
              }}
              title={'Continute with Google'}
              onPress={handleLoginWithGoogle}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
