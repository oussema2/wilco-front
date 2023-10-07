import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import useWelcomeWireframe from '../../wireframes/useWelcomeWireframe';
import WelcomePresenter from '../../presenters/WelcomePresenter';

jest.mock( 'mobx' );
jest.mock( '../../presenters/WelcomePresenter' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useWelcomeWireframe', () => {
	let navigation;

	beforeEach( () => {
		navigation = mockNavigation;
	} );

	it( 'returns an instance of WelcomePresenter', () => {
		const { result } = renderHook( () => useWelcomeWireframe() );

		expect( result.current ).toBeInstanceOf( WelcomePresenter );

		expect( WelcomePresenter ).toHaveBeenCalledWith( {
			navigation,
			makeAutoObservable
		} );
	} );
} );
