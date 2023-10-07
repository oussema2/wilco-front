import PostActionBarPresenter from '../../presenters/PostActionBarPresenter';
import PostFactory from '../factories/PostFactory';

jest.useFakeTimers();

describe( 'PostActionBarPresenter', () => {
	const makeAutoObservable = jest.fn();
	const likePost = { execute: jest.fn() };
	const unlikePost = { execute: jest.fn() };
	const snackbarService = { showError: jest.fn() };
	const analyticsService = { logLikePost: jest.fn() };
	const numberOfLikes = 5;
	let post;
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		jest.clearAllTimers();
		post = PostFactory.build( { liked: false, numberOfLikes } );
		presenter = new PostActionBarPresenter( {
			post, likePost, unlikePost, snackbarService, analyticsService, makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes the presenter correctly', () => {
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@likeOrUnlikeInProgress', () => {
		describe( 'when like button was not pressed', () => {
			it( 'returns false', () => {
				expect( presenter.likeOrUnlikeInProgress ).toBe( false );
			} );
		} );

		describe( 'when like button was pressed', () => {
			it( 'returns true', () => {
				presenter.onLikePressed();
				expect( presenter.likeOrUnlikeInProgress ).toBe( true );
			} );
		} );
	} );

	describe( '@numberOfLikes', () => {
		describe( 'when the post is not liked', () => {
			describe( 'and there is no like in progress', () => {
				it( 'returns the post number of likes', () => {
					expect( presenter.numberOfLikes ).toEqual( numberOfLikes );
				} );
			} );

			describe( 'but there is a like in progress', () => {
				it( 'returns the post number of likes incremented by one', () => {
					presenter.onLikePressed();
					expect( presenter.numberOfLikes ).toEqual( numberOfLikes + 1 );
				} );
			} );
		} );

		describe( 'when the post is liked', () => {
			beforeEach( () => {
				post = PostFactory.build( { liked: true, numberOfLikes } );
				presenter = new PostActionBarPresenter( {
					post, likePost, unlikePost, makeAutoObservable
				} );
			} );

			describe( 'and there is no unlike in progress', () => {
				it( 'returns the post number of likes', () => {
					expect( presenter.numberOfLikes ).toEqual( numberOfLikes );
				} );
			} );

			describe( 'but there is an unlike in progress', () => {
				it( 'returns the post number of likes decremented by one', () => {
					presenter.onLikePressed();
					expect( presenter.numberOfLikes ).toEqual( numberOfLikes - 1 );
				} );
			} );
		} );
	} );

	describe( '@liked', () => {
		describe( 'when the post is not liked', () => {
			describe( 'and there is no like in progress', () => {
				it( 'returns false', () => {
					expect( presenter.liked ).toBe( false );
				} );
			} );

			describe( 'but there is a like in progress', () => {
				it( 'returns true', () => {
					presenter.onLikePressed();
					expect( presenter.liked ).toBe( true );
				} );
			} );
		} );

		describe( 'when the post is liked', () => {
			beforeEach( () => {
				post = PostFactory.build( { liked: true } );
				presenter = new PostActionBarPresenter( {
					post, likePost, unlikePost, makeAutoObservable
				} );
			} );

			describe( 'and there is no unlike in progress', () => {
				it( 'returns true', () => {
					expect( presenter.liked ).toBe( true );
				} );
			} );

			describe( 'but there is an unlike in progress', () => {
				it( 'returns false', () => {
					presenter.onLikePressed();
					expect( presenter.liked ).toBe( false );
				} );
			} );
		} );
	} );

	describe( '@onLikePressed', () => {
		describe( 'when there is a like or unlike in progress', () => {
			it( 'cancels the like or unlike', () => {
				presenter.onLikePressed();
				presenter.onLikePressed();
				expect( presenter.likeOrUnlikeInProgress ).toBe( false );
				jest.runAllTimers();
				expect( likePost.execute ).not.toHaveBeenCalled();
				expect( unlikePost.execute ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'when the post is not liked', () => {
			it( 'calls the likePost interactor after a timeout', () => {
				presenter.onLikePressed();
				expect( likePost.execute ).not.toHaveBeenCalled();
				jest.runAllTimers();
				expect( likePost.execute ).toHaveBeenCalledWith( post.id );
				expect( analyticsService.logLikePost ).toHaveBeenCalledTimes( 1 );
				expect( presenter.likeOrUnlikeInProgress ).toBe( false );
			} );
		} );

		describe( 'when the post is liked', () => {
			beforeEach( () => {
				post = PostFactory.build( { liked: true } );
				presenter = new PostActionBarPresenter( {
					post, likePost, unlikePost, makeAutoObservable
				} );
			} );

			it( 'calls the unlikePost interactor after a timeout', () => {
				presenter.onLikePressed();
				expect( unlikePost.execute ).not.toHaveBeenCalled();
				jest.runAllTimers();
				expect( unlikePost.execute ).toHaveBeenCalledWith( post.id );
				expect( presenter.likeOrUnlikeInProgress ).toBe( false );
			} );
		} );
	} );
} );
