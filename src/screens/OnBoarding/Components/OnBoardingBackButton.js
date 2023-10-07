import React from 'react';
import { NavigationBar } from '../../../components/NavigationBar';

const OnBoardingBackButton = ( presenter, swipeRef ) => {
	const initialBackButton = (
		<NavigationBar
			testID="navigation-bar-without-back-button-component"
		/>
	);

	const finalBackButton = (
		<NavigationBar
			testID="navigation-bar-with-back-button-component"
			onBackArrowPress={() => presenter.onBackwardPress( swipeRef )}
		/>
	);

	return ( presenter.page === 0 ) ? initialBackButton : finalBackButton;
};

export default OnBoardingBackButton;
