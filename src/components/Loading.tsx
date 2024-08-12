import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { getLoading } from "../redux/loadingSlice";
import { useEffect, useState } from "react";
import { styles } from "../assets/styles/styles.module";
import { maxHeight, maxWidth } from "../constants/sizes";

export function Loading() {
    const isLoading = useSelector(getLoading)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading])
    return (
        <>
            {
                loading ?
                    <View
                        style={[styles.fullMiddle, styles.modelForm]}
                    >
                        <ActivityIndicator style={{ zIndex: 999 }} size="large" color="#0000ff" />
                    </View>
                    :
                    <>
                    </>
            }
        </>
    )
}