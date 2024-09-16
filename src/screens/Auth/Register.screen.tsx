import {View, Text, TouchableOpacity} from 'react-native';
import {navigate} from '../../helps/RootNavigation';

export default function RegisterScreen() {
  return (
    <View>
      <Text>Sign up</Text>
      <TouchableOpacity onPress={() => navigate('Login')}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
