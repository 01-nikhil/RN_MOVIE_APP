import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useEffect } from "react";
import { getTrendingMovies, updateSearchCount } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router=useRouter()

  const {
    data:trendingMovies,
    loading:trendingLoading,
    error:trendingError
  }=useFetch(getTrendingMovies)

  const {data :movies,
        loading:moviesLoading,
        error:moviesError
      }= useFetch(()=>
    fetchMovies({
      query:""
    }));
  
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" resizeMode="cover"/>
    <SafeAreaView className="flex-1">

      <ScrollView className="flex-1 px-5" 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{
            minHeight:'100%',
            paddingBottom:10
      }}>
      <Image source={icons.logo} className="w-20 h-20 mx-auto mt-20 mb-5 rounded-full"/>

      {moviesLoading || trendingLoading?( 
        <ActivityIndicator
          size="large"
          color="#000ff"
          className="mt-10 self-center"/>
        ): moviesError || trendingError?(
          <Text>Error:{moviesError?.message}||{trendingError?.message}</Text>
        ):(
          
          <View className="flex-1 mt-5">

          {trendingMovies && (
            <View className="mb-3">
              <Text className="text-white text-lg font-bold ">Trending Movies</Text>
            </View>
          )}
        <>
          <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={()=><View className="w-4"/>}
          className="mb-4 mt-6"
          data={trendingMovies}
          renderItem={({item,index})=>(
            <TrendingCard movie={item} index={index}/>
          )}
          keyExtractor={(item)=>item.movie_id.toString()}
          />


          <Text  className="text-lg text-white font-bold mt-5 mb-10">Latest Movies</Text>


        <FlatList
          data={movies??[]}
          renderItem={({item})=>(
            <MovieCard
              {...item}
              />
            )}
            keyExtractor={(item)=>item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
          justifyContent:'flex-start',
          gap:20,
          paddingRight:5,
          marginBottom:20
        }}
        className="mt-2 pb-32"
        scrollEnabled={false}

        />


        </>

      </View>
      ) }

      </ScrollView>
        </SafeAreaView>
    </View>
  );
}
