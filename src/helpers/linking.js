import { Linking } from 'react-native';

export const handleUrl = ( url ) => {
	Linking.canOpenURL( url ).then( ( supported ) => {
		if ( supported ) {
			Linking.openURL( url );
		}
	} );
};
