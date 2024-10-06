import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../redux/loadingSlice.tsx';
import {borrowedService} from '../services/borrowed.service.tsx';
import TopNavigator from '../navigations/TopNavigator.tsx';
import VerticalNav from '../navigations/VerticalNav.tsx';
import Divider from '../components/Divider.tsx';
import Skeleton from '../components/Skeleton.tsx';
import {ListBorrowed} from '../components/List/ListBorrowed.tsx';
import {setHistory} from '../redux/appSlice.tsx';
import {itemService} from '../services/item.service.tsx';
import {ListItem} from '../components/List/ListItem.tsx';
import {roomService} from '../services/room.service.tsx';
import {ListRoom} from '../components/List/ListRoom.tsx';

export default function HomeScreen({navigation}: any) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading);
  const [listItem, setListItem] = useState<any>([]);
  const [listBorrowing, setListBorrowing] = useState<any>([]);
  const [listRoom, setListRoom] = useState<any>([]);

  const onLoadData = () => {
    dispatch(setLoading(true));
    borrowedService.getListBorrowed(1, 5).then((res: any) => {
      if (res.data) {
        setListBorrowing(res.data);
      }
      dispatch(setLoading(false));
    });
    itemService.getAll(1, '', 5).then((res: any) => {
      if (res.data) {
        setListItem(res.data);
      }
      dispatch(setLoading(false));
    });
    roomService.getListRoom(1, '', 5).then((res: any) => {
      if (res.data) {
        setListRoom(res.data);
      }
      dispatch(setLoading(false));
    });
  };

  useEffect(() => {
    onLoadData();
    dispatch(
      setHistory({
        history: navigation.getState().history,
      }),
    );
  }, []);

  return (
    <>
      <TopNavigator title={'Trang chủ'} />
      <VerticalNav />
      <View>
        {isLoading ||
        listBorrowing.length === 0 ||
        listItem.length === 0 ||
        listRoom.length === 0 ? (
          <Skeleton />
        ) : (
          <>
            <Divider left={true} content={`Phiếu mượn gần đây`} />
            <ListBorrowed row={true} data={listBorrowing} />
            <Divider left={true} content={`Trang thiết bị`} />
            <ListItem row={true} data={listItem} />
            <Divider left={true} content={`Phòng`} />
            <ListRoom row={true} data={listRoom} />
          </>
        )}
      </View>
    </>
  );
}
