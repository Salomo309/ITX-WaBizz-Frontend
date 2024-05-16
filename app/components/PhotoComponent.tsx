import React, { useEffect, useState } from "react";
import {
    View,
    Image,
} from "react-native";

interface PhotoComponentProps {
    key: number;
    fileUrl: string;
}
  
const PhotoComponent: React.FC<PhotoComponentProps> = ({ fileUrl }) => {
    return (
        <View style={{ padding: 10, backgroundColor: 'white' }}>
            <Image
                source={{ uri: fileUrl }} // Assuming fileUrl is a URL
                style={{ width: 100, height: 100 }} // Use style prop instead of className
            />
        </View>
    );
}

export default PhotoComponent