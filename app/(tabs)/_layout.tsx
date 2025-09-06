import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const _layout = () => {

    const TabIcon=({focused,icon,title}:any)=>{
        if(focused){
            return (
                <ImageBackground source={images.highlight}
                className='flex flex-row w-full flex-1 min-w-[165px] min-h-16 mt-4 items-center justify-center rounded-full overflow-hidden'>
                <Image source={icon}
                tintColor='#151312' className='size-5'/>
                <Text className='font-montserrat text-base font-semibold ml-2' >{title}</Text>
            </ImageBackground>
            )
        }

        return (
            <View className='size-full items-center justify-center rounded-full mt-4'>
                <Image 
                source={icon} tintColor="#A8B5D8" className='size-5'/>
            </View>
        )
    }

  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel:false,
            tabBarItemStyle:{
                width:'100%',
                height:'100%',
                justifyContent:'center',
                alignItems:'center'
            },
            tabBarStyle:{
                backgroundColor:'#0F0D23',
                borderRadius:50,
                marginHorizontal:20,
                marginBottom:36,
                height:55,
                position:'absolute',
                borderWidth:1,
                overflow:'hidden'                
            }
        }
            
        }
    >
        <Tabs.Screen
            name='index'
            options={{
                title:'Home',
                headerShown:false,
                tabBarIcon:({focused})=> (
                    <TabIcon
                    focused={focused}
                    icon={icons.home}
                    title="Home"
                    />
                )
            }
            }
        />
        <Tabs.Screen
            name='search'
            options={{
                title:'Search',
                headerShown:false,
                 tabBarIcon:({focused})=> (
                    <TabIcon
                    focused={focused}
                    icon={icons.search}
                    title="Search"
                    />
                )
            }
            }
        />
        <Tabs.Screen
            name='saved'
            options={{
                title:'Saved',
                headerShown:false,
                 tabBarIcon:({focused})=> (
                    <TabIcon
                    focused={focused}
                    icon={icons.save}
                    title="Saved"
                    />
                )
            }
            }
        />
        <Tabs.Screen
            name='profile'
            options={{
                title:'Profile',
                headerShown:false,
                 tabBarIcon:({focused})=> (
                    <TabIcon
                    focused={focused}
                    icon={icons.person}
                    title="Profile"
                    />
                )
            }
            }
        />
    </Tabs>
  )
}

export default _layout