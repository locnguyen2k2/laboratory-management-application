import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/loadingSlice';
import {borrowedService} from '../../services/borrowed.service';
import Item from '../Item';
import {
  selectListBorrowing,
  setListBorrowing,
} from '../../redux/borrowingReducer/borrowingSlice';

export const ListBorrowed = (props: any) => {
  const dispatch = useDispatch();
  const listBorrowing = useSelector(selectListBorrowing);
  const [detailBorrowing, setDetailBorrowing] = useState<any>([]);
  const onLoadData = () => {
    dispatch(setLoading(true));
    dispatch(setListBorrowing({listBorrowing: props.data}));
  };

  useEffect(() => {
    let listDetail: any = new Array(props.data.length);
    if (props.data.length > 0) {
      dispatch(setLoading(true));

      Promise.all(
        props.data.map(async (item: any, index: any) => {
          listDetail[index] = await borrowedService
            .getBorrowed(item.id)
            .then(res => res);
        }),
      ).then(() => {
        if (listDetail.length > 0) {
          setDetailBorrowing(listDetail);
        }
        dispatch(setLoading(false));
      });
    }
  }, [listBorrowing]);

  return (
    <>
      {detailBorrowing.length > 0 && (
        <FlatList
          data={detailBorrowing}
          numColumns={2}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}: any) => (
            <TouchableOpacity>
              <Item.Borrow item={item} />
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};
