import {
	TITLE, MESSAGE, VISIBILITY, FLIGHT, FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME
} from '../constants/formFields/postForm';

const commonFields = [ {
	name: TITLE,
	label: 'Title',
	placeholder: 'Add a title'
}, {
	name: MESSAGE,
	label: 'Message / Trip notes',
	placeholder: 'Share an activity or experience\n'
			+ 'Request feedback\n'
			+ 'Post a PIREP'
}, {
	name: VISIBILITY,
	label: 'Post Visibility',
	placeholder: 'Select the visibility'
} ];

const fields = [
	...commonFields,
	{
		name: FLIGHT,
		label: 'Flight',
		fields: [ {
			name: FROM,
			label: 'From',
			placeholder: 'Origin code',
			rules: 'required|between:3,4'
		}, {
			name: TO,
			label: 'To',
			placeholder: 'Destination code',
			rules: 'required|between:3,4'
		}, {
			name: DEPARTURE_TIME,
			label: 'Departure',
			placeholder: 'Pick the date and time',
			rules: 'required'
		}, {
			name: ARRIVAL_TIME,
			label: 'Arrival',
			placeholder: 'Pick the date and time',
			rules: 'required'
		} ]
	}
];

export default fields;
export { commonFields as editFields };
