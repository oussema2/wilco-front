import React, { forwardRef } from 'react';
import {
	KeyboardAvoidingView, Platform, ScrollView, ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

const KeyboardAwareScrollView = forwardRef( ( {
	children, fixedBottomContent, style, ...props
}, ref ) => (
	<KeyboardAvoidingView
		style={{ flex: 1 }}
		enabled
		behavior={( Platform.OS === 'ios' ) ? 'padding' : null}
		{...props}
	>
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={ref} keyboardShouldPersistTaps="handled" style={style}>
			{children}
		</ScrollView>
		{fixedBottomContent}
	</KeyboardAvoidingView>
) );

KeyboardAwareScrollView.propTypes = {
	children: PropTypes.node.isRequired,
	fixedBottomContent: PropTypes.node,
	style: ViewPropTypes.style
};

KeyboardAwareScrollView.defaultProps = {
	fixedBottomContent: null,
	style: {}
};

export default KeyboardAwareScrollView;
