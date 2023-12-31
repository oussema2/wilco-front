import { StyleSheet } from 'react-native';
import theme from '../../../resources/theme';
export default StyleSheet.create({
  chatListStyle: {
    zIndex: 1,
    width: '100%',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listWrapperStyle: {
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100,
    paddingTop: 14,
  },
  actionMessageStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionMessageTxtStyle: {
    fontSize: 13.5,
    fontWeight: '500',
    margin: 0,
    lineHeight: 20,
  },
  messageDateContainerStyle: {
    marginBottom: 16,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderBottomColor: theme.color.primary,

    opacity: 0.4,
    width: '95%',
  },
  messageDateStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    fontSize: 14,
    color: theme.color.helpText,
  },
  decoratorMessageStyle: {
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '100%'
  },
  decoratorMessageTxtStyle: {
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    transform: [{ rotateX: '180deg' }],
  },
  newMessagePopupContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    elevation: 1,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  newMessageTextContainer: {
    padding: 10,
    borderRadius: 16,
    elevation: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
