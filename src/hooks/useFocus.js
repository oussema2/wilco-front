import { useState, useCallback } from 'react';

export const useFocus = ( onFocusCallback, onBlurCallback ) => {
	const [ focused, setFocused ] = useState( false );

	const onInputFocused = useCallback( () => {
		setFocused( true );
		onFocusCallback();
	}, [ onFocusCallback ] );

	const onInputBlurred = useCallback( () => {
		setFocused( false );
		onBlurCallback();
	}, [ onBlurCallback ] );

	return [ focused, onInputFocused, onInputBlurred ];
};
