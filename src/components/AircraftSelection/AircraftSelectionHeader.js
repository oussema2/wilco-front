import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { TextButton } from '../TextButton';
import { Title } from '../Title';
import { styles } from './AircraftSelection.styles';

const AircraftSelectionHeader = ( { title, onAddAircraft, required } ) => (
	<View style={styles.aircraftSelectionHeader}>
		<Title
			testID="aircraft-selection-title"
			text={title}
			textTransform="none"
			required={required}
		/>
		{onAddAircraft && (
			<TextButton
				testID="add-aircraft-button"
				title="Add an aircraft"
				onPress={onAddAircraft}
			/>
		)}
	</View>
);

AircraftSelectionHeader.propTypes = {
	onAddAircraft: PropTypes.oneOfType( [ PropTypes.func, PropTypes.oneOf( [ false ] ) ] ),
	title: PropTypes.string.isRequired,
	required: PropTypes.bool
};

AircraftSelectionHeader.defaultProps = {
	onAddAircraft: null,
	required: false
};

export default observer( AircraftSelectionHeader );
