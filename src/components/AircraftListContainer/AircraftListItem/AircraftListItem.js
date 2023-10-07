import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import Aircraft from '../../../entities/Aircraft';
import { styles } from './AircraftListItem.styles';
import { MeatballsMenu } from '../../MeatballsMenu';
import { palette } from '../../../Theme';
import { Avatar } from '../../Avatar';

const AircraftListItem = ( {
	testID, aircraft, optionsOnPress, showMeatballsMenu, isSelected, onAircraftSelected, showAvatar
} ) => (
	<View testID={testID} style={styles.listItemContainer}>
		{showAvatar && (
			<View style={styles.avatarContainer}>
				<Avatar source={aircraft.pictureThumbnailSource} size="small" variant="aircraft" />
			</View>
		)}

		{!showAvatar && (
			<CheckBox
				containerStyle={styles.checkBox}
				size={24}
				checkedColor={palette.primary.darkCyan}
				checkedIcon="dot-circle-o"
				uncheckedIcon="circle-o"
				checked={isSelected}
				onPress={onAircraftSelected}
			/>
		)}

		<Text style={styles.makeAndModel}>{aircraft.makeAndModel}</Text>
		<Text style={styles.dot}>•</Text>
		<Text style={styles.tailNumber}>{aircraft.tailNumber || 'Post manually'}</Text>
		{ ( showMeatballsMenu ) ? <MeatballsMenu testID={`${testID} options`} containerStyle={styles.optionsContainer} onPress={optionsOnPress} /> : null}
	</View>
);

AircraftListItem.propTypes = {
	aircraft: PropTypes.instanceOf( Aircraft ).isRequired,
	testID: PropTypes.string,
	optionsOnPress: PropTypes.func,
	showMeatballsMenu: PropTypes.bool,
	isSelected: PropTypes.bool,
	onAircraftSelected: PropTypes.func,
	showAvatar: PropTypes.bool
};

AircraftListItem.defaultProps = {
	testID: 'aircraftListItem-component',
	optionsOnPress: () => {},
	showMeatballsMenu: true,
	isSelected: false,
	onAircraftSelected: () => {},
	showAvatar: false
};

export default observer( AircraftListItem );
