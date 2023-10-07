import * as React from 'react';
import { render } from '@testing-library/react-native';
import NotificationHeaderView from '../../../components/HeaderView/NotificationHeaderView';
import NotificationPresenter from '../../../presenters/NotificationPresenter';
import NotificationFactory from '../../factories/NotificationFactory';

describe( 'NotificationHeaderView', () => {
	const testID = 'testing-headerView-component';
	const notification = NotificationFactory.build();
	const makeAutoObservable = jest.fn();
	const notificationPresenter = new NotificationPresenter( { notification, makeAutoObservable } );

	it( 'renders the headerView', () => {
		const component = render(
			<NotificationHeaderView
				testID={testID}
				notificationPresenter={notificationPresenter}
			/>
		);

		expect( component.queryByTestId( testID ) ).toBeDefined();
		expect( component.queryByText( notificationPresenter.dateToDisplay ) ).not.toBeNull();
		expect( component ).toMatchSnapshot();
	} );
} );
