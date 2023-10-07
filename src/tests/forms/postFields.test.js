import fields from '../../forms/postFields';
import {
	TITLE, MESSAGE, VISIBILITY, FLIGHT, FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME
} from '../../constants/formFields/postForm';

describe( 'postFields', () => {
	it( 'has the correct fields', () => {
		expect( fields ).toEqual( [
			{
				name: TITLE,
				label: 'Title',
				placeholder: 'Add a title'
			}, {
				name: MESSAGE,
				label: 'Message / Trip notes',
				placeholder: 'Share an activity or experience\nRequest feedback\nPost a PIREP'
			}, {
				name: VISIBILITY,
				label: 'Post Visibility',
				placeholder: 'Select the visibility'
			},
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
		] );
	} );
} );
