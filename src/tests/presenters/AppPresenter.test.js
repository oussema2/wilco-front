import AppPresenter from '../../presenters/App/AppPresenter';

const mockCheckCurrentVersion = jest.fn( () => {} );

jest.mock( '@rr-ss/check-app-version-presenter', () => ( {
	defaultWith: jest.fn( () => ( { checkCurrentVersion: mockCheckCurrentVersion } ) )
} )
);

describe( 'AppPresenter', () => {
	const versionChecker = {};
	const remoteConfigService = { setUp: jest.fn() };
	const chatService = { init: jest.fn() };
	let presenter;

	describe( 'AppPresenter creation', () => {
		beforeEach( () => {
			jest.clearAllMocks();
			presenter = new AppPresenter( { versionChecker, remoteConfigService, chatService } );
		} );

		describe( 'onMount()', () => {
			it( 'calls to remoteConfigService setUp method', async () => {
				presenter.onMount();
				expect( remoteConfigService.setUp ).toHaveBeenCalledTimes( 1 );
			} );

			it( 'checks the current version', async () => {
				presenter.onMount();
				expect( mockCheckCurrentVersion ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );
} );
