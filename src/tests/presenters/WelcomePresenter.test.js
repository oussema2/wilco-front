import { Linking } from 'react-native';
import WelcomePresenter from '../../presenters/WelcomePresenter';
import UNAUTHENTICATED_ROUTES from '../../navigation/UnauthenticatedRoutes';
import { handleUrl } from '../../helpers/linking';
import { PRIVACY_AND_TERMS } from '../../constants/privacyAndTerms';

jest.mock( '@react-native-firebase/auth', () => ( { auth: jest.fn( () => {} ) } ) );

describe( 'WelcomePresenter', () => {
	const makeAutoObservable = jest.fn();
	const navigation = { push: jest.fn(), navigate: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new WelcomePresenter( {
			navigation,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.navigation ).toEqual( navigation );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@logInButtonWasPressed()', () => {
		it( 'pushes the LogIn screen', () => {
			presenter.logInButtonWasPressed();
			expect( presenter.navigation.push ).toHaveBeenCalledWith( 'LogIn' );
		} );
	} );

	describe( '@signUpButtonTitle()', () => {
		it( 'returns the title', () => {
			expect( presenter.signUpButtonTitle ).toEqual( 'Sign up' );
		} );
	} );

	describe( '@logInButtonTitle()', () => {
		it( 'returns the title', () => {
			expect( presenter.logInButtonTitle ).toEqual( 'Log in' );
		} );
	} );

	describe( '@title()', () => {
		it( 'returns the title', () => {
			expect( presenter.title ).toEqual( 'Expanding your flying horizons' );
		} );
	} );

	describe( '@backButtonWasPressed', () => {
		it( 'go to onBoarding screen', () => {
			presenter.backButtonWasPressed();
			expect( navigation.navigate ).toHaveBeenCalledWith( UNAUTHENTICATED_ROUTES.onBoarding.name );
		} );
	} );

	describe( '@termsOfServiceWasPressed', () => {
		it( 'opens terms of service link', () => {
			presenter.termsOfServiceWasPressed();
			const spy = jest.spyOn( Linking, 'canOpenURL' );
			handleUrl( PRIVACY_AND_TERMS.termsOfService.url );
			expect( spy ).toBeCalledWith( PRIVACY_AND_TERMS.termsOfService.url );
		} );
	} );

	describe( '@privacyPolicyWasPressed', () => {
		it( 'opens privacy policy link', () => {
			presenter.privacyPolicyWasPressed();
			const spy = jest.spyOn( Linking, 'canOpenURL' );
			handleUrl( PRIVACY_AND_TERMS.privacyPolicy.url );
			expect( spy ).toBeCalledWith( PRIVACY_AND_TERMS.privacyPolicy.url );
			spy.mockReset();
			spy.mockRestore();
		} );
	} );
} );
