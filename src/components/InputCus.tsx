import {Text, TextInput, View} from 'react-native';
import {InputStyle} from '../assets/styles/styles.module';
import {useState} from 'react';
import {primaryBtnHeight} from '../constants/sizes.tsx';
import {secondaryBgColor} from '../constants/colors.tsx';

export default function InputCus({
  hidden,
  placeholder,
  value,
  name,
  handleValue,
}: any) {
  const [isFocus, setIsFocus] = useState(false);
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
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChangeText={(value: string) => handleValue(name, value)}
      />
    </View>
  );
}
