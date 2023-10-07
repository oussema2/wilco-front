import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import useDeleteAccountWireframe from '../../wireframes/useDeleteAccountWireframe';
import { NavigationBar } from '../../components/NavigationBar';
import { Image } from '../../components/Image';
import { PrimaryButton } from '../../components';
import { styles } from './DeleteAccount.styles';
import { exclamationCircle, exclamationTriangle } from '../../assets/icons';
import { Subtitle } from '../../components/Subtitle';

const DeleteAccount = ( { testID } ) => {
	const presenter = useDeleteAccountWireframe();

	return (
		<BaseScreen testID={testID} isLoading={presenter.isLoading}>
			<HorizontalPadding>
				<NavigationBar
					title="Delete account"
					testID="delete-account-navigation-bar-testID"
					onBackArrowPress={presenter.backButtonWasPressed}
				/>
			</HorizontalPadding>

			<ScrollView contentContainerStyle={styles.scrollView}>
				<View style={styles.infoContainer}>
					<Image
						testID="image-exclamation-triangle"
						source={exclamationTriangle}
						style={styles.imageExclamationTriangle}
						resizeMode="contain"
					/>

					<Subtitle testID="subtitle-testID" text={'If you delete your account,\n you will lose:'} style={styles.subtitle} />

					<HorizontalPadding style={styles.listInfoContainer}>
						<Subtitle
							testID="other-information-testID"
							text={'\u2022  Access to your profile information\n\u2022  All of the content you’ve made'}
							style={styles.listInfoContent}
						/>
					</HorizontalPadding>

					<HorizontalPadding style={styles.warningContainer}>
						<View style={styles.warningContent}>
							<Image
								testID="image-exclamation-circle"
								source={exclamationCircle}
								style={styles.imageExclamationCircle}
								resizeMode="contain"
							/>
							<Text style={styles.warningText} testID="warning-testID">
								Once the account is deleted, you won’t be able to recover it.
							</Text>
						</View>
					</HorizontalPadding>
				</View>

				<View style={styles.deleteAccountButtonContainer}>
					<PrimaryButton
						testID="delete-account-button-testID"
						title="Delete my account"
						size="medium"
						buttonStyle={styles.button}
						onPress={presenter.onDeleteButtonPressed}
					/>
				</View>
			</ScrollView>
		</BaseScreen>
	);
};
DeleteAccount.propTypes = {
	testID: PropTypes.string
};
DeleteAccount.defaultProps = {
	testID: 'delete-account-screen'
};
export default observer( DeleteAccount );
