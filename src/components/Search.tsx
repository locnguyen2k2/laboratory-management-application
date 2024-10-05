import React from 'react';
import {TextInput, View} from 'react-native';
import {maxWidth} from '../constants/sizes';
import {ButtonCusSecondary} from './ButtonCus';
import {secondaryTxtColor} from '../constants/colors.tsx';

export const Search = ({onSearch, onSubmit}: any) => {
  return (
    <View>
      <View
        style={{
          height: 50,
          width: maxWidth,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <TextInput
          style={[
            {
              marginHorizontal: 12,
              width: '60%',
              height: 35,
              color: '#000000',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              padding: 5,
            },
          ]}
          placeholderTextColor={'gray'}
          placeholder="Nhập từ khóa tìm kiếm ..."
          onChangeText={searchText => onSearch(searchText)}
        />
        <ButtonCusSecondary title={'Tìm'} onPress={() => onSubmit()} />
      </View>
    </View>
  );
};
