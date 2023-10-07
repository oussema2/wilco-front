import SecureStorageService from '../../services/SecureStorageService';
import OnBoardingManager from '../../stores/OnBoardingManager';

describe( 'OnBoardingManager', () => {
	let store;
	const storageService = {
		getInt: jest.fn(),
		setInt: jest.fn()
	};

	beforeEach( () => {
		jest.clearAllMocks();
		store = new OnBoardingManager( { storageService } );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with default parameters', () => {
			store = new OnBoardingManager();
			expect( store.storageService ).toBeInstanceOf( SecureStorageService );
		} );
	} );

	describe( 'setOnBoardingAsSeen()', () => {
		it( 'persists the data to the storage service', () => {
			store.setOnBoardingAsSeen();

			expect( storageService.setInt ).toHaveBeenCalledWith( {
				key: 'isOnboardingWasSeen',
				value: 1
			} );

			expect( store.onBoardingWasSeen ).toBe( 1 );
		} );
	} );

	describe( '@isOnBoardingWasSeen()', () => {
		describe( 'when the isOnboardingWasSeen key is undefined', () => {
			it( 'returns false', () => {
				store._onBoardingWasSeen = undefined;
				expect( store.isOnBoardingWasSeen ).toBeFalsy();
			} );
		} );

		describe( 'when the isOnboardingWasSeen key is 0', () => {
			it( 'returns false', () => {
				store._onBoardingWasSeen = 0;
				expect( store.isOnBoardingWasSeen ).toBeFalsy();
			} );
		} );

		describe( 'when the isOnboardingWasSeen key is 1', () => {
			it( 'returns true', () => {
				store.setOnBoardingAsSeen( );

				expect( store.onBoardingWasSeen ).toEqual( 1 );
				expect( store.isOnBoardingWasSeen ).toBeTruthy();
			} );
		} );
	} );
} );
