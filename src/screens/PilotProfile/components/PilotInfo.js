import React from 'react';
import {
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Tab, TabView } from 'react-native-elements';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import ProfileBasicInfo from './ProfileBasicInfo';
import { PrimaryButton } from '../../../components';
import RecentFlights from './RecentFlights';
import { TertiaryButton } from '../../../components/TertiaryButton';
import Credentials from './Credentials';
import CommunityTags from './CommunityTags';
import Roles from './Roles';
import TotalHours from './TotalHours';
import { styles } from '../PilotProfile.styles';
import { PILOT_PROFILE_TABS } from '../../../constants/pilotProfileTabs';

const PilotInfo = ( {
	presenter, index, setIndex
} ) => (
	<View>
		<HorizontalPadding>
			<ProfileBasicInfo presenter={presenter} />

			{presenter.editProfileButtonWasPressed && (
				<PrimaryButton
					title="Edit profile"
					onPress={presenter.editProfileButtonWasPressed}
					size="small"
					buttonStyle={styles.editProfileButton}
				/>
			)}

			{presenter.onSendMessageButtonPressed && (
				<TertiaryButton
					title="Send a message"
					onPress={presenter.onSendMessageButtonPressed}
					size="small"
					buttonStyle={styles.messageButton}
				/>
			) }

			<View style={styles.separatorViewRecentFlights} />
		</HorizontalPadding>

		<Tab
			value={index}
			onChange={( e ) => setIndex( e )}
			indicatorStyle={styles.tabIndicator}
			variant="default"
		>
			<Tab.Item
				title={PILOT_PROFILE_TABS.pilotInfo.label}
				containerStyle={styles.tabItemContainer}
				titleStyle={[ styles.tabItemTitle,
					( index === PILOT_PROFILE_TABS.pilotInfo.index ) ? styles.tabActive : styles.tabInactive
				]}
			/>
			<Tab.Item
				title={PILOT_PROFILE_TABS.activity.label}
				containerStyle={styles.tabItemContainer}
				titleStyle={[ styles.tabItemTitle, ( index === PILOT_PROFILE_TABS.activity.index )
					? styles.tabActive : styles.tabInactive ]}
			/>
		</Tab>

		<TabView value={index} onChange={setIndex} animationType="timing" animationConfig={{ delay: 0, duration: 150 }}>
			<TabView.Item
				style={[
					styles.tabViewItemContainer,
					( index === PILOT_PROFILE_TABS.activity.index ) && styles.maxHeightInactiveTab
				]}
				onMoveShouldSetResponder={( e ) => e.stopPropagation()}
			>
				<View>
					<Roles testID="roles-component" presenter={presenter} />
					<Credentials testID="credentials-component" presenter={presenter} />
					<CommunityTags testID="communities-component" presenter={presenter} />
					<TotalHours testID="total-hours-component" presenter={presenter} />
				</View>
			</TabView.Item>

			<TabView.Item
				style={styles.tabViewItemContainer}
				onMoveShouldSetResponder={( e ) => e.stopPropagation()}
			>
				<View>
					<HorizontalPadding style={styles.recentFlightContainer}>
						<RecentFlights
							testID="recentFlights-flatList"
							emptyListText={presenter.emptyLatestFlightsText}
							data={presenter.latestFlightsPresenters}
						/>

						{( !presenter.hasLatestFlights && presenter.shareFlightButtonWasPressed ) && (
							<View>
								<HorizontalPadding>
									<View style={styles.shareFlightButtonContainer}>
										<TertiaryButton
											testID="shareFlightButton-component"
											title={presenter.shareFlightButtonTitle}
											size="small"
											onPress={presenter.shareFlightButtonWasPressed}
										/>
									</View>
								</HorizontalPadding>
							</View>
						)}
					</HorizontalPadding>

					<View style={styles.separatorView} />
				</View>
			</TabView.Item>

		</TabView>
	</View>
);

PilotInfo.propTypes = {
	presenter: PropTypes.any.isRequired,
	index: PropTypes.number.isRequired,
	setIndex: PropTypes.func.isRequired
};

export default observer( PilotInfo );
