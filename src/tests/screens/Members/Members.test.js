import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useMembersWireframe from '../../../wireframes/useMembersWireframe';
import PilotFactory from '../../factories/PilotFactory';
import Members from '../../../screens/Members/Members';

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn()
} ) );

describe( 'Members', () => {
	let screen;
	const screenTitle = 'Members';

	const setUp = ( view = {}, members = [], isLoading = false, isRefreshing = false ) => {
		mockUseView(
			useMembersWireframe,
			{
				members,
				isLoading,
				isRefreshing,
				...view
			}
		);

		screen = render( <Members /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'without members', () => {
		describe( 'when the app is loading members', () => {
			beforeEach( () => {
				setUp( { isLoading: true } );
			} );

			it( 'renders a loading component initially', () => {
				expect( screen.queryByTestId( 'activityIndicator-testID' ) ).not.toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'when the app finished to load members', () => {
			beforeEach( () => {
				setUp( { isLoading: false } );
			} );

			it( 'renders the Members screen correctly', () => {
				expect( screen.queryByTestId( 'members-screen' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'members-flatList' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'member-component' ) ).toBeNull();
				expect( screen.getByText( screenTitle ) ).toBeDefined();
				expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( screenTitle );
				expect( screen.queryByTestId( 'activityIndicator-testID' ) ).toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'with members', () => {
		const members = PilotFactory.buildList( 2 );

		describe( 'when the app is loading members', () => {
			beforeEach( () => {
				setUp( { members, isLoading: true } );
			} );

			it( 'renders a loading component initially', () => {
				expect( screen.queryByTestId( 'activityIndicator-testID' ) ).not.toBeNull();

				expect( screen ).toMatchSnapshot();
			} );

			it( 'hides members from store', () => {
				expect( screen.queryByTestId( 'activityIndicator-testID' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'members-flatList' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'member-component' ) ).toBeNull();
				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'when the app finished to load members', () => {
			beforeEach( () => {
				setUp( { members, isLoading: false } );
			} );

			it( 'renders the Members screen correctly', () => {
				expect( screen.queryByTestId( 'members-screen' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'members-flatList' ) ).not.toBeNull();
				expect( screen.queryAllByTestId( 'member-component' ) ).not.toBeNull();
				expect( screen.getByText( screenTitle ) ).toBeDefined();
				expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( screenTitle );
				expect( screen.queryByTestId( 'activityIndicator-testID' ) ).toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'when the app is refreshing', () => {
		beforeEach( () => {
			setUp( {
				isLoading: false, isRefreshing: true
			} );
		} );

		it( 'renders the PostDetail screen correctly', () => {
			expect( screen.queryByTestId( 'activityIndicator-testID' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );
} );
