import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getSavedMovies, unsaveMovie } from "@/services/appwrite"; // ✅ add unsaveMovie
import MovieCard from "@/components/MovieCard";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { images } from "@/constants/images";

const Saved = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  const loadMovies = async () => {
    setLoading(true);
    const data = await getSavedMovies();
    setMovies(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadMovies();
    }, [])
  );

  // ✅ remove instantly when unsaved
  const handleUnsave = async (id: number) => {
    try {
      await unsaveMovie(id);
      setMovies((prev) => prev.filter((m) => m.movie_id !== id));
    } catch (err) {
      console.error("Failed to unsave movie:", err);
    }
  };

  if (loading) {
  return (
    <SafeAreaView className="flex-1 bg-primary items-center justify-center">
      <ActivityIndicator color="#fff" />
    </SafeAreaView>
  );
}

  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="w-full absolute" resizeMode="cover"/>
  
    <SafeAreaView className=" flex-1 px-5 py-10">
      <FlatList
        data={movies}
        numColumns={3}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <MovieCard
            id={item.movie_id}
            title={item.title}
            poster_url={item.poster_url}
            vote_average={item.vote_average}
            release_date={item.release_date}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap:20,
          paddingRight:5,
          marginBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
     </SafeAreaView>
    </View>
  );
};

export default Saved;
