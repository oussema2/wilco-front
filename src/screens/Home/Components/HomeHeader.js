import React, { forwardRef, useEffect, useRef } from 'react';
import {
	Image, Pressable, View
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { filter, horizontalLogo, sliders } from '../../../assets/icons';
import { styles } from '../Home.styles';
import { HIT_SLOP } from '../../../constants/theme';
import { Tooltip } from '../../../components/Tooltip';
import PreferencesTooltipPopover from './PreferencesTooltipPopover';
import noop from '../../../helpers/noop';
import { scrollToTop } from '../../../helpers/scroll';

const HomeHeader = forwardRef( ( {
	isHomePreferencesTooltipWasSeen, onTooltipButtonPressed, onPreferencesButtonPressed,
	onTooltipClosed, setIsFilterModalVisible
}, ref ) => {
	const tooltipRef = useRef( null );
	const { allPostListRef, myFeedPostListRef } = ref;

	const _onLogoPressed = () => {
		scrollToTop( allPostListRef );
		scrollToTop( myFeedPostListRef );
	};

	const _onFilterPressed = () => {
		setIsFilterModalVisible( true );
	};

	const _onTooltipButtonPressed = () => {
		tooltipRef.current.toggleTooltip();
		onTooltipButtonPressed();
	};

	useEffect( () => {
		if ( !isHomePreferencesTooltipWasSeen ) {
			_.delay( () => tooltipRef.current.toggleTooltip(), 1000 );
		}
	}, [] );

	return (
		<View>
			<View style={styles.headerContainer}>
				<View style={styles.headerLeftContainer}>
					<Pressable onPress={_onLogoPressed}>
						<Image
							testID="logo-image"
							style={styles.logo}
							source={horizontalLogo}
						/>
					</Pressable>
				</View>
				<View style={styles.headerRightContainer}>
					<Pressable onPress={_onFilterPressed} hitSlop={HIT_SLOP}>
						<Image
							testID="filter-image"
							style={[ styles.rightLogo, styles.filterLogo ]}
							source={filter}
						/>
					</Pressable>
					<Pressable onPress={onPreferencesButtonPressed} hitSlop={HIT_SLOP}>
						<Tooltip
							testID="sliders-image"
							popover={<PreferencesTooltipPopover onPress={_onTooltipButtonPressed} />}
							toggleOnPress={false}
							ref={tooltipRef}
							onClose={onTooltipClosed}
						>
							<Image
								style={styles.rightLogo}
								source={sliders}
							/>
						</Tooltip>
					</Pressable>
				</View>
			</View>
		</View>
	);
} );

HomeHeader.propTypes = {
	isHomePreferencesTooltipWasSeen: PropTypes.bool,
	onTooltipButtonPressed: PropTypes.func,
	onPreferencesButtonPressed: PropTypes.func,
	onTooltipClosed: PropTypes.func,
	setIsFilterModalVisible: PropTypes.func
};

HomeHeader.defaultProps = {
	isHomePreferencesTooltipWasSeen: true,
	onTooltipButtonPressed: noop,
	onPreferencesButtonPressed: noop,
	onTooltipClosed: noop,
	setIsFilterModalVisible: noop
};

export default HomeHeader;
