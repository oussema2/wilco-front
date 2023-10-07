import WilcoErrorPresenter from '../../../presenters/Errors/WilcoErrorPresenter';
import WilcoError from '../../../errors/WilcoError';
import { itPresentsErrorWithCustomMessages } from '../../sharedExamples/errorPresenters';

describe( 'WilcoErrorPresenter', () => {
	let presenter;
	const name = 'test name';
	const description = 'test description';
	const error = new WilcoError( { name, description } );

	beforeEach( () => {
		presenter = new WilcoErrorPresenter( error );
	} );

	describe( 'presentError()', () => {
		it( 'returns the error\'s description', () => {
			expect( presenter.presentError() ).toBe( 'test description' );
		} );

		describe( 'with custom messages', () => {
			itPresentsErrorWithCustomMessages( {
				buildPresenter: ( err, customMessages ) => (
					new WilcoErrorPresenter( err, customMessages )
				)
			} );
		} );
	} );
} );
