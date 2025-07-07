import React from 'react';
import { View } from 'react-native';

// The LottieAnimation component has been temporarily disabled to resolve a dependency conflict.
const LottieAnimation = ({ style }) => {
  return <View style={style} />;
};

export default LottieAnimation;

/*
import React from "react";
import LottieView from "lottie-react-native";

const LottieAnimation = ({
  source,
  autoPlay = true,
  loop = true,
  style,
  ...props
}) => {
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      style={style}
      {...props}
    />
  );
};

export default LottieAnimation;
*/
