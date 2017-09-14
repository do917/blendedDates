import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 2,
  },
  background: {
    flex: 1,
  },
  einstein: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  text: {
    fontFamily: 'Courier',
    height: 85,
    fontSize: '$primaryFontSize',
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
  caret: {
    fontFamily: 'Courier',
    fontSize: '$primaryFontSize',
    color: '#bff442',
  },
});
