import { PublicPrivacyType } from '../entities/PublicPrivacyType';
import { OnlyMePrivacyType } from '../entities/OnlyMePrivacyType';
import { NullPrivacyType } from '../entities/NullPrivacyType';

export class PrivacyTypeFactory {
	static build( type ) {
		switch ( type ) {
		case 'public':
			return new PublicPrivacyType();
		case 'only_me':
			return new OnlyMePrivacyType();
		default:
			return new NullPrivacyType();
		}
	}
}
