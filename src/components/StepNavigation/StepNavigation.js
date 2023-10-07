import React, { useEffect, useRef } from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import PagerView from 'react-native-pager-view';
import { styles } from './StepNavigation.styles';
import StepIndicator from '../../screens/SignUp/Components/StepIndicator';
import { NavigationBar } from '../NavigationBar';
import noop from '../../helpers/noop';
import { HorizontalPadding } from '../HorizontalPadding';

const StepNavigation = ( {
	currentStep, children, style, onBackButtonPress
} ) => {
	const viewPagerRef = useRef( undefined );
	const stepCount = children.length;

	useEffect( () => {
		viewPagerRef.current.setPage( currentStep );
	}, [ currentStep ] );

	return (
		<View style={[ styles.StepNavigation, style ]}>
			<HorizontalPadding>
				<NavigationBar
					testID="navigationBar-component"
					onBackArrowPress={onBackButtonPress}
					titleComponent={<StepIndicator currentStep={currentStep} stepCount={stepCount} />}
				/>
			</HorizontalPadding>
			<PagerView
				ref={viewPagerRef}
				style={styles.viewPager}
				initialPage={0}
				scrollEnabled={false}
			>

				{children}
			</PagerView>
		</View>
	);
};

StepNavigation.propTypes = {
	children: PropTypes.node,
	currentStep: PropTypes.number,
	style: ViewPropTypes.style,
	onBackButtonPress: PropTypes.func
};

StepNavigation.defaultProps = {
	children: [],
	currentStep: 0,
	style: {},
	onBackButtonPress: noop
};

export default StepNavigation;
