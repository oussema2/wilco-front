import { Text } from 'react-native-elements';
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from '../Preferences.styles';
import Tags from '../../../components/Tags/Tags';

const PreferredAirports = ( { preferredAirportsPresenter } ) => (
	<View>
		<View style={styles.preferredAirportsHeader}>
			<Text testID="other-airports-title-testID" style={[ styles.subTitle, styles.preferredAirportsTitle ]}>
				Other Airports
			</Text>
			<View style={styles.preferredAirportsCounter}>
				<Text style={
					[
						styles.preferredAirportsCount,
						preferredAirportsPresenter.hasAnyPreferredAirport
							? styles.preferredAirportsCountBold
							: {}
					]
				}
				>
					{preferredAirportsPresenter.preferredAirports.length}
				</Text>
				<Text style={styles.preferredAirportsCount}>
					{'/'}
					{preferredAirportsPresenter.maxPreferredAirports}
				</Text>
			</View>
		</View>

		{ preferredAirportsPresenter.hasAnyPreferredAirport
			? (
				<Tags
					items={preferredAirportsPresenter.preferredAirports}
					containerStyle={styles.homeAirportTagContainer}
					onRemove={preferredAirportsPresenter.removePreferredAirport}
				/>
			)
			:	(
				<Text style={styles.placeholder}>
					Set your preferred airports in the field above.
				</Text>
			)}

	</View>
);

PreferredAirports.propTypes = {
	preferredAirportsPresenter: PropTypes.any.isRequired
};

PreferredAirports.defaultProps = {
};

export default observer( PreferredAirports );
