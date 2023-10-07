import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import { Keyboard } from 'react-native';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseModalService from '../mocks/mockUseModalService';
import mockUseActionSheetService from '../mocks/mockUseActionSheetService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import PostDetailPresenter from '../../presenters/PostDetailPresenter';
import usePostDetailWireframe from '../../wireframes/usePostDetailWireframe';
import GetEntityFromStore from '../../interactors/GetEntityFromStore';
import FetchNestedCommentsFromRemote from '../../interactors/FetchNestedCommentsFromRemote';
import CreateComment from '../../interactors/CreateComment';
import EntityService from '../../services/EntityService';
import Api from '../../services/Api';
import CommentBuilder from '../../builders/CommentBuilder';
import GetCommentsFromStore from '../../interactors/GetCommentsFromStore';
import FetchEntityFromRemote from '../../interactors/FetchEntityFromRemote';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';

jest.mock( '../../presenters/PostDetailPresenter' );
jest.mock( '../../interactors/GetEntityFromStore' );
jest.mock( '../../interactors/GetCommentsFromStore' );
jest.mock( '../../interactors/FetchNestedCommentsFromRemote' );
jest.mock( '../../interactors/CreateComment' );
jest.mock( '../../services/EntityService' );
jest.mock( '../../services/Api' );
jest.mock( '../../builders/CommentBuilder' );
jest.mock( 'mobx' );
jest.mock( '@react-navigation/native', () => ( {
	useNavigation: jest.fn( () => {} )
} ) );

describe( 'usePostDetailWireframe', () => {
	let rootStore;
	let modalService;
	let actionSheetService;
	let snackbarService;
	let analyticsService;
	const keyboard = Keyboard;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		modalService = mockUseModalService();
		actionSheetService = mockUseActionSheetService();
		snackbarService = mockUseSnackbarService();
		analyticsService = mockUseAnalyticsService();
	} );

	it( 'returns an instance of PostDetailPresenter', () => {
		const postId = 1;
		const { result } = renderHook( () => usePostDetailWireframe( { postId } ) );

		expect( result.current ).toBeInstanceOf( PostDetailPresenter );
		expect( PostDetailPresenter ).toHaveBeenCalledWith( {
			postId,
			getPostFromStore: expect.any( GetEntityFromStore ),
			getCommentsFromStore: expect.any( GetCommentsFromStore ),
			fetchCommentsFromRemote: expect.any( FetchNestedCommentsFromRemote ),
			createComment: expect.any( CreateComment ),
			fetchPostFromRemote: expect.any( FetchEntityFromRemote ),
			rootStore,
			modalService,
			actionSheetService,
			snackbarService,
			keyboard,
			analyticsService,
			makeAutoObservable
		} );
		expect( GetEntityFromStore ).toHaveBeenCalledWith( {
			store: rootStore.postStore
		} );
		expect( GetCommentsFromStore ).toHaveBeenCalledWith( {
			store: rootStore.commentStore
		} );
		expect( FetchNestedCommentsFromRemote ).toHaveBeenCalledWith( {
			store: rootStore.commentStore, service: expect.any( EntityService ), nestedEntityName: 'posts'
		} );
		expect( CreateComment ).toHaveBeenCalledWith( {
			commentService: expect.any( EntityService ), commentStore: rootStore.commentStore
		} );
		expect( EntityService ).toHaveBeenCalledWith( {
			api: expect.any( Api ),
			basePath: 'comments',
			buildEntity: expect.any( CommentBuilder ).build
		} );
		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );
		expect( CommentBuilder ).toHaveBeenCalledWith( {
			pilotStore: rootStore.pilotStore, postStore: rootStore.postStore
		} );
	} );
} );
