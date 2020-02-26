import React, {Component} from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import placeholder from '../assets/placeholder.png';

class Card extends Component {
  constructor(props) {
    super(props);
    // set image source if it exists
    // if not, set it to placeholder
    let imgSrc;
    if (props.item.img) {
      imgSrc = {uri: props.item.img};
    } else {
      imgSrc = placeholder;
    }
    this.state = {
      imgSrc,
    };

    this.animatedValue = new Animated.Value(0);
    this.value = 0;

    this.flipCard = this.flipCard.bind(this);

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    });
  }

  componentDidMount() {
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });
  }

  componentWillUnmount() {
    this.animatedValue.removeAllListeners();
  }

  flipCard() {
    Animated.spring(this.animatedValue, {
      toValue: this.value >= 90 ? 0 : 180,
      friction: 8,
      tension: 10,
    }).start();
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{rotateY: this.frontInterpolate}],
    };
    const backAnimatedStyle = {
      transform: [{rotateY: this.backInterpolate}],
    };

    const {item} = this.props;
    const {imgSrc} = this.state;

    return (
      <>
        <Animated.View
          style={[
            styles.flipCard,
            frontAnimatedStyle,
            {opacity: this.frontOpacity},
          ]}>
          <TouchableWithoutFeedback onPress={this.flipCard}>
            <Image
              resizeMode="contain"
              source={imgSrc}
              loadingIndicatorSource={placeholder}
              onError={() => this.setState({imgSrc: placeholder})}
              style={styles.cardImage}
            />
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View
          style={[
            styles.flipCard,
            styles.flipCardBack,
            backAnimatedStyle,
            {opacity: this.backOpacity},
          ]}>
          <TouchableWithoutFeedback onPress={this.flipCard}>
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
  }
}

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    aspectRatio: 0.66,
    alignSelf: 'center',
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

export default Card;
