import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { styles } from './InputWrapper.styles';
import { Tooltip } from '../Tooltip';
import InfoIcon from './components/InfoIcon';

const InputWrapper = ( {
	testID, containerStyle, label, required, Input, capitalizeFirstLetter, popover, ...inputProps
} ) => (
	<View testID={testID} style={{ ...styles.viewContainer, ...containerStyle }}>
		<View style={styles.labelContainer}>
			{ popover ? (
				<Tooltip popover={popover}>
					<Text testID="input-label" style={styles.tooltipLabel}>
						{ label }
						<InfoIcon />
					</Text>
				</Tooltip>
			) : (
				<Text testID="input-label" style={styles.label}>
					{ label }
				</Text>
			) }

			{required && <Text testID="input-required" style={styles.required}>*</Text>}
		</View>
		<Input
			testID="input"
			capitalizeFirstLetter={capitalizeFirstLetter}
			{...inputProps}
		/>
	</View>
);

InputWrapper.propTypes = {
	containerStyle: PropTypes.instanceOf( Object ),
	testID: PropTypes.string,
	label: PropTypes.string,
	required: PropTypes.bool,
	Input: PropTypes.elementType.isRequired,
	capitalizeFirstLetter: PropTypes.bool,
	popover: PropTypes.node
};

InputWrapper.defaultProps = {
	containerStyle: {},
	testID: 'input-wrapper',
	label: '',
	required: false,
	capitalizeFirstLetter: false,
	popover: null
};

export default InputWrapper;
