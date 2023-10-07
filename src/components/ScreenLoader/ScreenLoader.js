import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress/Bar';
import { palette } from '../../Theme';
import { styles } from './ScreenLoader.styles';

const ScreenLoader = ( { testID } ) => (
	<View testID={testID} style={styles.overlay}>
		<ProgressBar
			testID="progress-bar"
			indeterminate
			color={palette.primary.default}
			borderWidth={0}
			width={null}
			borderRadius={0}
		/>
	</View>
);

ScreenLoader.propTypes = {
	testID: PropTypes.string
};

ScreenLoader.defaultProps = {
	testID: 'screenLoader'
};

export default ScreenLoader;
