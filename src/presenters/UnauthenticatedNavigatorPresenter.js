export default class UnauthenticatedNavigatorPresenter {
	constructor( {
		onBoardingManager,
		makeAutoObservable
	} = {} ) {
		this._onBoardingManager = onBoardingManager;
		makeAutoObservable( this );
	}

	get onBoardingWasSeen() {
		const { isOnBoardingWasSeen } = this._onBoardingManager;
		return isOnBoardingWasSeen;
	}
}
