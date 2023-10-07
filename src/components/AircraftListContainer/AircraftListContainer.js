import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { AircraftList } from './AircraftList';
import Aircraft from '../../entities/Aircraft';
import groupBy from '../../helpers/groupBy';
import { EmptyAircraftList } from '../EmptyAircraftList';

const AircraftListContainer = ( {
	testID, aircrafts, selectedAircraftID, onAircraftSelected, onAircraftOptionsPressed, showAvatar
} ) => {
	const groupedAircrafts = Object.entries( groupBy( aircrafts, 'makeAndModel' ) );

	if ( !groupedAircrafts.length ) return <EmptyAircraftList />;

	return (
		<View testID={testID}>
			{
				groupedAircrafts.map( ( [ makeAndModel, aircraftGroup ] ) => (
					<AircraftList
						testID={`${makeAndModel} list`}
						key={makeAndModel}
						aircrafts={aircraftGroup}
						selectedAircraftID={selectedAircraftID}
						onAircraftSelected={onAircraftSelected}
						onAircraftOptionsPressed={onAircraftOptionsPressed}
						showAvatar={showAvatar}
					/>
				) )
			}
		</View>
	);
};

AircraftListContainer.propTypes = {
	aircrafts: PropTypes.arrayOf( PropTypes.instanceOf( Aircraft ) ).isRequired,
	testID: PropTypes.string,
	selectedAircraftID: PropTypes.number,
	onAircraftSelected: PropTypes.func,
	onAircraftOptionsPressed: PropTypes.func,
	showAvatar: PropTypes.bool
};

AircraftListContainer.defaultProps = {
	testID: 'aircraftListContainer-component',
	selectedAircraftID: null,
	onAircraftSelected: () => {},
	onAircraftOptionsPressed: () => {},
	showAvatar: false
};

export default observer( AircraftListContainer );
