import React from 'react';
import {FlatList} from 'react-native';
import Card from './Card';

const CardList = ({cards}) => (
  <FlatList
    data={cards}
    keyExtractor={item => item.cardId}
    renderItem={({item}) => <Card item={item} />}
  />
);

export default CardList;
