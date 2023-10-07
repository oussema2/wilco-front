import React from 'react';
import { observer } from 'mobx-react';
import { Snackbar as SnackbarComponent } from 'react-native-paper';
import { useSnackbarService } from '../../providers/SnackbarProvider';
import { defaultStyles, successStyles, errorStyles } from './Snackbar.styles';

const Snackbar = ( ) => {
	const snackbarService = useSnackbarService();

	const onDismissSnackBar = () => snackbarService.hide();

	let styles = defaultStyles;
	if ( snackbarService.type === 'success' ) { styles = { ...styles, ...successStyles }; }
	if ( snackbarService.type === 'error' ) { styles = { ...styles, ...errorStyles }; }

	return (
		<SnackbarComponent
			style={styles.snackbar}
			visible={snackbarService.isVisible}
			onDismiss={onDismissSnackBar}
			duration={3000}
		>
			{snackbarService.message}
		</SnackbarComponent>
	);
};

Snackbar.propTypes = {
};

Snackbar.defaultProps = {
};

export default observer( Snackbar );
