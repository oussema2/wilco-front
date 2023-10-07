import { Alert } from 'react-native';
import AlertMessagesService, {
	DEFAULT_CONFIRMATION_POP_UP_TITLE, DEFAULT_CONFIRMATION_POP_UP_MESSAGE,
	DEFAULT_CANCEL_BUTTON_SETTINGS, DEFAULT_CONFIRM_BUTTON_SETTINGS
} from '../../services/AlertMessagesService';

jest.useFakeTimers();
jest.spyOn( Alert, 'alert' );

describe( 'AlertMessagesService', () => {
	const createService = () => {
		const alertMessagesService = new AlertMessagesService( { alertBackend: Alert } );

		return { alertMessagesService };
	};

	describe( 'shared', () => {
		const AlertMessagesServiceFirst = AlertMessagesService.shared();
		const AlertMessagesServiceSecond = AlertMessagesService.shared();
		test( 'calls the backend\'s shared method first time', () => {
			expect( AlertMessagesServiceFirst ).toBeInstanceOf( AlertMessagesService );
		} );

		test( 'calls the backend\'s shared method second time', () => {
			expect( AlertMessagesServiceSecond ).toBeInstanceOf( AlertMessagesService );
			expect( AlertMessagesServiceFirst ).toEqual( AlertMessagesServiceSecond );
		} );
	} );

	describe( 'showConfirmationAlert', () => {
		test( 'when no parameters are passed shows default settings', () => {
			const { alertMessagesService } = createService();

			alertMessagesService.showConfirmationAlert( {} );

			expect( alertMessagesService.alertBackend.alert ).toHaveBeenCalledWith(
				DEFAULT_CONFIRMATION_POP_UP_TITLE,
				DEFAULT_CONFIRMATION_POP_UP_MESSAGE,
				[ DEFAULT_CANCEL_BUTTON_SETTINGS, DEFAULT_CONFIRM_BUTTON_SETTINGS ]
			);
		} );

		test( 'shows an alert with cancel and confirm buttons', () => {
			const { alertMessagesService } = createService();

			const params = {
				title: 'Screen name',
				message: 'Are you sure you want to cancel unsaved changes?',
				cancelButton: { text: 'Cancel', onPress: () => {}, style: 'cancel' },
				confirmButton: { text: 'Yes', onPress: () => {}, style: 'destructive' }
			};

			alertMessagesService.showConfirmationAlert( params );

			expect( alertMessagesService.alertBackend.alert ).toHaveBeenCalledWith(
				params.title,
				params.message,
				[ params.cancelButton, params.confirmButton ]
			);
		} );
	} );
} );
