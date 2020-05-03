import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card';

const CardList = ({ cards }) => (
  <FlatList
    data={cards}
    keyExtractor={(item) => item.cardId}
    renderItem={({ item }) => <Card item={item} />}
  />
);

CardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    cardSet: PropTypes.string,
    playerClass: PropTypes.string,
    type: PropTypes.string,
    rarity: PropTypes.string,
    race: PropTypes.string,
    img: PropTypes.string,
  })).isRequired,
};


export default CardList;
