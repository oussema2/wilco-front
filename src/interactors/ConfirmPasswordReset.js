export default class ConfirmPasswordReset {
	constructor( { confirmPasswordResetService } ) {
		this.confirmPasswordResetService = confirmPasswordResetService;
	}

	async execute( { password, oobCode } ) {
		await this.confirmPasswordResetService
			.confirmPasswordReset( { password, oobCode } );
	}
}
