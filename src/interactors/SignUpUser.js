export default class SignUpUser {
	constructor( { signUpService, logInService } ) {
		this.signUpService = signUpService;
		this.logInService = logInService;
	}

	async execute( {
		email, password, firstName, lastName, rolesIDs, customRoles
	} ) {
		const firebaseIdToken = await this.signUpService.signUpWithFirebase( { email, password } );
		await this.signUpService.signUp( {
			firebaseIdToken, firstName, lastName, rolesIDs, customRoles
		} );
		await this.logInService.logIn( firebaseIdToken );
	}
}
