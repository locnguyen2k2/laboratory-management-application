import { Text, TouchableOpacity, View } from "react-native";
import { jwtManager } from "../helps/jwtManager";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser, setUser } from "../redux/userReducer/userSlice";
import * as RootNavigation from './../helps/RootNavigation'
import { ButtonCusPrimary, ButtonCusSecondary } from "../components/ButtonCus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces/User.interface";
import { styles } from "../assets/styles/styles.module";
import { LinearGradient } from "react-native-linear-gradient";
import { inpWPrimary, maxWidth, radPrimary } from "../constants/sizes";
import { faUber } from "@fortawesome/free-brands-svg-icons";

export default function Profile() {
    const [userInfo, setUserInfo] = useState<IUser>()
    const selectUserInfo = useSelector(selectUser)
    const dispatch = useDispatch()
    const handleLogout = async () => {
        ((await jwtManager).clear())
        dispatch(clearUser())
        RootNavigation.navigate('Login')
    }
    useEffect(() => {
        setUserInfo(selectUserInfo)
    }, [selectUserInfo])
    return (
        <View style={[{ flex: 1 }]}>
            <LinearGradient colors={['#5b74b3', '#7e91c3', '#F9F9F9']}>
                <View style={[{
                    width: maxWidth,
                    height: 200,
                    alignItems: 'center'
                }]}>
                    <View style={[{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 82,
                        width: 350,
                        height: 69,
                        borderRadius: radPrimary,
                        backgroundColor: '#FFFFFF'
                    }]}>
                        <View style={[styles.justMiddle, {
                            width: 55,
                            height: 55,
                            marginLeft: 10,
                            marginRight: 7,
                            borderRadius: 35,
                            backgroundColor: 'yellow',
                        }]}>
                            <FontAwesomeIcon size={32} color="black" icon={faUser} />
                        </View>
                        {
                            userInfo ?
                                <>
                                    <View style={[{ width: '67%' }]}>
                                        <Text style={[styles.txtPrimaryColor]}>{userInfo.firstName} {userInfo.lastName}</Text>
                                        <Text style={[styles.txtPrimaryColor]} numberOfLines={1}>{userInfo.email}</Text>
                                    </View>
                                    <TouchableOpacity style={{ position: 'absolute', right: 0, padding: 5 }}>
                                        <FontAwesomeIcon size={24} color="black" icon={faArrowRight} />
                                    </TouchableOpacity>
                                </>
                                : <></>
                        }
                    </View>
                    <View>
                        <Text style={[styles.txtPrimaryColor]}>Cài đặt</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faUber} size={32} />
                            <Text>Cập nhật thông tin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faUber} size={32} />
                            <Text>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faUber} size={32} />
                            <Text>Nhận thông báo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faUber} size={32} />
                            <Text>Giao diện tối</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faUber} size={32} />
                            <Text>Ngôn ngữ/Languague</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faUber} size={32} />
                            <Text>Thông tin ứng dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <View style={[{ position: 'absolute', bottom: 0, left: '50%', transform: [{ translateX: -(inpWPrimary / 2) }] }]}>
                <ButtonCusPrimary
                    title="Đăng xuất"
                    onPress={handleLogout}
                />
            </View>
        </View>
    )
}