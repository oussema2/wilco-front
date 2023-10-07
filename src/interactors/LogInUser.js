export default class LogInUser {
	constructor( { logInService } ) {
		this.logInService = logInService;
	}

	async execute( { email, password } ) {
		const firebaseIdToken = await this.logInService.logInWithFirebase( { email, password } );
		await this.logInService.logIn( firebaseIdToken );
	}
}
