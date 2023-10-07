import Intercom from '@intercom/intercom-react-native';
import Config from 'react-native-config';
import { Platform } from 'react-native';

let sharedInstance;

const HASH_ATTRIBUTE_FOR_PLATFORM = Object.freeze( {
	ios: 'intercomIOSHash',
	android: 'intercomAndroidHash'
} );

class HelpCenterService {
	constructor( {
		backend = Intercom,
		userIdPrefix = Config.INTERCOM_USER_ID_PREFIX,
		platform = Platform.OS
	} = {} ) {
		this.backend = backend;
		this.userIdPrefix = userIdPrefix;
		this.platform = platform;
	}

	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new HelpCenterService();
		return sharedInstance;
	}

	showMessageComposer = () => this
		.backend
		.displayMessageComposer()

	registerIdentifiedUser = ( user ) => this
		._setIdentifiedUserHash( user )
		.then(
			() => this._registerIdentifiedUserWithBackend( user )
		);

	logout = () => this
		.backend
		.logout();

	showMessageComposer = () => this
		.backend
		.displayMessageComposer()

	get _hashAttributeForCurrentPlatform() { return HASH_ATTRIBUTE_FOR_PLATFORM[ this.platform ]; }

	_setIdentifiedUserHash = ( user ) => this
		.backend
		.setUserHash( user[ this._hashAttributeForCurrentPlatform ] );

	_registerIdentifiedUserWithBackend = ( { id, email } ) => this
		.backend
		.registerIdentifiedUser( {
			userId: this.userIdPrefix ? `${this.userIdPrefix}-${id}` : id,
			email
		} );
}

export default HelpCenterService;
