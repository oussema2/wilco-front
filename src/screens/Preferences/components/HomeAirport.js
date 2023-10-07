import { Text } from 'react-native-elements';
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from '../Preferences.styles';
import { Tooltip } from '../../../components/Tooltip';
import HomeAirportTooltipPopover from './HomeAirportTooltipPopover';
import InfoIcon from '../../../components/InputWrapper/components/InfoIcon';
import Tags from '../../../components/Tags/Tags';

const HomeAirport = ( { pilotHasHomeAirport, pilotHomeAirport } ) => (
	<View>
		<Tooltip width={290} popover={<HomeAirportTooltipPopover />}>
			<Text testID="input-label" style={styles.subTitle}>
				Home Airport
				<InfoIcon />
			</Text>
		</Tooltip>

		{pilotHasHomeAirport
			? (
				<Tags
					items={[ pilotHomeAirport ]}
					containerStyle={styles.homeAirportTagContainer}
				/>
			)
			: (
				<Text style={styles.placeholder}>
					Set your home airport from your profile.
				</Text>
			)}
	</View>
);

HomeAirport.propTypes = {
	pilotHasHomeAirport: PropTypes.bool,
	pilotHomeAirport: PropTypes.string
};

HomeAirport.defaultProps = {
	pilotHasHomeAirport: false,
	pilotHomeAirport: ''
};

export default observer( HomeAirport );
