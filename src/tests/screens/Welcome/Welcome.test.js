import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useWelcomeWireframe from '../../../wireframes/useWelcomeWireframe';
import Welcome from '../../../screens/Welcome/Welcome';

describe( 'Welcome', () => {
	let screen;
	const termsAndPrivacyText = 'By creating an account you are agreeing to our Terms of Service and Privacy Policy';
	const termsOfServiceText = 'Terms of Service';
	const privacyPolicyText = 'Privacy Policy';

	const setUp = ( view = {} ) => {
		mockUseView(
			useWelcomeWireframe,
			{
				...view
			}
		);

		screen = render( <Welcome /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the Welcome screen correctly', () => {
		expect( screen.queryByTestId( 'welcome-screen' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'logo-image' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'button-sign-up' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'button-log-in' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'privacy-policy-text' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'privacy-policy-text' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'terms-service-link' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'privacy-policy-link' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'privacy-policy-text' ) ).toHaveTextContent( termsAndPrivacyText );
		expect( screen.queryByTestId( 'terms-service-link' ) ).toHaveTextContent( termsOfServiceText );
		expect( screen.queryByTestId( 'privacy-policy-link' ) ).toHaveTextContent( privacyPolicyText );

		expect( screen ).toMatchSnapshot();
	} );
} );
