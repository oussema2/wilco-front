/* eslint-disable react/jsx-no-bind */
import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Swiper from 'react-native-swiper';
import { View } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import { palette } from '../../Theme';
import { styles } from './OnBoarding.styles';
import useOnBoardingWireframe from '../../wireframes/useOnBoardingWireframe';
import OnBoardingSlide from './Components/OnBoardingSlide';
import OnBoardingButton from './Components/OnBoardingButton';
import OnBoardingBackButton from './Components/OnBoardingBackButton';
import { HorizontalPadding } from '../../components/HorizontalPadding';

const OnBoarding = () => {
	const presenter = useOnBoardingWireframe();

	const swipeRef = useRef( null );

	return (
		<BaseScreen testID="onBoarding-screen">
			<>
				<View style={styles.backButtonContainer} testID="back-button-container">
					<HorizontalPadding>
						{OnBoardingBackButton( presenter, swipeRef )}
					</HorizontalPadding>
				</View>

				<Swiper
					loadMinimal
					ref={swipeRef}
					scrollEnabled={false}
					style={styles.wrapper}
					paginationStyle={styles.paginationStyle}
					showsButtons
					buttonWrapperStyle={styles.buttonWrapperStyle}
					nextButton={OnBoardingButton( presenter, swipeRef )}
					prevButton={<></>}
					activeDotColor={palette.primary.default}
					inactiveDotColor={palette.grayscale.iron}
				>
					{
						presenter.onboardingSlides.map( ( slide ) => (
							<OnBoardingSlide key={slide.id} slide={slide} />
						) )
					}
				</Swiper>
			</>
		</BaseScreen>
	);
};

OnBoarding.propTypes = {};

OnBoarding.defaultProps = {};

export default observer( OnBoarding );
