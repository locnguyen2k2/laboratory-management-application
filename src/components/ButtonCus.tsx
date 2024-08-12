import { Text, TouchableOpacity } from "react-native";
import { ButtonPrimaryStyle, ButtonSecondaryStyle, styles } from "../assets/styles/styles.module";

function ButtonCusPrimary({ ...props }: any) {
    return (
        <TouchableOpacity
            {...props}
            style={[ButtonPrimaryStyle.container, props.fixed && styles.btnPriFixedBottom]}
        >
            <Text style={[ButtonPrimaryStyle.title]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}


function ButtonCusSecondary({ ...props }: any) {
    return (
        <TouchableOpacity
            {...props}
            style={[ButtonSecondaryStyle.container, props.fixed && styles.btnSecFixedBottom]}
        >
            <Text style={[ButtonSecondaryStyle.title]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

export {
    ButtonCusPrimary,
    ButtonCusSecondary
}
