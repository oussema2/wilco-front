import fields from '../../forms/aircraftFields';
import { MAKE_AND_MODEL, TAIL_NUMBER } from '../../constants/formFields/aircraftForm';

describe( 'aircraftFields', () => {
	it( 'has the correct fields', () => {
		expect( fields ).toEqual( [ {
			name: MAKE_AND_MODEL,
			label: 'Make and model',
			placeholder: 'e.g. Cirrus SR 22',
			rules: 'required'
		}, {
			name: TAIL_NUMBER,
			label: 'Tail number',
			placeholder: 'e.g. N2129J'
		} ] );
	} );
} );
