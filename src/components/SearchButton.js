import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import search from '../assets/search.png';

const SearchButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Search')}>
    <Image source={search} style={styles.imageStyle} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imageStyle: {
    height: 30,
    aspectRatio: 1,
    marginRight: 20,
    tintColor: '#333333',
  },
});

SearchButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchButton;
