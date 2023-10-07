import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LikeCount } from '../../../components/LikeCount';

describe( 'LikeCount', () => {
	describe( 'with the default props', () => {
		it( 'renders the LikeCount component correctly', () => {
			const component = render( <LikeCount /> );
			expect( component.queryByTestId( 'likeCount-component' ) ).toBeDefined();
			expect( component.queryByTestId( 'like-count-image' ) ).toBeDefined();
			expect( component.queryByTestId( 'like-count-text' ) ).toHaveTextContent( '0 likes' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with count prop equal to 1', () => {
		it( 'renders the LikeCount component with "1 like" text', () => {
			const component = render( <LikeCount count={1} /> );
			expect( component.queryByTestId( 'like-count-text' ) ).toHaveTextContent( '1 like' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with count prop greater than 1', () => {
		it( 'renders the LikeCount component with "<count> likes" text', () => {
			const component = render( <LikeCount count={537} /> );
			expect( component.queryByTestId( 'like-count-text' ) ).toHaveTextContent( '537 likes' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a custom testID', () => {
		it( 'renders the LikeCount component with the given test ID', () => {
			const component = render( <LikeCount testID="customID" /> );
			expect( component.queryByTestId( 'customID' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the liked property', () => {
		it( 'adds color to the icon and text', () => {
			const component = render( <LikeCount liked /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the onPress callback', () => {
		describe( 'when the component is clicked', () => {
			it( 'executes the given callback', () => {
				const onPressMock = jest.fn();
				const { getByTestId } = render( <LikeCount onPress={onPressMock} /> );
				fireEvent.press( getByTestId( 'likeCount-component' ) );
				expect( onPressMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );
} );
