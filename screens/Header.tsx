import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../constants/colors';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({  }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>ITX WABizz</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="search-outline" size={24} color={Colors.white} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="person-circle-outline" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 60,
    backgroundColor: Colors.primary1,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  }
});

export default Header;
