import React from 'react';
import { Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './Title.styles';
import noop from '../../helpers/noop';

const Title = ( {
	testID, text, textTransform, style, rightText, rightAction, required
} ) => (
	<View style={{ flexDirection: 'row', flex: 1 }}>
		<Text
			testID={testID}
			style={{ ...styles( { textTransform } ).text, ...style }}
			numberOfLines={1}
		>
			{text}
		</Text>
		{required && <Text testID="required-testID" style={{ ...styles( { textTransform } ).required }}> *</Text> }
		{ rightText && rightAction
					&& (
						<Text
							testID="right-text-testID"
							onPress={rightAction}
							style={{
								...styles( { textTransform } ).text,
								...style,
								...styles( { textTransform } ).rightText
							}}
							numberOfLines={1}
						>
							{rightText}
						</Text>
					)}
	</View>
);

Title.propTypes = {
	testID: PropTypes.string,
	text: PropTypes.string.isRequired,
	textTransform: PropTypes.oneOf( [ 'capitalize', 'none' ] ),
	style: ViewPropTypes.style,
	rightText: PropTypes.string,
	rightAction: PropTypes.func,
	required: PropTypes.bool
};

Title.defaultProps = {
	testID: 'title-component',
	textTransform: 'capitalize',
	style: {},
	rightAction: noop,
	rightText: null,
	required: false
};

export default Title;
