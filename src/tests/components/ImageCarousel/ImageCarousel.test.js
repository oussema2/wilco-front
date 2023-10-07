import * as React from 'react';
import { render } from '@testing-library/react-native';
import { ImageCarousel } from '../../../components/ImageCarousel';
import noop from '../../../helpers/noop';

describe( 'ImageCarousel', () => {
	const testID = 'test-ID';
	const sources = [
		{ uri: 'https://example.photo' },
		{ uri: 'https://second.example.photo/2' }
	];

	const presenter = {
		imageSources: sources,
		imageViewerVisible: true,
		setImageViewerVisible: jest.fn()
	};

	describe( 'with the default props', () => {
		it( 'renders the ImageCarousel component correctly', () => {
			const component = render( <ImageCarousel
				testID={testID}
				sources={sources}
				postPresenter={presenter}
			/> );

			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when provided a removeImage function', () => {
		it( 'renders removable images', () => {
			const removeImage = noop;
			const component = render(
				<ImageCarousel
					testID={testID}
					sources={sources}
					removeImage={removeImage}
					postPresenter={presenter}
				/>
			);

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
