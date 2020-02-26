import React, {useState, useCallback} from 'react';
import {Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import debounce from 'lodash.debounce';

import api from '../api';

const searchCards = async searchTerm => {
  const res = await api.searchCards(searchTerm);
  const results = await res.json();
  return results;
};

const Search = ({navigation}) => {
  const [value, setValue] = useState('');
  const debouncedApiCall = useCallback(debounce(searchCards, 1000), []);

  const onChangeText = async searchTerm => {
    setValue(searchTerm);
    if (!searchTerm) {
      return;
    }
    const returned = await debouncedApiCall(searchTerm);
    console.log('returned ', returned);
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

  return <Text>Search Screen</Text>;
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
