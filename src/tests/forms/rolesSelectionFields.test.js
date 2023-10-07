import fields from '../../forms/rolesSelectionFields';
import { OTHER } from '../../constants/formFields/rolesSelectionForm';

describe( 'rolesSelectionFields', () => {
	it( 'has the correct fields', () => {
		expect( fields ).toEqual( [
			{
				name: OTHER,
				label: '',
				placeholder: 'Add your role(s), separated by commas',
				rules: 'required|between:0,100'
			}
		] );
	} );
} );
