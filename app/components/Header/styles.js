import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    height: 90,
    backgroundColor: '$primaryBlack',
    zIndex: 1,
  },
  statusBar: {
    height: 18,
    backgroundColor: '$primaryBlack',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  imageHeader: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
});
