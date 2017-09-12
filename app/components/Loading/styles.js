import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
});
