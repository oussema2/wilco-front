/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { KeyboardAwareScrollView } from '../../../components/KeyboardAwareScrollView';
import { PrimaryButton, TextInput } from '../../../components';
import {
	EMAIL, PASSWORD
} from '../../../constants/formFields/signUpForm';
import { styles } from '../SignUp.styles';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';

const SecondStep = ( {
	testID, presenter
} ) => (
	presenter.currentStep === 1 && (
		<View testID={testID} style={{ flex: 1 }}>
			<HorizontalPadding>
				<View style={styles.separatorHeaderView} />
				<ScreenHeader
					testID="signUp-secondStep-header-testID"
					title="Set up your account"
				/>
				<View style={styles.separatorFormView} />
			</HorizontalPadding>
			<KeyboardAwareScrollView>
				<HorizontalPadding>
					<TextInput
						testID="email-input"
						textInputStyle={styles.emailInput}
						required
						error={presenter.formSecondStep.$( EMAIL ).error}
						inputProps={presenter.formSecondStep.$( EMAIL ).bind()}
					/>
					<TextInput
						testID="password-input"
						textInputStyle={styles.commonInput}
						required
						isPassword
						error={presenter.formSecondStep.$( PASSWORD ).error}
						inputProps={presenter.formSecondStep.$( PASSWORD ).bind()}
					/>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							testID="signUpSecondStep-button"
							title="Create account"
							size="medium"
							disabled={presenter.isSubmitButtonDisabled}
							onPress={presenter.formSecondStep.onSubmit}
						/>
					</View>
				</HorizontalPadding>
			</KeyboardAwareScrollView>
		</View>
	)
);

SecondStep.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.shape( {
		formSecondStep: PropTypes.any,
		isSubmitButtonDisabled: PropTypes.any,
		currentStep: PropTypes.number
	} ).isRequired
};

SecondStep.defaultProps = {
	testID: 'FirstStep-component'
};

export default observer( SecondStep );
