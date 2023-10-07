import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import { NavigationBar } from '../../../components/NavigationBar';
import { settings } from '../../../assets/icons';

afterEach( cleanup );

describe( 'NavigationBar', () => {
	let component;
	const onBackArrowPress = jest.fn();
	const onTitlePress = jest.fn();
	const onRightImagePress = jest.fn();
	const onRightTextPress = jest.fn();
	const rightImage = settings;
	const rightText = 'right Text';
	const title = 'Title';
	const testID = 'testing-navigationBar-component';

	const setUp = ( props ) => {
		jest.clearAllMocks();
		component = render(
			<NavigationBar onBackArrowPress={onBackArrowPress} title={title} testID={testID} {...props} />
		);
	};

	describe( 'with the default props', () => {
		it( 'renders the NavigationBar component correctly', () => {
			setUp();

			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( 'backArrow-image' ) ).toBeDefined();
			expect( component.queryByTestId( 'title-text' ) ).toHaveTextContent( title );
			expect( component.queryByTestId( 'rightPlaceholder-view' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'without a onBackArrowPress', () => {
		it( 'does not render the back arrow icon', () => {
			setUp( { onBackArrowPress: null } );

			expect( component.queryByTestId( 'backArrow-image' ) ).toBeNull();
		} );
	} );

	describe( 'with a onRightImagePress and rightImage', () => {
		it( 'renders the right icon', () => {
			setUp( { rightAction: { onPress: onRightImagePress, image: rightImage } } );

			expect( component.queryByTestId( 'rightIcon-testID' ) ).not.toBeNull();
		} );
	} );

	describe( 'without a onRightImagePress', () => {
		it( 'does not render the right icon', () => {
			setUp( { rightAction: { image: rightImage } } );

			expect( component.queryByTestId( 'rightIcon-testID' ) ).toBeNull();
		} );
	} );

	describe( 'without a rightImage', () => {
		it( 'does not render the right icon', () => {
			setUp( { rightAction: { onPress: onRightImagePress } } );

			expect( component.queryByTestId( 'rightIcon-testID' ) ).toBeNull();
		} );
	} );

	describe( 'with a onTitlePress', () => {
		it( 'renders the title correctly', () => {
			setUp( { onTitlePress } );
			expect( component.queryByTestId( 'title-text' ) ).toHaveTextContent( title );
		} );

		it( 'calls to onTitlePress when press the title', () => {
			setUp( { onTitlePress } );

			fireEvent.press( component.queryByTestId( 'title-text' ) );
			expect( onTitlePress ).toHaveBeenCalled();
		} );
	} );

	describe( 'without a onTitlePress', () => {
		it( 'renders the title correctly', () => {
			setUp( { onTitlePress } );
			expect( component.queryByTestId( 'title-text' ) ).toHaveTextContent( title );
		} );
	} );

	describe( 'with a rightText', () => {
		it( 'renders the NavigationBar correctly', () => {
			setUp( { rightAction: { onPress: onRightTextPress, text: rightText } } );
			expect( component.queryByTestId( 'rightText-testID' ) ).toHaveTextContent( rightText );
		} );
	} );

	describe( 'with a onRightTextPress', () => {
		it( 'calls to onRightTextPress when press the rightText', () => {
			setUp( { rightAction: { onPress: onRightTextPress, text: rightText, image: null } } );

			fireEvent.press( component.queryByTestId( 'onRightTextPress-testID' ) );
			expect( onRightTextPress ).toHaveBeenCalled();
		} );
	} );
} );
