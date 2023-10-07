import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { FlatList, Pressable, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Tab, TabView } from 'react-native-elements';
import { delay } from 'lodash';
import BaseScreen from '../BaseScreen/BaseScreen';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import NotificationHeaderView from '../../components/HeaderView/NotificationHeaderView';
import useNotificationsWireframe from '../../wireframes/useNotificationsWireframe';
import { styles } from './Notifications.styles';
import { EmptyState } from '../../components/EmptyState';
import { megaphone } from '../../assets/icons';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { NOTIFICATIONS_TABS } from '../../constants/NotificationsTabs';

const Notifications = ( { testID } ) => {
	const presenter = useNotificationsWireframe();
	const refAllNotifications = React.useRef( null );
	const refMentionsNotifications = React.useRef( null );
	useScrollToTop( refAllNotifications );
	useScrollToTop( refMentionsNotifications );

	useDidMountEffect( () => {
		presenter.updateScreen();
		delay( () => refAllNotifications.current.scrollToOffset( { offset: 0 } ), 300 );
		delay( () => refMentionsNotifications.current.scrollToOffset( { offset: 0 } ), 300 );
	}, [ presenter.tabIndex ] );

	// eslint-disable-next-line react/prop-types
	const _renderNotification = ( { item: notificationPresenter } ) => (
		<HorizontalPadding>
			<View style={styles.separatorItemsView}>
				<NotificationHeaderView
					testID="notification-component"
					notificationPresenter={notificationPresenter}
				/>
			</View>
		</HorizontalPadding>
	);

	const _handleLoadMore = () => {
		presenter.handleLoadMore();
	};

	const _renderFooter = ( notificationsPresenter ) => {
		const { isLoading, isRefreshing } = notificationsPresenter;
		// eslint-disable-next-line react/prop-types
		const { footerFlatList } = styles;
		return (
			<ActivityIndicator
				testID="activityIndicator-testID"
				// eslint-disable-next-line react/destructuring-assignment
				isLoading={isLoading && !isRefreshing}
				containerStyle={footerFlatList}
			/>
		);
	};

	const _renderEmptyState = ( text ) => (
		<View testID="emptyStateContainer-testID" style={styles.emptyStateContainer}>
			<EmptyState
				source={megaphone}
				text={text}
				imageStyle={styles.emptyStateImage}
			/>
		</View>
	);

	const _emptyStateNotifications = ( ) => (
		presenter.mustShowEmptyState
			? _renderEmptyState( presenter.placeholderNotificationsText ) : null
	);

	const _emptyStateMentions = ( ) => (
		presenter.mustShowEmptyStateMentions
			? _renderEmptyState( presenter.placeholderMentionsText ) : null
	);

	const _onPressTitle = () => {
		refAllNotifications.current?.scrollToOffset( { animated: true, offset: 0 } );
		refMentionsNotifications.current?.scrollToOffset( { animated: true, offset: 0 } );
	};

	const _onRefresh = ( ) => {
		presenter.onRefresh();
	};

	// eslint-disable-next-line react/prop-types
	const _notificationList = ( { ref, data, emptyState } ) => (
		<FlatList
			ref={ref}
			testID="notifications-flatList"
			data={data}
			renderItem={_renderNotification}
			keyExtractor={( notificationPresenter ) => notificationPresenter.notification.id}
			onRefresh={_onRefresh}
			refreshing={presenter.isRefreshing}
			onEndReached={_handleLoadMore}
			onEndReachedThreshold={0.5}
			ListFooterComponent={_renderFooter( presenter )}
			contentContainerStyle={styles.contentContainerStyle}
			ListEmptyComponent={emptyState}
			ListHeaderComponent={<View style={styles.flatListHeader} />}
		/>
	);

	const _onMoveShouldSetResponder = ( e ) => e.stopPropagation();

	return (
		<BaseScreen testID={testID} edgeTop>
			<HorizontalPadding>
				<Pressable style={styles.screenHeader} onPress={_onPressTitle}>
					<ScreenHeader
						testID="title-ScreenHeader"
						title="Notifications"
					/>
				</Pressable>
			</HorizontalPadding>

			<Tab
				value={presenter.tabIndex}
				onChange={( e ) => presenter.setTabIndex( e )}
				indicatorStyle={styles.tabIndicator}
				variant="default"
			>
				{Object.values( NOTIFICATIONS_TABS ).map( ( tab ) => (
					<Tab.Item
						key={tab.index}
						title={tab.label}
						containerStyle={styles.tabItemContainer}
						titleStyle={[ styles.tabItemTitle,
							( presenter.tabIndex === tab.index ) ? styles.tabActive : styles.tabInactive
						]}
					/>
				) )}
			</Tab>

			<TabView value={presenter.tabIndex} onChange={presenter.setTabIndex} animationType="timing" animationConfig={{ delay: 0, duration: 150 }}>
				<TabView.Item
					style={styles.tabViewItemContainer}
					onMoveShouldSetResponder={_onMoveShouldSetResponder}
				>
					{_notificationList(
						{
							ref: refAllNotifications,
							data: presenter.notificationPresenters,
							emptyState: _emptyStateNotifications()
						}
					)}
				</TabView.Item>

				<TabView.Item
					style={styles.tabViewItemContainer}
					onMoveShouldSetResponder={_onMoveShouldSetResponder}
				>
					{_notificationList(
						{
							ref: refMentionsNotifications,
							data: presenter.mentionNotificationPresenters,
							emptyState: _emptyStateMentions()
						}
					)}
				</TabView.Item>
			</TabView>
		</BaseScreen>
	);
};

Notifications.propTypes = {
	testID: PropTypes.string
};

Notifications.defaultProps = {
	testID: 'notifications-screen'
};

export default observer( Notifications );
