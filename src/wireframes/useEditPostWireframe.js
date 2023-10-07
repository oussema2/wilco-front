import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useModalService } from '../providers/ModalProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import EditPostPresenter from '../presenters/EditPostPresenter';
import GetEntityFromStore from '../interactors/GetEntityFromStore';
import Api from '../services/Api';
import PostService from '../services/PostService';
import UpdatePost from '../interactors/UpdatePost';
import FetchEntitiesFromRemote from '../interactors/FetchEntitiesFromRemote';
import GetEntitiesFromStore from '../interactors/GetEntitiesFromStore';
import EntityServiceFactory from '../services/EntityServiceFactory';
import CommunityTag from '../entities/CommunityTag';

const useEditPostWireframe = ( { postId } ) => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();
	const snackbarService = useSnackbarService();

	const createPresenter = () => {
		const {
			authenticationStore, pilotStore, postStore, communityTagStore
		} = rootStore;

		const api = new Api( { authenticationStore } );
		const postService = new PostService( { api } );

		const getPostFromStore = new GetEntityFromStore( { store: postStore } );
		const updatePost = new UpdatePost( { postStore, pilotStore, service: postService } );

		const communityTagService = EntityServiceFactory.forTags( {
			api,
			buildEntity: CommunityTag.fromJSON
		} );

		const fetchCommunityTagsFromRemote = new FetchEntitiesFromRemote( {
			store: communityTagStore,
			service: communityTagService
		} );

		const getCommunityTagsFromStore = new GetEntitiesFromStore( { store: communityTagStore } );

		return new EditPostPresenter( {
			postId,
			getPostFromStore,
			updatePost,
			navigation,
			modalService,
			snackbarService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			makeAutoObservable
		} );
	};

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useEditPostWireframe;
