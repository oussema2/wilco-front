import React from 'react';
import {
	FlatList
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { SuplementalTitle } from '../../../components/SuplementalTitle';
import { styles } from './RecentFlights.styles';
import EmptyStateText from '../../../components/EmptyStateText/EmptyStateText';
import PostFlightPresenter from '../../../presenters/PostFlightPresenter';
import RecentFlightsItem from './RecentFlightsItem';

// eslint-disable-next-line react/prop-types
const _renderRecentFlightsItem = ( { item: postFlightPresenter } ) => (
	postFlightPresenter && (
		<RecentFlightsItem postFlightPresenter={postFlightPresenter} />
	)
);

const _noItemDisplay = ( emptyListText ) => (
	<EmptyStateText text={emptyListText} />
);

const RecentFlights = ( { testID, data, emptyListText } ) => (
	<>
		<SuplementalTitle testID="recentFlights-title" text="Recent Flights" style={styles.title} />
		<FlatList
			testID={testID}
			data={data}
			ListEmptyComponent={_noItemDisplay( emptyListText )}
			renderItem={_renderRecentFlightsItem}
			keyExtractor={( postFlightPresenter ) => postFlightPresenter.id}
		/>
	</>
);

RecentFlights.propTypes = {
	testID: PropTypes.string,
	data: PropTypes.arrayOf( PropTypes.instanceOf( PostFlightPresenter ) ),
	emptyListText: PropTypes.string
};

RecentFlights.defaultProps = {
	testID: 'recentFlights-component',
	data: null,
	emptyListText: ''
};

export default observer( RecentFlights );
