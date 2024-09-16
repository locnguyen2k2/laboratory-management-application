import {StyleSheet} from 'react-native';
import {
  fsPrimary,
  horMgPrimary,
  primaryBtnHeight,
  inpWPrimary,
  radPrimary,
} from '../../constants/sizes';
import {primaryBgColor, primaryTxtColor} from '../../constants/colors';

export const ListItemStyle = StyleSheet.create({
  blockContent: {
    backgroundColor: primaryBgColor,
  },
  title: {
    fontSize: 16,
    color: primaryTxtColor,
  },
});
