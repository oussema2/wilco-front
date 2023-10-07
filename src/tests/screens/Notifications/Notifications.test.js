import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useNotificationsWireframe from '../../../wireframes/useNotificationsWireframe';
import Notifications from '../../../screens/Notifications/Notifications';
import NotificationFactory from '../../factories/NotificationFactory';

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn()
} ) );

describe( 'Notifications', () => {
	let screen;
	const onRefresh = jest.fn();

	const setUp = ( view = {}, notifications = [],
		isLoading = true, isRefreshing = false, mustShowEmptyState = false, tabIndex = 0 ) => {
		mockUseView(
			useNotificationsWireframe,
			{
				notifications,
				isLoading,
				isRefreshing,
				mustShowEmptyState,
				tabIndex,
				onRefresh,
				...view
			}
		);

		screen = render( <Notifications /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'without notifications', () => {
		describe( 'when the app is loading notifications', () => {
			beforeEach( () => {
				setUp( { notifications: [], isLoading: true } );
			} );

			it( 'renders a loading component initially', () => {
				expect( screen.queryAllByTestId( 'activityIndicator-testID' ) ).not.toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'when the app finished to load notifications', () => {
			beforeEach( () => {
				setUp( { notifications: [], isLoading: false, mustShowEmptyState: true } );
			} );

			it( 'renders the Notifications screen correctly', () => {
				expect( screen.queryByText( 'Notifications' ) ).not.toBeNull();
				expect( screen.queryAllByTestId( 'emptyStateContainer-testID' ) ).not.toBeNull();
				expect( screen.queryAllByTestId( 'emptyStateText-testID' ) ).not.toBeNull();
				expect( screen.queryAllByTestId( 'emptyStateImage-testID' ) ).not.toBeNull();
				expect( screen.queryAllByTestId( 'activityIndicator-testID' ) ).toStrictEqual( [] );

				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'with notifications', () => {
		const notifications = NotificationFactory.buildList( 2 );

		beforeEach( () => {
			setUp( { notifications, isLoading: false, mustShowEmptyState: false } );
		} );

		it( 'renders the Notification screen correctly', () => {
			expect( screen.queryByText( 'Notifications' ) ).not.toBeNull();

			expect( screen.queryAllByTestId( 'notification-component' ) ).not.toBeNull();
			expect( screen.queryAllByTestId( 'notifications-flatList' ) ).not.toBeNull();

			expect( screen.queryByTestId( 'emptyStateContainer-testID' ) ).toBeNull();
			expect( screen.queryByTestId( 'emptyStateText-testID' ) ).toBeNull();
			expect( screen.queryByTestId( 'emptyStateImage-testID' ) ).toBeNull();

			expect( screen.queryByTestId( 'activityIndicator-testID' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'when the app is refreshing notifications', () => {
		beforeEach( () => {
			setUp( {
				isLoading: false, isRefreshing: true
			} );
		} );

		it( 'renders the Notifications screen correctly', () => {
			expect( screen.queryByText( 'Notifications' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'activityIndicator-testID' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );
} );
