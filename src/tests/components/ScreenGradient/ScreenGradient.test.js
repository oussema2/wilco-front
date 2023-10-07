import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ScreenGradient } from '../../../components/ScreenGradient';

describe( '< ScreenGradient/>', () => {
	let component;

	const setUp = () => {
		component = render(
			<ScreenGradient>
				<Text>children</Text>
			</ScreenGradient>
		);
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the ScreenGradient component correctly', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
