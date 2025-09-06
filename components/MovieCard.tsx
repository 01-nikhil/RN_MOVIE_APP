import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

interface MovieCardProps {
  id?: number;
  title: string;
  poster_path?: string;
  poster_url?: string; // for saved movies
  release_date?: string;
  vote_average?: number;
  isSaved?: boolean;
  onSavePress?: () => void;
}

const MovieCard = ({
  id,
  title,
  poster_path,
  poster_url,
  release_date,
  vote_average,
}: MovieCardProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
    <TouchableOpacity className="w-[30%]">
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : poster_url ?? 'https://placehold.co/600x400/1a1a1a/ffffff.png',
        }}
        className="w-full h-52 rounded-2xl"
        resizeMode="cover"
      />
      <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
        {title}
      </Text>
      <View className="flex-row items-center gap-1">
        <Text className="text-white font-bold text-sm">
          {vote_average ? Math.round(vote_average / 2) : '-'}
        </Text>
      </View>
      <Text className="text-white text-xs font-bold mt-2">
        {release_date?.split('-')[0] ?? '-'}
      </Text>
    </TouchableOpacity>
    </Link>
  );
};


export default MovieCard
