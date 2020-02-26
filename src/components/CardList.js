import React from 'react';
import {
  Animated,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

const Card = ({item}) => {
  // not all cards have an image
  // so I skipped the cards without images
  if (!item.img) {
    return null;
  }

  // https://codedaily.io/tutorials/84/Create-a-Flip-Card-Animation-with-React-Native
  const animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({value}) => {
    currentValue = value;
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });
  const backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  const flipCard = () => {
    Animated.spring(animatedValue, {
      toValue: currentValue >= 90 ? 0 : 180,
      friction: 8,
      tension: 10,
    }).start();
  };

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  return (
    <>
      <Animated.View
        style={[styles.flipCard, frontAnimatedStyle, {opacity: frontOpacity}]}>
        <TouchableWithoutFeedback onPress={flipCard}>
          <Image
            resizeMode="contain"
            defaultSource={require('../assets/placeholder.png')}
            source={{uri: item.img}}
            onError={() => console.log('load error')}
            style={styles.cardImage}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[
          styles.flipCard,
          styles.flipCardBack,
          backAnimatedStyle,
          {opacity: backOpacity},
        ]}>
        <TouchableWithoutFeedback onPress={flipCard}>
          <View style={styles.flipCardBackContainer}>
            <Text>Card Set: {item.cardSet}</Text>
            <Text>Player Class: {item.playerClass}</Text>
            <Text>Type: {item.type}</Text>
            {item.rarity && <Text>Rarity: {item.rarity}</Text>}
            {item.race && <Text>Race: {item.race}</Text>}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    aspectRatio: 0.66,
  },
  flipCard: {
    width: '100%',
    aspectRatio: 0.66,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },
  flipCardBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CardList = ({cards}) => (
  <FlatList data={cards} keyExtractor={item => item.cardId} renderItem={Card} />
);

export default CardList;
