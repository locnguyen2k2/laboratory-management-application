import {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/loadingSlice';
import {categoryService} from '../../services/category.service';
import Item from '../Item';

export const ListCategory = (props: any) => {
  const dispatch = useDispatch();
  const [listCategory, setListCategory] = useState<any>([]);
  const [isActive, setIsActive] = useState<any>(1);
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
    <>
      <View>{/* <Search onSearch={setSearchText} submit={onSearch} /> */}</View>
      {listCategory.length > 0 ? (
        <FlatList
          data={[{name: 'Tất cả', id: 0}, ...listCategory]}
          horizontal={true}
          scrollEnabled={true}
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
          }}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}: any) => (
            <TouchableOpacity
              onPress={() => {
                setIsActive(item.id);
                props?.onChange(item.id);
              }}>
              <Item.Category isActive={isActive} item={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <></>
      )}
    </>
  );
};
