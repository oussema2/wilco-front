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
import { FIRST_NAME, LAST_NAME } from '../../../constants/formFields/signUpForm';
import { styles } from '../SignUp.styles';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import { TouchableInput } from '../../../components/TouchableInput';
import RolesSelectionModal from './RolesSelectionModal';

const FirstStep = ( {
	testID, presenter
} ) => (
	presenter.currentStep === 0 && (
		<View testID={testID} style={{ flex: 1 }}>
			<RolesSelectionModal presenter={presenter.rolesSelectionPresenter} />

			<HorizontalPadding>
				<View style={styles.separatorHeaderView} />
				<ScreenHeader
					testID="signUp-firstStep-header-testID"
					title="Create your profile"
				/>
				<View style={styles.separatorFormView} />
			</HorizontalPadding>
			<KeyboardAwareScrollView>
				<HorizontalPadding>
					<TextInput
						testID="first-name-input"
						textInputStyle={styles.commonInput}
						required
						autoCapitalize="words"
						error={presenter.formFirstStep.$( FIRST_NAME ).error}
						inputProps={presenter.formFirstStep.$( FIRST_NAME ).bind()}
					/>
					<TextInput
						testID="last-name-input"
						textInputStyle={styles.commonInput}
						required
						autoCapitalize="words"
						error={presenter.formFirstStep.$( LAST_NAME ).error}
						inputProps={presenter.formFirstStep.$( LAST_NAME ).bind()}
					/>
					<TouchableInput
						containerStyle={styles.commonInput}
						testID="role-input"
						label="Roles"
						placeholder="Select your role in GA community"
						required
						value={presenter.rolesValue}
						onPress={() => presenter.rolesSelectionPresenter
							.setIsRolesSelectionModalVisible( true )}
						error={presenter.showRoleInputError ? 'This field is mandatory.' : null}
					/>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							testID="signUpFirstStep-button"
							title="Next"
							size="medium"
							disabled={presenter.isFirstStepSubmitButtonDisabled}
							onPress={presenter.formFirstStep.onSubmit}
						/>
					</View>
				</HorizontalPadding>
			</KeyboardAwareScrollView>
		</View>
	)
);

FirstStep.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.shape( {
		formFirstStep: PropTypes.any,
		currentStep: PropTypes.number,
		rolesSelectionPresenter: PropTypes.any,
		showRoleInputError: PropTypes.bool,
		isFirstStepSubmitButtonDisabled: PropTypes.bool,
		rolesValue: PropTypes.string
	} ).isRequired
};

FirstStep.defaultProps = {
	testID: 'FirstStep-component'
};

export default observer( FirstStep );
