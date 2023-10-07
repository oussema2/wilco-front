import { Platform } from 'react-native';
import {
	defaultStyle, disabledStyle,
	errorStyle,
	focusedStyle
} from '../components/MultilineInput/MultilineInput.styles';

export const useInputsStyle = ( focused, error, disabled, minimumLines = 1, value, bold ) => {
	let styles = defaultStyle;
	if ( focused ) { styles = { ...styles, ...focusedStyle }; }
	if ( error ) { styles = { ...styles, ...errorStyle }; }
	if ( disabled ) { styles = { ...styles, ...disabledStyle }; }
	styles = { ...styles, input: { ...styles.input, fontWeight: ( value && bold ) ? 'bold' : 'normal' } };
	if ( !value && Platform.OS === 'android' ) { styles = { ...styles, input: { ...styles.input, fontWeight: 'bold' } }; }
	const FIRST_LINE_HEIGHT = 48;
	const LINE_HEIGHT = 20;
	const minHeight = FIRST_LINE_HEIGHT + ( ( minimumLines - 1 ) * LINE_HEIGHT );

	return [ styles, minHeight ];
};
