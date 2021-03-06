import React, { useEffect, useState } from 'react';
import {
  FlatList, Text, TouchableOpacity, StyleSheet, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { Spinner } from '../components';

import api from '../api';

const Mechanics = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [cardsByMech, setCardsByMech] = useState({});

  const fetchAndFilterCards = async () => {
    setIsFetching(true);
    const result = await api.findCards();
    setIsFetching(false);

    if (result.error) {
      return setError(result.error);
    }

    const cards = result.json;
    const mechanics = {};

    Object.keys(cards).forEach((set) => {
      cards[set].forEach((card) => {
        if (!card.mechanics) {
          return;
        }
        card.mechanics.forEach(({ name: mechanicName }) => {
          if (!mechanics[mechanicName]) {
            mechanics[mechanicName] = [];
          }
          mechanics[mechanicName].push(card);
        });
      });
    });

    return setCardsByMech(mechanics);
  };

  useEffect(() => {
    fetchAndFilterCards();
  }, []);

  const handleMechPress = (name) => {
    navigation.navigate('Cards', {
      name,
      cards: cardsByMech[name],
    });
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (!isFetching && error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={Object.keys(cardsByMech)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleMechPress(item)}
          style={styles.button}
        >
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.gt}>&#62;&#62;</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#aaaaaa',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  itemText: {
    padding: 10,
    fontSize: 18,
  },
  gt: {
    fontSize: 20,
  },
});

Mechanics.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Mechanics;
