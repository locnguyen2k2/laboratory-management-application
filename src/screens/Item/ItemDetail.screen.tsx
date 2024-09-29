import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {itemService} from '../../services/item.service.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {maxWidth} from '../../constants/sizes.tsx';
import {setLoading} from '../../redux/loadingSlice.tsx';
import Skeleton from '../../components/Skeleton.tsx';
import VerticalNav from '../../navigations/VerticalNav.tsx';
import TopNavigator from '../../navigations/TopNavigator.tsx';

export default function ItemDetailScreen({navigation, route}: any) {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState<any>([]);
  const isLoading = useSelector((state: any) => state.loading);
  const [filterItems, setFilterItems] = useState<any>({
    hasNext: true,
    hasPrev: false,
    keyword: '',
    numberRecords: 0,
    page: 1,
    pages: 0,
    sort: '',
    take: 10,
  });

  const onLoadRoomItem = async (itemId: any) => {
    await itemService.getRoomItemByItem(itemId).then((result: any) => {
      if (result.data) {
        setFilterItems(result.meta);
        setListItem(result.data);
        dispatch(setLoading(false));
      }
    });
  };

  useEffect(() => {
    const {itemId} = route.params;
    dispatch(setLoading(true));
    if (itemId) {
      onLoadRoomItem(itemId);
    }
  }, [route.params, route.params.itemId]);

  return (
    <>
      <TopNavigator />
      <VerticalNav />
      {isLoading || listItem.length === 0 ? (
        <Skeleton />
      ) : (
        <View>
          <View>
            <Text>Đối tượng: {listItem[0].item.name}</Text>
            <Text>Phòng bàn giao: </Text>
          </View>
          <FlatList
            data={[...listItem]}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item}: any) => (
              <View style={{width: maxWidth, backgroundColor: 'gray'}}>
                <Text>{item.room.name}</Text>
                <Text>Da ban giao: {item.quantity}</Text>
                <Text>SL muon: {item.itemQuantityBorrowed}</Text>
                <Text>SL tra: {item.itemQuantityReturned}</Text>
                <Text>Dung tich thuc con lai: {item.remaining_volume}</Text>
              </View>
            )}
          />
        </View>
      )}
    </>
  );
}
