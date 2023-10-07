import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import SignUp from '../../../screens/SignUp/SignUp';
import * as useSignUpWireframe from '../../../wireframes/useSignUpWireframe';
import Form from '../../../forms/Form';
import { fieldsFirstStep, fieldsSecondStep } from '../../../forms/signUpFields';
import mockUseModalService from '../../mocks/mockUseModalService';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'SignUp', () => {
	let screen;
	const title = 'Sign up title';
	const buttonFirstStepTitle = 'Next';
	const buttonSecondStepTitle = 'Create account';
	const formFirstStep = new Form( { fields: fieldsFirstStep } );
	const formSecondStep = new Form( { fields: fieldsSecondStep } );
	const currentStep = 0;
	const isLoading = false;
	const rolesSelectionPresenter = {
		isRolesSelectionModalVisible: false
	};
	mockUseModalService();

	const setUp = ( view = {} ) => {
		mockUseView(
			useSignUpWireframe,
			{
				title,
				formFirstStep,
				formSecondStep,
				currentStep,
				isLoading,
				rolesSelectionPresenter,
				...view
			} );

		screen = render( <SignUp /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the first Step of SignUp screen correctly', async () => {
		expect( screen.queryByTestId( 'signUpFirstStep-button' ) ).toHaveTextContent( buttonFirstStepTitle );
		expect( screen.queryByTestId( 'first-name-input' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'last-name-input' ) ).not.toBeNull();

		expect( screen ).toMatchSnapshot();
	} );

	describe( 'when the goes to the second step', () => {
		beforeEach( () => {
			setUp( { currentStep: 1 } );
		} );

		it( 'renders the second Step of SignUp screen correctly', async () => {
			expect( screen.queryByTestId( 'signUpSecondStep-button' ) ).toHaveTextContent( buttonSecondStepTitle );
			expect( screen.queryByTestId( 'email-input' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'password-input' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	// TODO: fix this test so that it adapts to the validation on blur.

	// eslint-disable-next-line jest/no-commented-out-tests
	// describe( 'when the form has validation errors', () => {
	// 	eslint-disable-next-line jest/no-commented-out-tests
	// 	it( 'shows the messages of the errors', async () => {
	// 		const emailInput = screen.queryAllByTestId( 'input' )[ 0 ];
	// 		const passwordInput = screen.queryAllByTestId( 'input' )[ 1 ];
	// 		const firstName = screen.queryAllByTestId( 'input' )[ 2 ];
	// 		const lastName = screen.queryAllByTestId( 'input' )[ 3 ];

	// 		await act( async () => {
	// 			fireEvent( emailInput, 'change', 'invalid email' );
	// 			fireEvent( passwordInput, 'change', 'short' );
	// 			fireEvent( firstName, 'change', 'something' );
	// 			fireEvent( firstName, 'change', '' );
	// 			fireEvent( lastName, 'change', 'something' );
	// 			fireEvent( lastName, 'change', '' );
	// 		} );

	// 		expect( screen.queryByText( 'This email does not have a valid format.' ) ).not.toBeNull();
	//		eslint-disable-next-line max-len
	// 		expect( screen.queryByText( 'Password must be at least 8 characters long.' ) ).not.toBeNull();
	// 		expect( screen.queryAllByText( 'This field is mandatory.' ).length ).toEqual( 2 );
	// 	} );
	// } );

	describe( 'when the view is loading', () => {
		beforeEach( () => {
			setUp( { isLoading: true } );
		} );

		it( 'renders the screen loader', () => {
			expect( screen.queryByTestId( 'screenLoader' ) ).not.toBeNull();
		} );
	} );
} );
