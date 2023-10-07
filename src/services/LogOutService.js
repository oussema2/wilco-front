import firebaseAuth from '@react-native-firebase/auth';
import Api from './Api';

export default class LogOutService {
	constructor( {
		api = new Api(),
		auth = firebaseAuth,
		pilotStore,
		postStore,
		commentStore,
		notificationStore
	} = { } ) {
		this.auth = auth;
		this.api = api;
		this.pilotStore = pilotStore;
		this.postStore = postStore;
		this.commentStore = commentStore;
		this.notificationStore = notificationStore;
	}

	logOutWithFirebase = async ( ) => {
		try {
			await this.auth().signOut( );
		} catch ( error ) {
		}
	}

	logOutWithApi = async ( ) => {
		await this.api.logOut( );
	}

	logOutWithStore = () => {
		this.pilotStore.setCurrentPilotId( null );
		this.postStore.deleteAll();
		this.commentStore.deleteAll();
		this.notificationStore.deleteAll();
		this.pilotStore.deleteAll();
	}

	logOut = () => {
		this.logOutWithFirebase();
		this.logOutWithApi();
		this.logOutWithStore();
	}
}
