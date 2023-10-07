/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import useDeleteAccountWireframe from '../../wireframes/useDeleteAccountWireframe';
import { NavigationBar } from '../../components/NavigationBar';
import { Image } from '../../components/Image';
import { PrimaryButton, TextInput } from '../../components';
import { styles } from './DeleteAccount.styles';
import { exclamationTriangle } from '../../assets/icons';
import { Subtitle } from '../../components/Subtitle';
import { PASSWORD } from '../../constants/formFields/confirmationDeleteAccountForm';
import { KeyboardAwareScrollView } from '../../components/KeyboardAwareScrollView';

const ConfirmationDeleteAccount = ( { testID } ) => {
	const presenter = useDeleteAccountWireframe();

	return (
		<BaseScreen testID={testID} isLoading={presenter.isLoading}>
			<HorizontalPadding>
				<NavigationBar
					title="Delete account"
					testID="confirmation-delete-account-navigation-bar-testID"
					onBackArrowPress={presenter.backButtonWasPressed}
				/>
			</HorizontalPadding>

			<KeyboardAwareScrollView>
				<View style={styles.scrollView}>
					<View style={[ styles.infoContainer, styles.confirmationSubtitle ]}>
						<Image
							testID="image-exclamation-triangle"
							source={exclamationTriangle}
							style={styles.imageExclamationTriangle}
							resizeMode="contain"
						/>

						<View style={styles.confirmationSubtitle}>
							<Subtitle testID="subtitle-testID" text="Enter your current password to confirm deletion of your account." style={styles.subtitle} />
						</View>

						<HorizontalPadding style={styles.passwordContainer}>
							<TextInput
								testID="password-input"
								textInputStyle={styles.passwordTextInput}
								required
								isPassword
								error={presenter.form.$( PASSWORD ).error}
								inputProps={presenter.form.$( PASSWORD ).bind()}
							/>

						</HorizontalPadding>
					</View>

					<View style={styles.deleteAccountButtonContainer}>
						<PrimaryButton
							testID="confirmation-delete-account-button-testID"
							title="Delete my account"
							size="medium"
							buttonStyle={styles.button}
							onPress={presenter.form.onSubmit}
						/>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</BaseScreen>
	);
};

ConfirmationDeleteAccount.propTypes = {
	testID: PropTypes.string
};
ConfirmationDeleteAccount.defaultProps = {
	testID: 'confirmation-delete-account-screen'
};
export default observer( ConfirmationDeleteAccount );
