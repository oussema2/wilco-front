import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { FlatList, Pressable, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Tab, TabView } from 'react-native-elements';
import BaseScreen from '../BaseScreen/BaseScreen';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import useMembersWireframe from '../../wireframes/useMembersWireframe';
import MemberItem from './Components/MemberItem';
import { HorizontalPadding } from '../../components/HorizontalPadding';
import { styles } from './Members.styles';
import { MEMBERS_TABS } from '../../constants/MembersTabs';
import { scrollToTop } from '../../helpers/scroll';
import {
	CometChatConversationListWithMessages
} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace';

const Members = ( { testID } ) => {
	const presenter = useMembersWireframe();
	const ref = React.useRef( null );
	useScrollToTop( ref );

	// eslint-disable-next-line react/prop-types
	const _renderMember = ( { item: pilotInfoPresenter } ) => (
		<HorizontalPadding style={{ flex: 1 }}>
			<MemberItem
				pilotInfoPresenter={pilotInfoPresenter}
			/>
		</HorizontalPadding>
	);

	const _renderFooter = ( membersPresenter ) => {
		const { isLoading, isRefreshing } = membersPresenter;
		return (
			<ActivityIndicator
				testID="activityIndicator-testID"
				isLoading={isLoading && !isRefreshing}
				containerStyle={styles.flatListFooter}
			/>
		);
	};

	const _onPressTitle = () => {
		ref.current?.scrollToOffset( { animated: true, offset: 0 } );
	};

	const _onRefresh = ( ) => {
		presenter.onRefresh();
	};

	const _handleLoadMore = () => {
		presenter.handleLoadMore();
	};

	const _onMoveShouldSetResponder = ( e ) => e.stopPropagation();

	return (
		<BaseScreen testID={testID} edgeTop>
			<HorizontalPadding>
				<Pressable style={styles.screenHeader} onPress={_onPressTitle}>
					<ScreenHeader
						testID="title-header"
						title="Members"
					/>
				</Pressable>
			</HorizontalPadding>

			<Tab
				value={presenter.tabIndex}
				onChange={( e ) => presenter.setTabIndex( e )}
				indicatorStyle={styles.tabIndicator}
				variant="default"
			>
				<Tab.Item
					key={MEMBERS_TABS.allMembers.index}
					title={MEMBERS_TABS.allMembers.label}
					containerStyle={styles.tabItemContainer}
					titleStyle={[ styles.tabItemTitle,
						( presenter.tabIndex === MEMBERS_TABS.allMembers.index )
							? styles.tabActive : styles.tabInactive
					]}
					onPressIn={() => {
						if ( MEMBERS_TABS.allMembers.index === presenter.tabIndex ) {
							scrollToTop( ref );
						}
					}}
				/>
				<Tab.Item
					key={MEMBERS_TABS.chats.index}
					title={MEMBERS_TABS.chats.label}
					containerStyle={styles.tabItemContainer}
					titleStyle={[ styles.tabItemTitle,
						( presenter.tabIndex === MEMBERS_TABS.chats.index )
							? styles.tabActive : styles.tabInactive
					]}
				/>
			</Tab>

			<View style={styles.separatorView} />

			<TabView value={presenter.tabIndex} onChange={presenter.setTabIndex} animationType="timing" animationConfig={{ delay: 0, duration: 150 }}>
				<TabView.Item
					style={styles.tabViewItemContainer}
					onMoveShouldSetResponder={_onMoveShouldSetResponder}
				>
					<FlatList
						ref={ref}
						testID="members-flatList"
						data={( presenter.showMembers ) ? presenter.pilotsPresenters : null}
						renderItem={_renderMember}
						keyExtractor={( pilotInfoPresenter ) => pilotInfoPresenter.pilot.id}
						onRefresh={_onRefresh}
						onEndReached={_handleLoadMore}
						onEndReachedThreshold={0.5}
						refreshing={presenter.isRefreshing}
						ListHeaderComponent={<View style={styles.flatListHeader} />}
						ListFooterComponent={_renderFooter( presenter )}
					/>
				</TabView.Item>

				<TabView.Item
					style={styles.tabViewItemContainer}
					onMoveShouldSetResponder={_onMoveShouldSetResponder}
				>
					<CometChatConversationListWithMessages navigation={presenter.navigation} />
				</TabView.Item>
			</TabView>

		</BaseScreen>
	);
};

Members.propTypes = {
	testID: PropTypes.string
};

Members.defaultProps = {
	testID: 'members-screen'
};

export default observer( Members );
