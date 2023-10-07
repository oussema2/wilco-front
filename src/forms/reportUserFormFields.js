export const REPORT_REASON_FIELD = 'reason';
export const ADDITIONAL_INFORMATION_FIELD = 'details';

export const FIELDS = [
	{
		name: REPORT_REASON_FIELD,
		rules: 'required'
	},
	{
		name: ADDITIONAL_INFORMATION_FIELD,
		placeholder: 'Type your message here',
		rules: 'between:0,300'
	}
];
