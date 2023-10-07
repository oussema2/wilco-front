import { StyleSheet } from 'react-native';
import theme from '../../../resources/theme';
import { fonts, palette } from '../../../../../../Theme';

export default StyleSheet.create({
  callMessageStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  callMessageTxtStyle: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '500',
    margin: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    paddingRight: 12,
    backgroundColor: '#C7F7FF',
    zIndex: 5,
    alignItems: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: theme.color.blue,
  },
  headerDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  audioCallContainer: {
    paddingHorizontal: 8,
  },
  videoCallContainer: {
    paddingHorizontal: 8,
  },
  callIcon: {
    height: 24,
    width: 24,
  },
  videoIcon: { width: 34, height: 24, resizeMode: 'contain' },
  itemDetailContainer: {
    flex: 1,
  },
  itemNameText: {
    ...fonts.bodyFocus,
    fontWeight: '500',
  },
  statusText: {
    ...fonts.caption,
    color: palette.grayscale.shutterGrey,
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginRight: 12,
  },
  arrowLeftContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 8
  },
  arrowLeftIcon: {
    width: 16,
    height: 16
  }
});
