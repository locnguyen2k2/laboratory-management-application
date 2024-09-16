import {StyleSheet} from 'react-native';
import {maxWidth, maxHeight, inpWPrimary} from '../../constants/sizes';
import {secondaryBgColor} from '../../constants/colors';

export {default as InputStyle} from './InputStyle.module';
export {ButtonPrimaryStyle, ButtonSecondaryStyle} from './ButtonStyle.module';
export const styles = StyleSheet.create({
  padPrimary: {
    padding: 8,
  },
  verMgPrimary: {
    marginVertical: 12,
  },
  txtPrimaryColor: {
    color: '#000000',
  },
  txtSecondaryColor: {
    color: '#FFFFFF',
  },
  fullMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPriFixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: maxWidth / 2 - inpWPrimary,
  },
  btnSecFixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: maxWidth / 2 - 103,
  },
  midBetween: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  justMiddle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verMgSecondary: {
    marginVertical: 7,
  },
  txtCen: {
    alignItems: 'center',
  },
  backgroundImg: {
    width: maxWidth,
    height: maxHeight,
    position: 'absolute',
  },
  btnPrimaryIcon: {
    top: 0,
    left: 16,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  modelForm: {
    zIndex: 9999,
    height: maxHeight,
    width: maxWidth,
    position: 'absolute',
    backgroundColor: 'rgba(110, 110, 110, .3)',
  },
  nav: {
    position: 'relative',
    right: -150,
    paddingVertical: 5,
    height: maxHeight,
    width: maxWidth / 2,
    justifyContent: 'center',
    backgroundColor: `${secondaryBgColor}`,
  },
  navItem: {
    height: 60,
    zIndex: 999,
    width: '100%',
    display: 'flex',
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#FFFFFF',
  },
});
