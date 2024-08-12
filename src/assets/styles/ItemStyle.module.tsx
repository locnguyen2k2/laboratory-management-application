import { StyleSheet } from "react-native";
import { fsPrimary, horMgPrimary, inpHPrimary, inpWPrimary, radPrimary } from "../../constants/sizes";

export const ItemStyle = StyleSheet.create({
    blockContent: {
        paddingVertical: 3,
        // paddingHorizontal: 2,
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontSize: 14,
        marginRight: 3,
        color: '#000000',
    },
    content: {
        color: 'black',
        paddingHorizontal: 3,
        fontSize: 14,
        textAlign: 'left',
    }
})