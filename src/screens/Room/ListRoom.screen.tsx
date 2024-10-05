import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/loadingSlice.tsx';
import {Text, TouchableOpacity, View} from 'react-native';
import {maxHeight, primaryBtnHeight} from '../../constants/sizes.tsx';
import Skeleton from '../../components/Skeleton.tsx';
import Divider from '../../components/Divider.tsx';
import {Search} from '../../components/Search.tsx';
import VerticalNav from '../../navigations/VerticalNav.tsx';
import TopNavigator from '../../navigations/TopNavigator.tsx';
import {setHistory} from '../../redux/appSlice.tsx';
import * as RootNavigation from '../../helps/RootNavigation';
import {ArrowLeftRegular, ArrowRightRegular} from '../../constants/icons.tsx';
import {ItemStyle} from '../../assets/styles/ItemStyle.module.tsx';
import {roomService} from '../../services/room.service.tsx';
import {ListRoom} from '../../components/List/ListRoom.tsx';

export default function ListRoomScreen() {
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

  const onLoadData = (page: any = null, keyword: string = '') => {
    dispatch(setLoading(true));
    roomService.getListRoom(page, keyword).then(async (res: any) => {
      if (res.meta) {
        setFilterItems({...res.meta});
      }
      if (res.data) {
        dispatch(setLoading(false));
        setListItem(res.data);
      }
    });
  };

  const loadPages = (page: any) => {
    if (page <= filterItems.pages) {
      setFilterItems({...filterItems, page: page});
      onLoadData(page);
    }
  };

  const onSubmit = () => {
    onLoadData(1, filterItems.keyword);
  };

  useEffect(() => {
    onLoadData();
    dispatch(
      setHistory({
        history: RootNavigation.navigationRef.getRootState().history,
      }),
    );
  }, []);

  return (
    <>
      <TopNavigator title={'Danh sách phòng'} />
      <VerticalNav />
      <View>
        <Search
          onSearch={(searchText: any) =>
            setFilterItems({...filterItems, keyword: `${searchText}`})
          }
          onSubmit={() => onSubmit()}
        />
      </View>
      <Divider content={`Danh sách phòng`} />
      <View
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          height: maxHeight - (108 + 35 + 15 + primaryBtnHeight),
        }}>
        {isLoading || listItem.length === 0 ? (
          <Skeleton />
        ) : (
          <ListRoom data={listItem} filterItems={filterItems} />
        )}
      </View>
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
      {/*<ButtonCusPrimary*/}
      {/*  style={{*/}
      {/*    bottom: 5,*/}
      {/*    height: 35,*/}
      {/*    color: 'black',*/}
      {/*    position: 'absolute',*/}
      {/*    left: maxWidth / 2 - inpWPrimary / 2,*/}
      {/*  }}*/}
      {/*  onPress={() => loadPages(filterItems.page + 1)}*/}
      {/*  title={'Tải thêm'}*/}
      {/*/>*/}
    </>
  );
}
