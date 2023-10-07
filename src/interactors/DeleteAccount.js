export default class DeleteAccount {
	constructor( {
		deleteAccountService, logOutService
	} ) {
		this.deleteAccountService = deleteAccountService;
		this.logOutService = logOutService;
	}

	async execute( { password } ) {
		await this.deleteAccountService.deleteAccount( { password } );
		await this.logOutService.logOutWithStore();
	}
}
