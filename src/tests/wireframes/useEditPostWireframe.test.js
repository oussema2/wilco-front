import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import useEditPostWireframe from '../../wireframes/useEditPostWireframe';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseModalService from '../mocks/mockUseModalService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import EditPostPresenter from '../../presenters/EditPostPresenter';
import GetEntityFromStore from '../../interactors/GetEntityFromStore';
import Api from '../../services/Api';
import PostService from '../../services/PostService';
import UpdatePost from '../../interactors/UpdatePost';
import FetchEntitiesFromRemote from '../../interactors/FetchEntitiesFromRemote';
import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';

jest.mock( '../../presenters/EditPostPresenter' );
jest.mock( '../../interactors/GetEntityFromStore' );
jest.mock( '../../interactors/GetEntitiesFromStore' );
jest.mock( '../../interactors/FetchEntitiesFromRemote' );
jest.mock( '../../interactors/UpdatePost' );
jest.mock( '../../services/Api' );
jest.mock( '../../services/PostService' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useEditPostWireframe', () => {
	let rootStore;
	let navigation;
	let modalService;
	let snackbarService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		navigation = mockNavigation;
		modalService = mockUseModalService();
		snackbarService = mockUseSnackbarService();
	} );

	it( 'returns an instance of EditPostPresenter', () => {
		const postId = 1;
		const { result } = renderHook( () => useEditPostWireframe( { postId } ) );

		expect( result.current ).toBeInstanceOf( EditPostPresenter );
		expect( EditPostPresenter ).toHaveBeenCalledWith( {
			postId,
			getPostFromStore: expect.any( GetEntityFromStore ),
			updatePost: expect.any( UpdatePost ),
			navigation,
			modalService,
			snackbarService,
			fetchCommunityTagsFromRemote: expect.any( FetchEntitiesFromRemote ),
			getCommunityTagsFromStore: expect.any( GetEntitiesFromStore ),
			makeAutoObservable
		} );
		expect( GetEntityFromStore ).toHaveBeenCalledWith( {
			store: rootStore.postStore
		} );
		expect( UpdatePost ).toHaveBeenCalledWith( {
			postStore: rootStore.postStore,
			pilotStore: rootStore.pilotStore,
			service: expect.any( PostService )
		} );
		expect( PostService ).toHaveBeenCalledWith( {
			api: expect.any( Api )
		} );
		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );
	} );
} );
