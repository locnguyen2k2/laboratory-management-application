import {Animated, FlatList, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {maxHeight, maxWidth} from '../constants/sizes.tsx';
import {useEffect} from 'react';
import {Easing} from 'react-native-reanimated';

const AnimatedSkeleton = Animated.createAnimatedComponent(LinearGradient);

function Element(props: any) {
  const defaultStyles = StyleSheet.create({
    style: {
      borderRadius: 20,
      overflow: 'hidden',
      position: 'relative',
      height: props.height,
      borderColor: '#b0b0b0',
      backgroundColor: '#a0a0a0',
    },
  });
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-maxWidth, maxWidth],
  });

  return (
    <>
      {(props.index + 1) % 2 !== 0 ? (
        <View
          style={[
            {
              margin: 5,
              width: props.width,
            },
            defaultStyles.style,
          ]}>
          <AnimatedSkeleton
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
            style={[
              StyleSheet.absoluteFill,
              {transform: [{translateX: translateX}]},
            ]}
          />
        </View>
      ) : (
        <View style={{flexDirection: 'row', width: props.width}}>
          <View
            style={[
              {
                flex: 0.7,
                marginRight: 5,
                marginVertical: 5,
              },
              defaultStyles.style,
            ]}>
            <AnimatedSkeleton
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[StyleSheet.absoluteFill, {transform: [{translateX}]}]}
              colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
            />
          </View>
          <View
            style={[
              {
                flex: 0.3,
                marginLeft: 5,
                marginVertical: 5,
              },
              defaultStyles.style,
            ]}>
            <AnimatedSkeleton
              start={{x: 0, y: 0}}
              style={[
                StyleSheet.absoluteFill,
                {transform: [{translateX: translateX}]},
              ]}
              end={{x: 1, y: 0}}
              colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
            />
          </View>
        </View>
      )}
    </>
  );
}

export default function Skeleton({row, length, width, height}: any) {
  const arr = new Array(length);

  return (
    <FlatList
      style={{
        position: 'absolute',
        top: 0,
        width: maxWidth,
        height: maxHeight - 45,
        backgroundColor: '#F0F0F0',
      }}
      data={[...arr]}
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
      }}
      nestedScrollEnabled={true}
      horizontal={row ? true : false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({index}) => (
        <Element index={index} width={width} height={height} />
      )}
    />
  );
}
