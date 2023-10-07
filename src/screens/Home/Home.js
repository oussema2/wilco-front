import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
	DeviceEventEmitter,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import { useScrollToTop } from '@react-navigation/native';
import { Tab, TabView } from 'react-native-elements';
import useHomeWireframe from '../../wireframes/useHomeWireframe';
import BaseScreen from '../BaseScreen/BaseScreen';
import { styles } from './Home.styles';
import FilterModal from './Components/FilterModal';
import Placeholder from './Components/Placeholder';
import HomeHeader from './Components/HomeHeader';
import PostList from './Components/PostList';
import { HOME_TABS } from '../../constants/HomeTabs';
import MyFeedPlaceholder from './Components/MyFeedPlaceholder';
import { scrollToTop } from '../../helpers/scroll';
import Filters from './Components/Filters';

const Home = ( { testID, route } ) => {
	const initialIndex = route.params?.initialIndex;
	const presenter = useHomeWireframe( initialIndex );
	const { homePostListPresenter, myFeedListPresenter, filterPostsPresenter } = presenter;
	const allPostListRef = React.useRef( null );
	const myFeedPostListRef = React.useRef( null );

	useScrollToTop( allPostListRef );
	useScrollToTop( myFeedPostListRef );

	const _onMoveShouldSetResponder = ( e ) => e.stopPropagation();

	useEffect( () => {
		DeviceEventEmitter.addListener( 'updateMyFeedList', () => {
			presenter.myFeedListPresenter.resetPaginationAndFetch();
		} );

		DeviceEventEmitter.addListener( 'navigateToAllPosts', () => {
			presenter.setTabIndex( HOME_TABS.allPosts.index );
		} );

		DeviceEventEmitter.addListener( 'navigateToMyFeed', () => {
			presenter.setTabIndex( HOME_TABS.myFeed.index );
		} );
	}, [] );

	const allPostList = () => ( ( homePostListPresenter.showPlaceholder )
		? <Placeholder testID="placeholder-home-screen" />
		: (
			<View style={styles.postContainer}>
				<PostList
					testID="all-post-list-testID"
					ref={allPostListRef}
					commentButtonWasPressed={homePostListPresenter.commentButtonWasPressed}
					contentWasPressed={homePostListPresenter.contentWasPressed}
					handleLoadMore={homePostListPresenter.handleLoadMore}
					onRefresh={homePostListPresenter.onRefresh}
					onHashtagPress={presenter.onHashtagLinkPressed}
					isRefreshing={homePostListPresenter.isRefreshing}
					isLoading={homePostListPresenter.isLoading}
					postPresenters={homePostListPresenter.postPresenters}
				/>
			</View>
		) );

	const myFeedConditionalPlaceholder = () => ( ( presenter.isFilterApplied )
		? <Placeholder testID="placeholder-home-screen" />
		: (
			<MyFeedPlaceholder
				onButtonPress={presenter.onPreferencesButtonPressed}
				testID="placeholder-my-feed-home-screen"
				text={myFeedListPresenter.placeholderText}
			/>
		)
	);

	const myFeedPostList = () => ( ( myFeedListPresenter.showPlaceholder )
		? myFeedConditionalPlaceholder()
		: (
			<View style={styles.postContainer}>
				<PostList
					testID="my-feed-post-list-testID"
					ref={myFeedPostListRef}
					commentButtonWasPressed={myFeedListPresenter.commentButtonWasPressed}
					contentWasPressed={myFeedListPresenter.contentWasPressed}
					handleLoadMore={myFeedListPresenter.handleLoadMore}
					onRefresh={myFeedListPresenter.onRefresh}
					onHashtagPress={presenter.onHashtagLinkPressed}
					isRefreshing={myFeedListPresenter.isRefreshing}
					isLoading={myFeedListPresenter.isLoading}
					postPresenters={myFeedListPresenter.postPresenters}
					hasAnyTag={presenter.hasAnyTag}
				/>
			</View>
		) );

	return (
		<BaseScreen testID={testID} edgeTop>
			<FilterModal presenter={presenter} />

			<HomeHeader
				ref={{ allPostListRef, myFeedPostListRef }}
				isHomePreferencesTooltipWasSeen={presenter.isHomePreferencesTooltipWasSeen}
				onTooltipButtonPressed={presenter.onTooltipButtonPressed}
				onPreferencesButtonPressed={presenter.onPreferencesButtonPressed}
				onTooltipClosed={presenter.onTooltipClosed}
				setIsFilterModalVisible={filterPostsPresenter.setIsFilterModalVisible}
			/>

			<View style={styles.separatorView} />

			<Filters
				hasAnyTag={presenter.hasAnyTag}
				hasAnyHashtag={presenter.hasAnyHashtag}
				tags={filterPostsPresenter.itemsLabels}
				hashtags={presenter.hashtags}
				onRemoveTagPress={filterPostsPresenter.removeTag}
				onRemoveHashtagPress={presenter.onRemoveHashtagPressed}
			/>

			<Tab
				value={presenter.tabIndex}
				onChange={( e ) => presenter.setTabIndex( e )}
				indicatorStyle={styles.tabIndicator}
				variant="default"
			>
				<Tab.Item
					key={HOME_TABS.myFeed.index}
					title={HOME_TABS.myFeed.label}
					onPressIn={() => {
						if ( HOME_TABS.myFeed.index === presenter.tabIndex ) {
							scrollToTop( myFeedPostListRef );
						}
					}}
					containerStyle={styles.tabItemContainer}
					titleStyle={[ styles.tabItemTitle,
						( presenter.tabIndex === HOME_TABS.myFeed.index )
							? styles.tabActive : styles.tabInactive
					]}
				/>
				<Tab.Item
					key={HOME_TABS.allPosts.index}
					title={HOME_TABS.allPosts.label}
					onPressIn={() => {
						if ( HOME_TABS.allPosts.index === presenter.tabIndex ) {
							scrollToTop( allPostListRef );
						}
					}}
					containerStyle={styles.tabItemContainer}
					titleStyle={[ styles.tabItemTitle,
						( presenter.tabIndex === HOME_TABS.allPosts.index )
							? styles.tabActive : styles.tabInactive
					]}
				/>
			</Tab>

			<TabView
				value={presenter.tabIndex}
				onChange={presenter.setTabIndex}
				animationType="timing"
				animationConfig={{ delay: 0, duration: 150 }}
			>
				<TabView.Item
					style={styles.tabViewItemContainer}
					onMoveShouldSetResponder={_onMoveShouldSetResponder}
				>
					{myFeedPostList()}
				</TabView.Item>

				<TabView.Item
					style={styles.tabViewItemContainer}
					onMoveShouldSetResponder={_onMoveShouldSetResponder}
				>
					{allPostList()}
				</TabView.Item>
			</TabView>
		</BaseScreen>
	);
};
Home.propTypes = {
	testID: PropTypes.string,
	route: PropTypes.shape( {
		params: PropTypes.shape( {
			initialIndex: PropTypes.number
		} )
	} )
};
Home.defaultProps = {
	testID: 'home-screen',
	route: {}
};
export default observer( Home );
