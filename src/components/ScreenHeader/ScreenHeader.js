import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TextButton } from '../TextButton';
import { styles } from './ScreenHeader.styles';

const ScreenHeader = ( {
	testID, title, rightButton
} ) => (
	<View testID={testID} style={styles.containerView}>
		<Text testID="header-text" style={styles.title} numberOfLines={1}>
			{title}
		</Text>
		{rightButton && (
			<TextButton
				testID="rightButton-TextButton"
				title={rightButton.title}
				onPress={rightButton.onPress}
				variant="destructive"
			/>
		)}
	</View>
);

ScreenHeader.propTypes = {
	testID: PropTypes.string,
	title: PropTypes.string,
	rightButton: PropTypes.shape( {
		title: PropTypes.string,
		onPress: PropTypes.func
	} )
};

ScreenHeader.defaultProps = {
	testID: 'screenHeader-view',
	title: '',
	rightButton: null
};

export default ScreenHeader;
