import React, { useRef, useEffect } from 'react';
import { Animated} from 'react-native';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;
export const FadeInView: React.FC<FadeInViewProps> = props => {
    const rightValue = useRef(new Animated.Value(-150)).current;

    useEffect(() => {
        Animated.timing(rightValue, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [rightValue]);

    const animatedStyle = {
        right: rightValue,
        opacity: rightValue.interpolate({
            inputRange: [-150, 0],
            outputRange: [0, 1],
        }),
    };


    return (
        <Animated.View
            style={[props.style, animatedStyle]}>
            {props.children}
        </Animated.View>
    );
};