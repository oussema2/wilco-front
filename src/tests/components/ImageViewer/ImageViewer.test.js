import * as React from 'react';
import { render } from '@testing-library/react-native';
import { ImageViewer } from '../../../components/ImageViewer';

describe( 'ImageViewer', () => {
	const testID = 'test-ID';
	let sources = [
		{ uri: 'https://example.photo' }
	];

	const setImageViewVisible = jest.fn();

	describe( 'with the default props', () => {
		describe( 'when the Modal is visible', () => {
			it( 'renders the ImageViewer component correctly', () => {
				const component = render( <ImageViewer
					visible
					imageViewerVisible
					setImageViewVisible={setImageViewVisible}
					imageViewerIndex={0}
					items={sources}
				/> );

				expect( component.queryByTestId( 'pagination-testID' ) ).toBeNull();
				expect( component ).toMatchSnapshot();
			} );
		} );

		describe( 'when the Modal is not visible', () => {
			it( 'renders the ImageViewer component correctly', () => {
				const component = render( <ImageViewer
					visible
					imageViewerVisible={false}
					setImageViewVisible={setImageViewVisible}
					items={sources}
					imageViewerIndex={0}
				/> );

				expect( component.queryByTestId( 'pagination-testID' ) ).toBeNull();
				expect( component ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'when provided more than one photo', () => {
		it( 'renders ImageView component with pagination', () => {
			sources = [
				{ uri: 'https://example.photo' },
				{ uri: 'https://second.example.photo/2' }
			];

			const component = render(
				<ImageViewer
					visible
					testID={testID}
					setImageViewVisible={setImageViewVisible}
					imageViewerVisible
					imageViewerIndex={0}
					items={sources}
				/>
			);

			expect( component.queryByTestId( 'pagination-testID' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
