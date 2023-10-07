import { OTHER } from '../constants/formFields/rolesSelectionForm';

const fields = [ {
	name: OTHER,
	label: '',
	placeholder: 'Add your role(s), separated by commas',
	rules: 'required|between:0,100'
} ];

export default fields;
