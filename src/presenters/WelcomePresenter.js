import { handleUrl } from '../helpers/linking';
import { PRIVACY_AND_TERMS } from '../constants/privacyAndTerms';

export default class WelcomePresenter {
	constructor( {
		makeAutoObservable,
		navigation
	} = {} ) {
		this.navigation = navigation;
		makeAutoObservable( this );
	}

	get title() {
		return 'Expanding your flying horizons';
	}

	get signUpButtonTitle() {
		return 'Sign up';
	}

	get logInButtonTitle() {
		return 'Log in';
	}

	logInButtonWasPressed = ( ) => {
		this.navigation.push( 'LogIn' );
	}

	signUpPressed = ( ) => {
		this.navigation.push( 'SignUp' );
	}

	backButtonWasPressed = ( ) => {
		this.navigation.navigate( 'OnBoarding' );
	}

	termsOfServiceWasPressed = () => {
		handleUrl( PRIVACY_AND_TERMS.termsOfService.url );
	}

	privacyPolicyWasPressed = () => {
		handleUrl( PRIVACY_AND_TERMS.privacyPolicy.url );
	}
}
