import { EMAIL, PASSWORD } from '../constants/formFields/logInForm';

const fields = [ {
	name: EMAIL,
	label: 'Email',
	placeholder: 'e.g. wileypost@gmail.com',
	rules: 'required|email'
}, {
	name: PASSWORD,
	label: 'Password',
	placeholder: '8 characters minimum',
	rules: 'required|min:8'
} ];

export default fields;
