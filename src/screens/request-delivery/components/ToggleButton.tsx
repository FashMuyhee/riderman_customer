import {View, Text} from 'react-native';
import React, {useState} from 'react';
import XIcon from '@components/icons/x';
import Animated, {useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring, interpolate, runOnJS} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {wp} from '@utils/responsive';

type Props = {
  onToggle: (state: boolean) => void;
};

const BTN_WIDTH = wp(90);
const BTN_PAD = 5;
const START_POS = 47 + BTN_PAD;
const END_POS = BTN_WIDTH - 2 - START_POS - BTN_PAD;

const ToggleButton = (props: Props) => {
  const animateVal = useSharedValue(0);
  const context = useSharedValue(false);
  const [toggle, setToggle] = useState(false);

  const handleToggle = (toggle: boolean) => {
    setToggle(toggle);
    props.onToggle(toggle);
  };
  const animateOnDrag = useAnimatedGestureHandler({
    onStart: () => {
      context.value = toggle;
    },
    onActive: e => {
      let newPos;
      if (context.value) {
        newPos = END_POS + e.translationX;
      } else {
        newPos = e.translationX;
      }
      if (newPos >= 0 && newPos <= END_POS) {
        animateVal.value = newPos;
      }
    },
    onEnd: () => {
      if (animateVal.value < BTN_WIDTH / 2 - 10) {
        animateVal.value = 0;
        runOnJS(handleToggle)(false);
      } else if (animateVal.value < END_POS) {
        animateVal.value = END_POS;
        runOnJS(handleToggle)(true);
      }
    },
  });

  const toggleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(animateVal.value, {stiffness: 40, velocity: 20})}],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const translateX = interpolate(animateVal.value, [0, END_POS], [0, START_POS * 2 + START_POS]);
    const opacity = interpolate(animateVal.value, [0, END_POS], [0.8, 0]);
    return {
      transform: [{translateX}],
      opacity,
    };
  });

  const statusBg = useAnimatedStyle(() => {
    const opacity = interpolate(animateVal.value, [0, END_POS], [0, 1]);
    return {
      width: withSpring(animateVal.value + START_POS + BTN_PAD, {stiffness: 40, velocity: 20}),
      opacity
    };
  });

  return (
    <View
      style={{
        paddingHorizontal: BTN_PAD,
        justifyContent: 'center',
        marginTop: 10,
        width: BTN_WIDTH,
        height: 55,
        borderRadius: 55,
        backgroundColor: 'rgba(161, 169, 197, 0.13)',
        alignItems: 'center',
      }}>
      <Animated.View style={[statusBg, {backgroundColor: '#FF3E7A', height: 55, borderRadius: 55, position: 'absolute', left: 0}]} />
      <PanGestureHandler onGestureEvent={animateOnDrag}>
        <Animated.View style={[toggleStyle, {height: 47, width: 47, alignItems: 'center', justifyContent: 'center', borderRadius: 45, backgroundColor: 'white', position: 'absolute', left: BTN_PAD}]}>
          <XIcon />
        </Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[textStyle, {color: '#A1A9C5', textAlign: 'center', zIndex: -1}]}>Swipe To Cancel</Animated.Text>
    </View>
  );
};

export default ToggleButton;
