/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import { styles } from './Welcome.styles';
import { Image } from '../../components/Image';
import { brandSymbol } from '../../assets/icons';
import useWelcomeWireframe from '../../wireframes/useWelcomeWireframe';
import { TextButton } from '../../components/TextButton';
import { PrimaryButton } from '../../components';
import { NavigationBar } from '../../components/NavigationBar';
import { HorizontalPadding } from '../../components/HorizontalPadding';
import PrivacyAndTerms from './Components/PrivacyAndTerms';

const Welcome = () => {
	const presenter = useWelcomeWireframe();

	return (
		<BaseScreen testID="welcome-screen">
			{!!presenter && (
				<>
					<HorizontalPadding>
						<NavigationBar
							testID="navigation-bar"
							onBackArrowPress={presenter.backButtonWasPressed}
						/>
					</HorizontalPadding>
					<View style={styles.container}>
						<Image testID="logo-image" style={styles.brandSymbol} source={brandSymbol} />
						<Text testID="title-text" style={styles.title}>
							{presenter.title}
						</Text>

						<PrimaryButton
							testID="button-sign-up"
							size="medium"
							title={presenter.signUpButtonTitle}
							buttonStyle={styles.signInButton}
							onPress={presenter.signUpPressed}
						/>

						<View style={styles.logInButton}>
							<TextButton
								testID="button-log-in"
								title={presenter.logInButtonTitle}
								onPress={presenter.logInButtonWasPressed}
							/>
						</View>

						<PrivacyAndTerms presenter={presenter} />

					</View>
				</>
			)}
		</BaseScreen>
	);
};

Welcome.propTypes = {};

Welcome.defaultProps = {};

export default observer( Welcome );
