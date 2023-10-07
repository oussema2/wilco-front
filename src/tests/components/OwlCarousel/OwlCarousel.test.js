import React from 'react';
import { render } from '@testing-library/react-native';
import { OwlCarousel } from '../../../components/OwlCarousel';

describe( '<OwlCarousel />', () => {
	let component;
	const testID = 'testing-OwlCarousel-Component';
	const items = [ { id: 1 }, { id: 2 }, { id: 3 } ];
	const MOCKING_DIMENSION_WIDTH_VALUE = 1000;
	const MOCKING_DIMENSION_HEIGHT_VALUE = 750;

	const sources = [
		{ uri: 'https://example.photo' },
		{ uri: 'https://second.example.photo/2' }
	];

	const presenter = {
		imageSources: sources,
		imageViewerVisible: true,
		setImageViewerVisible: jest.fn()
	};

	const setUp = ( props ) => {
		component = render( <OwlCarousel
			testID={testID}
			items={items}
			{...props}
			postPresenter={presenter}
		/> );
	};

	const mockDimensions = ( { width, height } ) => {
		jest.doMock( 'react-native/Libraries/Utilities/Dimensions', () => ( {
			get: jest.fn().mockReturnValue( { width, height } )
		} ) );
	};

	jest.mock( 'react', () => ( {
		...jest.requireActual( 'react' ),
		useState: jest.fn()
	} ) );

	beforeEach( () => {
		mockDimensions( {
			width: MOCKING_DIMENSION_WIDTH_VALUE,
			height: MOCKING_DIMENSION_HEIGHT_VALUE
		} );
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the OwlCarousel component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with an onWidthSet callback', () => {
		it( 'calls the callback passing the screen width', () => {
			const onWidthSet = jest.fn();
			setUp( { onWidthSet } );

			expect( onWidthSet ).toHaveBeenCalledWith( MOCKING_DIMENSION_WIDTH_VALUE );
		} );
	} );
} );
