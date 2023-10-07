import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { styles } from './TrackSwitch.styles';
import { Switch } from '../Switch';
import { Title } from '../Title';
import { Image } from '../Image';
import { HorizontalPadding } from '../HorizontalPadding';

const TrackSwitch = ( {
	testID, shouldShowTrack, toggleShowTrack, trackSource
} ) => (
	<>
		<HorizontalPadding>
			<View testID={testID} style={styles.trackSwitch}>
				<Title
					text="Add track"
					textTransform="none"
				/>
				<Switch
					value={shouldShowTrack}
					onValueChange={toggleShowTrack}
				/>
			</View>
		</HorizontalPadding>
		<View style={styles.trackContainer}>
			{shouldShowTrack && trackSource
			&& <Image source={trackSource} style={styles.track} />}
		</View>
	</>
);

TrackSwitch.propTypes = {
	testID: PropTypes.string,
	shouldShowTrack: PropTypes.bool.isRequired,
	toggleShowTrack: PropTypes.func.isRequired,
	trackSource: PropTypes.shape( {
		uri: PropTypes.string.isRequired
	} )
};

TrackSwitch.defaultProps = {
	testID: 'TrackSwitch',
	trackSource: null
};

export default TrackSwitch;
