import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { useFetch } from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import SearchScreen from '@/components/SearchScreen'

const search = () => {
   return <SearchScreen/>;
}

export default search

const styles = StyleSheet.create({})