import React from 'react';
import {View, TextInput} from 'react-native';
import {maxWidth} from '../constants/sizes';
import {ButtonCusSecondary} from './ButtonCus';

export const Search = ({onSearch, submit}: any) => {
  return (
    <View>
      <View
        style={{
          width: maxWidth,
          height: 60,
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
              height: 45,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              padding: 5,
            },
          ]}
          placeholder="Nhập từ khóa tìm kiếm ..."
          onChangeText={searchText => onSearch(searchText)}
        />
        <ButtonCusSecondary title={'Search'} handleAction={submit} />
      </View>
    </View>
  );
};
