import dvr from 'mobx-react-form/lib/validators/DVR';
import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';

Validator.setMessages( 'en', {
	...en,
	between: {
		...en.between,
		string: 'This field must be between :min and :max characters.'
	},
	email: 'This email does not have a valid format.',
	min: {
		...en.min,
		string: ':attribute must be at least :min characters long.'
	},
	required: 'This field is mandatory.'
} );

export default {
	dvr: dvr( {
		package: Validator
	} )
};
