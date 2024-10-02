import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {itemService} from '../../services/item.service.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/loadingSlice.tsx';
import Skeleton from '../../components/Skeleton.tsx';
import VerticalNav from '../../navigations/VerticalNav.tsx';
import TopNavigator from '../../navigations/TopNavigator.tsx';
import {ItemStyle} from '../../assets/styles/ItemStyle.module.tsx';
import {maxWidth} from '../../constants/sizes.tsx';

export enum UnitEnum {
  BOTTLE = 1,
  PEACE = 2,
  SET = 3,
  BOX = 4,
  BAG = 5,
  PACK = 6,
  SACHET = 7,
  ml = 8,
  l = 9,
  g = 10,
  kg = 11,
  m = 12,
}

export const itemUnit = (value: any) => {
  switch (value) {
    case 1:
      return 'chai';
    case 2:
      return '';
    case 3:
      return 'bộ';
    case 4:
      return 'hộp';
    case 5:
      return 'túi';
    case 6:
      return 'gói';
    case 7:
      return 'túi nhỏ';
    case 8:
      return 'mi-li-lít';
    case 9:
      return 'lít';
    case 10:
      return 'gam';
    case 11:
      return 'ki-lô-gam';
    case 12:
      return 'mét';
    default:
      return '';
  }
};

export default function ItemDetailScreen({navigation, route}: any) {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState<any>([]);
  const isLoading = useSelector((state: any) => state.loading);

  const onLoadRoomItem = async (itemId: any) => {
    await itemService.getRoomItemByItem(itemId).then((result: any) => {
      if (result.data) {
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
            <Text style={[ItemStyle.title]}>
              Đối tượng: {listItem[0].item.name}(
              {listItem[0].item.category.id === 3 && listItem[0].item.volume}
              {listItem[0].item.specification &&
                ' ' + itemUnit(listItem[0].item.specification) + '/'}
              {itemUnit(listItem[0].item.unit)})
            </Text>
          </View>
          <FlatList
            data={[...listItem]}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item}: any) => (
              <View
                style={[
                  ItemStyle.blockContent,
                  {
                    marginHorizontal: 5,
                  },
                ]}>
                <View
                  style={[
                    ItemStyle.content,
                    {
                      width: maxWidth - 10,
                      borderWidth: 0.5,
                      borderRadius: 8,
                      borderStyle: 'solid',
                      borderColor: 'green',
                    },
                  ]}>
                  <Text style={[ItemStyle.title]}>
                    Phòng bàn giao: {item.room.name}
                  </Text>
                  <Text style={[ItemStyle.title]}>
                    Đã mượn: {item.itemQuantityBorrowed}
                  </Text>
                  <Text style={[ItemStyle.title]}>
                    Đã trả: {item.itemQuantityReturned}
                  </Text>
                  <Text style={[ItemStyle.title]}>
                    Số lượng: {item.quantity}
                  </Text>
                  {listItem[0].item.category.id === 3 && (
                    <Text style={[ItemStyle.title]}>
                      Dung tích: {item.remaining_volume}/
                      {item.quantity * item.item.volume} (
                      {itemUnit(item.item.specification)})
                    </Text>
                  )}
                </View>
              </View>
            )}
          />
        </View>
      )}
    </>
  );
}
