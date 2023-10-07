import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useModalService } from '../providers/ModalProvider';
import { useActionSheetService } from '../providers/ActionSheetProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import CreatePostPresenter from '../presenters/CreatePostPresenter';
import CreatePost from '../interactors/CreatePost';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';
import EntityServiceFactory from '../services/EntityServiceFactory';
import PostService from '../services/PostService';
import Api from '../services/Api';
import { useAnalyticsService } from '../providers/AnalyticsProvider';
import FetchEntitiesFromRemote from '../interactors/FetchEntitiesFromRemote';
import GetEntitiesFromStore from '../interactors/GetEntitiesFromStore';
import CommunityTag from '../entities/CommunityTag';
import ExtractorMessageService from '../services/ExtractorMessageService';

const useCreatePostWireframe = ( ) => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();
	const actionSheetService = useActionSheetService();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();
	const extractorMessageService = ExtractorMessageService.shared();

	useEffect( () => {
		const {
			pilotStore, postStore, authenticationStore, communityTagStore
		} = rootStore;

		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( {
			store: pilotStore
		} );
		const api = new Api( { authenticationStore } );
		const postService = new PostService( { api } );
		const createPost = new CreatePost( { postService, postStore, pilotStore } );
		const communityTagService = EntityServiceFactory.forTags( {
			api,
			buildEntity: CommunityTag.fromJSON
		} );

		const fetchCommunityTagsFromRemote = new FetchEntitiesFromRemote( {
			store: communityTagStore,
			service: communityTagService
		} );

		const getCommunityTagsFromStore = new GetEntitiesFromStore( { store: communityTagStore } );

		const presenter = new CreatePostPresenter( {
			getCurrentPilotFromStore,
			createPost,
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			extractorMessageService,
			makeAutoObservable
		} );

		setPresenterInstance( presenter );
	}, [ rootStore ] );

	return presenterInstance;
};

export default useCreatePostWireframe;
