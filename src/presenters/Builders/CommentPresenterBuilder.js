import CommentPresenter from '../CommentPresenter';
import DeleteEntity from '../../interactors/DeleteEntity';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import CreateReport from '../../interactors/CreateReport';
import Api from '../../services/Api';
import EntityServiceFactory from '../../services/EntityServiceFactory';
import CommentBuilder from '../../builders/CommentBuilder';

export default class CommentPresenterBuilder {
	static build( {
		comment,
		modalService,
		rootStore,
		actionSheetService,
		navigation,
		snackbarService,
		analyticsService
	} ) {
		const api = new Api( { authenticationStore: rootStore.authenticationStore } );
		const commentBuilder = new CommentBuilder( {
			pilotStore: rootStore.pilotStore, postStore: rootStore.postStore
		} );
		const commentService = EntityServiceFactory.forComments( {
			api,
			buildEntity: commentBuilder.build
		} );
		const deleteComment = new DeleteEntity( {
			entityService: commentService, entityStore: rootStore.commentStore
		} );
		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( {
			store: rootStore.pilotStore
		} );
		const createReport = new CreateReport( { reportableService: commentService } );
		const presenter = new CommentPresenter( {
			comment,
			actionSheetService,
			deleteComment,
			getCurrentPilotFromStore,
			createReport,
			modalService,
			navigation,
			snackbarService,
			analyticsService
		} );

		return presenter;
	}
}
