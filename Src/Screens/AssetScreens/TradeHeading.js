import React from 'react'
import { View, Text } from 'react-native'
import ResponsiveText from '../../Components/RnText';
import { fonts } from '../../Constants/Fonts';

export default function TradeHeading({ title, top, right, bottom, left, ...props }) {
    return (
        <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} margin={[top, right, bottom, left]}>{title}</ResponsiveText>
    )
}
