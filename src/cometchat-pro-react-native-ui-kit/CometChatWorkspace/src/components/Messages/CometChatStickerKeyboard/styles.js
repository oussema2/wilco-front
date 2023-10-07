import { StyleSheet } from 'react-native';
import { heightRatio } from '../../../utils/consts';

export default StyleSheet.create({
  stickerMsgStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '35%',
  },
  stickerMsgTxtStyle: {
    fontSize: 24,
    fontWeight: '600',
  },
  stickerImageStyle: { width: 60, height: 60 },
  stickerHeaderImageStyle: { width: 35, height: 35 },
  closeIcon: { alignSelf: 'flex-end' },
  sectionListItemStyle: {
    height: 35,
    width: 35,
    flexShrink: 0,
    marginHorizontal: 8,
  },
  stickerItemStyle: {
    width: '30%',
    minHeight: 50,
    marginLeft: '2.5%',
    maxHeight: 70,
    flexShrink: 0,
    marginRight: 20,
  },

  stickerListStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingRight: '2.5%',
    paddingBottom: 10,
    flex: 1,
  },
  stickerSectionListStyle: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stickerWrapperStyle: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'column',
    height: 230 * heightRatio,
    alignItems: 'flex-end',
  },
});
