import CheckAppVersionPresenter from '@rr-ss/check-app-version-presenter';
import {
	ANDROID_STORE_URL,
	IOS_STORE_URL,
	RECOMMENDED_TO_UPDATE_MESSAGE,
	RECOMMENDED_TO_UPDATE_TITLE,
	REQUIRED_TO_UPDATE_MESSAGE,
	REQUIRED_TO_UPDATE_TITLE
} from '../../constants/checkAppVersion';

export default class AppPresenter {
	constructor( { versionChecker, remoteConfigService, chatService } ) {
		this.remoteConfigService = remoteConfigService;
		this.chatService = chatService;
		this.checkAppVersionPresenter = CheckAppVersionPresenter.defaultWith( {
			versionChecker,
			iosStoreURL: IOS_STORE_URL,
			androidStoreURL: ANDROID_STORE_URL,
			textsConfig: {
				requiredToUpdatePopup: {
					title: REQUIRED_TO_UPDATE_TITLE,
					message: REQUIRED_TO_UPDATE_MESSAGE
				},
				recommendedToUpdatePopup: {
					title: RECOMMENDED_TO_UPDATE_TITLE,
					message: RECOMMENDED_TO_UPDATE_MESSAGE
				}
			}
		} );
	}

	onMount = () => {
		this.chatService.init();
		this.remoteConfigService.setUp();
		this.checkAppVersionPresenter.checkCurrentVersion();
	}
}
