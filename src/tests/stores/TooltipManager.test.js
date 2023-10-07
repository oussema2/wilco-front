import SecureStorageService from '../../services/SecureStorageService';
import TooltipManager from '../../stores/TooltipManager';

describe( 'OnBoardingManager', () => {
	let store;
	const storageService = {
		getInt: jest.fn(),
		setInt: jest.fn()
	};

	beforeEach( () => {
		jest.clearAllMocks();
		store = new TooltipManager( { storageService } );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with default parameters', () => {
			store = new TooltipManager();
			expect( store.storageService ).toBeInstanceOf( SecureStorageService );
		} );
	} );

	describe( 'setHomePreferencesTooltipAsSeen()', () => {
		it( 'persists the data to the storage service', () => {
			store.setHomePreferencesTooltipAsSeen();

			expect( storageService.setInt ).toHaveBeenCalledWith( {
				key: 'isHomePreferencesTooltipWasSeen',
				value: 1
			} );

			expect( store.homePreferencesTooltipWasSeen ).toBe( 1 );
		} );
	} );

	describe( '@isHomePreferencesTooltipWasSeen()', () => {
		describe( 'when the isHomePreferencesTooltipWasSeen key is undefined', () => {
			it( 'returns false', () => {
				store._homePreferencesTooltipWasSeen = undefined;
				expect( store.isHomePreferencesTooltipWasSeen ).toBeFalsy();
			} );
		} );

		describe( 'when the isHomePreferencesTooltipWasSeen key is 0', () => {
			it( 'returns false', () => {
				store._homePreferencesTooltipWasSeen = 0;
				expect( store.isHomePreferencesTooltipWasSeen ).toBeFalsy();
			} );
		} );

		describe( 'when the isHomePreferencesTooltipWasSeen key is 1', () => {
			it( 'returns true', () => {
				store.setHomePreferencesTooltipAsSeen( );

				expect( store.homePreferencesTooltipWasSeen ).toEqual( 1 );
				expect( store.isHomePreferencesTooltipWasSeen ).toBeTruthy();
			} );
		} );
	} );
} );
