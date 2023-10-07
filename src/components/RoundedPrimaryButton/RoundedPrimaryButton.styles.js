import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const styles = StyleSheet.create( {
	button: {
		width: 44,
		height: 44,
		margin: 6,
		shadowOpacity: 0.5,
		shadowColor: palette.primary.default,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 1
		}
	}
} );
