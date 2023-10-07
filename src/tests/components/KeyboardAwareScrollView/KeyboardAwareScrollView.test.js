import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from '../../../components/KeyboardAwareScrollView';

describe( '<KeyboardAwareScrollView />', () => {
	let component;

	const setUp = () => {
		component = render(
			<KeyboardAwareScrollView>
				<Text>text</Text>
			</KeyboardAwareScrollView>
		);
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders children correctly', () => {
		expect( component.getByText( 'text' ) ).toBeDefined();
	} );
} );
