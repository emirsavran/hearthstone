module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb', 'airbnb/hooks'],
  rules: {
    'prettier/prettier': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': ['error', { functions: true, classes: true, variables: false }],
  },
};
