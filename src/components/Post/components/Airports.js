import React from 'react';
import {
	ScrollView,
	Text,
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from './Airports.styles';
import AirportItem from './AirportItem';

const Airports = ( {
	testID, airports
} ) => (
	airports.length > 0 && (
		<View style={styles.container} testID={testID}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollView}
			>
				{airports.map( ( airportName, key, array ) => (
				// eslint-disable-next-line react/no-array-index-key
					<View style={styles.scrollView} key={key}>
						<AirportItem airport={airportName} testID={`airport-item-${key}`} />

						{ ( array.length - 1 !== key )
					&& (
						<Text style={styles.bullet}>
							{' • '}
						</Text>
					)}

					</View>
				) )}

			</ScrollView>
		</View>
	)
);

Airports.propTypes = {
	testID: PropTypes.string,
	airports: PropTypes.arrayOf( PropTypes.string )
};

Airports.defaultProps = {
	testID: 'post-airports-component',
	airports: []
};

export default observer( Airports );
