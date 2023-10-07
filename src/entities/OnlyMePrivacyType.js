import { privacyOnlyMe } from '../assets/icons';

export class OnlyMePrivacyType {
	get id() {
		return 'only_me';
	}

	get image() {
		return privacyOnlyMe;
	}

	get imageStyle() {
		return { height: 11.67, width: 10.21 };
	}

	get testID() {
		return 'only-me-post';
	}
}
