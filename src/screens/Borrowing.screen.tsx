import {StyleSheet, Alert } from "react-native";
import { useState } from "react";
import React from "react";
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import { useDispatch } from "react-redux";
import { clearListBorrowing } from "../redux/borrowingReducer/borrowingSlice";

export default function BorrowingScreen() {
    const [isActive, setIsActive] = useState(true);
    let device = useCameraDevice('back')
    const dispatch = useDispatch()
    const handleStopScanner = () => {
        setIsActive(true)
        dispatch(clearListBorrowing())
    }


    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            console.log(codes)
            codes && setIsActive(false);
            Alert.alert('OKE', '', [{
                onPress: () => handleStopScanner()
            }])
        }
    })

    return (
        <>
            {
                isActive ?
                    device && <Camera
                        style={StyleSheet.absoluteFillObject}
                        device={device}
                        isActive={true}
                        codeScanner={codeScanner}
                    />
                    :
                    ''
            }
        </>
    )
}

