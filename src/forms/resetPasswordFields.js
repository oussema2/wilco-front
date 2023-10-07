import { PASSWORD, CONFIRM_PASSWORD } from '../constants/formFields/resetPasswordForm';

const fields = [ {
	name: PASSWORD,
	label: 'New Password',
	placeholder: '',
	rules: 'required|min:8'
}, {
	name: CONFIRM_PASSWORD,
	label: 'Confirm Password',
	placeholder: '',
	rules: `required|same:${PASSWORD}|min:8`
} ];

export default fields;
