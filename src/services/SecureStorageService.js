import MMKVStorage from 'react-native-mmkv-storage';

export default class SecureStorageService {
	constructor( {
		storage = new MMKVStorage.Loader().withEncryption().initialize()
	} = {} ) {
		this.storage = storage;
	}

	setString( { key, value } ) {
		this.storage.setString( key, value );
	}

	getString( { key } ) {
		return this.storage.getString( key );
	}

	setInt( { key, value } ) {
		return this.storage.setInt( key, value );
	}

	getInt( { key } ) {
		return this.storage.getInt( key );
	}
}
