import { useEffect } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardDismiss = ( isLoading ) => {
	useEffect( () => {
		if ( isLoading ) { Keyboard.dismiss(); }
	}, [ isLoading ] );
};

export default useKeyboardDismiss;
