import {maxWidth} from '../constants/sizes.tsx';
import {Text, TouchableOpacity, View} from 'react-native';
import {primaryBgColor, secondaryBgColor} from '../constants/colors.tsx';
import {styles} from '../assets/styles/styles.module.tsx';
import {selectVerticalNav, setVerticalNav} from '../redux/verticalNavSlice.tsx';
import {MenuRegular} from '../constants/icons.tsx';
import {useDispatch, useSelector} from 'react-redux';

export default function TopNavigator(props: any) {
  const dispatch = useDispatch();
  const verticalNav = useSelector(selectVerticalNav);

  return (
    <View
      style={{
        position: 'relative',
        height: 40,
        zIndex: 990,
        display: 'flex',
        width: maxWidth,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: secondaryBgColor,
      }}>
      <Text style={{position: 'absolute', left: 40}}>{props?.title}</Text>
      <TouchableOpacity
        style={[
          {
            width: 32,
            height: 32,
            borderRadius: 8,
            marginHorizontal: 5,
            backgroundColor: primaryBgColor,
          },
          styles.midCenter,
        ]}
        onPress={() => {
          dispatch(setVerticalNav(!verticalNav));
        }}>
        <MenuRegular width={32} height={32} />
      </TouchableOpacity>
    </View>
  );
}
