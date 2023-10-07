import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, ActivityIndicator as NativeActivityIndicator } from 'react-native';

const ActivityIndicator = ( {
	testID, isLoading, containerStyle, size, color
} ) => (
	<View style={containerStyle}>
		{isLoading
			? (
				<NativeActivityIndicator
					testID={testID}
					animating
					size={size}
					color={color}
				/>
			) : null}
	</View>
);

ActivityIndicator.propTypes = {
	testID: PropTypes.string,
	isLoading: PropTypes.bool,
	containerStyle: ViewPropTypes.style,
	size: PropTypes.oneOf( [ 'large', 'small' ] ),
	color: PropTypes.string
};

ActivityIndicator.defaultProps = {
	testID: 'activityIndicator-component',
	isLoading: true,
	containerStyle: {},
	size: 'large',
	color: 'gray'
};

export default ActivityIndicator;
