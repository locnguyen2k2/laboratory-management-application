import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useDispatch} from 'react-redux';
import {clearListBorrowing} from '../../redux/borrowingReducer/borrowingSlice.tsx';
import DatePicker from 'react-native-date-picker';
import TopNavigator from '../../navigations/TopNavigator.tsx';
import VerticalNav from '../../navigations/VerticalNav.tsx';
import {roomItemService} from '../../services/roomItem.service.tsx';
import {maxWidth} from '../../constants/sizes.tsx';
import {ItemStyle} from '../../assets/styles/ItemStyle.module.tsx';
import {
  AddCircleRegular,
  CloseSolid,
  RemoveCircleRegular,
} from '../../constants/icons.tsx';
import * as _ from 'lodash';
import {styles} from '../../assets/styles/styles.module.tsx';
import {ButtonCusPrimary, ButtonCusSecondary} from '../../components/ButtonCus.tsx';

const itemStatus = (value: any) => {
  switch (value) {
    case 0:
      return 'Bình thường';
    case 1:
      return 'Sử dụng tốt';
    case 2:
      return 'Đợi sửa';
    case 4:
      return 'Lỗi chức năng';
    default:
      return '';
  }
};

export default function BorrowingScreen() {
  const [isActive, setIsActive] = useState(false);
  const [showStartDayPicker, setShowStartDayPicker] = useState(false);
  const [showEndDayPicker, setShowEndDayPicker] = useState(false);
  const [formInfo, setFormInfo] = useState<any>({
    start_day: new Date(),
    end_day: new Date(),
    items: [],
  });

  let device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const dispatch = useDispatch();
  const handleStopScanner = () => {
    setIsActive(false);
    dispatch(clearListBorrowing());
  };

  const onAddItem = ({id, itemName, roomName, quantity, itemStatus}: any) => {
    let listItem = formInfo.items.filter((item: any) => item.roomItemId !== id);

    listItem.push({
      roomItemId: id,
      itemName: itemName,
      roomName: roomName,
      quantity: quantity,
      itemStatus: itemStatus,
    });

    listItem = _.orderBy(listItem, ['roomItemId'], ['desc']);

    setFormInfo({...formInfo, items: listItem});
  };

  const onUpdateItem = ({id, quantity}: any) => {
    const index = formInfo.items.findIndex(
      (item: any) => item.roomItemId === id,
    );

    if (index !== -1) {
      let listItem = formInfo.items.filter(
        (item: any) => item.roomItemId !== id,
      );

      if (quantity < 1) {
        onDeleteItem(id);
      } else {
        listItem.push({...formInfo.items[index], quantity});
        listItem = _.orderBy(listItem, ['roomItemId'], ['desc']);
        setFormInfo({...formInfo, items: listItem});
      }
    }
  };

  const onDeleteItem = (id: any) => {
    const isExisted = formInfo.items.find(
      (item: any) => item.roomItemId === id,
    );

    if (isExisted) {
      Alert.alert('Xóa khỏi đơn mượn?', '', [
        {
          text: 'Đồng ý',
          onPress: () => {
            let listItem = formInfo.items.filter(
              (item: any) => item.roomItemId !== id,
            );
            listItem = _.orderBy(listItem, ['roomItemId'], ['desc']);
            setFormInfo({...formInfo, items: listItem});
          },
        },
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }
  };

  const onLoadRoomItem = (id: number) => {
    roomItemService
      .getDetailRoomItem(id)
      .then((result: any) => {
        if (result) {
          const isExisted = formInfo.items.find(
            (item: any) => item.roomItemId === result.id,
          );

          if (isExisted) {
            onUpdateItem({
              id: result.id,
              quantity: isExisted.quantity + 1,
            });
          } else {
            onAddItem({
              id: result.id,
              itemName: result.item.name,
              roomName: result.room.name,
              quantity: 1,
              itemStatus: result.status,
            });
          }
        }
      })
      .catch((err: any) => {
        Alert.alert('Bản ghi không tồn tại!');
        console.log(err);
      });
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes[0].value) {
        codes && setIsActive(false);
        const roomItemId = parseInt(codes[0].value);
        onLoadRoomItem(roomItemId);
        handleStopScanner();
        // Alert.alert('OKE', '', [
        //   {
        //     onPress: () =>
        //   },
        // ]);
      }
    },
  });

  useEffect(() => {
    if (isActive && !hasPermission) {
      requestPermission();
    }
  }, [hasPermission, isActive]);

  return (
    <>
      <TopNavigator />
      <VerticalNav />
      {isActive && hasPermission ? (
        device && (
          <Camera
            style={StyleSheet.absoluteFillObject}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
        )
      ) : (
        <>
          <View>
            <TouchableOpacity onPress={() => setShowStartDayPicker(true)}>
              <Text style={{color: 'black'}}>
                <Text>Ngày mượn:</Text>
                {formInfo.start_day.getDate()}/
                {formInfo.start_day.getMonth() + 1}/
                {formInfo.start_day.getFullYear()}{' '}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={showStartDayPicker}
              date={formInfo.start_day}
              onConfirm={(date: any) => {
                setShowStartDayPicker(false);
                setFormInfo({...formInfo, start_day: date});
              }}
              onCancel={() => {
                setShowStartDayPicker(false);
              }}
              mode="date"
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => setShowEndDayPicker(true)}>
              <Text style={{color: 'black'}}>
                <Text>Ngày trả:</Text>
                {formInfo.end_day.getDate()}/{formInfo.end_day.getMonth() + 1}/
                {formInfo.end_day.getFullYear()}{' '}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={showEndDayPicker}
              date={formInfo.end_day}
              onConfirm={(date: any) => {
                setShowEndDayPicker(false);
                setFormInfo({...formInfo, end_day: date});
              }}
              onCancel={() => {
                setShowEndDayPicker(false);
              }}
              mode="date"
            />
          </View>
          <View>
            {formInfo.items.length > 0 && (
              <FlatList
                data={[...formInfo.items]}
                numColumns={2}
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item}: any) => (
                  <View
                    style={{
                      margin: 5,
                      height: 'auto',
                      padding: 10,
                      display: 'flex',
                      borderRadius: 15,
                      alignItems: 'flex-start',
                      backgroundColor: '#FFFFFF',
                      width: maxWidth / 2 - 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 5,
                        top: 5,
                        padding: 5,
                        borderRadius: 8,
                        backgroundColor: 'red',
                      }}
                      onPress={() => onDeleteItem(item.roomItemId)}>
                      <CloseSolid width={14} height={14} />
                    </TouchableOpacity>
                    <View style={[ItemStyle.blockContent]}>
                      <Text style={[ItemStyle.title]}>Tên:</Text>
                      <Text
                        style={[ItemStyle.content, {flex: 1}]}
                        numberOfLines={1}>
                        {item.itemName}
                      </Text>
                    </View>
                    <View style={[ItemStyle.blockContent]}>
                      <Text style={[ItemStyle.title]}>Trạng thái:</Text>
                      <Text
                        style={[
                          ItemStyle.content,
                          {
                            color: 'black',
                          },
                        ]}
                        numberOfLines={1}>
                        {itemStatus(item.itemStatus)}
                      </Text>
                    </View>
                    <View
                      style={[
                        ItemStyle.blockContent,
                        {
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          width: '100%',
                        },
                      ]}>
                      <TouchableOpacity
                        onPress={() =>
                          onUpdateItem({
                            id: item.roomItemId,
                            quantity: item.quantity - 1,
                          })
                        }>
                        <RemoveCircleRegular width={18} height={18} />
                      </TouchableOpacity>
                      <TextInput
                        keyboardType={'numeric'}
                        onChangeText={(value: any) =>
                          onUpdateItem({id: item.roomItemId, quantity: value})
                        }
                        style={[
                          ItemStyle.content,
                          {
                            height: 40,
                            padding: 0,
                            margin: 0,
                            textAlign: 'center',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            borderStyle: 'solid',
                            color: 'green',
                            borderColor: 'gray',
                          },
                        ]}
                        defaultValue={`${item.quantity}`}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          onUpdateItem({
                            id: item.roomItemId,
                            quantity: item.quantity + 1,
                          })
                        }>
                        <AddCircleRegular width={18} height={18} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
          <View>
            <View style={[styles.verMgPrimary]}>
              <View style={[styles.btnPrimaryIcon, {zIndex: 999}]}>
                <AddCircleRegular width={14} height={14} />
              </View>

              <ButtonCusSecondary
                style={{
                  zIndex: 998,
                  color: '#ffffff',
                  backgroundColor: 'rgba(94,93,93,0.62)',
                }}
                title={'Thêm mới'}
                onPress={() => setIsActive(true)}
              />
            </View>
            <ButtonCusPrimary
              style={{
                width: 200,
                zIndex: 998,
                color: '#ffffff',
                backgroundColor: 'rgb(145,171,236)',
              }}
              title={'Xác nhận'}
              // onPress={() => }
            />
          </View>
        </>
      )}
    </>
  );
}
