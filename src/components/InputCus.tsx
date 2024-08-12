import { Text, TextInput, View } from "react-native";
import { InputStyle } from "../assets/styles/styles.module";

export default function InputCus({ hidden, placeholder, value, name, handleValue }: any) {
    return (
        <View style={[InputStyle.container]}>
            <TextInput
                placeholderTextColor={"white"}
                secureTextEntry={hidden}
                style={[InputStyle.placeholder]}
                placeholder={placeholder}
                value={value}
                onChangeText={(value: string) => handleValue(name, value)}
            />
        </View>
    )
}