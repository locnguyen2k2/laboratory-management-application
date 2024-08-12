import React, { useState, useEffect } from 'react';
import {
    View, FlatList, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/loadingSlice';
import { borrowedService } from '../../services/borrowed.service';
import { maxHeight } from '../../constants/sizes';
import Item from '../Item';
import { selectListBorrowing, setListBorrowing } from '../../redux/borrowingReducer/borrowingSlice';
import IPaginate from '../../interfaces/paginate.interface';
import { ButtonCusPrimary } from '../ButtonCus';

export const ListBorrowed = () => {

    const dispatch = useDispatch();
    const listBorrowing = useSelector(selectListBorrowing)
    const [detailBorrowing, setDetailBorrowing] = useState<any>([])
    const [paginate, setPaginate] = useState<IPaginate>()

    const onLoadData = () => {
        dispatch(setLoading(true))
        borrowedService.getListBorrowed()
            .then((res: any) => {
                if (res.data) {
                    dispatch(setListBorrowing({ listBorrowing: res.data }))
                    setPaginate(res.meta)
                }
            })
    }

    useEffect(() => {
        let listDetail: any = [];
        if (listBorrowing.length > 0) {
            Promise.all(
                listBorrowing.map(async (item: any) => {
                    listDetail.push(await borrowedService.getBorrowed(item.id).then((res) => res))
                })
            ).then(() => {
                dispatch(setLoading(false))
                listDetail.length > 0 && setDetailBorrowing(listDetail)
            })
        } else {
            onLoadData();
        }
    }, [listBorrowing || paginate])

    return (
        <>
            {
                detailBorrowing.length > 0 ?
                    <View
                        style={{
                            height: maxHeight,
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FlatList
                            data={detailBorrowing}
                            numColumns={2}
                            nestedScrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={
                                ({ item }: any) =>
                                    <TouchableOpacity>
                                        <Item.Borrow item={item} />
                                    </TouchableOpacity>
                            }
                        />
                        {
                            paginate?.hasNext && <ButtonCusPrimary title={"Tải thêm"} />
                        }
                    </View>
                    : <></>
            }
        </>
    )


}