import React from 'react';
import {
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { TextWithIcon } from '../../TextWithIcon';
import { airport as airportImage } from '../../../assets/icons';
import { styles } from './Airports.styles';

const AirportItem = ( {
	testID, airport
} ) => (
	<View testID={testID}>
		<TextWithIcon
			style={styles.aircraftItem}
			icon={airportImage}
			imageStyle={styles.aircraftItemIcon}
		>
			{airport}
		</TextWithIcon>
	</View>
);

AirportItem.propTypes = {
	testID: PropTypes.string,
	airport: PropTypes.string.isRequired
};

AirportItem.defaultProps = {
	testID: 'post-airports-item-component'
};

export default observer( AirportItem );
