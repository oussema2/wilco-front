import { runInAction } from 'mobx';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';

export default class PostActionBarPresenter {
	constructor( {
		post, likePost, unlikePost, snackbarService, analyticsService, makeAutoObservable
	} = {} ) {
		this.post = post;
		this.likePost = likePost;
		this.unlikePost = unlikePost;
		this.likeTimer = null;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;

		makeAutoObservable( this );
	}

	get likeOrUnlikeInProgress() {
		return this.likeTimer != null;
	}

	get numberOfLikes() {
		return (
			this.likeOrUnlikeInProgress ? this._newNumberOfLikesIfLikeWasChanged : this.post.numberOfLikes
		);
	}

	get liked() {
		return this.likeOrUnlikeInProgress ? !this.post.liked : this.post.liked;
	}

	onLikePressed() {
		if ( this.likeOrUnlikeInProgress ) {
			this._cancelLikeOrUnlike();
		} else if ( !this.post.liked ) {
			this._startLike();
		} else {
			this._startUnlike();
		}
	}

	get _newNumberOfLikesIfLikeWasChanged() {
		return this.post.liked ? this.post.numberOfLikes - 1 : this.post.numberOfLikes + 1;
	}

	_cancelLikeOrUnlike() {
		clearTimeout( this.likeTimer );
		this.likeTimer = null;
	}

	_startLike() {
		this._startLikeOrUnlike( async () => {
			await this.likePost.execute( this.post.id );
			this.analyticsService.logLikePost( { postId: this.post.id } );
		} );
	}

	_startUnlike() {
		this._startLikeOrUnlike( async () => {
			await this.unlikePost.execute( this.post.id );
		} );
	}

	_startLikeOrUnlike( action ) {
		this.likeTimer = setTimeout( async () => {
			try {
				await action();
			} catch ( error ) {
				displayErrorInSnackbar( error, this.snackbarService );
			} finally {
				runInAction( () => { this.likeTimer = null; } );
			}
		}, 1000 );
	}
}
