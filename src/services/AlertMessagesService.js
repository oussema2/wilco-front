import { Alert } from 'react-native';

let sharedInstance;

export const DEFAULT_CONFIRMATION_POP_UP_TITLE = 'Unsaved changes';
export const DEFAULT_CONFIRMATION_POP_UP_MESSAGE = 'Are you sure you want to cancel unsaved changes?';
export const DEFAULT_CANCEL_BUTTON_SETTINGS = { text: 'Cancel', style: 'cancel' };
export const DEFAULT_CONFIRM_BUTTON_SETTINGS = { text: 'Yes', style: 'default' };

export default class AlertMessagesService {
	constructor( { alertBackend = Alert } = {} ) {
		this.alertBackend = alertBackend;
	}

	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new AlertMessagesService();
		return sharedInstance;
	}

	showConfirmationAlert = ( {
		title = DEFAULT_CONFIRMATION_POP_UP_TITLE,
		message = DEFAULT_CONFIRMATION_POP_UP_MESSAGE,
		cancelButton, confirmButton
	} ) => {
		this.alertBackend.alert(
			title,
			message,
			[
				{ ...DEFAULT_CANCEL_BUTTON_SETTINGS, ...cancelButton },
				{ ...DEFAULT_CONFIRM_BUTTON_SETTINGS, ...confirmButton }
			]
		);
	};
}
