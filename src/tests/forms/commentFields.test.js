import fields from '../../forms/commentFields';
import { TEXT } from '../../constants/formFields/commentForm';

describe( 'commentFields', () => {
	it( 'has the correct fields', () => {
		expect( fields ).toEqual( [
			{
				name: TEXT,
				label: 'Comment',
				placeholder: ''
			}
		] );
	} );
} );
