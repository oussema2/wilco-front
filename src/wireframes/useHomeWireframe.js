import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useModalService } from '../providers/ModalProvider';
import { useActionSheetService } from '../providers/ActionSheetProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import { useAnalyticsService } from '../providers/AnalyticsProvider';
import HomePresenter from '../presenters/HomePresenter';
import GetEntitiesFromStore from '../interactors/GetEntitiesFromStore';
import PostService from '../services/PostService';
import PostBuilder from '../builders/PostBuilder';
import Api from '../services/Api';
import FetchPostsFromRemote from '../interactors/FetchPostsFromRemote';
import FetchEntitiesFromRemote from '../interactors/FetchEntitiesFromRemote';
import EntityServiceFactory from '../services/EntityServiceFactory';
import CommunityTag from '../entities/CommunityTag';
import TooltipManager from '../stores/TooltipManager';
import FetchMyFeedPostsFromRemote from '../interactors/FetchMyFeedPostsFromRemote';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';

const useHomeWireframe = ( initialIndex ) => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();
	const actionSheetService = useActionSheetService();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();

	const createPresenter = () => {
		const api = new Api( { authenticationStore: rootStore.authenticationStore } );
		const postBuilder = new PostBuilder( {
			pilotStore: rootStore.pilotStore,
			aircraftStore: rootStore.aircraftStore,
			commentStore: rootStore.commentStore
		} );
		const postService = new PostService( { api, buildItem: postBuilder.build } );
		const fetchPostsFromRemote = new FetchPostsFromRemote( {
			store: rootStore.postStore, service: postService, clearStoreOnPullToRefresh: true
		} );

		const fetchMyFeedPostsFromRemote = new FetchMyFeedPostsFromRemote( {
			store: rootStore.myFeedPostStore, service: postService
		} );

		const communityTagService = EntityServiceFactory.forTags( {
			api,
			buildEntity: CommunityTag.fromJSON
		} );
		const fetchCommunityTagsFromRemote = new FetchEntitiesFromRemote( {
			store: rootStore.communityTagStore,
			service: communityTagService
		} );
		const getCommunityTagsFromStore = new GetEntitiesFromStore(
			{ store: rootStore.communityTagStore } );

		const tooltipManager = new TooltipManager();

		const getPostsFromStore = new GetEntitiesFromStore( { store: rootStore.postStore } );

		const getMyFeedPostsFromStore = new GetEntitiesFromStore(
			{ store: rootStore.myFeedPostStore }
		);

		const getCurrentPilotFromStore = new GetCurrentPilotFromStore(
			{ store: rootStore.pilotStore }
		);

		return new HomePresenter( {
			initialIndex,
			fetchPostsFromRemote,
			fetchMyFeedPostsFromRemote,
			getPostsFromStore,
			getMyFeedPostsFromStore,
			navigation,
			modalService,
			getCurrentPilotFromStore,
			rootStore,
			actionSheetService,
			snackbarService,
			analyticsService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			tooltipManager,
			makeAutoObservable
		} );
	};

	const [ presenter ] = useState( createPresenter );

	useEffect( () => {
		if ( typeof initialIndex === 'number' ) {
			presenter.setTabIndex( initialIndex );
		}
	}, [ initialIndex ] );

	return presenter;
};

export default useHomeWireframe;
