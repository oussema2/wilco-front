import ModalService from '../../services/ModalService';

describe( 'ModalService', () => {
	let modals;
	const testModal = 'test-modal';
	const testData = { some: 'data', for: 'testing' };

	beforeEach( () => {
		modals = new ModalService();
	} );

	describe( 'constructor()', () => {
		it( 'initializes with an empty modals dictionary', () => {
			expect( modals.modals ).toEqual( {} );
		} );
	} );

	describe( '@open()', () => {
		describe( 'when only a key is provided', () => {
			it( 'sets the modal as open on the modals dictionary', () => {
				modals.open( testModal );

				expect( modals.modals[ testModal ] ).toMatchObject( {
					open: true,
					data: {}
				} );
			} );
		} );

		describe( 'when providing a data argument', () => {
			it( 'adds the data to the dictionary', () => {
				modals.open( testModal, testData );

				expect( modals.modals[ testModal ] ).toMatchObject( {
					open: true,
					data: testData
				} );
			} );
		} );
	} );

	describe( '@close()', () => {
		let modalToDelete = 'modal-to-delete';
		beforeEach( () => {
			modals.open( modalToDelete );
			modals.open( 'anotherModal' );
		} );

		it( 'deletes the modal\'s entry in the dictionary', () => {
			modals.close( modalToDelete );

			expect( modals.modals ).toMatchObject( {
				anotherModal: {
					open: true,
					data: {}
				}
			} );
		} );
	} );

	describe( 'getData()', () => {
		describe( 'when the provided key corresponds to a modal with data', () => {
			beforeEach( () => {
				modals.open( testModal, testData );
			} );

			it( 'returns it\'s data', () => {
				expect( modals.getData( testModal ) ).toEqual( testData );
			} );
		} );

		describe( 'when the provided key corresponds to a modal without data', () => {
			beforeEach( () => {
				modals.open( testModal );
			} );

			it( 'returns an empty object', () => {
				expect( modals.getData( testModal ) ).toEqual( {} );
			} );
		} );

		describe( 'when the provided key isn\'t defined in the modal list', () => {
			it( 'returns undefined', () => {
				expect( modals.getData( 'non-existent-modal' ) ).toBe( undefined );
			} );
		} );
	} );
} );
