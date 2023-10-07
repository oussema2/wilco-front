/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from '../SignUp.styles';

const StepIndicator = ( {
	testID, currentStep, stepCount
} ) => (
	<View
		testID={testID}
		style={styles.stepIndicatorContainer}
	>
		{[ ...Array( currentStep + 1 ).keys() ]
			.map( ( value, index ) => (
				// eslint-disable-next-line react/no-array-index-key
				<View key={index} style={styles.stepIndicatorActive} />
			) )}

		{[ ...Array( stepCount - ( currentStep + 1 ) ).keys() ]
			.map( ( value, index ) => (
				// eslint-disable-next-line react/no-array-index-key
				<View key={index} style={styles.stepIndicatorInactive} />
			) )}
	</View>
);

StepIndicator.propTypes = {
	testID: PropTypes.string,
	currentStep: PropTypes.number,
	stepCount: PropTypes.number
};

StepIndicator.defaultProps = {
	testID: 'FirstStep-component',
	currentStep: 0,
	stepCount: 0
};

export default observer( StepIndicator );
