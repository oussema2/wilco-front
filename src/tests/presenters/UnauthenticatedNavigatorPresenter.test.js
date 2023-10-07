import UnauthenticatedNavigatorPresenter from '../../presenters/UnauthenticatedNavigatorPresenter';

jest.mock( '@react-native-firebase/auth', () => ( { auth: jest.fn( () => {} ) } ) );

describe( 'UnauthenticatedNavigatorPresenter', () => {
	const makeAutoObservable = jest.fn();
	const onBoardingManager = {
		setOnBoardingAsSeen: jest.fn(),
		isOnBoardingWasSeen: true
	};
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new UnauthenticatedNavigatorPresenter( {
			onBoardingManager,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter._onBoardingManager ).toEqual( onBoardingManager );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );
} );
