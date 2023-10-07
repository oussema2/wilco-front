import MockRootStore from '../mocks/MockRootStore';
import InvitePeoplePresenter from '../../presenters/InvitePeoplePresenter';

describe( 'InvitePeoplePresenter', () => {
	const navigation = { goBack: jest.fn() };
	const rootStore = new MockRootStore();
	const makeAutoObservable = jest.fn();
	const shareMessagesService = {
		shareMessage: jest.fn( () => {} )
	};

	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new InvitePeoplePresenter( {
			navigation,
			rootStore,
			shareMessagesService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.rootStore ).toEqual( rootStore );
			expect( presenter.shareMessagesService ).toEqual( shareMessagesService );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@title()', () => {
		it( 'returns title', () => {
			expect( presenter.title ).toEqual( 'Invite others' );
		} );
	} );

	describe( '@subtitle()', () => {
		it( 'returns subtitle', () => {
			expect( presenter.subtitle ).toEqual( 'Invite other pilots to be part of Wilco to share, learn, discover, mentor and much more.' );
		} );
	} );

	describe( '@buttonTitle()', () => {
		it( 'returns button title', () => {
			expect( presenter.buttonTitle ).toEqual( 'Send an invite' );
		} );
	} );

	describe( '@backButtonWasPressed', () => {
		it( 'goes back', () => {
			presenter.backButtonWasPressed();
			expect( navigation.goBack ).toHaveBeenCalled();
		} );
	} );

	describe( '@shareButtonWasPressed', () => {
		it( 'calls the shareMessagesService', () => {
			presenter.shareButtonWasPressed();
			expect( shareMessagesService.shareMessage ).toHaveBeenCalled();
		} );
	} );
} );
