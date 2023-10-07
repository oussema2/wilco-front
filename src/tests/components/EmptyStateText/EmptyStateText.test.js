import React from 'react';
import { render } from '@testing-library/react-native';
import { EmptyStateText } from '../../../components/EmptyStateText';

describe( '<EmptyStateText />', () => {
	const text = 'empty section';
	let component;

	const setUp = () => {
		component = render( <EmptyStateText text={text} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the EmptyStateText component correctly', () => {
			expect( component.queryByText( text ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
