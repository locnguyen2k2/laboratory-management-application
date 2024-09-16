import {FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import Item from '../Item';

export const ListItem = (props: any) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    props.data && setData(props.data);
  }, [props.data]);
  return (
    <>
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
