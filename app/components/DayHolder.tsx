import React from "react";
import {
    View,
    Text
} from "react-native";
import Colors from "./../constants/colors";

interface DayHolderProps{
    day: string
}

const DayHolder: React.FC<DayHolderProps> = ({day}) => {
    return (
        <View className="flex flex-1 justify-center items-center">
            <View className="mt-[10] ml-[100] mr-[100] p-[10] rounded-lg"
                backgroundColor={Colors.dayModal}>
                <Text className="text-sm font-[Roboto] text-black">
                    {day}
                </Text>
            </View>
        </View>
    )
};

export default DayHolder;