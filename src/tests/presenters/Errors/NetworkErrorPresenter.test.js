import NetworkErrorPresenter from '../../../presenters/Errors/NetworkErrorPresenter';
import WilcoError from '../../../errors/WilcoError';
import { itPresentsErrorWithCustomMessages } from '../../sharedExamples/errorPresenters';

describe( 'NetworkErrorPresenter', () => {
	let presenter;
	const name = 'test name';
	const description = 'test description';
	const error = new WilcoError( { name, description } );

	beforeEach( () => {
		presenter = new NetworkErrorPresenter( error );
	} );

	describe( 'presentError()', () => {
		it( 'returns the correct string', () => {
			expect( presenter.presentError() ).toBe( 'Connection error. Please try again.' );
		} );

		describe( 'with custom messages', () => {
			itPresentsErrorWithCustomMessages( {
				buildPresenter: ( err, customMessages ) => (
					new NetworkErrorPresenter( err, customMessages )
				)
			} );
		} );
	} );
} );
