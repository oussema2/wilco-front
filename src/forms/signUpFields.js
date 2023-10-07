import {
	EMAIL, PASSWORD, FIRST_NAME, LAST_NAME
} from '../constants/formFields/signUpForm';

export const fieldsFirstStep = [ {
	name: FIRST_NAME,
	label: 'First name',
	placeholder: 'e.g. Wiley',
	rules: 'required'
}, {
	name: LAST_NAME,
	label: 'Last name',
	placeholder: 'e.g. Post',
	rules: 'required'
} ];

export const fieldsSecondStep = [ {
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
