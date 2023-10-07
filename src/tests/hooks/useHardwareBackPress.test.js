import { renderHook } from '@testing-library/react-hooks';
import { BackHandler } from 'react-native';
import { useHardwareBackPress } from '../../hooks/useHardwareBackPress';

describe( 'useHardwareBackPress', () => {
	const mockCallback = jest.fn();
	const mockAddEventListener = jest.fn();
	const mockRemoveEventListener = jest.fn();
	BackHandler.addEventListener = mockAddEventListener;
	BackHandler.removeEventListener = mockRemoveEventListener;

	it( 'calls to addEventListener', () => {
		renderHook( () => useHardwareBackPress( mockCallback ) );

		expect( mockAddEventListener ).toHaveBeenCalledWith( 'hardwareBackPress', expect.any( Function ) );
	} );

	describe( 'when user press back by hardware', () => {
		describe( 'when callback is a function', () => {
			it( 'calls to callback function', () => {
				renderHook( () => useHardwareBackPress( mockCallback ) );

				BackHandler.addEventListener.mock.calls.forEach( ( oneCall ) => {
					if ( oneCall[ 0 ] === 'hardwareBackPress' ) oneCall[ 1 ]();
				} );

				expect( mockCallback ).toHaveBeenCalled();
			} );
		} );

		describe( 'when callback is not a function', () => {
			it( 'does nothing', () => {
				const mockUndefinedCallback = jest.fn().mockReturnValueOnce( null );
				renderHook( () => useHardwareBackPress( null ) );

				BackHandler.addEventListener.mock.calls.forEach( ( oneCall ) => {
					if ( oneCall[ 0 ] === 'hardwareBackPress' ) oneCall[ 1 ]();
				} );

				expect( mockUndefinedCallback ).not.toHaveBeenCalled();
			} );
		} );

		it( 'unmounts hardwareBackPress listener', () => {
			renderHook( () => useHardwareBackPress( mockCallback ) );

			BackHandler.addEventListener.mock.calls.forEach( ( oneCall ) => {
				if ( oneCall[ 0 ] === 'hardwareBackPress' ) oneCall[ 1 ]();
			} );

			expect( mockRemoveEventListener ).toHaveBeenCalled();
		} );
	} );
} );
