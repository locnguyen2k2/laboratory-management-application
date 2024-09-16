import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ListBorrowed} from '../../components/List/ListBorrowed.tsx';
import Divider from '../../components/Divider.tsx';
import {ButtonCusPrimary} from '../../components/ButtonCus.tsx';
import {
  inpWPrimary,
  maxHeight,
  maxWidth,
  primaryBtnHeight,
} from '../../constants/sizes.tsx';
import {setLoading} from '../../redux/loadingSlice.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {borrowedService} from '../../services/borrowed.service.tsx';
import Skeleton from '../../components/Skeleton.tsx';
import {setListBorrowing} from '../../redux/borrowingReducer/borrowingSlice.tsx';

export default function BorrowedScreen() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading);
  const [listItem, setListItem] = useState<any>([]);

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

  const onLoadData = (page: any = null) => {
    dispatch(setLoading(true));
    borrowedService.getListBorrowed(page).then((res: any) => {
      if (res.meta) {
        setFilterItems({...res.meta});
      }
      if (res.data) {
        page > 1
          ? setListItem([...listItem, ...res.data])
          : setListItem(res.data);

        dispatch(setListBorrowing({listBorrowing: listItem}));
      }
      dispatch(setLoading(false));
    });
  };

  const loadPages = (page: any) => {
    if (page <= filterItems.pages) {
      setFilterItems({...filterItems, page: page});
      onLoadData(page);
    }
  };

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    <>
      <Divider content={`Danh sách phiếu mượn`} />
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
          <ListBorrowed data={listItem} />
        )}
      </View>
      <ButtonCusPrimary
        style={{
          bottom: 5,
          color: 'black',
          position: 'absolute',
          left: maxWidth / 2 - inpWPrimary / 2,
        }}
        onPress={() => loadPages(filterItems.page + 1)}
        title={'Tải thêm'}
      />
    </>
  );
}
