import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ModalGradient } from '../../../components/ModalGradient';

describe( '< ModalGradient/>', () => {
	let component;

	const setUp = () => {
		component = render(
			<ModalGradient>
				<Text>children</Text>
			</ModalGradient>
		);
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the ModalGradient component correctly', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
