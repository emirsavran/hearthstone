import React from 'react';
import PropTypes from 'prop-types';

import { CardList } from '../components';

const Cards = ({
  route: {
    params: { cards },
  },
}) => <CardList cards={cards} />;

Cards.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      cards: PropTypes.arrayOf(PropTypes.shape({
        cardSet: PropTypes.string,
        playerClass: PropTypes.string,
        type: PropTypes.string,
        rarity: PropTypes.string,
        race: PropTypes.string,
        img: PropTypes.string,
      })),
    }),
  }).isRequired,
};

export default Cards;
