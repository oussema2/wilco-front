import { StyleSheet } from 'react-native';
import { widthRatio } from '../../../utils/consts';
import { fonts, palette } from '../../../../../../Theme';
import theme from '../../../resources/theme';

export default StyleSheet.create({
  messageContainerStyle: { marginBottom: 16, marginHorizontal: 8 },
  messageSenderNameContainerStyle: { marginBottom: 5 },
  messageContainerForReceiver: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: '85%',
  },
  messageWrapperStyleReceiver: {
    backgroundColor: '#f2f3f4', // #f2f3f4
    marginBottom: 8,
    paddingHorizontal: 12 * widthRatio,
    paddingVertical: 5,
    maxWidth: '100%',
    borderRadius: 12,
  },
  messageWrapperStyleSender: {
    alignSelf: 'flex-end',
    backgroundColor: '#f2f3f4',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12 * widthRatio,
    paddingVertical: 5,
    maxWidth: '85%',
    borderRadius: 12,
  },
  messageInfoWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatarStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 36,
    height: 36,
    marginRight: 10 * widthRatio,
    backgroundColor: 'rgba(51,153,255,0.25)',
    borderRadius: 25,
  },
  msgTimestampStyle: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: theme.color.helpText
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageTxtStyle: {
    ...fonts.body,
    color: palette.grayscale.aluminum
  },
  messageTxtWrapperStyle: {
    flexDirection: 'row',
    borderRadius: 12,
  },
  banIconWrapperStyle: {
    marginRight: 5,
    marginTop: 2
  },
});
