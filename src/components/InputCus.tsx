import {Text, TextInput, View} from 'react-native';
import {InputStyle} from '../assets/styles/styles.module';
import {useEffect, useState} from 'react';
import {primaryBtnHeight} from '../constants/sizes.tsx';
import {secondaryBgColor} from '../constants/colors.tsx';
import {
  passwordRegex,
  studentEmailReg,
} from '../screens/Auth/Register.screen.tsx';
import * as _ from 'lodash';
import {useDispatch} from 'react-redux';
import {setFormError} from '../redux/appSlice.tsx';

export default function InputCus({
  formName = '',
  hidden,
  placeholder,
  value,
  name,
  handleValue,
  isRequired = false,
  isPassword = false,
  isEmail = false,
  minLength = 3,
  maxLength = 32,
  message = '',
}: any) {
  const [isFocus, setIsFocus] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMessage(message);
    let isError = false;

    if (isEmail) {
      if (!studentEmailReg.test(value)) {
        isError = true;
      }
    }

    if (isPassword) {
      if (!passwordRegex.test(value)) {
        isError = true;
        setErrorMessage('Mật khẩu phải bao gồm: số, ký tự thường và in hoa!');
      }
    }

    if (isRequired) {
      if (value.trim().length < minLength || value.trim().length > maxLength) {
        isError = true;
        setErrorMessage(
          `Vui lòng nhập ít nhất ${minLength} và tối đa ${maxLength} ký tự!`,
        );
      }

      if (_.isEmpty(value.trim())) {
        isError = true;
        setErrorMessage('Vui lòng không để trống trường này!');
      }
    }

    setError(isError);

    if (!_.isEmpty(formName)) {
      dispatch(setFormError({form: formName, name: name, error: isError}));
    }

    if (!isTyping) {
      dispatch(setFormError({form: formName}));
    }
  }, [value, isTyping]);

  return (
    <View style={[InputStyle.container, {position: 'relative'}]}>
      {isFocus && (
        <View
          style={{
            left: 10,
            width: 'auto',
            padding: 3,
            borderRadius: 3,
            position: 'absolute',
            top: -(primaryBtnHeight / 2 - 13),
            backgroundColor: secondaryBgColor,
          }}>
          <Text>{placeholder}</Text>
        </View>
      )}
      <TextInput
        placeholderTextColor={'white'}
        secureTextEntry={hidden}
        style={[InputStyle.placeholder]}
        placeholder={!isFocus ? placeholder : ''}
        value={value}
        onFocus={() => {
          setIsFocus(true);
          setIsTyping(true);
        }}
        onBlur={() => setIsFocus(false)}
        onChangeText={(value: string) => {
          handleValue(name, value);
          return error;
        }}
      />
      {error && isTyping && (
        <Text
          style={{
            position: 'absolute',
            bottom: -20,
            fontSize: 12,
            color: '#a10e0e',
          }}>
          * {errorMessage}
        </Text>
      )}
    </View>
  );
}
