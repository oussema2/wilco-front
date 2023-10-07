import { EMAIL } from '../constants/formFields/forgotPasswordForm';

const fields = [ {
	name: EMAIL,
	label: 'Email',
	placeholder: 'e.g. wileypost@gmail.com',
	rules: 'required|email'
} ];

export default fields;
