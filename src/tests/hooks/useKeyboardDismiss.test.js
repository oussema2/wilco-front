import { renderHook } from '@testing-library/react-hooks';
import { Keyboard } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import useKeyboardDismiss from '../../hooks/useKeyboardDismiss';

describe( 'useKeyboardDismiss', () => {
	let render;
	let keyboardDismiss;

	describe( 'when screen is loading', () => {
		beforeEach( () => {
			renderHook( () => useKeyboardDismiss( true ) );
		} );

		it( 'dismiss keyboard', () => {
			waitFor( () => {
				keyboardDismiss = jest.spyOn( Keyboard, 'dismiss' );
				expect( keyboardDismiss ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( 'when the screen is not loading', () => {
		beforeEach( () => {
			renderHook( () => useKeyboardDismiss( false ) );
		} );

		it( 'does nothing', () => {
			waitFor( () => {
				keyboardDismiss = jest.spyOn( Keyboard, 'dismiss' );
				expect( keyboardDismiss ).not.toHaveBeenCalled();
			} );
		} );
	} );

	describe( 'when isLoading value change from false to true', () => {
		beforeEach( () => {
			render = renderHook( () => useKeyboardDismiss( false ) );
			render.rerender( true );
		} );

		it( 'dismiss keyboard', () => {
			waitFor( () => {
				keyboardDismiss = jest.spyOn( Keyboard, 'dismiss' );
				expect( keyboardDismiss ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );
} );
