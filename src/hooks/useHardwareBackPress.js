import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useHardwareBackPress = ( callback ) => {
	useEffect( () => {
		const onBackPress = () => { if ( callback ) callback(); return true; };

		BackHandler.addEventListener( 'hardwareBackPress', onBackPress );
		return () => BackHandler.removeEventListener( 'hardwareBackPress', onBackPress );
	}, [ callback ] );
};
