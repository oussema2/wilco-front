const {
	onLayout,
	scrollTo,
	scrollToTop
} = require( '../../helpers/scroll' );

const useMockRef = {
	current: {
		scrollTo: jest.fn(),
		scrollToOffset: jest.fn()
	}
};

describe( '@onLayout', () => {
	it( 'calls to setPositionY callback', () => {
		const setPositionY = jest.fn();
		const nativeEvent = { nativeEvent: { layout: { x: 10, y: 20 } } };
		onLayout( nativeEvent, setPositionY );
		expect( setPositionY ).toHaveBeenCalledWith( 20 );
	} );
} );

describe( '@scrollTo', () => {
	it( 'calls scrollTo on the ref’s value', () => {
		jest.useFakeTimers();
		scrollTo( { ref: useMockRef, positionY: 200 } );
		jest.advanceTimersByTime( 1000 );

		expect( useMockRef.current.scrollTo ).toHaveBeenCalled();
	} );
} );

describe( '@scrollToTop', () => {
	it( 'calls scrollToOffset on the ref’s value', () => {
		scrollToTop( useMockRef );

		expect( useMockRef.current.scrollToOffset ).toHaveBeenCalled();
	} );
} );
