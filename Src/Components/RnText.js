import React from 'react';
import {Text} from 'react-native';
import { Colors } from '../Constants/Colors';
import { fonts } from '../Constants/Fonts';
import {handleMargin, handlePadding} from '../Constants/theme';
import {wp} from '../Helpers/Responsiveness';

const ResponsiveText = ({
  children,
  color,
  size,
  fontFamily,
  margin,
  position,
  padding,
  numberOfLines,
  style,
  textAlign,
  cutText,
  alignSelf,

  //sizes
  ...props
}) => {
  return (
    <Text
      {...props}
      numberOfLines={numberOfLines}
      style={[
        {...styles.text},
        // props.style,
        size && styles[size] ? styles[size] : wp(size),
        margin ? handleMargin(margin) : undefined,
        padding ? handlePadding(padding) : undefined,
        alignSelf ? alignSelf : undefined,
        position && {alignSelf: position},
        textAlign && {textAlign: textAlign},
        cutText && {textDecorationLine: 'line-through'},

        {color: color ? color : Colors.black },
        {fontFamily: fontFamily ? fontFamily : fonts.Poppins},
      ]}>
      {children}
    </Text>
  );
};
const styles = {
  text: {
    fontFamily: fonts.Poppins,
    fontSize: wp(3.5),
  },
  h0: {fontSize: wp(13)},
  h1: {fontSize: wp(9)},
  h2: {fontSize: wp(8)},
  h3: {fontSize: wp(7)},
  h4: {fontSize: wp(6)},
  h5: {fontSize: wp(5)},
  h6: {fontSize: wp(4.5)},
  h7: {fontSize: wp(4)},
  h8: {fontSize: wp(3.5)},
  h9: {fontSize: wp(3)},
  h10: {fontSize: wp(2.5)},
  h11: {fontSize: wp(2.3)},
  h12: {fontSize: wp(2)},
  header: {fontSize: wp(4.3)},
};
export default ResponsiveText;
