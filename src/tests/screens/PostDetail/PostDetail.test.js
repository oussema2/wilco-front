import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import PostDetail from '../../../screens/PostDetail/PostDetail';
import * as usePostDetailWireframe from '../../../wireframes/usePostDetailWireframe';
import CommentFactory from '../../factories/CommentFactory';
import PostFactory from '../../factories/PostFactory';
import Form from '../../../forms/Form';
import fields from '../../../forms/commentFields';
import { PrivacyTypeFactory } from '../../../factories/VisibilityTypeFactory';

describe( 'PostDetail', () => {
	let screen;
	const comments = CommentFactory.buildList( 2 );
	const post = PostFactory.build();
	const privacy = PrivacyTypeFactory.build( 'public' );
	const postId = post.id;
	const route = { params: { postId } };
	const title = 'Pilot\'s post';
	const pilotName = 'Pilot name';
	const defaultCommentPresenters = comments.map( ( comment ) => (
		{ comment, text: `Text ${comment.id}` }
	) );
	const defaultPostPresenter = { pilotName, post, privacy };
	const backButtonWasPressed = jest.fn();
	const form = new Form( { fields } );

	const setUp = (
		view = {}, commentPresenters = defaultCommentPresenters,
		postPresenter = defaultPostPresenter, isLoadingPost = false, isLoadingComments = false,
		isRefreshing = false
	) => {
		mockUseView(
			usePostDetailWireframe,
			{
				title,
				backButtonWasPressed,
				commentPresenters,
				postPresenter,
				form,
				post,
				isLoadingPost,
				isLoadingComments,
				isRefreshing,
				...view
			}
		);

		screen = render( <PostDetail route={route} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'when the app is loading post', () => {
		beforeEach( () => {
			setUp( { isLoadingPost: true } );
		} );

		it( 'renders a loading post component initially', () => {
			expect( screen.queryByTestId( 'activityIndicatorPost-testID' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'when the app finished to load post', () => {
		beforeEach( () => {
			setUp( { isLoadingComments: false } );
		} );

		it( 'renders the PostDetail screen correctly', () => {
			expect( screen.queryByTestId( 'postDetail-screen' ) ).toBeDefined();
			expect( screen.queryByTestId( 'navigationBar-component' ) ).toHaveTextContent( title );
			expect( screen.queryByTestId( 'post-component' ) ).toBeDefined();
			expect( screen.queryByTestId( 'comments-FlatList' ) ).toBeDefined();
			expect( screen.queryByTestId( 'comment-CommentBar' ) ).toBeDefined();
			expect( screen.queryByTestId( 'public-post' ) ).toBeDefined();
			expect( screen.queryByTestId( 'activityIndicatorPost-testID' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'with comments', () => {
		describe( 'when the app is loading comments', () => {
			beforeEach( () => {
				setUp( { isLoadingComments: true } );
			} );

			it( 'renders a loading comments component initially', () => {
				expect( screen.queryByTestId( 'activityIndicatorComments-testID' ) ).not.toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'when the app finished to load comments', () => {
			beforeEach( () => {
				setUp( { isLoadingComments: false } );
			} );

			it( 'renders the comments correctly', () => {
				expect( screen.queryByTestId( 'commentsTitle-component' ) ).toHaveTextContent( 'Comments' );
				expect( screen.queryByText( comments[ 0 ].text ) ).toBeDefined();
				expect( screen.queryByText( comments[ 1 ].text ) ).toBeDefined();
				expect( screen.queryAllByTestId( 'comment-Comment' ) ).toBeDefined();
				expect( screen.queryByTestId( 'activityIndicatorComments-testID' ) ).toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'without comments', () => {
		describe( 'when the app is loading comments', () => {
			beforeEach( () => {
				setUp( { isLoadingComments: true, commentPresenters: [] } );
			} );

			it( 'renders a loading comments component initially', () => {
				expect( screen.queryByTestId( 'activityIndicatorComments-testID' ) ).not.toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'when the app finished to load comments', () => {
			beforeEach( () => {
				setUp( { isLoadingComments: false, commentPresenters: [] } );
			} );

			it( 'doesn\'t render the comments', () => {
				expect( screen.queryByTestId( 'commentsTitle-component' ) ).toBeNull();
				expect( screen.queryByTestId( 'comment-Comment' ) ).toBeNull();
				expect( screen.queryByTestId( 'activityIndicatorComments-testID' ) ).toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( '@isCommenting', () => {
		describe( 'when the view is not sending the comment', () => {
			beforeEach( () => {
				setUp( { isCommenting: false } );
			} );

			it( 'renders the screen loader', () => {
				expect( screen.queryByTestId( 'screenLoader' ) ).toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'when the view is sending the comment', () => {
			beforeEach( () => {
				setUp( { isCommenting: true } );
			} );

			it( 'renders the screen loader', () => {
				expect( screen.queryByTestId( 'screenLoader' ) ).not.toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'when the app is refreshing', () => {
		beforeEach( () => {
			setUp( {
				isLoadingPost: false, isLoadingComments: false, isRefreshing: true
			} );
		} );

		it( 'renders the PostDetail screen correctly', () => {
			expect( screen.queryByTestId( 'commentsTitle-component' ) ).toHaveTextContent( 'Comments' );
			expect( screen.queryByText( comments[ 0 ].text ) ).toBeDefined();
			expect( screen.queryByText( comments[ 1 ].text ) ).toBeDefined();
			expect( screen.queryAllByTestId( 'comment-Comment' ) ).toBeDefined();

			expect( screen.queryByTestId( 'activityIndicatorComments-testID' ) ).toBeNull();
			expect( screen.queryByTestId( 'activityIndicatorPost-testID' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );
} );
