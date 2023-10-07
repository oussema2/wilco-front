import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import HeaderView from '../../../components/HeaderView/HeaderView';
import { chatNewMessage } from '../../../assets/icons';

describe( 'HeaderView', () => {
	const testID = 'testing-headerView-component';
	const pilotName = 'A pilot name';
	const bodyInfo = '4h';

	describe( 'with options on press', () => {
		const optionsOnPress = jest.fn();

		it( 'renders the options icon', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					bodyInfo={bodyInfo}
					optionsOnPress={optionsOnPress}
				/>
			);

			expect( component.queryByTestId( 'options-image' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'without options on press', () => {
		it( 'doesn\'t render the options icon', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					bodyInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'options-image' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a star next to the pilot name', () => {
		it( 'renders the star icon correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					showStar
					bodyInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'star-image' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'without a star next to the pilot name', () => {
		it( 'doesn\'t render the star icon', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					showStar={false}
					bodyInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'star-image' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a titleInfo', () => {
		it( 'renders the title info correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					titleInfo="title info"
					bodyInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'titleInfo-Text' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'without a titleInfo', () => {
		it( 'doesn\'t render the title info', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					bodyInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'titleInfo-Text' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a titleExtraInfo', () => {
		it( 'renders the title extra info correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					titleExtraInfo="title extra info"
					bodyInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'titleExtraInfo-text' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'without a titleExtraInfo', () => {
		it( 'doesn\'t render the title extra info', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					bodyInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'titleExtraInfo-text' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the variant is small', () => {
		it( 'renders the component correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					variant="small"
				/>
			);

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with only body info', () => {
		it( 'renders the component correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					bodyInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'bodySecondaryInfoSeparator-Text' ) ).toBeNull();
			expect( component.queryByTestId( 'bodyTertiaryInfoSeparator-Text' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with only body secondary info', () => {
		it( 'renders the component correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					bodySecondaryInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'bodySecondaryInfoSeparator-Text' ) ).toBeNull();
			expect( component.queryByTestId( 'bodyTertiaryInfoSeparator-Text' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with body info and secondary info', () => {
		it( 'renders the component correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					bodyInfo={bodyInfo}
					bodySecondaryInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'bodySecondaryInfoSeparator-Text' ) ).not.toBeNull();
			expect( component.queryByTestId( 'bodyTertiaryInfoSeparator-Text' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with body info, secondary info, tertiary info and quaternary info', () => {
		it( 'renders the component correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					bodyInfo={bodyInfo}
					bodySecondaryInfo={bodyInfo}
					bodyTertiaryInfo={bodyInfo}
					bodyQuaternaryInfo={bodyInfo}
				/>
			);

			expect( component.queryByTestId( 'bodySecondaryInfoSeparator-Text' ) ).not.toBeNull();
			expect( component.queryByTestId( 'bodyTertiaryInfoSeparator-Text' ) ).not.toBeNull();
			expect( component.queryByTestId( 'QuaternaryInfo-text' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'without body info, body secondary info, body tertiary info or body quaternary info', () => {
		it( 'renders the component correctly', () => {
			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
				/>
			);

			expect( component.queryByTestId( 'bodySecondaryInfoSeparator-Text' ) ).toBeNull();
			expect( component.queryByTestId( 'bodyTertiaryInfoSeparator-Text' ) ).toBeNull();
			expect( component.queryByTestId( 'QuaternaryInfo-text' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with right action', () => {
		it( 'renders the component correctly', () => {
			const mockOnPress = jest.fn();

			const component = render(
				<HeaderView
					testID={testID}
					pilotName={pilotName}
					rightAction={{
						imageSource: chatNewMessage,
						onPress: mockOnPress
					}}
				/>
			);

			fireEvent.press( component.queryByTestId( 'right-component-pressable' ) );
			expect( mockOnPress ).toHaveBeenCalledTimes( 1 );

			expect( component.queryByTestId( 'right-component' ) ).not.toBeNull();
			expect( component.queryByTestId( 'right-component-image' ) ).not.toBeNull();
			expect( component.queryByTestId( 'right-component-pressable' ) ).not.toBeNull();
		} );
	} );
} );
