import { renderHook } from '@testing-library/react-hooks';
import { useOnAppStateChange } from '../../hooks/useOnAppStateChange';

const mockAddEventListener = jest.fn();
const mockRemove = jest.fn();
jest.mock( 'react-native/Libraries/AppState/AppState', () => ( {
	currentState: 'inactive',
	addEventListener: mockAddEventListener
} ) );

describe( 'useOnAppStateChange', () => {
	let onForeground;
	let onBackground;

	beforeEach( () => {
		jest.clearAllMocks();
		mockAddEventListener.mockReturnValue( { remove: mockRemove } );
		onForeground = jest.fn();
		onBackground = jest.fn();
	} );

	it( 'adds an event listener to the application state', () => {
		renderHook( () => useOnAppStateChange( { onForeground } ) );

		expect( mockAddEventListener ).toHaveBeenCalledWith( 'change', expect.any( Function ) );
	} );

	describe( 'when the app is brought to foreground', () => {
		describe( 'when the hook has onForeground callback', () => {
			it( 'calls the onForeground function', () => {
				renderHook( () => useOnAppStateChange( { onForeground } ) );

				mockAddEventListener.mock.calls[ 0 ][ 1 ]( 'active' );

				expect( onForeground ).toHaveBeenCalledTimes( 1 );
			} );
		} );

		describe( 'when the hook does not has onForeground callback', () => {
			it( 'does nothing', () => {
				renderHook( () => useOnAppStateChange( {} ) );

				mockAddEventListener.mock.calls[ 0 ][ 1 ]( 'active' );

				expect( onForeground ).not.toHaveBeenCalled();
			} );
		} );
	} );

	describe( 'when the app is brought to background', () => {
		describe( 'when the hook has onBackground callback', () => {
			it( 'calls the onForeground function', () => {
				renderHook( () => useOnAppStateChange( { onForeground, onBackground } ) );

				mockAddEventListener.mock.calls[ 0 ][ 1 ]( 'background' );

				expect( onBackground ).toHaveBeenCalledTimes( 1 );
			} );
		} );

		describe( 'when the hook does not has onBackground callback', () => {
			it( 'does nothing', () => {
				renderHook( () => useOnAppStateChange( { onForeground } ) );

				mockAddEventListener.mock.calls[ 0 ][ 1 ]( 'background' );

				expect( onBackground ).not.toHaveBeenCalled();
			} );
		} );
	} );

	describe( 'on unmount', () => {
		beforeEach( () => {
			mockAddEventListener.mockReturnValue( { remove: mockRemove } );
		} );

		it( 'unsubscribes to the event listener', () => {
			const res = renderHook( () => useOnAppStateChange( { onForeground } ) );
			res.unmount();
			expect( mockRemove ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
