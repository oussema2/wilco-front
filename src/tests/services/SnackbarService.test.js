import SnackbarService from '../../services/SnackbarService';

describe( 'SnackbarService', () => {
	let snackbarService;

	beforeEach( () => {
		snackbarService = new SnackbarService();
	} );

	describe( 'constructor()', () => {
		it( 'initializes with a non visible snackbar', () => {
			expect( snackbarService.isVisible ).toBe( false );
		} );
	} );

	describe( '@showInfo()', () => {
		it( 'shows the snackbar with the provided configuration', () => {
			const config = { message: 'test' };

			snackbarService.showSuccess( config );

			expect( snackbarService.isVisible ).toBe( true );
			expect( snackbarService.type ).toEqual( 'success' );
			expect( snackbarService.message ).toEqual( 'test' );
		} );
	} );

	describe( '@showSuccess()', () => {
		it( 'shows the snackbar with the provided configuration', () => {
			const config = { message: 'test' };

			snackbarService.showInfo( config );

			expect( snackbarService.isVisible ).toBe( true );
			expect( snackbarService.type ).toEqual( 'info' );
			expect( snackbarService.message ).toEqual( 'test' );
		} );
	} );

	describe( '@showError()', () => {
		it( 'shows the snackbar with the provided configuration', () => {
			const config = { message: 'test' };

			snackbarService.showError( config );

			expect( snackbarService.isVisible ).toBe( true );
			expect( snackbarService.type ).toEqual( 'error' );
			expect( snackbarService.message ).toEqual( 'test' );
		} );
	} );
} );
