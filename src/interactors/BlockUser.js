import { runInAction } from 'mobx';

export default class BlockUser {
	constructor( {
		pilotService, postStore, pilotStore, commentStore, notificationStore
	} ) {
		this.pilotService = pilotService;
		this.postStore = postStore;
		this.pilotStore = pilotStore;
		this.commentStore = commentStore;
		this.notificationStore = notificationStore;
	}

	async execute( pilotId ) {
		await this.pilotService.blockUser( pilotId );
		this._deleteUserDataFromStore( pilotId );
	}

	_deleteUserDataFromStore( pilotId ) {
		runInAction( () => {
			this.postStore.deletePostsByPilotId( pilotId );
			this._updateNumberOfCommentsOfPosts( pilotId );
			this.commentStore.deleteCommentsByPilotId( pilotId );
			this.notificationStore.deleteNotificationsByPilotId( pilotId );
			this.pilotStore.delete( pilotId );
		} );
	}

	_updateNumberOfCommentsOfPosts( pilotId ) {
		this.commentStore.getCommentsByPilotId( pilotId )?.forEach( ( entity ) => {
			this.postStore.updateNumberOfComments( entity.postId );
		} );
	}
}
