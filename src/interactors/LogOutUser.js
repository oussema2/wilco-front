export default class LogOutUser {
	constructor( {
		logOutService, notificationService, helpCenterService
	} ) {
		this.logOutService = logOutService;
		this.notificationService = notificationService;
		this.helpCenterService = helpCenterService;
	}

	async execute() {
		this.helpCenterService.logout();
		this.notificationService.deleteFirebaseToken();
		this.logOutService.logOut();
	}
}
