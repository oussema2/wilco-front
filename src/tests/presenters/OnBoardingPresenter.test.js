import OnBoardingPresenter from '../../presenters/OnBoardingPresenter';
import { ONBOARDING_SLIDES } from '../../constants/onBoarding';

describe( 'OnBoardingPresenter', () => {
	const navigation = { push: jest.fn() };
	const makeAutoObservable = jest.fn();
	const onBoardingManager = { setOnBoardingAsSeen: jest.fn(), isOnBoardingWasSeen: jest.fn() };
	const analyticsService = {
		logCompleteOnboarding: jest.fn()
	};
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new OnBoardingPresenter( {
			navigation,
			onBoardingManager,
			analyticsService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter._navigation ).toEqual( navigation );
			expect( presenter._onBoardingManager ).toEqual( onBoardingManager );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@onboardingSlides', () => {
		it( 'returns the correct data', () => {
			expect( presenter.onboardingSlides ).toEqual( ONBOARDING_SLIDES );
		} );
	} );

	describe( '@onboardingSlidesCount', () => {
		it( 'returns the correct slides count', () => {
			expect( presenter.onboardingSlidesCount ).toEqual( ONBOARDING_SLIDES.length );
		} );
	} );

	describe( 'setPage', () => {
		it( 'sets the correct page to presenter', () => {
			const newPage = 1;
			presenter.setPage( newPage );
			expect( presenter.page ).toEqual( newPage );
		} );
	} );

	describe( '@onBackwardPress', () => {
		describe( 'When we are on the first slide', () => {
			it( 'Stays in the first slide', () => {
				const actualPage = presenter.page;
				presenter.onBackwardPress( jest.fn() );

				expect( presenter.page ).toBe( actualPage );
			} );
		} );

		describe( 'When we are not on the first slide', () => {
			it( 'Goes to the previous slide', () => {
				const actualPage = 1;
				presenter.setPage( 1 );
				presenter.onBackwardPress( jest.fn() );

				expect( presenter.page ).toBe( actualPage - 1 );
			} );
		} );
	} );

	describe( '@onForwardPress', () => {
		describe( 'When we have more slides', () => {
			it( 'Goes to the next slide', () => {
				const actualPage = presenter.page;
				presenter.onForwardPress( jest.fn() );

				expect( presenter.page ).toBe( actualPage + 1 );
			} );
		} );

		describe( 'When we are on the last slides', () => {
			it( 'Sets onBoarding screen as seen and goes to welcome page', () => {
				presenter.setPage( ONBOARDING_SLIDES.length - 1 );
				presenter.onForwardPress( jest.fn() );

				expect( onBoardingManager.setOnBoardingAsSeen ).toHaveBeenCalled();
				expect( navigation.push ).toHaveBeenCalledWith( 'Welcome' );
			} );
		} );
	} );
} );
