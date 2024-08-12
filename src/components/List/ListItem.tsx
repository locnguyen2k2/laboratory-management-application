import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import Item from '../Item';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from './../../redux/loadingSlice';
import {itemService} from './../../services/item.service';
import {maxHeight} from './../../constants/sizes';
import {ButtonCusPrimary} from './../ButtonCus';
import {styles} from './../../assets/styles/styles.module';
import {ListItemStyle} from './../../assets/styles/ListItemStyle.module';
import IPaginate from '../../interfaces/paginate.interface';
import {
  selectPaginate,
  setPaginate,
} from '../../redux/paginationReducer/paginationSlice';

export const ListItem = (props: any) => {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState<any>([]);
  let paginate: [{id: number; pagination: any}] = useSelector(selectPaginate);
  let hasNext =
    paginate[paginate.findIndex((item: any) => item.id == props.id)]?.pagination
      .hasNext;
  const [title, setTitle] = useState<string>('Danh sách thiết bị');
  // const [searchText, setSearchText] = useState<string>('')
  // const onSearch = () => {
  // const filtered = listEquipment.filter((item: any) => {
  //     item.name.toLowerCase().includes(searchText.toLowerCase());
  //     console.log(item.name)
  // }
  // );
  // if (searchText === '') {
  //     // return setListEquipment(listEquipment);
  // }

  // // setListEquipment(filtered);
  // }
  const loadPages = (data: IPaginate) => {
    const index = paginate.findIndex((item: any) => item?.id == props?.id);
    if (index != -1) {
      dispatch(
        setPaginate({
          id: props.id,
          pagination: {
            ...paginate[index].pagination,
            page: paginate[index].pagination.page + 1,
          },
        }),
      );
    } else {
      dispatch(
        setPaginate({
          id: props.id,
          pagination: {
            ...data,
          },
        }),
      );
    }
  };
  useEffect(() => {
    dispatch(setLoading(true));
    let index = paginate.findIndex((item: any) => item.id == props?.id);
    switch (props?.id) {
      case 1:
        itemService
          .getListEquipment(
            paginate[index]?.id ? paginate[index].pagination.page : 0,
          )
          .then(async (res: any) => {
            if (res.data) {
              dispatch(setLoading(false));
              setTitle('Danh sách thiết bị');
              paginate[index]?.pagination.page > 1 && props.id == 1
                ? setListItem([...listItem, ...res.data])
                : setListItem(res.data);
              dispatch(
                setPaginate({
                  id: props.id,
                  pagination: {
                    ...res.meta,
                  },
                }),
              );
            }
          });
        break;
      case 2:
        itemService
          .getListTool(
            paginate[index]?.id ? paginate[index].pagination.page : 0,
          )
          .then(async (res: any) => {
            if (res.data) {
              dispatch(setLoading(false));
              setTitle('Danh sách dụng cụ');
              paginate[index]?.pagination.page > 1 && props.id == 2
                ? setListItem([...listItem, ...res.data])
                : setListItem(res.data);
              dispatch(
                setPaginate({
                  id: props.id,
                  pagination: {
                    ...res.meta,
                  },
                }),
              );
            }
          });
        break;
      default:
        itemService
          .getListEquipment(
            paginate[index]?.id ? paginate[index].pagination.page : 0,
          )
          .then(async (res: any) => {
            if (res.data) {
              dispatch(setLoading(false));
              paginate[index]?.pagination.page > 1 && props.id == 1
                ? setListItem([...listItem, ...res.data])
                : setListItem(res.data);
            }
          });
        break;
    }
    console.log(paginate);
  }, [props.id || paginate]);
  return (
    <>
      <View
        style={[
          styles.justMiddle,
          styles.padPrimary,
          ListItemStyle.blockContent,
        ]}>
        <Text style={[ListItemStyle.title]}>{title}</Text>
      </View>
      {/* <View>
                <Search onSearch={setSearchText} submit={onSearch} />
            </View> */}
      {listItem.length > 0 ? (
        <View
          style={{
            position: 'relative',
            height: maxHeight - 158,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FlatList
            data={[...listItem]}
            numColumns={2}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item}: any) => (
              <TouchableOpacity
              // onPress={() => {
              // dispatch(setOrderFood({ listEquipment: [{ food_name: item.name, price: item.price, quantity: 1 }] }))
              // dispatch(setOrderTotal({ add: true, total: item.price }))
              // }}
              >
                <Item.Item item={item} />
              </TouchableOpacity>
            )}
          />
          {hasNext && (
            <ButtonCusPrimary onPress={loadPages} title={'Tải thêm'} />
          )}
        </View>
      ) : (
        <></>
      )}
    </>
  );
};
