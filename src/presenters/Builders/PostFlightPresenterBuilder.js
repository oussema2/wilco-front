import PostFlightPresenter from '../PostFlightPresenter';

export default class PostFlightPresenterBuilder {
	static build( {
		postFlight
	} ) {
		const presenter = new PostFlightPresenter( {
			postFlight
		} );

		return presenter;
	}
}
