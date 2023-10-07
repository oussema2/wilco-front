import remoteConfig from '@react-native-firebase/remote-config';

let sharedInstance;

export const REMOTE_CONFIG_DEFAULTS = {
	expirationDurationSeconds: 600
};

export default class RemoteConfigService {
	constructor( { backend = remoteConfig } = {} ) {
		this.backend = backend;
	}

	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new RemoteConfigService();
		return sharedInstance;
	}

	setUp = ( expirationDurationSeconds = REMOTE_CONFIG_DEFAULTS.expirationDurationSeconds ) => {
		this.backend().setConfigSettings( {
			minimumFetchIntervalMillis: expirationDurationSeconds
		} );
	}
}
