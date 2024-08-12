import {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {ListItemStyle} from '../../assets/styles/ListItemStyle.module';
import {styles} from '../../assets/styles/styles.module';
import {maxHeight, maxWidth} from '../../constants/sizes';
import {setLoading} from '../../redux/loadingSlice';
import {categoryService} from '../../services/category.service';
import Item from '../Item';

export const ListCategory = (props: any) => {
  const dispatch = useDispatch();
  const [listCategory, setListCategory] = useState<any>([]);
  useEffect(() => {
    dispatch(setLoading(true));
    categoryService.getListCategory().then((res: any) => {
      if (res.data) {
        dispatch(setLoading(false));
        setListCategory(res.data);
      }
    });
  }, []);

  return (
    <View style={[styles.midBetween, {height: 100, width: maxWidth}]}>
      <View
        style={[
          styles.padPrimary,
          ListItemStyle.blockContent,
          {width: maxWidth},
          styles.txtCen,
        ]}>
        <Text style={[ListItemStyle.title]}>Danh sách phân loại</Text>
      </View>
      <View>{/* <Search onSearch={setSearchText} submit={onSearch} /> */}</View>
      {listCategory.length > 0 ? (
        <View
          style={{
            height: maxHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FlatList
            data={[...listCategory]}
            numColumns={3}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item}: any) => (
              <TouchableOpacity onPress={() => props?.onChange(item.id)}>
                <Item.Category item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
