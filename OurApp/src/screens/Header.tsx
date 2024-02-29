import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../constants/colors';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>ITX WABizz</Text>
      <View style={styles.rightIcons}>
        <Icon name="search" size={30} color={Colors.white} style={styles.icon}/>
        <Icon2 name="account-circle" size={30} color={Colors.white}/>
{/*           <TouchableOpacity> */}
{/*             <Ionicons name="search" size={24} color={Colors.primary} /> */}
{/*           </TouchableOpacity> */}
{/*         <TouchableOpacity> */}
{/*           <Ionicons name="person" size={24} color={Colors.primary} /> */}
{/*         </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  },
  icon: {
    marginRight: 10,
  }
});

export default Header;
