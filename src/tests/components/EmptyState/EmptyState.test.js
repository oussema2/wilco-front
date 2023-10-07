import React from 'react';
import { render } from '@testing-library/react-native';
import { EmptyState } from '../../../components/EmptyState';
import { cloud } from '../../../assets/icons/index';

describe( '<EmptyState />', () => {
	const source = cloud;
	const text = 'empty section';
	let component;

	const setUp = () => {
		component = render( <EmptyState source={source} text={text} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the EmptyState component correctly', () => {
			expect( component.queryByText( text ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
