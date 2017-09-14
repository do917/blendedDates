import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonText: {
    fontFamily: '$primaryFontFamily',
    fontSize: '$primaryFontSize',
    color: '#FFFFFF',
  },
  inputField: {
    fontFamily: '$primaryFontFamily',
    fontSize: '$primaryFontSize',
    color: '#FFFFFF',
    textAlign: 'center',
    height: 40,
  },
});
