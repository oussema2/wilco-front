import PostFlightFactory from '../../factories/PostFlightFactory';
import PostFlightPresenter from '../../../presenters/PostFlightPresenter';
import PostFlightPresenterBuilder from '../../../presenters/Builders/PostFlightPresenterBuilder';

describe( 'PostFlightPresenterBuilder', () => {
	const postFlight = PostFlightFactory.build();

	describe( 'build()', () => {
		const presenter = PostFlightPresenterBuilder.build( {
			postFlight
		} );
		it( 'creates the PostFlightPresenterBuilder correctly', () => {
			expect( presenter ).toBeInstanceOf( PostFlightPresenter );
		} );
	} );
} );
