import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

export const useOnAppStateChange = ( { onForeground, onBackground } ) => {
	const appState = useRef( AppState.currentState );

	const _handleAppStateChange = ( nextAppState ) => {
		if ( appState.current.match( /inactive|background/ ) && nextAppState === 'active' ) {
			if ( onForeground ) onForeground();
		}

		if ( nextAppState === 'background' ) {
			if ( onBackground ) onBackground();
		}

		appState.current = nextAppState;
	};

	useEffect( () => {
		const subscription = AppState.addEventListener( 'change', _handleAppStateChange );

		return () => {
			subscription.remove();
		};
	}, [ onForeground, onBackground ] );
};
