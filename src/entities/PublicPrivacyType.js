import { privacyPublic } from '../assets/icons';

export class PublicPrivacyType {
	get id() {
		return 'public';
	}

	get image() {
		return privacyPublic;
	}

	get imageStyle() {
		return { height: 11.67, width: 11.67 };
	}

	get testID() {
		return 'public-post';
	}
}
