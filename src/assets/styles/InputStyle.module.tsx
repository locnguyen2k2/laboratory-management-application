import {StyleSheet} from 'react-native';
import {
  fsPrimary,
  horMgPrimary,
  primaryBtnHeight,
  inpWPrimary,
  radPrimary,
} from '../../constants/sizes';

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    width: inpWPrimary,
    height: primaryBtnHeight,
    borderColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: radPrimary,
    backgroundColor: 'rgba(110, 110, 110, .3)',
  },
  placeholder: {
    color: 'white',
    textAlign: 'left',
    fontSize: fsPrimary,
    textAlignVertical: 'center',
    paddingVertical: 12,
    paddingHorizontal: horMgPrimary,
  },
});
