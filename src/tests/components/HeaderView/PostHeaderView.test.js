import * as React from 'react';
import { render } from '@testing-library/react-native';
import PostHeaderView from '../../../components/HeaderView/PostHeaderView';

describe( 'PostHeaderView', () => {
	const testID = 'testing-headerView-component';
	const pilotName = 'A pilot name';
	const dateToDisplay = '4h';

	it( 'renders the headerView', () => {
		const component = render(
			<PostHeaderView
				testID={testID}
				pilotName={pilotName}
				dateToDisplay={dateToDisplay}
			/>
		);

		expect( component.queryByTestId( testID ) ).toBeDefined();
		expect( component.queryByText( pilotName ) ).not.toBeNull();
		expect( component.queryByText( dateToDisplay ) ).not.toBeNull();
		expect( component ).toMatchSnapshot();
	} );
} );
