/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { View, Keyboard } from 'react-native';
import { NavigationBar } from '../NavigationBar';
import { EditAvatar } from '../EditAvatar';
import { PrimaryButton, TextInput } from '..';
import { HorizontalPadding } from '../HorizontalPadding';
import { MAKE_AND_MODEL, TAIL_NUMBER } from '../../constants/formFields/aircraftForm';
import { styles } from './AircraftForm.styles';
import Form from '../../forms/Form';
import { KeyboardAwareScrollView } from '../KeyboardAwareScrollView';

/* eslint-disable arrow-body-style */

const AircraftForm = ( { presenter } ) => {
	const _onSubmit = ( event ) => {
		Keyboard.dismiss();
		presenter.form.onSubmit( event );
	};

	const _fixedBottomContent = () => (
		<View style={styles.buttonContainer}>
			<PrimaryButton
				testID="submit-button"
				title={presenter.submitButtonTitle}
				size="small"
				disabled={presenter.isSubmitButtonDisabled}
				onPress={_onSubmit}
			/>
		</View>
	);

	return !!presenter && (
		<>
			<HorizontalPadding>
				<NavigationBar
					title={presenter.title}
					onBackArrowPress={presenter.backButtonWasPressed}
				/>
			</HorizontalPadding>

			<KeyboardAwareScrollView fixedBottomContent={_fixedBottomContent()}>
				<HorizontalPadding>
					<EditAvatar
						testID="edit-avatar"
						variant="aircraft"
						size="big"
						onAvatarChange={presenter.onAvatarChange}
						source={presenter.avatarSource}
					/>
					<TextInput
						testID="make-and-model-input"
						required
						autoCapitalize="words"
						textInputStyle={styles.makeAndModelTextInput}
						error={presenter.form.$( MAKE_AND_MODEL ).error}
						inputProps={presenter.form.$( MAKE_AND_MODEL ).bind()}
					/>
					<TextInput
						testID="tail-number-input"
						textInputStyle={styles.tailNumberTextInput}
						autoCapitalize="characters"
						inputProps={presenter.form.$( TAIL_NUMBER ).bind()}
						helperText="This information will not be visible to others."
					/>
				</HorizontalPadding>
			</KeyboardAwareScrollView>
		</>
	);
};

AircraftForm.propTypes = {
	presenter: PropTypes.shape( {
		title: PropTypes.string.isRequired,
		submitButtonTitle: PropTypes.string.isRequired,
		isSubmitButtonDisabled: PropTypes.bool,
		backButtonWasPressed: PropTypes.func.isRequired,
		onAvatarChange: PropTypes.func.isRequired,
		avatarSource: PropTypes.shape( {
			uri: PropTypes.string.isRequired
		} ),
		form: PropTypes.instanceOf( Form ).isRequired
	} )
};

AircraftForm.defaultProps = {
	presenter: null
};

export default observer( AircraftForm );
