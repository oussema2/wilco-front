import { makeAutoObservable } from 'mobx';
import PostPresenter from '../PostPresenter';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import LikePost from '../../interactors/LikePost';
import UnlikePost from '../../interactors/UnlikePost';
import CreateReport from '../../interactors/CreateReport';
import PostService from '../../services/PostService';
import Api from '../../services/Api';
import DeletePost from '../../interactors/DeletePost';
import GetCommentsFromStore from '../../interactors/GetCommentsFromStore';

export default class PostPresenterBuilder {
	static build( {
		post,
		modalService,
		rootStore,
		actionSheetService,
		onDeleteSuccess,
		navigation,
		snackbarService,
		analyticsService
	} ) {
		const { pilotStore, postStore, authenticationStore } = rootStore;

		const api = new Api( { authenticationStore } );
		const postService = new PostService( { api } );
		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( {
			store: rootStore.pilotStore
		} );
		const likePost = new LikePost( { postService, postStore } );
		const unlikePost = new UnlikePost( { postService, postStore } );
		const deletePost = new DeletePost( {
			postService,
			postStore,
			pilotStore
		} );
		const createReport = new CreateReport( { reportableService: postService } );
		const getCommentsFromStore = new GetCommentsFromStore( { store: rootStore.commentStore } );

		const presenter = new PostPresenter( {
			makeAutoObservable,
			post,
			getCurrentPilotFromStore,
			likePost,
			unlikePost,
			deletePost,
			createReport,
			modalService,
			rootStore,
			actionSheetService,
			navigation,
			onDeleteSuccess,
			snackbarService,
			getCommentsFromStore,
			analyticsService
		} );

		return presenter;
	}
}
