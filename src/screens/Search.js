import React, {useState, useCallback} from 'react';
import {TextInput, StyleSheet, Dimensions} from 'react-native';
import debounce from 'lodash.debounce';

import api from '../api';
import Spinner from '../components/Spinner';
import CardList from '../components/CardList';

const searchCards = async (searchTerm, setIsFetching) => {
  setIsFetching(true);
  const res = await api.searchCards(searchTerm);
  const results = await res.json();
  setIsFetching(false);
  return results;
};

const Search = ({navigation}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [cards, setCards] = useState([]);
  const [value, setValue] = useState('');
  const debouncedApiCall = useCallback(debounce(searchCards, 1000), []);

  const onChangeText = async searchTerm => {
    setValue(searchTerm);
    if (!searchTerm) {
      return;
    }
    const result = await debouncedApiCall(searchTerm, setIsFetching);
    setCards(result);
  };

  navigation.setOptions({
    headerTitle: () => (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter card name..."
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
      />
    ),
  });

  if (isFetching) {
    return <Spinner />;
  }

  return <CardList cards={cards} />;
};

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get('window').width - 100,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
});

export default Search;
