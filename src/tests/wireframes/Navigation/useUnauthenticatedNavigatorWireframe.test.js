import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import OnBoardingManager from '../../../stores/OnBoardingManager';
import useUnauthenticatedNavigatorWireframe from '../../../wireframes/useUnauthenticatedNavigatorWireframe';
import UnauthenticatedNavigatorPresenter from '../../../presenters/UnauthenticatedNavigatorPresenter';

jest.mock( '@react-native-firebase/auth', () => ( { auth: jest.fn( () => {} ) } ) );
jest.mock( '../../../presenters/UnauthenticatedNavigatorPresenter' );
jest.mock( '../../../stores/OnBoardingManager' );
jest.mock( 'mobx' );

describe( 'useUnauthenticatedNavigatorWireframe', () => {
	it( 'returns an instance of useUnauthenticatedNavigatorWireframe', () => {
		const { result } = renderHook( () => useUnauthenticatedNavigatorWireframe() );

		expect( result.current ).toBeInstanceOf( UnauthenticatedNavigatorPresenter );
		expect( UnauthenticatedNavigatorPresenter ).toHaveBeenCalledWith( {
			onBoardingManager: expect.any( OnBoardingManager ),
			makeAutoObservable
		} );
	} );
} );
