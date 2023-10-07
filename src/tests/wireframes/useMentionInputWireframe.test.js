import { renderHook } from '@testing-library/react-hooks';
import mockUseRootStore from '../mocks/mockUseRootStore';
import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import FetchEntitiesFromRemote from '../../interactors/FetchEntitiesFromRemote';
import useMentionInputWireframe from '../../wireframes/useMentionInputWireframe';
import MentionInputPresenter from '../../presenters/MentionInput/MentionInputPresenter';

jest.mock( '../../interactors/FetchEntitiesFromRemote' );
jest.mock( '../../presenters/MentionInput/MentionInputPresenter' );
jest.mock( '../../interactors/GetEntitiesFromStore' );
jest.mock( '../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../services/Api' );
jest.mock( 'mobx' );

describe( 'useMentionInputWireframe', () => {
	mockUseRootStore();

	it( 'returns an instance of MentionInputPresenter', () => {
		const { result } = renderHook( () => useMentionInputWireframe() );

		expect( result.current ).toBeInstanceOf( MentionInputPresenter );
		expect( MentionInputPresenter ).toHaveBeenCalledWith( {
			fetchHashtagsFromRemote: expect.any( FetchEntitiesFromRemote ),
			fetchPilotsFromRemote: expect.any( FetchEntitiesFromRemote ),
			getHashtagsFromStore: expect.any( GetEntitiesFromStore ),
			getPilotsFromStore: expect.any( GetEntitiesFromStore )
		} );
	} );
} );
