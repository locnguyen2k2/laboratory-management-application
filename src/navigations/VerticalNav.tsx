import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from './../helps/RootNavigation';
import {FadeInView} from './../assets/styles/FadeView';
import {selectVerticalNav, setVerticalNav} from '../redux/verticalNavSlice';
import {jwtManager} from '../helps/jwtManager';
import {clearUser} from '../redux/userReducer/userSlice';
import {styles} from '../assets/styles/styles.module';
import {primaryBgColor} from '../constants/colors';

export default function VerticalNav() {
  const verticalNav = useSelector(selectVerticalNav);
  const dispatch = useDispatch();
  const handleLoggout = async () => {
    (await jwtManager).clear();
    dispatch(clearUser());
    dispatch(setVerticalNav(!verticalNav));
    navigate('Login');
  };

  return (
    <>
      {verticalNav ? (
        <TouchableOpacity
          style={[styles.modelForm, {alignItems: 'flex-end'}]}
          onPress={() => {
            dispatch(setVerticalNav(!verticalNav));
          }}>
          <TouchableHighlight>
            <FadeInView style={styles.nav}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 999,
                  marginTop: 10,
                  marginLeft: 5,
                  marginHorizontal: 5,
                }}
                onPress={() => {
                  dispatch(setVerticalNav(!verticalNav));
                }}>
                <View
                  style={[
                    {
                      padding: 3,
                      paddingHorizontal: 15,
                      backgroundColor: `${primaryBgColor}`,
                      borderRadius: 8,
                    },
                  ]}>
                  {/*<FontAwesomeIcon*/}
                  {/*  color="white"*/}
                  {/*  size={25}*/}
                  {/*  icon={faArrowAltCircleLeft}*/}
                  {/*/>*/}
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={[styles.navItem]}>
                  {/*<FontAwesomeIcon color="black" size={32} icon={faUser} />*/}
                  <Text style={[styles.txtSecondaryColor]}>Tài khoản</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setVerticalNav(!verticalNav));
                  navigate('Invoice');
                }}>
                <View style={[styles.navItem]}>
                  {/*<FontAwesomeIcon color="black" size={32} icon={faUser} />*/}
                  <Text style={[styles.txtSecondaryColor]}>Hóa đơn</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate('Statistic');
                }}>
                <View style={[styles.navItem]}>
                  {/*<FontAwesomeIcon color="black" size={32} icon={faUser} />*/}
                  <Text style={[styles.txtSecondaryColor]}>Thống kê</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLoggout}>
                <View style={[styles.navItem]}>
                  {/*<FontAwesomeIcon color="black" size={32} icon={faUser} />*/}
                  <Text style={[styles.txtSecondaryColor]}>Đăng xuất</Text>
                </View>
              </TouchableOpacity>
            </FadeInView>
          </TouchableHighlight>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 50,
            right: 0,
            width: 32,
            height: 32,
            backgroundColor: 'blue',
          }}
          onPress={() => {
            dispatch(setVerticalNav(!verticalNav));
            console.log(verticalNav);
          }}>
          {/*<FontAwesomeIcon color="white" size={32} icon={faUser} />*/}
        </TouchableOpacity>
      )}
    </>
  );
}
