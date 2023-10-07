import * as React from 'react';
import { render } from '@testing-library/react-native';
import { ScreenHeader } from '../../../components/ScreenHeader';

describe( 'ScreenHeader', () => {
	describe( 'with the default props', () => {
		it( 'renders the ScreenHeader component correctly', () => {
			const component = render( <ScreenHeader /> );
			expect( component.queryByTestId( 'header-text' ) ).not.toBeNull();
			expect( component.queryByTestId( 'screenHeader-view' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with title', () => {
		it( 'renders the title correctly', () => {
			const title = 'title';
			const component = render( <ScreenHeader title={title} /> );
			expect( component.queryByTestId( 'header-text' ) ).toHaveTextContent( title );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with rightButton', () => {
		const onPress = jest.fn();
		const rightButtonParams = {
			title: 'Right Button Title',
			onPress: () => onPress
		};

		it( 'renders the right button correctly', () => {
			const component = render( <ScreenHeader rightButton={rightButtonParams} /> );
			expect( component.queryByTestId( 'rightButton-TextButton' ) ).toHaveTextContent( rightButtonParams.title );
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
