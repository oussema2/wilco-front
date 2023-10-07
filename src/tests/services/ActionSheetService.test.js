import ActionSheetService from '../../services/ActionSheetService';

describe( 'ActionSheetService', () => {
	let service;

	beforeEach( () => {
		service = new ActionSheetService();
	} );

	describe( 'constructor()', () => {
		it( 'initializes with a closed action sheet', () => {
			expect( service.isOpen ).toBe( false );
			expect( service.actions ).toEqual( [] );
		} );
	} );

	describe( '@open()', () => {
		it( 'opens the action sheet with the provided configuration', () => {
			const config = { actions: [ { title: 'test' } ] };

			service.open( config );

			expect( service.isOpen ).toBe( true );
			expect( service.actions ).toEqual( config.actions );
		} );
	} );

	describe( '@close()', () => {
		it( 'closes the action sheet and clears the actions', () => {
			const config = { actions: [ { title: 'test' } ] };

			service.open( config );
			service.close();

			expect( service.isOpen ).toBe( false );
			expect( service.actions ).toEqual( [] );
		} );
	} );
} );
