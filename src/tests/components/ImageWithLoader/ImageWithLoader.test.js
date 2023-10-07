import * as React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { home } from '../../../assets/icons';
import { ImageWithLoader } from '../../../components/ImageWithLoader';

describe( 'ImageWithLoader', () => {
	const renderLoader = () => <Text>Sample loader</Text>;

	describe( 'with the default props', () => {
		it( 'renders the ImageWithLoader component correctly', async () => {
			const { component, queryByTestId } = render(
				<ImageWithLoader renderLoader={renderLoader} />
			);
			expect( queryByTestId( 'image' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with source', () => {
		it( 'renders the ImageWithLoader component correctly', async () => {
			const { component } = render(
				<ImageWithLoader renderLoader={renderLoader} source={home} />
			);
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with size', () => {
		it( 'renders the ImageWithLoader component correctly', async () => {
			const { component } = render(
				<ImageWithLoader renderLoader={renderLoader} size={30} />
			);
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with tint color', () => {
		it( 'renders the Image component correctly', async () => {
			const { component } = render(
				<ImageWithLoader renderLoader={renderLoader} tintColor="red" />
			);
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
