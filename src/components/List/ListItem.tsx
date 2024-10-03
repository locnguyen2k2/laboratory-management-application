import {FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import Item from '../Item';
import * as RootNavigation from '../../helps/RootNavigation';

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
              onPress={() =>
                RootNavigation.navigate('ItemDetail', {id: item.id})
              }>
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
