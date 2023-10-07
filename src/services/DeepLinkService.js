import firebaseAuth from '@react-native-firebase/auth';
import { Linking } from 'react-native';

export default class DeepLinkService {
	constructor( {
		auth = firebaseAuth,
		linking = Linking,
		navigation
	} = {} ) {
		this.auth = auth;
		this.linking = linking;
		this.navigation = navigation;
	}

	initialize() {
		this._handleDeepLinks();
		this._handleInitialDeepLink();
	}

	_handleDeepLinks() {
		const callback = ( { url } ) => {
			this._navigateToScreens( { url } );
		};

		this.linking.addEventListener( 'url', callback );
	}

	_handleInitialDeepLink = () => {
		this.linking.getInitialURL().then( ( url ) => {
			this._navigateToScreens( { url } );
		} );
	}

	_navigateToScreens( { url } ) {
		this._navigateToResetPassword( { url } );
	}

	_navigateToResetPassword( { url } ) {
		const mode = this._getParameterByName( 'mode', url );
		const oobCode = this._getParameterByName( 'oobCode', url );

		if ( mode === 'resetPassword' && oobCode ) {
			this.navigation.navigate( { name: 'ResetPassword', params: { oobCode } } );
		}
	}

	_getParameterByName( name, url ) {
		name = name.replace( /[[\]]/g, '\\$&' );
		let regex = new RegExp( `[?&]${name}(=([^&#]*)|&|#|$)` );
		let results = regex.exec( url );
		if ( !results ) return null;
		if ( !results[ 2 ] ) return '';
		return decodeURIComponent( results[ 2 ].replace( /\+/g, ' ' ) );
	}
}
