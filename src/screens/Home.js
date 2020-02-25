import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import api from '../api';

const Home = () => {
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

  return Object.keys(cardsByMech).map(mech => <Text key={mech}>{mech}</Text>);
};

export default Home;
