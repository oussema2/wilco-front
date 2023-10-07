import { StyleSheet } from 'react-native';
import { widthRatio } from '../../../utils/consts';
import theme from '../../../resources/theme';
import { fonts, palette } from '../../../../../../Theme';

export default StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 64,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  avatarStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 44,
    height: 44,
    marginRight: 15 * widthRatio,
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  itemDetailsContainer: {
    borderBottomWidth: 1,
    flex: 1,
    height: '100%',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingBottom: 10,
    color: theme.color.primary,
    // flexDirection: 'row',
  },
  itemLastMsgTimeStyle: {
    ...fonts.caption,
    fontWeight: '200',
    maxWidth: '100%',
    marginLeft: 2,
    color: palette.grayscale.shutterGrey,
  },
  itemNameStyle: {
    ...fonts.bodyFocus,
    width: '60%',
    color: palette.secondary.default,
    marginBottom: 2,
    marginTop: 8,
  },
  itemMsgStyle: {
    width: '80%',
  },
  itemRowStyle: {
    width: '20%',
    alignItems: 'center',
  },
  itemLastMsgStyle: {
    width: '40%',
    alignItems: 'flex-end',
  },
  itemThumbnailStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(51,153,255,0.25)',
    borderRadius: 25,
  },
  itemLastMsg: {
    width: "90%"
  },
});
