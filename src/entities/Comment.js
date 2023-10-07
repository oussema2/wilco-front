import { makeAutoObservable } from 'mobx';
import Pilot from './Pilot';
// eslint-disable-next-line import/no-cycle
import Post from './Post';

export default class Comment {
	constructor( {
		id,
		text,
		createdAt,
		pilot,
		postId,
		post
	} ) {
		this.id = id;
		this.text = text;
		this.createdAt = createdAt;
		this.pilot = pilot;
		this.postId = postId;
		this.post = post;

		makeAutoObservable( this );
	}

	toJSON() {
		const pilot = this.pilot.toJSON();
		const post = this.post && this.post.toJSON();

		return {
			id: this.id,
			text: this.text,
			created_at: this.createdAt,
			pilot,
			post_id: this.postId,
			post
		};
	}

	setPost( post ) {
		this.post = post;
		return this;
	}

	static fromJSON( data ) {
		const pilot = data.pilot && Pilot.fromJSON( data.pilot );
		const post = data.post && Post.fromJSON( data.post );

		return new Comment( {
			id: data.id,
			text: data.text,
			createdAt: new Date( data.created_at ),
			pilot,
			postId: data.post_id,
			post
		} );
	}
}
