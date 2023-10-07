import React from 'react';
import { PrimaryButton } from '../../../components';

const OnBoardingButton = ( presenter, swipeRef ) => {
	const { page, onboardingSlidesCount } = presenter;
	const buttonText = ( page === ( onboardingSlidesCount - 1 ) ) ? 'Let\'s go!' : 'Next';
	return (
		<PrimaryButton
			testID="onboarding-button"
			title={buttonText}
			onPress={() => presenter.onForwardPress( swipeRef )}
			size="medium"
		/>
	);
};

export default OnBoardingButton;
