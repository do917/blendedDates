import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    height: 25,
    backgroundColor: '$primaryBlack',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  footer: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
});
