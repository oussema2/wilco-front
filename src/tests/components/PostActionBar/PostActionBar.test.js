import * as React from 'react';
import {
	render, cleanup, fireEvent
} from '@testing-library/react-native';
import { PostActionBar } from '../../../components/PostActionBar';
import PostFactory from '../../factories/PostFactory';

afterEach( cleanup );

describe( 'PostActionBar', () => {
	const post = PostFactory.build( { numberOfLikes: 4, numberOfComments: 25 } );

	describe( 'with the default props', () => {
		it( 'renders the PostActionBar component correctly', () => {
			const component = render( <PostActionBar post={post} /> );
			expect( component.queryByTestId( 'postActionBar-component' ) ).toBeDefined();
			expect( component.queryByTestId( 'action-bar-like-count' ) ).toHaveTextContent( '0 likes' );
			expect( component.queryByTestId( 'post-comment-count' ) ).toHaveTextContent( '25 comments' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the numberOfLikes prop', () => {
		it( 'renders the inner like count with the given number of likes', () => {
			const component = render( <PostActionBar post={post} numberOfLikes={5} /> );
			expect( component.queryByTestId( 'action-bar-like-count' ) ).toHaveTextContent( '5 likes' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the liked prop', () => {
		it( 'renders the inner like count with color', () => {
			const component = render( <PostActionBar post={post} liked /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the onLikePressed callback', () => {
		describe( 'when the inner like count is pressed', () => {
			it( 'executes the given callback', () => {
				const onLikePressedMock = jest.fn();
				const { queryByTestId } = render(
					<PostActionBar post={post} onLikePressed={onLikePressedMock} />
				);
				fireEvent.press( queryByTestId( 'action-bar-like-count' ) );
				expect( onLikePressedMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );
} );
