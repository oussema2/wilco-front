import { renderHook, act } from '@testing-library/react-hooks';
import { useFocus } from '../../hooks/useFocus';

describe( 'useFocus', () => {
	let onFocusCallback;
	let onBlurCallback;
	let result;

	beforeEach( () => {
		onFocusCallback = jest.fn();
		onBlurCallback = jest.fn();
		result = renderHook( () => useFocus( onFocusCallback, onBlurCallback ) ).result;
	} );

	it( 'returns the focused state as false by default', () => {
		expect( result.current[ 0 ] ).toBe( false );
	} );

	describe( 'when the returned focus callback is called', () => {
		beforeEach( () => {
			act( () => {
				result.current[ 1 ]();
			} );
		} );

		it( 'changes the focused state to true', () => {
			expect( result.current[ 0 ] ).toBe( true );
		} );

		it( 'calls the original focus callback that was provided', () => {
			expect( onFocusCallback ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the returned blur callback is called', () => {
		beforeEach( () => {
			act( () => {
				result.current[ 1 ]();
				result.current[ 2 ]();
			} );
		} );

		it( 'changes the focused state to false', () => {
			expect( result.current[ 0 ] ).toBe( false );
		} );

		it( 'calls the original blur callback that was provided', () => {
			expect( onBlurCallback ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
