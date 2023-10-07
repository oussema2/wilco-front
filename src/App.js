import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import NavigationContainer from './navigation/NavigationContainer';
import RootNavigator from './navigation/RootNavigator';
import AppProvider from './providers/AppProvider';
import { Modals } from './components/Modals';
import { ActionSheet } from './components/ActionSheet';
import { Snackbar } from './components/Snackbar';
import ignoreLogs from './helpers/ignoreLogs';
import setMaxFontSizeMultiplier from './helpers/setMaxFontSizeMultiplier';
import useAppPresenter from './presenters/App/useAppPresenter';
import useHideSplashScreen from './hooks/useHideSplashScreen';

const App = () => {
	// eslint-disable-next-line no-unused-vars
	useAppPresenter();
	ignoreLogs();
	setMaxFontSizeMultiplier();
	useHideSplashScreen();

	return (
		<AppProvider>
			<StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
			<SafeAreaProvider>
				<NavigationContainer>
					<RootNavigator />
					<Modals />
					<ActionSheet />
					<Snackbar />
				</NavigationContainer>
			</SafeAreaProvider>
		</AppProvider>
	);
};

export default App;
