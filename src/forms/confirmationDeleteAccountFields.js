import { PASSWORD } from '../constants/formFields/confirmationDeleteAccountForm';

const fields = [ {
	name: PASSWORD,
	label: 'Password',
	placeholder: '8 characters minimum',
	rules: 'required|min:8'
} ];

export default fields;
