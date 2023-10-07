import WilcoError from '../../errors/WilcoError';

export const mapAircraftRequestError = ( error ) => {
	if ( error.isInputError ) {
		return new WilcoError( {
			name: 'repeated_aircraft', description: 'You already have an aircraft with that tail number.'
		} );
	}
	return error;
};
