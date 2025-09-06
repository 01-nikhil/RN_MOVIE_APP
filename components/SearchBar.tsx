import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props{
    placeHolder:string,
    onPress:()=>void;
    value?:string,
    onChangeText?:(text:string)=>void;
}
const SearchBar = ({placeHolder,onPress,value,onChangeText}:Props) => {
  return (

    <View className='flex-row items-center px-5 h-20 rounded-full '>
        <Image source={icons.search} className='size-5'/>
        <TextInput
        onPress={onPress}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#a8b5db"
        className='flex-1 ml-2 text-white'
        />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})