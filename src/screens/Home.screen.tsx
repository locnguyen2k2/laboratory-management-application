import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../redux/loadingSlice.tsx';
import {borrowedService} from '../services/borrowed.service.tsx';
import {setListBorrowing} from '../redux/borrowingReducer/borrowingSlice.tsx';
import TopNavigator from '../navigations/TopNavigator.tsx';
import VerticalNav from '../navigations/VerticalNav.tsx';
import Divider from '../components/Divider.tsx';
import {maxHeight, primaryBtnHeight} from '../constants/sizes.tsx';
import Skeleton from '../components/Skeleton.tsx';
import {ListBorrowed} from '../components/List/ListBorrowed.tsx';
import {setHistory} from '../redux/appSlice.tsx';

export default function HomeScreen({navigation}: any) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading);
  const [listItem, setListItem] = useState<any>([]);

  const onLoadData = () => {
    dispatch(setLoading(true));
    borrowedService.getListBorrowed(1, 5).then((res: any) => {
      if (res.data) {
        setListItem(res.data);
        dispatch(setListBorrowing({listBorrowing: listItem}));
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
      <TopNavigator />
      <VerticalNav />
      <Divider content={`Phiếu mượn gần đây`} />
      <View
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          height: maxHeight - (108 + 35 + primaryBtnHeight),
        }}>
        {isLoading || listItem.length === 0 ? (
          <Skeleton />
        ) : (
          <ListBorrowed row={true} data={listItem} />
        )}
      </View>
    </>
  );
}
