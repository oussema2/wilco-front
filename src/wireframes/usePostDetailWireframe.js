import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useModalService } from '../providers/ModalProvider';
import { useActionSheetService } from '../providers/ActionSheetProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import PostDetailPresenter from '../presenters/PostDetailPresenter';
import GetEntityFromStore from '../interactors/GetEntityFromStore';
import FetchNestedCommentsFromRemote from '../interactors/FetchNestedCommentsFromRemote';
import CreateComment from '../interactors/CreateComment';
import EntityServiceFactory from '../services/EntityServiceFactory';
import Api from '../services/Api';
import CommentBuilder from '../builders/CommentBuilder';
import GetCommentsFromStore from '../interactors/GetCommentsFromStore';
import PostService from '../services/PostService';
import PostBuilder from '../builders/PostBuilder';
import { useAnalyticsService } from '../providers/AnalyticsProvider';
import FetchPostFromRemote from '../interactors/FetchPostFromRemote';

const usePostDetailWireframe = ( { postId, scrollToEnd, scrollToFirstCommentCallback } ) => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();
	const actionSheetService = useActionSheetService();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();

	const createPresenter = () => {
		const api = new Api( { authenticationStore: rootStore.authenticationStore } );
		const commentBuilder = new CommentBuilder( {
			pilotStore: rootStore.pilotStore, postStore: rootStore.postStore
		} );
		const commentService = EntityServiceFactory.forComments( {
			api,
			buildEntity: commentBuilder.build
		} );

		const postBuilder = new PostBuilder( {
			pilotStore: rootStore.pilotStore,
			aircraftStore: rootStore.aircraftStore,
			commentStore: rootStore.commentStore
		} );
		const postService = new PostService( { api, buildItem: postBuilder.build } );

		const getPostFromStore = new GetEntityFromStore( { store: rootStore.postStore } );
		const getCommentsFromStore = new GetCommentsFromStore( { store: rootStore.commentStore } );

		const fetchPostFromRemote = new FetchPostFromRemote( {
			store: rootStore.postStore, service: postService
		} );

		const fetchCommentsFromRemote = new FetchNestedCommentsFromRemote( {
			store: rootStore.commentStore, service: commentService, nestedEntityName: 'posts'
		} );
		const createComment = new CreateComment( {
			commentService, commentStore: rootStore.commentStore
		} );

		const keyboard = Keyboard;

		return new PostDetailPresenter( {
			makeAutoObservable,
			navigation,
			modalService,
			rootStore,
			actionSheetService,
			analyticsService,
			postId,
			getPostFromStore,
			fetchPostFromRemote,
			getCommentsFromStore,
			fetchCommentsFromRemote,
			createComment,
			snackbarService,
			scrollToFirstCommentCallback,
			keyboard,
			scrollToEnd
		} );
	};

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default usePostDetailWireframe;
