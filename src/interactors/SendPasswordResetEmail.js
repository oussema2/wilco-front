export default class SendPasswordResetEmail {
	constructor( { sendPasswordResetEmailService } ) {
		this.sendPasswordResetEmailService = sendPasswordResetEmailService;
	}

	async execute( { email } ) {
		await this.sendPasswordResetEmailService
			.sendPasswordResetEmail( { email } );
	}
}
