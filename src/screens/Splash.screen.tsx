import { useEffect, useState } from "react";
import { CtuetLogo, PrimaryBg } from "../constants/images";
import { maxWidth, maxHeight } from "../constants/sizes";
import * as RootNavigation from './../helps/RootNavigation';
import { useDispatch } from "react-redux";
import { jwtManager } from "../helps/jwtManager";
import { setUser } from "../redux/userReducer/userSlice";
import { authService } from "../services/auth.service";
import { Image, View, ActivityIndicator } from "react-native";

export default function SplashScreen() {
    const [token, setToken] = useState<string | null>(null)
    const dispatch = useDispatch()
    const loadToken = async () => {
        if ((await jwtManager).get()) {
            setToken(`${(await jwtManager).get()}`)
            return token
        } else {
            RootNavigation.navigate('Login')
        }
    }
    useEffect(() => {
        setTimeout(async () => {
            await loadToken()
                .then(async (token: any) => {
                    if (token) {
                        await authService.getProfile()
                            .then(async (res: any) => {
                                dispatch(setUser(res))
                                RootNavigation.navigate('Home')
                            })
                            .catch(async (error: any) => {
                                (await jwtManager).clear()
                                RootNavigation.navigate('Login')
                            })
                    }
                })
        }, 1700);
    }, [token])
    return (
        <View
            style={{
                flex: 1,
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image
                source={CtuetLogo}
                style={{
                    width: 114,
                    height: 114,
                    zIndex: 999,
                    top: '-25%'
                }}
            />
            <ActivityIndicator style={{ zIndex: 999 }} size="large" color="#0000ff" />
            <PrimaryBg
                style={{
                    position: 'absolute',
                }}
                width={maxWidth}
                height={maxHeight}
            />
        </View>
    )
}