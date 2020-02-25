import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import api from '../api';

const Mechanics = ({navigation}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [cardsByMech, setCardsByMech] = useState({});

  const fetchAndFilterCards = async () => {
    setIsFetching(true);
    const res = await api.findCards();
    const cards = await res.json();
    console.log(cards);
    const mechanics = {};
    Object.keys(cards).forEach(set => {
      cards[set].forEach(card => {
        if (!card.mechanics) {
          return;
        }
        card.mechanics.forEach(({name: mechanicName}) => {
          if (!mechanics[mechanicName]) {
            mechanics[mechanicName] = [];
          }
          mechanics[mechanicName].push(card);
        });
      });
    });
    setCardsByMech(mechanics);
    console.log(mechanics);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchAndFilterCards();
  }, []);

  const handleMechPress = name => {
    navigation.navigate('Cards', {
      name,
      cards: cardsByMech[name],
    });
  };

  if (isFetching) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={Object.keys(cardsByMech)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => handleMechPress(item)}
          style={styles.button}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.gt}>&#62;&#62;</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
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

export default Mechanics;
