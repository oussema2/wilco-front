import AvailabilityErrorPresenter from '../../../presenters/Errors/AvailabilityErrorPresenter';
import WilcoError from '../../../errors/WilcoError';
import { itPresentsErrorWithCustomMessages } from '../../sharedExamples/errorPresenters';

describe( 'AvailabilityErrorPresenter', () => {
	let presenter;
	const name = 'test name';
	const description = 'test description';
	const error = new WilcoError( { name, description } );

	beforeEach( () => {
		presenter = new AvailabilityErrorPresenter( error );
	} );

	describe( 'presentError()', () => {
		it( 'returns the error description', () => {
			expect( presenter.presentError() ).toBe( description );
		} );

		describe( 'with custom messages', () => {
			itPresentsErrorWithCustomMessages( {
				buildPresenter: ( err, customMessages ) => (
					new AvailabilityErrorPresenter( err, customMessages )
				)
			} );
		} );
	} );
} );
