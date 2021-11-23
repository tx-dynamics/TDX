import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5ProIcon from 'react-native-vector-icons/FontAwesome5Pro';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useTheme } from 'react-native-paper';

const fontIcon = ({type, name, size, color, ...props}) => {
    // const theme = useTheme();
    switch (type) {
        case "MaterialCommunityIcons": return <MaterialCommunityIcons name={name} size={size || 16} color={color || '#fff'}  {...props}/>
        case "AntDesign": return <AntDesignIcon name={name} size={size || 16} color={color || '#fff'} {...props} />
        case "Entypo": return <EntypoIcon name={name} size={size || 16} color={color || '#fff'} {...props}/>
        case "EvilIcons": return <EvilIconsIcon name={name} size={size || 16} color={color || '#fff'} {...props}/>
        case "Feather": return <FeatherIcon name={name} size={size || 16} color={color || '#fff'} {...props}/>
        case "FontAwesome": return <FontAwesomeIcon name={name} size={size || 16} color={color || '#fff'} {...props}/>
        case "FontAwesome5": return <FontAwesome5Icon name={name} size={size || 16} color={color || '#fff'} {...props}/>
        case "FontAwesome5Pro": return <FontAwesome5ProIcon name={name} size={size || 16} color={color || '#fff'} {...props}/>
        case "Fontisto": return <FontistoIcon name={name} size={size || 16} color={color || '#fff'} />
        case "Material": case "MaterialIcons": return <MaterialIcon name={name} size={size || 16} color={color || '#fff'} {...props}/>
        case "Ionicons": return <Ionicons name={name} size={size || 16} color={color || '#fff'} {...props}/>
        default: return <Ionicons name={name} size={size || 16} color={color || '#fff'} />
    }
}

export default fontIcon