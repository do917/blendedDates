import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  modal: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 12,
  },
  text: {
    fontFamily: 'Courier',
    fontSize: 18,
    textAlign: 'left',
    alignItems: 'center',
    color: '#FFFFFF',
    paddingBottom: 10,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    flexShrink: 0,
    flexBasis: '40%',
    margin: 3,
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: '#FFFFFF',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});