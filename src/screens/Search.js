import React, {useState} from 'react';
import {Text, TextInput, StyleSheet, Dimensions} from 'react-native';

const Search = ({navigation}) => {
  const [value, onChangeText] = useState('');

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
