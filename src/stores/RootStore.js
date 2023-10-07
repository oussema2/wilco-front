import AuthenticationStore from './AuthenticationStore';
import EntityStore from './EntityStore';
import PilotStore from './PilotStore';
import NotificationStore from './NotificationStore';
import PostStore from './PostStore';
import CommentStore from './CommentStore';

let sharedInstance;

export default class RootStore {
	constructor() {
		this.authenticationStore = new AuthenticationStore();
		this.aircraftStore = new EntityStore();
		this.commentStore = new CommentStore();
		this.flightStore = new EntityStore();
		this.postStore = new PostStore( this );
		this.certificateStore = new EntityStore();
		this.ratingStore = new EntityStore();
		this.pilotStore = new PilotStore();
		this.notificationStore = new NotificationStore();
		this.communityTagStore = new EntityStore();
		this.roleStore = new EntityStore();
		this.myFeedPostStore = new EntityStore();
		this.hashtagStore = new EntityStore();
	}

	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new RootStore();
		return sharedInstance;
	}
}
