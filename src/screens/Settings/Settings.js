import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import { NavigationBar } from '../../components/NavigationBar';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import useSettingsWireframe from '../../wireframes/useSettingsWireframe';
import { styles } from './Settings.styles';
import SettingsItem from './Components/SettingsItem';
import { chevronRight, logOut } from '../../assets/icons';
import SettingsListSection from './Components/SettingsListSection';

const Settings = ( { testID } ) => {
	const presenter = useSettingsWireframe();

	return (
		<BaseScreen testID={testID}>
			<HorizontalPadding>
				<NavigationBar
					title="Settings"
					testID="settings-navigation-bar-testID"
					onBackArrowPress={presenter.backButtonWasPressed}
				/>
			</HorizontalPadding>

			<View style={styles.container}>
				<ScrollView>
					<View style={styles.separatorView} />

					<SettingsListSection
						title="Account"
						testID="accountSection"
						items={[
							{
								label: 'Delete my account',
								labelStyle: styles.deleteAccountItem,
								testID: 'delete-Account',
								image: chevronRight,
								onPress: presenter.deleteAccountWasPressed
							}
						]}
					/>

					<SettingsListSection
						title="About"
						testID="aboutSection"
						items={[
							{
								label: 'Support Center',
								testID: 'help',
								image: chevronRight,
								onPress: presenter.helpWasPressed
							},
							{
								label: 'Invite people to join',
								testID: 'invitePeople',
								image: chevronRight,
								onPress: presenter.invitePeopleWasPressed
							}
						]}
					/>
				</ScrollView>

				<View style={styles.logOutContainer}>
					<SettingsItem
						testID="logOut"
						label="Log Out"
						labelStyle={styles.logOutItem}
						rightImage={logOut}
						onPress={presenter.logOutWasPressed}
						renderDivisorLine={false}
					/>
				</View>
			</View>
		</BaseScreen>
	);
};
Settings.propTypes = {
	testID: PropTypes.string
};
Settings.defaultProps = {
	testID: 'settings-screen'
};
export default observer( Settings );
