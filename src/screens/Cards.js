import React from 'react';

import CardList from '../components/CardList';

const Cards = ({
  route: {
    params: {cards},
  },
}) => <CardList cards={cards} />;

export default Cards;
