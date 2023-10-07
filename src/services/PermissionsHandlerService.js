import { Platform } from 'react-native';
import * as rnPermissions from 'react-native-permissions';

let sharedInstance;

export const cameraPermission = {
	android: rnPermissions.PERMISSIONS.ANDROID.CAMERA,
	ios: rnPermissions.PERMISSIONS.IOS.CAMERA
};

export const galleryPermission = {
	android: rnPermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
	ios: rnPermissions.PERMISSIONS.IOS.PHOTO_LIBRARY
};

export const permissionResults = {
	blocked: rnPermissions.RESULTS.BLOCKED,
	denied: rnPermissions.RESULTS.DENIED,
	granted: rnPermissions.RESULTS.GRANTED,
	limited: rnPermissions.RESULTS.LIMITED,
	unavailable: rnPermissions.RESULTS.UNAVAILABLE
};

export default class PermissionsHandlerService {
	constructor( { permissionsBackend = rnPermissions } = {} ) {
		this.permissionsBackend = permissionsBackend;
	}

	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new PermissionsHandlerService();
		return sharedInstance;
	}

	check( permission ) {
		permission = Platform.select( permission );
		return this.permissionsBackend.check( permission );
	}

	checkMultiple( permissions ) {
		permissions = permissions.map( ( p ) => Platform.select( p ) );
		return this.permissionsBackend.checkMultiple( permissions );
	}

	openSettings() {
		return this.permissionsBackend.openSettings();
	}

	openLimitedPhotoLibraryPicker() {
		return this.permissionsBackend.openLimitedPhotoLibraryPicker();
	}

	request( permission ) {
		permission = Platform.select( permission );
		return this.permissionsBackend.request( permission );
	}

	requestMultiple( permissions ) {
		permissions = permissions.map( ( p ) => Platform.select( p ) );
		return this.permissionsBackend.requestMultiple( permissions );
	}
}
