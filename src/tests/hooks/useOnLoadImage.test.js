import { act, renderHook } from '@testing-library/react-hooks';
import { useOnLoadImage } from '../../hooks/useOnLoadImage';

describe( 'useOnLoadImage', () => {
	let result;

	beforeEach( () => {
		result = renderHook( () => useOnLoadImage() ).result;
	} );

	it( 'returns the loading state as true by default', () => {
		expect( result.current[ 0 ] ).toBe( true );
	} );

	describe( 'when the returned onLoadEnd function is called', () => {
		beforeEach( () => {
			act( () => {
				result.current[ 1 ]();
			} );
		} );

		it( 'changes the loading state to false', () => {
			expect( result.current[ 0 ] ).toBe( false );
		} );
	} );
} );
