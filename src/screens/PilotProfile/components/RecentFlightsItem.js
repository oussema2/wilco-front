import React from 'react';
import {
	Text, View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from './RecentFlights.styles';
import { Image } from '../../../components/Image';
import { arrowRight } from '../../../assets/icons';
import { Avatar } from '../../../components/Avatar';
import PostFlightPresenter from '../../../presenters/PostFlightPresenter';
import FlightInfoItem from './FlightInfoItem/FlightInfoItem';

// eslint-disable-next-line react/prop-types
const RecentFlightsItem = ( { postFlightPresenter } ) => (
	<View testID="recentFlightItem-component" style={styles.containerView}>
		<View style={styles.innerContainerView}>
			<View style={styles.originAndDestination}>
				<Text
					testID="departureAirport-Text"
					style={styles.airportName}
					numberOfLines={1}
				>
					{postFlightPresenter.from}
				</Text>
				<View style={styles.arrowIcon}>
					<Image
						testID="rightArrow-Image"
						source={arrowRight}
						size={18}
					/>
				</View>
				<Text
					testID="arrivalAirport-Text"
					style={styles.airportName}
					numberOfLines={1}
				>
					{postFlightPresenter.to}
				</Text>
			</View>
			<FlightInfoItem
				testID="aircraft-info"
				image={(
					<Avatar
						variant="aircraft"
						size="small"
						source={postFlightPresenter.pictureThumbnailSource}
					/>
				)}
				text={postFlightPresenter.makeAndModel}
			/>
			<Text testID="date-info-Text" style={styles.date}>{postFlightPresenter.date}</Text>
		</View>
	</View>
);

RecentFlightsItem.propTypes = {
	postFlightPresenter: PropTypes.instanceOf( PostFlightPresenter ).isRequired
};

export default observer( RecentFlightsItem );
