import ErrorPresenterBuilder from '../../../presenters/Builders/ErrorPresenterBuilder';
import AvailabilityErrorPresenter from '../../../presenters/Errors/AvailabilityErrorPresenter';
import AvailabilityError from '../../../errors/AvailabilityError';
import NetworkError from '../../../errors/NetworkError';
import NetworkErrorPresenter from '../../../presenters/Errors/NetworkErrorPresenter';
import UnknownError from '../../../errors/UnknownError';
import UnknownErrorPresenter from '../../../presenters/Errors/UnknownErrorPresenter';
import WilcoError from '../../../errors/WilcoError';
import WilcoErrorPresenter from '../../../presenters/Errors/WilcoErrorPresenter';
import ErrorPresenter from '../../../presenters/Errors/ErrorPresenter';

describe( 'ErrorPresenterBuilder', () => {
	describe( 'forError()', () => {
		let error;
		let builder;

		beforeEach( () => {
			error = null;
			builder = new ErrorPresenterBuilder();
		} );

		describe( 'when provided an AvailabilityError', () => {
			it( 'returns an availability error presenter', () => {
				error = new AvailabilityError();
				const presenter = builder.forError( error );
				expect( presenter ).toBeInstanceOf( AvailabilityErrorPresenter );
			} );
		} );

		describe( 'when provided a NetworkError', () => {
			it( 'returns a network error presenter', () => {
				error = new NetworkError();
				const presenter = builder.forError( error );
				expect( presenter ).toBeInstanceOf( NetworkErrorPresenter );
			} );
		} );

		describe( 'when provided a UnknownError', () => {
			it( 'returns an unknown error presenter', () => {
				error = new UnknownError();
				const presenter = builder.forError( error );
				expect( presenter ).toBeInstanceOf( UnknownErrorPresenter );
			} );
		} );

		describe( 'when provided a WilcoError', () => {
			it( 'returns a Wilco error presenter', () => {
				error = new WilcoError();
				const presenter = builder.forError( error );
				expect( presenter ).toBeInstanceOf( WilcoErrorPresenter );
			} );
		} );

		describe( 'when provided another error type', () => {
			it( 'returns an error presenter', () => {
				error = new Error();
				const presenter = builder.forError( error );
				expect( presenter ).toBeInstanceOf( ErrorPresenter );
			} );
		} );
	} );
} );
