import * as React from 'react';
import { render } from '@testing-library/react-native';
import { CommentCount } from '../../../components/CommentCount';

describe( 'CommentCount', () => {
	describe( 'with the default props', () => {
		it( 'renders the CommentCount component correctly', () => {
			const component = render( <CommentCount /> );
			expect( component.queryByTestId( 'commentCount-component' ) ).toBeDefined();
			expect( component.queryByTestId( 'comment-count-image' ) ).toBeDefined();
			expect( component.queryByTestId( 'comment-count-text' ) ).toHaveTextContent( '0 comments' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with count prop equal to 1', () => {
		it( 'renders the CommentCount component with "1 comment" text', () => {
			const component = render( <CommentCount count={1} /> );
			expect( component.queryByTestId( 'comment-count-text' ) ).toHaveTextContent( '1 comment' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with count prop greater than 1', () => {
		it( 'renders the CommentCount component with "<count> comments" text', () => {
			const component = render( <CommentCount count={537} /> );
			expect( component.queryByTestId( 'comment-count-text' ) ).toHaveTextContent( '537 comments' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a custom testID', () => {
		it( 'renders the CommentCount component with the given test ID', () => {
			const component = render( <CommentCount testID="customID" /> );
			expect( component.queryByTestId( 'customID' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
