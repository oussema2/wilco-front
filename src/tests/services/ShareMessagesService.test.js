import { Share } from 'react-native';
import ShareMessagesService, { SHARE_DEFAULTS } from '../../services/ShareMessagesService';

jest.spyOn( Share, 'share' );

describe( 'ShareMessagesService', () => {
	const createService = () => {
		const shareMessagesService = new ShareMessagesService( { shareBackend: Share } );

		return { shareMessagesService };
	};

	describe( 'shareMessage', () => {
		test( 'with no parameters opens a share modal with default content and options', () => {
			const { shareMessagesService } = createService();

			shareMessagesService.shareMessage( {} );

			expect( shareMessagesService.shareBackend.share )
				.toHaveBeenCalledWith( SHARE_DEFAULTS.content, SHARE_DEFAULTS.options );
		} );

		test( 'with defined parameters opens a share modal with correct content and options', () => {
			const { shareMessagesService } = createService();

			const shareContentAndOptions = {
				content: {
					title: 'Test Content Title',
					message: 'Test Content Message.'
				},
				options: {
					dialogTitle: 'Test options dialog title',
					subject: 'Test options subject',
					excludedActivityTypes: [
						'excludedActivityType1',
						'excludedActivityType2'
					]
				}
			};

			shareMessagesService.shareMessage( shareContentAndOptions );

			expect( shareMessagesService.shareBackend.share )
				.toHaveBeenCalledWith( shareContentAndOptions.content, shareContentAndOptions.options );
		} );
	} );
} );
