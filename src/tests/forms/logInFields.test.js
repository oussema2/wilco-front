import fields from '../../forms/logInFields';
import { EMAIL, PASSWORD } from '../../constants/formFields/logInForm';

describe( 'logInForm', () => {
	it( 'has the correct fields', () => {
		expect( fields ).toEqual( [
			{
				name: EMAIL,
				label: 'Email',
				placeholder: 'e.g. wileypost@gmail.com',
				rules: 'required|email'
			}, {
				name: PASSWORD,
				label: 'Password',
				placeholder: '8 characters minimum',
				rules: 'required|min:8'
			}
		] );
	} );
} );
