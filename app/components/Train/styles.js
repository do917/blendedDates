import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  photos: {
    flex: 2,
    flexDirection: 'row',
  },
  navigation: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontFamily: '$primaryFontFamily',
    fontSize: '$primaryFontSize',
    color: '#FFFFFF',
  },
  photoContainer: {
    paddingHorizontal: 2,
  },
  touchable: {
    flex: 1,
  },
  photo: {
    borderRadius: 4,
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  text: {
    fontFamily: '$primaryFontFamily',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
