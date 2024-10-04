import {Text, View} from 'react-native';
import {maxWidth} from '../constants/sizes';
import {ItemStyle} from '../assets/styles/ItemStyle.module';
import {styles} from '../assets/styles/styles.module.tsx';
import {useEffect} from 'react';
import {thirdBgColor} from '../constants/colors.tsx';

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
      <View style={[ItemStyle.blockContent, styles.justMiddle]}>
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

const Borrow = ({item}: any) => {
  return (
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
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Mã phiếu mượn:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.registration.id}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Ngày tạo:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.registration.createdAt}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Trạng thái:</Text>
        <Text
          style={[
            ItemStyle.content,
            {
              borderWidth: 1,
              borderRadius: 8,
              borderStyle: 'solid',
              color:
                item.registration.status === 0
                  ? 'orange'
                  : item.registration.status === 1
                  ? 'green'
                  : item.registration.status === 2
                  ? 'red'
                  : 'gray',
              borderColor:
                item.registration.status === 0
                  ? 'orange'
                  : item.registration.status === 1
                  ? 'green'
                  : item.registration.status === 2
                  ? 'red'
                  : 'gray',
            },
          ]}
          numberOfLines={1}>
          {borrowingStatus(item.registration.status)}
        </Text>
      </View>
    </View>
  );
};

export default {
  Item,
  Borrow,
  Category,
};
