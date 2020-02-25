import React from 'react';
import {Image, FlatList, StyleSheet} from 'react-native';

const renderItem = ({item}) => {
  // not all cards have an image
  // so I skipped the cards without images
  if (!item.img) {
    return null;
  }

  return (
    <Image
      resizeMode="contain"
      defaultSource={require('../assets/placeholder.png')}
      source={{uri: item.img}}
      onError={() => console.log('load error')}
      style={styles.cardImage}
    />
  );
};

const Cards = ({route}) => {
  const {cards} = route.params;
  return (
    <FlatList
      data={cards}
      keyExtractor={item => item.cardId}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    aspectRatio: 0.66,
  },
});

export default Cards;
