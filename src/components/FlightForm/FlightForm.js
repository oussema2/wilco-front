/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput } from '../TextInput';
import { TouchableInput } from '../TouchableInput';
import { HorizontalPadding } from '../HorizontalPadding';
import FlightFormPresenter from '../../presenters/FlightFormPresenter';
import {
	FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME
} from '../../constants/formFields/postForm';
import { styles } from './FlightForm.styles';
import { Title } from '../Title';

const FlightForm = ( { testID, presenter } ) => (
	<HorizontalPadding testID={testID} style={styles.container}>
		<Title
			testID="post-manually-form-title"
			text="Flight data - Add flight manually"
			textTransform="none"
			required
		/>
		<View style={styles.separatorView} />
		<TextInput
			testID="from-input"
			textInputStyle={styles.withBottomSpace}
			required
			autoCapitalize="characters"
			error={presenter.form.$( FROM ).error}
			inputProps={presenter.form.$( FROM ).bind()}
		/>
		<TextInput
			testID="to-input"
			textInputStyle={styles.withBottomSpace}
			required
			autoCapitalize="characters"
			error={presenter.form.$( TO ).error}
			inputProps={presenter.form.$( TO ).bind()}
		/>
		<TouchableInput
			testID="departure-time-input"
			containerStyle={styles.withBottomSpace}
			required
			label={presenter.form.$( DEPARTURE_TIME ).label}
			value={presenter.departureTime}
			onPress={() => presenter.onDepartureTimePressed()}
			placeholder={presenter.form.$( DEPARTURE_TIME ).placeholder}
		/>
		<TouchableInput
			testID="arrival-time-input"
			containerStyle={styles.withBottomSpace}
			required
			label={presenter.form.$( ARRIVAL_TIME ).label}
			value={presenter.arrivalTime}
			onPress={() => presenter.onArrivalTimePressed()}
			placeholder={presenter.form.$( DEPARTURE_TIME ).placeholder}
		/>
	</HorizontalPadding>
);

FlightForm.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.instanceOf( FlightFormPresenter ).isRequired
};

FlightForm.defaultProps = {
	testID: 'flightForm-component'
};

export default observer( FlightForm );
