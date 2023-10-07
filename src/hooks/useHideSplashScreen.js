import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SPLASH_SCREEN_DURATION } from '../constants/splashScreen';

const useHideSplashScreen = () => {
	useEffect( () => {
		setTimeout( () => SplashScreen.hide(), SPLASH_SCREEN_DURATION );
	}, [] );
};

export default useHideSplashScreen;
