import {Text, View} from 'react-native';
import {maxWidth} from '../constants/sizes';
import {ItemStyle} from '../assets/styles/ItemStyle.module';
import {styles} from '../assets/styles/styles.module.tsx';
import {useEffect} from 'react';
import {primaryTxtColor, thirdBgColor} from '../constants/colors.tsx';
import {FlaskRegular} from '../constants/icons.tsx';

export const itemStatus = (value: any) => {
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

export const borrowingStatus = (value: any) => {
  switch (value) {
    case 0:
      return 'Chờ duyệt';
    case 1:
      return 'Đã duyệt';
    case 2:
      return 'Đã hủy';
    case 3:
      return 'Đã trả';
    default:
      return '';
  }
};

const Item = ({item}: any) => {
  return (
    <View
      style={{
        margin: 5,
        height: 'auto',
        padding: 10,
        paddingTop: 26,
        display: 'flex',
        borderRadius: 15,
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: maxWidth / 2 - 10,
      }}>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Tên:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View
        style={[
          ItemStyle.blockContent,
          {
            position: 'absolute',
            top: 0,
            right: 0,
            borderTopEndRadius: 8,
            borderBottomLeftRadius: 8,
            backgroundColor:
              item.status === 0
                ? 'orange'
                : item.status === 1
                ? 'green'
                : item.status === 2
                ? 'red'
                : 'gray',
          },
        ]}>
        <Text
          style={[ItemStyle.content, {color: primaryTxtColor}]}
          numberOfLines={1}>
          {itemStatus(item.status)}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Đã bàn giao:</Text>
        <Text
          style={[
            ItemStyle.content,
            {
              borderWidth: 0.5,
              borderRadius: 8,
              borderStyle: 'solid',
              color: item.handover > 0 ? 'green' : 'gray',
              borderColor: item.handover > 0 ? 'green' : 'gray',
            },
          ]}
          numberOfLines={1}>
          {item.handover} / {item.quantity}
        </Text>
      </View>
    </View>
  );
};

const Category = ({isActive, item}: any) => {
  useEffect(() => {}, [isActive]);
  return (
    <View
      style={{
        borderRadius: 15,
        marginHorizontal: 5,
        width: maxWidth / 3 - 10,
        backgroundColor: isActive === item.id ? thirdBgColor : '#FFFFFF',
      }}>
      <View style={[ItemStyle.blockContent, styles.midCenter]}>
        <Text
          style={[
            ItemStyle.content,
            {color: isActive === item.id ? 'white' : 'black'},
          ]}
          numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </View>
  );
};

const Room = ({item}: any) => {
  return (
    <View
      style={{
        margin: 5,
        height: 'auto',
        padding: 10,
        paddingTop: 26,
        display: 'flex',
        borderRadius: 15,
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: maxWidth / 2 - 10,
      }}>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Tên:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View
        style={[
          ItemStyle.blockContent,
          {
            position: 'absolute',
            top: 0,
            right: 0,
            borderTopEndRadius: 8,
            borderBottomLeftRadius: 8,
            backgroundColor: item.quantity > 0 ? 'green' : 'gray',
          },
        ]}>
        <View style={{paddingHorizontal: 5}}>
          <FlaskRegular width={18} height={18} />
        </View>
        <Text
          style={[ItemStyle.content, {color: primaryTxtColor}]}
          numberOfLines={1}>
          {item.quantity}
        </Text>
      </View>
    </View>
  );
};

const Borrow = ({item}: any) => {
  return (
    <View
      style={{
        margin: 5,
        height: 'auto',
        padding: 10,
        paddingTop: 26,
        display: 'flex',
        borderRadius: 15,
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: maxWidth / 2 - 10,
      }}>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Mã phiếu mượn:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.registration.id}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Số lượng:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.items.length}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Tổng:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.items.reduce(
            (acc: number, item: any) => acc + item.quantity,
            0,
          )}
        </Text>
      </View>
      <View
        style={[
          ItemStyle.blockContent,
          {
            position: 'absolute',
            top: 0,
            right: 0,
            paddingVertical: 0,
          },
        ]}>
        <View
          style={[
            ItemStyle.blockContent,
            {
              borderBottomLeftRadius: 8,
              borderBottomEndRadius: -2,
              backgroundColor:
                item.registration.status === 0
                  ? 'orange'
                  : item.registration.status === 1
                  ? 'green'
                  : item.registration.status === 2
                  ? 'red'
                  : 'gray',
            },
          ]}>
          <Text
            style={[ItemStyle.content, {color: primaryTxtColor}]}
            numberOfLines={1}>
            {borrowingStatus(item.registration.status)}
          </Text>
        </View>
        <View
          style={[
            ItemStyle.blockContent,
            {
              borderTopEndRadius: 8,
              backgroundColor: '#91abec',
            },
          ]}>
          <Text
            style={[ItemStyle.content, {color: primaryTxtColor}]}
            numberOfLines={1}>
            {item.registration.createdAt.split('T')[0]}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default {
  Item,
  Borrow,
  Category,
  Room,
};
