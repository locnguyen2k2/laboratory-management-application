import {Text, View} from 'react-native';

export default function Pagination(props: any) {
  return (
    <View>
      <View></View>
      <View>
        <Text>{props.prevPage}</Text>
        <Text>/</Text>
        <Text>{props.nextPage}</Text>
      </View>
      <View></View>
    </View>
  );
}
