import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/loadingSlice.tsx';
import Skeleton from '../../components/Skeleton.tsx';
import VerticalNav from '../../navigations/VerticalNav.tsx';
import TopNavigator from '../../navigations/TopNavigator.tsx';
import {ItemStyle} from '../../assets/styles/ItemStyle.module.tsx';
import {maxHeight, maxWidth} from '../../constants/sizes.tsx';
import {CommonActions} from '@react-navigation/native';
import {setHistory} from '../../redux/appSlice.tsx';
import * as RootNavigation from './../../helps/RootNavigation';
import {ArrowLeftRegular, ArrowRightRegular} from '../../constants/icons.tsx';
import {roomService} from '../../services/room.service.tsx';
import {primaryTxtColor} from '../../constants/colors.tsx';
import Divider from '../../components/Divider.tsx';

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
      return 'cái';
    case 3:
      return 'bộ';
    case 4:
      return 'hộp';
    case 5:
      return 'túi';
    case 6:
      return 'gói';
    case 7:
      return 'bọc';
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

export default function RoomDetail({navigation, route}: any) {
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

  const loadPages = (page: any = null) => {
    if (page <= filterItems.pages) {
      setFilterItems({...filterItems, page: page});
      onLoadRoomItem(route.params.id, page);
    }
  };

  const onLoadRoomItem = (
    itemId: any,
    page: any = null,
    keyword: string = '',
  ) => {
    dispatch(setLoading(true));
    roomService.getRoomItemByRoom(itemId, page, keyword).then((result: any) => {
      if (result.meta) {
        setFilterItems({...result.meta});
      }
      if (result.data) {
        setListItem(result.data);
        dispatch(setLoading(false));
      }
    });
  };

  useEffect(() => {
    const {id} = route.params;
    dispatch(setLoading(true));
    if (id) {
      onLoadRoomItem(id);
      let history: any = RootNavigation.navigationRef.getRootState().history;
      history[1] = {...history[1], id: id};
      dispatch(setHistory({history: history}));
    }
  }, [route.params.id, route.params]);

  return (
    <>
      <View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
            top: 40 / 2 - 16,
            zIndex: 991,
          }}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Rooms'}],
              }),
            );
          }}>
          <ArrowLeftRegular width={32} height={32} />
        </TouchableOpacity>
        <TopNavigator title={'Chi tiết phòng'} />
      </View>
      <VerticalNav />
      {!isLoading && listItem.length > 0 ? (
        <View style={{height: maxHeight - 100}}>
          <Divider
            left={true}
            content={`${listItem[0].room.name}(SL: ${listItem[0].room.quantity})`}
          />
          <FlatList
            data={[...listItem]}
            numColumns={2}
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
                      backgroundColor: primaryTxtColor,
                      width: maxWidth / 2 - 10,
                      borderWidth: 0.5,
                      borderRadius: 8,
                      borderStyle: 'solid',
                      borderColor: 'green',
                    },
                  ]}>
                  <Text style={[ItemStyle.title]}>
                    Tên: {item.item.name} ({item.item.category.name})
                  </Text>
                  <View style={[ItemStyle.blockContent]}>
                    <Text style={[ItemStyle.title]}>Trả/Mượn:</Text>
                    <Text
                      style={[
                        ItemStyle.title,
                        {
                          borderWidth: 0.5,
                          borderColor: 'green',
                          borderRadius: 8,
                          paddingHorizontal: 3,
                        },
                      ]}>
                      {item.itemQuantityReturned}/{item.itemQuantityBorrowed}
                    </Text>
                  </View>
                  <Text style={[ItemStyle.title]}>SL: {item.quantity}</Text>
                  {item.item.category.id === 3 && (
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
          <View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                disabled={!filterItems.hasPrev}
                style={{
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  backgroundColor: '#ffffff',
                }}
                onPress={() => loadPages(filterItems.page - 1)}>
                <ArrowLeftRegular width={32} height={32} />
              </TouchableOpacity>
              <Text style={[ItemStyle.content]}>{filterItems.page}</Text>
              <Text style={[ItemStyle.content]}>/</Text>
              <Text style={[ItemStyle.content]}>{filterItems.pages}</Text>
              <TouchableOpacity
                disabled={!filterItems.hasNext}
                style={{
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  backgroundColor: '#ffffff',
                }}
                onPress={() => loadPages(filterItems.page + 1)}>
                <ArrowRightRegular width={32} height={32} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
