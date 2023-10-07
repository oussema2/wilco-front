import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ActionSheetGradient } from '../../../components/ActionSheetGradient';

describe( '< ActionSheetGradient/>', () => {
	let component;

	const setUp = () => {
		component = render(
			<ActionSheetGradient>
				<Text>children</Text>
			</ActionSheetGradient>
		);
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the ActionSheetGradient component correctly', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
