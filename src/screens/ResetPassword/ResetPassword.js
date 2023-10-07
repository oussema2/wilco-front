/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { PASSWORD, CONFIRM_PASSWORD } from '../../constants/formFields/resetPasswordForm';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInput } from '../../components/TextInput';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import BaseScreen from '../BaseScreen/BaseScreen';
import { styles } from './ResetPassword.styles';
import { NavigationBar } from '../../components/NavigationBar';
import useResetPasswordWireframe from '../../wireframes/useResetPasswordWireframe';

const ResetPassword = ( { route } ) => {
	const oobCode = route?.params?.oobCode;
	const presenter = useResetPasswordWireframe( { oobCode } );

	return (
		<BaseScreen isLoading={!!presenter && presenter.isLoading}>
			{!!presenter && (
				<HorizontalPadding>
					<NavigationBar
						testID="title-header"
						title={presenter.title}
						onBackArrowPress={presenter.backButtonWasPressed}
					/>
					<TextInput
						testID="password-input"
						textInputStyle={styles.passwordTextInput}
						required
						isPassword
						error={presenter.form.$( PASSWORD ).error}
						inputProps={presenter.form.$( PASSWORD ).bind()}
					/>

					<TextInput
						testID="confirm-password-input"
						textInputStyle={styles.confirmPasswordTextInput}
						required
						isPassword
						error={presenter.form.$( CONFIRM_PASSWORD ).error}
						inputProps={presenter.form.$( CONFIRM_PASSWORD ).bind()}
					/>

					<View style={styles.buttonContainer}>
						<PrimaryButton
							testID="create-button"
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

ResetPassword.propTypes = {
	route: PropTypes.shape( {
		params: PropTypes.shape( {
			oobCode: PropTypes.string
		} ).isRequired
	} ).isRequired
};

export default observer( ResetPassword );
