import ErrorPresenter from '../../../presenters/Errors/ErrorPresenter';
import WilcoError from '../../../errors/WilcoError';

describe( 'ErrorPresenter', () => {
	let presenter;
	const name = 'test name';
	const description = 'test description';
	const error = new WilcoError( { name, description } );

	beforeEach( () => {
		presenter = new ErrorPresenter( error );
	} );

	describe( 'constructor()', () => {
		it( 'assigns the error', () => {
			expect( presenter.error ).toBe( error );
		} );
	} );

	describe( 'presentError()', () => {
		it( 'returns a string indicating an unexpected error', () => {
			expect( presenter.presentError() ).toEqual( 'An unexpected error has occurred.' );
		} );
	} );

	describe( 'get errorDescription', () => {
		it( 'returns the description', () => {
			expect( presenter.errorDescription ).toBe( error.errorDescription );
		} );
	} );
} );
