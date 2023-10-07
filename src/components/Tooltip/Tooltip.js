import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Tooltip as TooltipElements } from 'react-native-elements';
import { observer } from 'mobx-react-lite';
import { palette } from '../../Theme';
import { styles } from './Tooltip.styles';
import noop from '../../helpers/noop';

const Tooltip = observer( ( {
	testID, children, toggleOnPress, popover, width, withOverlay, onClose
}, ref ) => (
	<View
		testID={testID}
		style={styles.container}
	>
		<TooltipElements
			ref={ref}
			width={width}
			height={null}
			toggleOnPress={toggleOnPress}
			backgroundColor={palette.secondary.default}
			containerStyle={styles.tooltipContainer}
			popover={popover}
			withOverlay={withOverlay}
			onClose={onClose}
		>
			{children}
		</TooltipElements>
	</View>
), { forwardRef: true } );

Tooltip.propTypes = {
	testID: PropTypes.string,
	children: PropTypes.node,
	toggleOnPress: PropTypes.bool,
	popover: PropTypes.node,
	width: PropTypes.number,
	withOverlay: PropTypes.bool,
	onClose: PropTypes.func
};

Tooltip.defaultProps = {
	testID: 'comment-Component',
	children: null,
	toggleOnPress: true,
	popover: null,
	width: 246,
	withOverlay: true,
	onClose: noop
};

export default Tooltip;
