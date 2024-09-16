import {FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import Item from '../Item';

export const ListItem = (props: any) => {
  const [data, setData] = useState<any>([]);
  // const [searchText, setSearchText] = useState<string>('')
  // const onSearch = () => {
  // const filtered = listEquipment.filter((item: any) => {
  //     item.name.toLowerCase().includes(searchText.toLowerCase());
  //     console.log(item.name)
  // }
  // );
  // if (searchText === '') {
  //     // return setListEquipment(listEquipment);
  // }

  // // setListEquipment(filtered);
  // }
  useEffect(() => {
    props.data && setData(props.data);
  }, [props.data]);
  return (
    <>
      {/* <View>
                <Search onSearch={setSearchText} submit={onSearch} />
            </View> */}
      {data.length > 0 ? (
        <FlatList
          data={[...data]}
          numColumns={2}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}: any) => (
            <TouchableOpacity
            // onPress={() => {
            // dispatch(setOrderFood({ listEquipment: [{ food_name: item.name, price: item.price, quantity: 1 }] }))
            // dispatch(setOrderTotal({ add: true, total: item.price }))
            // }}
            >
              <Item.Item item={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <></>
      )}
    </>
  );
};
