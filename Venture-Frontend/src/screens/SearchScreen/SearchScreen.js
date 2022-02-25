import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import SuggestionRow from './SuggestionRow';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SearchScreen = () => {
  const navigation = useNavigation();

  const [IsLoading, setIsLoading] = useState(false);
  const [SearchResult, setSearchResult] = useState([]);
  const [SearchTerm, setSearchTerm] = useState('');

  const getHotels = async address => {
    try {
      const SearchHotelUrl = global.API_URL + '/hotel/search?address=';
      const res = await axios.get(SearchHotelUrl + SearchTerm);
      setSearchResult(res.data.hotels);
    } catch (error) {
      setSearchResult([]);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // console.log(SearchTerm);
      getHotels();
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [SearchTerm]);

  const Search = (text) => {
    if (text.length == 0) {
      return;
    }

    setIsLoading(true);
    setSearchTerm(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Where are you going?"
        placeholderTextColor="#737373"
        onChangeText={text => Search(text)}
      />

      {
        (() => {
          if (IsLoading)
            return <ActivityIndicator size="large" />
          else if (SearchTerm.length > 0 && SearchResult.length == 0)
            return <Text>No hotels avaiable, try another location</Text>
          else
            return <FlatList
              data={SearchResult}
              renderItem={({ item }) =>
                <Pressable onPress={() => navigation.navigate('Hotel', { HotelID: item.hotelID })}>
                  <SuggestionRow item={item} />
                </Pressable>
              }
            />
        })()
      }
    </View>
  );
};

export default SearchScreen;
