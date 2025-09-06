import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard'
import { useFetch } from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import SearchBar from './SearchBar'
import { useFocusEffect } from 'expo-router'
import { updateSearchCount } from '@/services/appwrite'

const SearchScreen = () => {

    const[searchQuery,setSearchQuery]=useState('');

  const flatListRef = useRef<FlatList>(null);

useFocusEffect(
  useCallback(() => {
    // when screen comes into focus, scroll to top
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  }, [])
);
    
  const {
    data:movies,
    loading:moviesLoading,
    refetch:loadMovies,
    reset:resetMovies,
    error:moviesError
    }=useFetch(()=>
        fetchMovies({query:searchQuery}),false)
      
      useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        resetMovies();
      }
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  useEffect(()=>{
     // only call updateSearchCount if we have movies
        if (movies?.[0] && movies?.length > 0) {
           updateSearchCount(searchQuery, movies[0]);
        } 
        else {
          console.log("No movies yet, skipping updateSearchCount");
        }
  },[movies])

  useEffect(()=>{
    setSearchQuery("")
  },[])

  return (
    <View className='flex-1 bg-primary'>
      <Image
      source={images.bg} className='flex-1 absolute w-full'/>

      <FlatList
      ref={flatListRef}
      data={movies??[]}
      renderItem={({item})=>
      <MovieCard {...item}/>
      }

      keyExtractor={(item)=>item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{
        justifyContent:'center',
        gap:16,
        marginVertical:16
      }
      }
      contentContainerStyle={{paddingBottom:100}}



      ListHeaderComponent={
        <>
            <View className='w-full flex-row mt-20  items-center justify-center'>
                <Image source={icons.person} className='w-12 h-10'></Image>
            </View>
            <View className='my-5'>
                <SearchBar 
                value={searchQuery}
                onChangeText={(text:string)=>setSearchQuery(text)}
                onPress={()=>{}}
                placeHolder="Search movies..."/>
        

            </View>

            {moviesLoading&&(
                <ActivityIndicator size="large" color="#000ff" className='my-3' />
            )}

            {moviesError&&(
                <Text className='text-red-500 px-5 my-3'>
                    Error:{moviesError.message}
                </Text>
            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length>0&&(
                <Text className='text-lg font-bold text-gray-200'>
                    Search Results for{' '}
                    <Text className='font-semibold text-accent'>{searchQuery}</Text>
                </Text>
            )}

            
        </>
      }
       
      ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="flex-1 items-center justify-center mt-20">
              {searchQuery.trim() ? (
                <Text className="text-lg text-gray-400 font-semibold">
                  No movies found for{' '}
                  <Text className="text-accent">"{searchQuery}"</Text>
                </Text>
              ) : (
                <Text className="text-lg text-gray-400 font-semibold opacity-70">
                  Looking for something..? Kuttaa is watching you 😘
                </Text>
              )}
            </View>
          ) : null
        }

      />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})