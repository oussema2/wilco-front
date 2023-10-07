import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../components/ScreenGradient';
import { ScreenLoader } from '../../components/ScreenLoader';
import { styles } from './BaseScreen.styles';
import useKeyboardDismiss from '../../hooks/useKeyboardDismiss';

const BaseScreen = ( {
	children, testID, isLoading, edgeTop
} ) => {
	useKeyboardDismiss( isLoading );

	const _defaultEdges = [ 'top', 'right', 'bottom', 'left' ];
	return (
		<ScreenGradient style={styles.containerView} testID={testID}>
			<StatusBar translucent />
			<SafeAreaView
				edges={( edgeTop ) ? [ 'top' ] : _defaultEdges}
				style={styles.safeArea}
			>
				{children}
			</SafeAreaView>
			{isLoading && <ScreenLoader />}
		</ScreenGradient>
	);
};

BaseScreen.propTypes = {
	testID: PropTypes.string,
	children: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.element,
		PropTypes.node
	] ),
	isLoading: PropTypes.bool,
	edgeTop: PropTypes.bool
};

BaseScreen.defaultProps = {
	testID: 'base-screen',
	children: <></>,
	isLoading: false,
	edgeTop: false
};

export default observer( BaseScreen );
