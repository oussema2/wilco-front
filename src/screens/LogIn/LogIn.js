/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Pressable, Text, View } from 'react-native';
import { EMAIL, PASSWORD } from '../../constants/formFields/logInForm';
import useLogInWireframe from '../../wireframes/useLogInWireframe';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInput } from '../../components/TextInput';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import BaseScreen from '../BaseScreen/BaseScreen';
import { styles } from './LogIn.styles';
import { NavigationBar } from '../../components/NavigationBar';

const LogIn = ( ) => {
	const presenter = useLogInWireframe();
	const errorForField = ( field ) => (
		presenter.form.$( field ).error || presenter.invalidCredentialsWereSubmitted
	);

	return (
		<BaseScreen isLoading={!!presenter && presenter.isLoggingIn}>
			{!!presenter && (
				<>
					<HorizontalPadding>
						<NavigationBar
							testID="title-header"
							title={presenter.title}
							onBackArrowPress={presenter.backButtonWasPressed}
						/>
					</HorizontalPadding>

					<View style={styles.container}>
						<HorizontalPadding>
							<TextInput
								testID="email-input"
								textInputStyle={styles.emailTextInput}
								required
								error={errorForField( EMAIL )}
								inputProps={presenter.form.$( EMAIL ).bind()}
							/>
							<TextInput
								testID="password-input"
								textInputStyle={styles.passwordTextInput}
								required
								isPassword
								error={errorForField( PASSWORD )}
								inputProps={presenter.form.$( PASSWORD ).bind()}
							/>
							<View style={styles.buttonContainer}>
								<PrimaryButton
									testID="logIn-button"
									title={presenter.buttonTitle}
									size="small"
									onPress={presenter.form.onSubmit}
									disabled={presenter.isSubmitButtonDisabled}
								/>
							</View>
						</HorizontalPadding>

						<View style={styles.forgotPasswordContainer}>
							<HorizontalPadding>
								<Pressable onPress={presenter.forgotPasswordWasPressed}>
									<Text style={styles.forgotPasswordText}>Forgot password?</Text>
								</Pressable>
							</HorizontalPadding>
						</View>

					</View>
				</>
			) }
		</BaseScreen>
	);
};

LogIn.propTypes = {
};

LogIn.defaultProps = {
};

export default observer( LogIn );
