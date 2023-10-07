import {
	CERTIFICATES_OTHER,
	RATINGS_OTHER
} from '../constants/formFields/editCredentialsForm';

const fields = [
	{
		name: CERTIFICATES_OTHER,
		label: '',
		placeholder: 'Add your certificate',
		rules: 'max:100'
	}, {
		name: RATINGS_OTHER,
		label: '',
		placeholder: 'Add your rating',
		rules: 'max:100'
	}
];

export default fields;
