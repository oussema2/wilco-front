import {
	DESCRIPTION, FIRST_NAME, LAST_NAME, HOME_AIRPORT, PRIMARY_AIRCRAFT_ID, TOTAL_HOURS
} from '../constants/formFields/editProfileForm';

const fields = [
	{
		name: FIRST_NAME,
		label: 'First name',
		rules: 'required'
	}, {
		name: LAST_NAME,
		label: 'Last name',
		rules: 'required'
	}, {
		name: DESCRIPTION,
		label: 'Banner',
		placeholder: 'Share more about yourself with others members',
		rules: 'max:256'
	}, {
		name: HOME_AIRPORT,
		label: 'Home airport',
		placeholder: 'Write the airport\'s ICAO code',
		rules: 'between:3,4|alpha_num'
	}, {
		name: PRIMARY_AIRCRAFT_ID,
		label: 'Primary aircraft',
		placeholder: 'Choose your main aircraft'
	}, {
		name: TOTAL_HOURS,
		label: 'Total Hours',
		placeholder: 'Add your amount of flight hours',
		rules: 'max:30'
	}
];

export default fields;
