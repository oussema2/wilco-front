import * as React from 'react';
import { render } from '@testing-library/react-native';
import { home } from '../../../assets/icons';
import { Image } from '../../../components/Image';

describe( 'Image', () => {
	const defaultImage = home;

	describe( 'with the default props', () => {
		it( 'renders the Image component correctly', async () => {
			const { component, queryByTestId } = render(
				<Image source={defaultImage} />
			);
			expect( queryByTestId( 'image' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with size', () => {
		it( 'renders the Image component correctly', async () => {
			const { component } = render(
				<Image source={defaultImage} size={30} />
			);
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with tint color', () => {
		it( 'renders the Image component correctly', async () => {
			const { component } = render(
				<Image source={defaultImage} tintColor="red" />
			);
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with onLoad callback', () => {
		it( 'renders the Image component correctly', async () => {
			const onLoad = jest.fn();
			const { component } = render(
				<Image source={defaultImage} onLoad={onLoad} />
			);
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
