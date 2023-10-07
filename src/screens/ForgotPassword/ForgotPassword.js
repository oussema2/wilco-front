/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { EMAIL } from '../../constants/formFields/forgotPasswordForm';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInput } from '../../components/TextInput';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import BaseScreen from '../BaseScreen/BaseScreen';
import { styles } from './ForgotPassword.styles';
import { NavigationBar } from '../../components/NavigationBar';
import useForgotPasswordWireframe from '../../wireframes/useForgotPasswordWireframe';
import { Subtitle } from '../../components/Subtitle';

const ForgotPassword = ( ) => {
	const presenter = useForgotPasswordWireframe();

	return (
		<BaseScreen isLoading={!!presenter && presenter.isSendingEmail}>
			{!!presenter && (
				<HorizontalPadding>
					<NavigationBar
						testID="title-header"
						title={presenter.title}
						onBackArrowPress={presenter.backButtonWasPressed}
					/>

					<Subtitle
						testID="subtitle-forgotPassword-testID"
						style={styles.subTitle}
						text="Please enter your email and we’ll help you set a new password."
					/>

					<TextInput
						testID="email-input"
						textInputStyle={styles.emailTextInput}
						required
						error={presenter.form.$( EMAIL ).error}
						inputProps={presenter.form.$( EMAIL ).bind()}
					/>

					<View style={styles.buttonContainer}>
						<PrimaryButton
							testID="helpMe-button"
							title={presenter.buttonTitle}
							size="small"
							onPress={presenter.form.onSubmit}
							disabled={presenter.isSubmitButtonDisabled}
						/>
					</View>
				</HorizontalPadding>
			) }
		</BaseScreen>
	);
};

ForgotPassword.propTypes = {
};

ForgotPassword.defaultProps = {
};

export default observer( ForgotPassword );
