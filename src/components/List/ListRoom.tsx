import {FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import Item from '../Item';
import * as RootNavigation from '../../helps/RootNavigation';
import {setHistory} from '../../redux/appSlice.tsx';
import {useDispatch} from 'react-redux';

export const ListRoom = (props: any) => {
  const dispatch = useDispatch();
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
              onPress={() => {
                dispatch(setHistory({}));
                RootNavigation.navigate('RoomDetail', {id: item.id});
              }}>
              <Item.Room item={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <></>
      )}
    </>
  );
};
