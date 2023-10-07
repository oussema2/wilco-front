"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const {
  width,
  height
} = _reactNative.Dimensions.get('window');

const {
  MultipleImagePicker
} = _reactNative.NativeModules;
let exportObject = {};
let defaultOptions = {
  //**iOS**//
  usedPrefetch: false,
  allowedAlbumCloudShared: false,
  muteAudio: true,
  autoPlay: true,
  //resize thumbnail
  haveThumbnail: true,
  thumbnailWidth: Math.round(width / 2),
  thumbnailHeight: Math.round(height / 2),
  allowedLivePhotos: true,
  preventAutomaticLimitedAccessAlert: true,
  // newest iOS 14
  emptyMessage: 'No albums',
  selectMessage: 'Select',
  deselectMessage: 'Deselect',
  selectedColor: '#FB9300',
  maximumMessageTitle: 'Notification',
  maximumMessage: 'You have selected the maximum number of media allowed',
  maximumVideoMessage: 'You have selected the maximum number of video allowed',
  messageTitleButton: 'OK',
  cancelTitle: 'Cancel',
  tapHereToChange: 'Tap here to change',
  //****//
  //**Android**//
  //****//
  //**Both**//
  usedCameraButton: true,
  allowedVideo: true,
  allowedPhotograph: true,
  // for camera : allow this option when you want to take a photos
  allowedVideoRecording: false,
  //for camera : allow this option when you want to recording video.
  maxVideoDuration: 60,
  //for camera : max video recording duration
  numberOfColumn: 3,
  maxSelectedAssets: 20,
  doneTitle: 'Done',
  isPreview: true,
  mediaType: 'all',
  isExportThumbnail: false,
  maxVideo: 20,
  selectedAssets: [],
  singleSelectedMode: false,
  isCrop: false,
  isCropCircle: false //****//
  // fetchOption: Object,
  // fetchCollectionOption: Object,
  // emptyImage: Image,

};
exportObject = {
  openPicker: optionsPicker => {
    var _options$singleSelect;

    const options = { ...defaultOptions,
      ...optionsPicker
    };
    const isSingle = (_options$singleSelect = options === null || options === void 0 ? void 0 : options.singleSelectedMode) !== null && _options$singleSelect !== void 0 ? _options$singleSelect : false;
    if (isSingle) options.selectedAssets = [];
    return new Promise(async (resolve, reject) => {
      try {
        const response = await MultipleImagePicker.openPicker(options); // console.log('res', response);

        if (response !== null && response !== void 0 && response.length) {
          if (isSingle) {
            resolve(response[0]);
          }

          resolve(response);
          return;
        }

        resolve([]);
      } catch (e) {
        reject(e);
      }
    });
  }
};
var _default = exportObject;
exports.default = _default;
//# sourceMappingURL=index.js.map