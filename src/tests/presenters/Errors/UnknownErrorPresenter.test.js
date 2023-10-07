import UnknownErrorPresenter from '../../../presenters/Errors/UnknownErrorPresenter';
import WilcoError from '../../../errors/WilcoError';
import { itPresentsErrorWithCustomMessages } from '../../sharedExamples/errorPresenters';

describe( 'UnknownErrorPresenter', () => {
	let presenter;
	const name = 'test name';
	const description = 'test description';
	const error = new WilcoError( { name, description } );

	beforeEach( () => {
		presenter = new UnknownErrorPresenter( error );
	} );

	describe( 'presentError()', () => {
		it( 'returns the correct string', () => {
			expect( presenter.presentError() ).toBe( 'There has been an unexpected error' );
		} );

		describe( 'with custom messages', () => {
			itPresentsErrorWithCustomMessages( {
				buildPresenter: ( err, customMessages ) => (
					new UnknownErrorPresenter( err, customMessages )
				)
			} );
		} );
	} );
} );
