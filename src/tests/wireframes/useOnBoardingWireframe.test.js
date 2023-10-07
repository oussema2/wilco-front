import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import OnBoardingPresenter from '../../presenters/OnBoardingPresenter';
import useOnBoardingWireframe from '../../wireframes/useOnBoardingWireframe';
import OnBoardingManager from '../../stores/OnBoardingManager';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';

jest.mock( '../../presenters/OnBoardingPresenter' );
jest.mock( '../../stores/OnBoardingManager' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useOnBoardingWireframe', () => {
	let navigation;
	let analyticsService;

	beforeEach( () => {
		navigation = mockNavigation;
		analyticsService = mockUseAnalyticsService();
	} );

	it( 'returns an instance of OnBoardingPresenter', () => {
		const { result } = renderHook( () => useOnBoardingWireframe() );

		expect( result.current ).toBeInstanceOf( OnBoardingPresenter );
		expect( OnBoardingPresenter ).toHaveBeenCalledWith( {
			navigation,
			onBoardingManager: expect.any( OnBoardingManager ),
			analyticsService,
			makeAutoObservable
		} );
	} );
} );
