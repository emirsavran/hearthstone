import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import api from '../api';

const Mechanics = () => {
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

  if (isFetching) {
    return <Text>Fetching....</Text>;
  }

  const flatListData = Object.keys(cardsByMech).map((mech, i) => ({
    name: mech,
    key: i.toString(),
  }));

  return (
    <FlatList
      data={flatListData}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.itemText}>{item.name}</Text>
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

export default Mechanics;
