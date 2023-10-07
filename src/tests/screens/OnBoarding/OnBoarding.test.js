import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useOnBoardingWireframe from '../../../wireframes/useOnBoardingWireframe';
import OnBoarding from '../../../screens/OnBoarding/OnBoarding';
import { ONBOARDING_SLIDES } from '../../../constants/onBoarding';
import OnBoardingPresenter from '../../../presenters/OnBoardingPresenter';

describe( 'OnBoarding', () => {
	let screen;

	const presenter = new OnBoardingPresenter( {
		navigation: { navigate() {} },
		makeAutoObservable() {}
	} );

	const setUp = ( view = {}, page = 0, onboardingSlides = ONBOARDING_SLIDES ) => {
		mockUseView(
			useOnBoardingWireframe,
			{
				page,
				onboardingSlides,
				onboardingSlidesCount: ONBOARDING_SLIDES.length,
				presenter,
				...view
			}
		);

		screen = render( <OnBoarding /> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp( { page: 0 } );
	} );

	describe( 'When we go to OnBoarding screen', () => {
		it( 'renders the first OnBoarding slide correctly', () => {
			const buttonText = 'Next';

			expect( screen.queryByTestId( 'onBoarding-screen' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'back-button-container' ) ).not.toBeNull();

			expect( screen.queryByTestId( 'navigation-bar-without-back-button-component' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'navigation-bar-with-back-button-component' ) ).toBeNull();

			expect( screen.queryByTestId( 'onboarding-button' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'onboarding-button' ) ).toHaveTextContent( buttonText );
			expect( screen.getByText( buttonText ) ).toBeDefined();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'When we go to the next slide on OnBoarding screen', () => {
		beforeEach( () => {
			jest.clearAllMocks();
			setUp( { page: 1 } );
		} );
		it( 'renders the next OnBoarding slide correctly', () => {
			const buttonText = 'Next';

			expect( screen.queryByTestId( 'onBoarding-screen' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'back-button-container' ) ).not.toBeNull();

			expect( screen.queryByTestId( 'navigation-bar-without-back-button-component' ) ).toBeNull();
			expect( screen.queryByTestId( 'navigation-bar-with-back-button-component' ) ).not.toBeNull();

			expect( screen.queryByTestId( 'onboarding-button' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'onboarding-button' ) ).toHaveTextContent( buttonText );
			expect( screen.getByText( buttonText ) ).toBeDefined();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'When we go to the last slide on OnBoarding screen', () => {
		beforeEach( () => {
			jest.clearAllMocks();
			setUp( { page: ( ONBOARDING_SLIDES.length - 1 ) } );
		} );
		it( 'renders the last OnBoarding slide correctly', () => {
			const buttonText = 'Let\'s go!';

			expect( screen.queryByTestId( 'onBoarding-screen' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'back-button-container' ) ).not.toBeNull();

			expect( screen.queryByTestId( 'navigation-bar-without-back-button-component' ) ).toBeNull();
			expect( screen.queryByTestId( 'navigation-bar-with-back-button-component' ) ).not.toBeNull();

			expect( screen.queryByTestId( 'onboarding-button' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'onboarding-button' ) ).toHaveTextContent( buttonText );
			expect( screen.getByText( buttonText ) ).toBeDefined();

			expect( screen ).toMatchSnapshot();
		} );
	} );
} );
