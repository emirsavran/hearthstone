import React, { useState, useCallback } from 'react';
import {
  Text, TextInput, StyleSheet, Dimensions,
} from 'react-native';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import { CardList, Spinner } from '../components';

import api from '../api';

const searchCards = async (searchTerm, setIsFetching, setError, setCards) => {
  setIsFetching(true);
  setError(null);
  const result = await api.searchCards(searchTerm);
  setIsFetching(false);

  if (result.error) {
    return setError(result.error);
  }

  return setCards(result.json);
};

const Search = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const [value, setValue] = useState('');
  const debouncedApiCall = useCallback(debounce(searchCards, 1000), []);

  const onChangeText = (searchTerm) => {
    setValue(searchTerm);
    if (!searchTerm) {
      return;
    }
    debouncedApiCall(searchTerm, setIsFetching, setError, setCards);
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

  if (!isFetching && error) {
    return <Text>{error}</Text>;
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

Search.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default Search;
