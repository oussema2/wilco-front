import PostPresenterBuilder from '../../../presenters/Builders/PostPresenterBuilder';
import PostPresenter from '../../../presenters/PostPresenter';
import LikePost from '../../../interactors/LikePost';
import UnlikePost from '../../../interactors/UnlikePost';
import CreateReport from '../../../interactors/CreateReport';
import GetCurrentPilotFromStore from '../../../interactors/GetCurrentPilotFromStore';
import PostService from '../../../services/PostService';
import MockRootStore from '../../mocks/MockRootStore';
import MockModalService from '../../mocks/MockModalService';
import MockSnackbarService from '../../mocks/MockSnackbarService';
import PostFactory from '../../factories/PostFactory';
import MockActionSheetService from '../../mocks/MockActionSheetService';
import Api from '../../../services/Api';
import AnalyticsService from '../../../services/AnalyticsService';
import DeletePost from '../../../interactors/DeletePost';

jest.mock( '../../../interactors/LikePost' );
jest.mock( '../../../interactors/UnlikePost' );
jest.mock( '../../../interactors/DeletePost' );
jest.mock( '../../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../../services/PostService' );
jest.mock( '../../../services/Api' );

describe( 'PostPresenterBuilder', () => {
	const post = PostFactory.build();
	const rootStore = new MockRootStore();
	const modalService = new MockModalService();
	const actionSheetService = new MockActionSheetService();
	const snackbarService = new MockSnackbarService();
	const analyticsService = new AnalyticsService();
	const navigation = 'navigationMock';
	const onDeleteSuccess = 'onDeleteSuccess';

	describe( 'build()', () => {
		const presenter = PostPresenterBuilder.build( {
			post,
			modalService,
			rootStore,
			actionSheetService,
			snackbarService,
			analyticsService,
			navigation,
			onDeleteSuccess
		} );
		it( 'creates the PostPresenterBuilder correctly', () => {
			expect( presenter ).toBeInstanceOf( PostPresenter );
			expect( presenter.post ).toEqual( post );
			expect( presenter.modalService ).toEqual( modalService );
			expect( presenter.actionSheetService ).toEqual( actionSheetService );
			expect( presenter.snackbarService ).toEqual( snackbarService );
			expect( presenter.analyticsService ).toEqual( analyticsService );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.getCurrentPilotFromStore ).toBeInstanceOf( GetCurrentPilotFromStore );
			expect( presenter.actionBarPresenter.likePost ).toBeInstanceOf( LikePost );
			expect( presenter.actionBarPresenter.unlikePost ).toBeInstanceOf( UnlikePost );
			expect( presenter.deletePost ).toBeInstanceOf( DeletePost );
			expect( presenter.createReport ).toBeInstanceOf( CreateReport );
			expect( presenter.onDeleteSuccess ).toEqual( onDeleteSuccess );

			expect( LikePost ).toHaveBeenCalledWith( {
				postService: expect.any( PostService ),
				postStore: rootStore.postStore
			} );
			expect( UnlikePost ).toHaveBeenCalledWith( {
				postService: expect.any( PostService ),
				postStore: rootStore.postStore
			} );
			expect( DeletePost ).toHaveBeenCalledWith( {
				postService: expect.any( PostService ),
				postStore: rootStore.postStore,
				pilotStore: rootStore.pilotStore
			} );
			expect( GetCurrentPilotFromStore ).toHaveBeenCalledWith( {
				store: rootStore.pilotStore
			} );
			expect( PostService ).toHaveBeenCalledWith( {
				api: expect.any( Api )
			} );
			expect( Api ).toHaveBeenCalledWith( {
				authenticationStore: rootStore.authenticationStore
			} );
		} );
	} );
} );
