import { ONBOARDING_SLIDES } from '../constants/onBoarding';

export default class OnBoardingPresenter {
	constructor( {
		navigation,
		onBoardingManager,
		analyticsService,
		makeAutoObservable
	} = {} ) {
		this._navigation = navigation;
		this._onBoardingManager = onBoardingManager;
		this._analyticsService = analyticsService;
		this._page = 0;
		makeAutoObservable( this );
	}

	get onboardingSlides() {
		return ONBOARDING_SLIDES;
	}

	get onboardingSlidesCount() {
		return ONBOARDING_SLIDES.length;
	}

	get page() {
		return this._page;
	}

	setPage( page ) {
		this._page = page;
	}

	_letIsStartWasPressed = ( ) => {
		this._onBoardingManager.setOnBoardingAsSeen();
		this._navigation.push( 'Welcome' );
		this._analyticsService.logCompleteOnboarding();
	}

	onBackwardPress = ( swipeRef ) => {
		if ( this.page > 0 ) {
			swipeRef.current?.scrollBy( -1 );
			this.setPage( this.page - 1 );
		}
	};

	onForwardPress = ( swipeRef ) => {
		if ( this.page < ( this.onboardingSlidesCount - 1 ) ) {
			swipeRef.current?.scrollBy( 1 );
			this.setPage( this.page + 1 );
		} else {
			this._letIsStartWasPressed();
		}
	};
}
