import InputErrorPresenter from '../../../presenters/Errors/InputErrorPresenter';
import WilcoError from '../../../errors/WilcoError';
import { itPresentsErrorWithCustomMessages } from '../../sharedExamples/errorPresenters';

describe( 'InputErrorPresenter', () => {
	let presenter;
	const name = 'test name';
	const description = 'test description';
	const error = new WilcoError( { name, description } );

	beforeEach( () => {
		presenter = new InputErrorPresenter( error );
	} );

	describe( 'presentError()', () => {
		describe( 'when the description is a string', () => {
			it( 'returns the error description', () => {
				expect( presenter.presentError() ).toBe( description );
			} );
		} );

		describe( 'when the description is an object', () => {
			const objectDescription = {
				first: [ 'expected value', 'another value' ],
				second: [ 'value' ]
			};

			beforeEach( () => {
				presenter = new InputErrorPresenter(
					new WilcoError( { name, description: objectDescription } )
				);
			} );

			it( 'returns the first message', () => {
				expect( presenter.presentError() ).toBe( 'first expected value' );
			} );
		} );

		describe( 'with custom messages', () => {
			itPresentsErrorWithCustomMessages( {
				buildPresenter: ( err, customMessages ) => (
					new InputErrorPresenter( err, customMessages )
				)
			} );
		} );
	} );
} );
