import * as React from 'react';
import { render } from '@testing-library/react-native';
import CommentHeaderView from '../../../components/HeaderView/CommentHeaderView';

describe( 'CommentHeaderView', () => {
	const testID = 'testing-headerView-component';
	const pilotName = 'A pilot name';
	const dateToDisplay = '4h';

	it( 'renders the headerView', () => {
		const component = render(
			<CommentHeaderView
				testID={testID}
				pilotName={pilotName}
				dateToDisplay={dateToDisplay}
			/>
		);

		expect( component.queryByTestId( testID ) ).toBeDefined();
		expect( component.queryByText( dateToDisplay ) ).not.toBeNull();
		expect( component ).toMatchSnapshot();
	} );
} );
