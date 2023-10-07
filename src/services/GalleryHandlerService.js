import PermissionsHandlerService, {
	galleryPermission,
	permissionResults
} from './PermissionsHandlerService';
import AlertMessagesService from './AlertMessagesService';

let sharedInstance;

export default class GalleryHandlerService {
	constructor( {
		permissionHandlerService = PermissionsHandlerService.shared(),
		alertMessagesService = AlertMessagesService.shared()
	} = {} ) {
		this.permissionHandlerService = permissionHandlerService;
		this.alertMessagesService = alertMessagesService;
	}

	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new GalleryHandlerService();
		return sharedInstance;
	}

	async handleGalleryPermission( _callback ) {
		const requestResult = await this.permissionHandlerService.request( galleryPermission );

		const GRANTED_PERMISSION_RESULTS = [ permissionResults.granted, permissionResults.limited ];
		const permissionWasGranted = ( result ) => GRANTED_PERMISSION_RESULTS.includes( result );

		if ( permissionWasGranted( requestResult ) ) {
			_callback();
		} else {
			this._showAlertForOpenSettings();
		}
	}

	_showAlertForOpenSettings() {
		this.alertMessagesService.showConfirmationAlert( {
			title: '"Wilco" Would Like to Access Your Photos',
			message: 'This app requires access to the photo library.',
			cancelButton: { onPress: () => {} },
			confirmButton: {
				text: 'Open Settings',
				onPress: () => this.permissionHandlerService.openSettings()
			}
		} );
	}
}
