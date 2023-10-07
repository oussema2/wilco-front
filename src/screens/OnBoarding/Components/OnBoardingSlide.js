import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import { styles } from '../OnBoarding.styles';
import { Image } from '../../../components/Image';

const OnBoardingSlide = ( { slide } ) => (
	<View style={styles.slide}>
		<ScrollView contentContainerStyle={styles.scrollView}>
			<View style={styles.textContainer}>
				<Text testID="title-text" style={styles.title}>
					{slide.title}
				</Text>

				<View style={styles.subtitle}>
					<Text testID="subtitle-text" style={styles.subtitle}>
						{slide.subtitle}
					</Text>
				</View>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Image
					testID="image-onboarding"
					source={slide.image}
					style={{ ...styles.image, ...slide.style }}
					resizeMode="contain"
				/>
			</View>
		</ScrollView>
	</View>
);

OnBoardingSlide.propTypes = {
	slide: PropTypes.shape( {
		title: PropTypes.string,
		subtitle: PropTypes.string,
		image: PropTypes.any,
		style: PropTypes.any
	} ).isRequired
};

export default OnBoardingSlide;
