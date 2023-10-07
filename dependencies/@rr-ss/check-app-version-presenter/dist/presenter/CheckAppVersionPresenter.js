import { VersionCheckResult } from '@rr-ss/app-version-checker';
import { merge } from 'lodash';
import OpenAppStorePage from '../interactors/OpenAppStorePage';
import ShowInfoMessage from '../interactors/ShowInfoMessage';
export { VersionCheckResult };
const DEFAULT_RECOMMENDED_TO_UPDATE_POPUP_TEXTS = Object.freeze({
    title: 'We have new features for you!',
    message: 'You can now download the latest version of the app.',
    updateButton: 'Update',
    cancelButton: 'Cancel'
});
const DEFAULT_REQUIRED_TO_UPDATE_POPUP_TEXTS = Object.freeze({
    title: 'We need you to update the app',
    message: 'To continue, please download the latest version of the app.',
    updateButton: 'Update'
});
const DEFAULT_TEXTS = Object.freeze({
    recommendedToUpdatePopup: DEFAULT_RECOMMENDED_TO_UPDATE_POPUP_TEXTS,
    requiredToUpdatePopup: DEFAULT_REQUIRED_TO_UPDATE_POPUP_TEXTS
});
export default class CheckAppVersionPresenter {
    versionChecker;
    showInfoMessage;
    openAppStorePage;
    textsConfig;
    versionCheckResultHandlers;
    constructor({ versionChecker, showInfoMessage, openAppStorePage, textsConfig }) {
        this.versionChecker = versionChecker;
        this.showInfoMessage = showInfoMessage;
        this.openAppStorePage = openAppStorePage;
        this.textsConfig = merge({}, DEFAULT_TEXTS, textsConfig);
        this.versionCheckResultHandlers = {
            [VersionCheckResult.UPDATE_REQUIRED]: this.onForceUpdate.bind(this),
            [VersionCheckResult.UPDATE_RECOMMENDED]: this.onUpdateRecommended.bind(this)
        };
    }
    static defaultWith({ versionChecker, androidStoreURL, iosStoreURL, textsConfig }) {
        return new CheckAppVersionPresenter({
            versionChecker,
            showInfoMessage: new ShowInfoMessage(),
            openAppStorePage: new OpenAppStorePage({ androidStoreURL, iosStoreURL }),
            textsConfig
        });
    }
    async checkCurrentVersion() {
        const result = await this
            .versionChecker
            .checkCurrentVersion();
        const handler = this.versionCheckResultHandlers[result];
        if (handler) {
            handler();
        }
        return result;
    }
    onForceUpdate() {
        const { title, message, updateButton: updateButtonText } = this.textsConfig.requiredToUpdatePopup;
        this.showInfoMessage.showMessage({
            title,
            message,
            buttons: [
                {
                    text: updateButtonText,
                    onPress: () => {
                        this.openStore();
                        setTimeout(this.onForceUpdate.bind(this), 200);
                    }
                }
            ]
        });
    }
    onUpdateRecommended() {
        const { title, message, cancelButton: cancelButtonText, updateButton: updateButtonText } = this.textsConfig.recommendedToUpdatePopup;
        this.showInfoMessage.showMessage({
            title,
            message,
            buttons: [
                {
                    text: cancelButtonText
                },
                {
                    text: updateButtonText,
                    onPress: () => { this.openStore(); }
                }
            ]
        });
    }
    openStore() {
        return this.openAppStorePage.openAppStore();
    }
}
