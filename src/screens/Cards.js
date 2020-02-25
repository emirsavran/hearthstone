import React from 'react';
import {
  Animated,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const renderItem = ({item}) => {
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
    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
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
            <Text>Name: {item.name}</Text>
            <Text>Player Class: {item.playerClass}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </>
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

export default Cards;
