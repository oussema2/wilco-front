/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, View } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import BaseScreen from '../../BaseScreen/BaseScreen';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { NavigationBar } from '../../../components/NavigationBar';
import { styles } from './RolesSelectionModal.styles';
import Modals from '../../../components/Modals/Modals';
import CheckboxList from '../../../components/CheckboxList/CheckboxList';
import { OTHER } from '../../../constants/formFields/rolesSelectionForm';
import { TextArea } from '../../../components/TextArea';
import { KeyboardAwareScrollView } from '../../../components/KeyboardAwareScrollView';

const RolesSelectionModal = ( {
	testID, presenter
} ) => (
	<Modal
		presentationStyle="overFullScreen"
		testID={testID}
		visible={presenter.isRolesSelectionModalVisible}
		onRequestClose={presenter.backArrowButtonPressed}
	>
		<BaseScreen>
			{presenter && (
				<>
					<HorizontalPadding>
						<Modals />
						<NavigationBar
							title="Roles"
							testID="filter-modal-navigation-bar-testID"
							onBackArrowPress={presenter.backArrowButtonPressed}
							rightAction={{
								text: 'Save',
								textStyle: ( presenter.hasAnyRoleSelected ) ? null : styles.rightTextDisabled,
								onPress: presenter.onSaveButtonPressed
							}}
						/>
					</HorizontalPadding>
					<KeyboardAwareScrollView>
						<HorizontalPadding style={styles.horizontalPadding}>
							<View style={styles.subHeaderContainer}>
								<Text style={styles.subHeaderText}>
									Select at least one of the roles you
									have in the GA community.
								</Text>
							</View>

							<View style={styles.checkboxListContainer}>
								<CheckboxList
									onSelectionsChange={presenter.onSelectionsChange}
									selectedItems={presenter.selectedItems}
									items={presenter.rolesFromStore}
								/>

								{presenter.isOtherOptionSelected && (
									<TextArea
										testID="other-input"
										textInputStyle={{ marginTop: -15 }}
										error={presenter.form.$( OTHER ).error}
										inputProps={presenter.form.$( OTHER ).bind()}
										capitalizeFirstLetter
										minimumLines={1}
										maxLength={100}
									/>
								)}
							</View>
						</HorizontalPadding>
					</KeyboardAwareScrollView>
				</>
			)}
		</BaseScreen>
	</Modal>
);

RolesSelectionModal.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.any.isRequired
};

RolesSelectionModal.defaultProps = {
	testID: 'filter-post-modal-screen'
};
export default observer( RolesSelectionModal );
