/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import useEditPilotProfileWireframe from '../../wireframes/useEditPilotProfileWireframe';
import { EditAvatar } from '../../components/EditAvatar';
import { DESCRIPTION, FIRST_NAME, LAST_NAME } from '../../constants/formFields/editProfileForm';
import { PrimaryButton, TextInput } from '../../components';
import { styles } from './EditPilotProfile.styles';
import { PilotInfo } from '../../components/PilotInfo';
import { TextArea } from '../../components/TextArea';
import { KeyboardAwareScrollView } from '../../components/KeyboardAwareScrollView';
import { HorizontalPadding } from '../../components/HorizontalPadding';
import { TouchableInput } from '../../components/TouchableInput';
import RolesSelectionModal from '../SignUp/Components/RolesSelectionModal';
import { useHardwareBackPress } from '../../hooks/useHardwareBackPress';

const EditPilotProfile = ( { testID } ) => {
	const [ pilotInfoPositionY, setPilotInfoPositionY ] = useState( 0 );
	const presenter = useEditPilotProfileWireframe();
	const ref = useRef();

	const _onLayoutCommunityTagSection = ( event ) => {
		const { layout } = event.nativeEvent;
		setPilotInfoPositionY( layout.y );
	};

	const _fixedBottomContent = () => (
		<View style={styles.buttonContainer}>
			<PrimaryButton
				testID="save-button"
				title="Save"
				size="big"
				disabled={presenter.isSubmitButtonDisabled}
				onPress={presenter.form.onSubmit}
			/>
		</View>
	);

	useHardwareBackPress( presenter?.rightHeaderButton.onPress );

	const scrollTo = ( y ) => {
		setTimeout( () => {
			ref?.current?.scrollTo( { y: pilotInfoPositionY + y, animated: true } );
		}, 1000 );
	};

	return (
		<BaseScreen testID={testID} isLoading={presenter && presenter.isLoading}>
			{presenter && (
				<>
					<RolesSelectionModal presenter={presenter.rolesSelectionPresenter} />
					<HorizontalPadding>
						<ScreenHeader
							testID="title-header"
							title="Edit profile"
							rightButton={presenter.rightHeaderButton}
						/>
					</HorizontalPadding>
					<KeyboardAwareScrollView ref={ref} fixedBottomContent={_fixedBottomContent()}>
						<HorizontalPadding>
							<EditAvatar
								onAvatarChange={presenter.onProfilePhotoSelected}
								source={presenter.profilePhoto}
								size="big"
								variant="user"
							/>
						</HorizontalPadding>

						<HorizontalPadding style={styles.basicInfoContainer}>
							<TextInput
								testID="first-name-input"
								required
								autoCapitalize="words"
								textInputStyle={styles.firstInputStyle}
								error={presenter.form.$( FIRST_NAME ).error}
								inputProps={presenter.form.$( FIRST_NAME ).bind()}
							/>

							<TextInput
								testID="last-name-input"
								required
								autoCapitalize="words"
								textInputStyle={styles.inputStyle}
								error={presenter.form.$( LAST_NAME ).error}
								inputProps={presenter.form.$( LAST_NAME ).bind()}
							/>

							<TouchableInput
								containerStyle={styles.commonInput}
								testID="roles-input"
								label="Roles"
								placeholder={presenter.placeholderRolesInputText}
								value={presenter.rolesInputValue}
								onPress={presenter.onRolesInputPressed}
								error={presenter.rolesInputError}
								required
							/>

							<TextArea
								testID="description-input"
								textInputStyle={styles.inputStyle}
								minimumLines={5}
								capitalizeFirstLetter
								error={presenter.form.$( DESCRIPTION ).error}
								inputProps={presenter.form.$( DESCRIPTION ).bind()}
							/>
							<View style={styles.separatorView} />
						</HorizontalPadding>

						<View style={styles.separatorSectionView} />

						<View onLayout={_onLayoutCommunityTagSection} style={styles.pilotInfoContainer}>
							<PilotInfo
								testID="section-PilotInfo"
								pilotInfoPresenter={presenter.pilotInfoPresenter}
								credentialsPresenter={presenter.credentialsPresenter}
								communityTagsPresenter={presenter.communityTagsPresenter}
								scrollTo={scrollTo}
							/>
						</View>

						<View style={[ styles.separatorSectionView, styles.separatorEndView ]} />

					</KeyboardAwareScrollView>
				</>
			)}
		</BaseScreen>
	);
};

EditPilotProfile.propTypes = {
	testID: PropTypes.string
};

EditPilotProfile.defaultProps = {
	testID: 'editPilotProfile-screen'
};

export default observer( EditPilotProfile );
