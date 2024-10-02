import {maxWidth} from '../constants/sizes.tsx';
import {TouchableOpacity, View} from 'react-native';
import {primaryBgColor, secondaryBgColor} from '../constants/colors.tsx';
import {styles} from '../assets/styles/styles.module.tsx';
import {selectVerticalNav, setVerticalNav} from '../redux/verticalNavSlice.tsx';
import {MenuRegular} from '../constants/icons.tsx';
import {useDispatch, useSelector} from 'react-redux';

export default function TopNavigator() {
  const dispatch = useDispatch();
  const verticalNav = useSelector(selectVerticalNav);

  return (
    <View
      style={{
        position: 'relative',
        height: 40,
        zIndex: 9999,
        display: 'flex',
        width: maxWidth,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: secondaryBgColor,
      }}>
      <TouchableOpacity
        style={[
          {
            width: 32,
            height: 32,
            borderRadius: 8,
            marginHorizontal: 5,
            backgroundColor: primaryBgColor,
          },
          styles.justMiddle,
        ]}
        onPress={() => {
          dispatch(setVerticalNav(!verticalNav));
        }}>
        <MenuRegular width={32} height={32} />
      </TouchableOpacity>
    </View>
  );
}
