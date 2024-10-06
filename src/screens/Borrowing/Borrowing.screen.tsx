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
import {isArray} from 'lodash';
import {styles} from '../../assets/styles/styles.module.tsx';
import {ButtonCusPrimary} from '../../components/ButtonCus.tsx';
import {borrowedService} from '../../services/borrowed.service.tsx';
import {setLoading} from '../../redux/loadingSlice.tsx';
import {primaryTxtColor} from '../../constants/colors.tsx';

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

  const onCreateBorrowing = (data: any) => {
    dispatch(setLoading(true));
    borrowedService
      .createBorrowing(data)
      .then((result: any) => {
        if (result && result.registration) {
          Alert.alert('Tạo đơn mượn thành công!');
          setFormInfo({...formInfo, items: []});
          dispatch(setLoading(false));
        }
      })
      .catch((error: any) => {
        dispatch(setLoading(false));
        console.log(error);
        Alert.alert(isArray(error) ? error[0] : error);
      });
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
      <TopNavigator title={'Mượn trang thiết bị'} />
      <VerticalNav />
      {isActive && hasPermission ? (
        device && (
          <>
            <Camera
              style={StyleSheet.absoluteFillObject}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
            />
            <ButtonCusPrimary
              style={{
                position: 'absolute',
                bottom: 20,
                left: maxWidth / 2 - 40,
                borderWidth: 0,
                borderRadius: 8,
                zIndex: 998,
                width: 80,
                height: 40,
                color: primaryTxtColor,
                backgroundColor: 'rgb(128,34,34)',
              }}
              title={'Hủy'}
              onPress={() => setIsActive(false)}
            />
          </>
        )
      ) : (
        <>
          <View
            style={[
              ItemStyle.blockContent,
              {justifyContent: 'space-between', marginHorizontal: 5},
            ]}>
            <View
              style={[
                styles.midBetween,
                {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 5,
                  borderRadius: 8,
                  width: maxWidth / 2 - 10,
                  backgroundColor: '#FFFFFF',
                },
              ]}>
              <TouchableOpacity
                style={[ItemStyle.blockContent]}
                onPress={() => setShowStartDayPicker(true)}>
                <Text style={[ItemStyle.title]}>Ngày mượn:</Text>
                <Text style={[ItemStyle.content]}>
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
                  date.setHours(23, 59, 59, 59);
                  setShowStartDayPicker(false);
                  setFormInfo({...formInfo, start_day: date});
                }}
                onCancel={() => {
                  setShowStartDayPicker(false);
                }}
                mode="date"
              />
            </View>
            <View
              style={[
                styles.midBetween,
                {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 5,
                  borderRadius: 8,
                  width: maxWidth / 2 - 10,
                  backgroundColor: '#FFFFFF',
                },
              ]}>
              <TouchableOpacity
                style={[ItemStyle.blockContent]}
                onPress={() => setShowEndDayPicker(true)}>
                <Text style={[ItemStyle.title]}>Ngày trả:</Text>
                <Text style={[ItemStyle.content]}>
                  {formInfo.end_day.getDate()}/{formInfo.end_day.getMonth() + 1}
                  /{formInfo.end_day.getFullYear()}{' '}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={showEndDayPicker}
                date={formInfo.end_day}
                onConfirm={(date: any) => {
                  date.setHours(23, 59, 59, 59);
                  setShowEndDayPicker(false);
                  setFormInfo({...formInfo, end_day: date});
                }}
                onCancel={() => {
                  setShowEndDayPicker(false);
                }}
                mode="date"
              />
            </View>
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
                      paddingTop: 25,
                      display: 'flex',
                      borderRadius: 15,
                      alignItems: 'flex-start',
                      backgroundColor: '#FFFFFF',
                      width: maxWidth / 2 - 10,
                    }}>
                    <View
                      style={[
                        ItemStyle.blockContent,
                        {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          borderTopLeftRadius: 8,
                          borderBottomEndRadius: 8,
                          backgroundColor:
                            item.itemStatus === 0
                              ? 'orange'
                              : item.itemStatus === 1
                              ? 'green'
                              : item.itemStatus === 2
                              ? 'red'
                              : 'gray',
                        },
                      ]}>
                      <Text
                        style={[ItemStyle.content, {color: primaryTxtColor}]}
                        numberOfLines={1}>
                        {itemStatus(item.itemStatus)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 5,
                        top: 5,
                        padding: 5,
                        borderWidth: 1.2,
                        borderColor: '#802222',
                        borderRadius: 8,
                        backgroundColor: '#ffffff',
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
            <TouchableOpacity
              onPress={() => setIsActive(!isActive)}
              style={[
                styles.midCenter,
                {
                  margin: 10,
                  width: 32,
                  height: 32,
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: '#adfab7',
                },
              ]}>
              <AddCircleRegular width={20} height={20} />
            </TouchableOpacity>
          </View>
          <View style={[ItemStyle.blockContent, {justifyContent: 'center'}]}>
            <ButtonCusPrimary
              style={{
                width: 200,
                zIndex: 998,
                color: '#ffffff',
                borderWidth: 0,
                borderRadius: 8,
                backgroundColor: 'rgb(145,171,236)',
              }}
              title={'Xác nhận'}
              onPress={() =>
                onCreateBorrowing({
                  items: formInfo.items.map((item: any) => {
                    return {
                      roomItemId: item.roomItemId,
                      quantity: item.quantity,
                      itemStatus: item.itemStatus,
                    };
                  }),
                  start_day: new Date(formInfo.start_day).valueOf(),
                  end_day: new Date(formInfo.end_day).valueOf(),
                })
              }
            />
          </View>
        </>
      )}
    </>
  );
}
