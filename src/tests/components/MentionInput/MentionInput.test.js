import React from 'react';
import { render } from '@testing-library/react-native';
import { MentionInput } from '../../../components/MentionInput';
import * as useMentionInputWireframe from '../../../wireframes/useMentionInputWireframe';
import mockUseView from '../../mocks/mockUseView';

jest.useFakeTimers();

describe( '<MentionInput />', () => {
	let component;
	const testID = 'testing-MentionInput-Component';
	const hasKeyboard = jest.fn();

	const setUp = ( props ) => {
		mockUseView(
			useMentionInputWireframe,
			{ hasKeyboard }
		);

		component = render( <MentionInput
			testID={testID}
			{...props}
		/> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the MentionInput component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( 'pilotSuggestions-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'hashtagSuggestions-testID' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a capitalizeFirstLetter', () => {
		it( 'renders the MentionInput component correctly', () => {
			setUp( { capitalizeFirstLetter: true } );

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
