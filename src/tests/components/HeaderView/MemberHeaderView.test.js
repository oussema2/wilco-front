import * as React from 'react';
import { render } from '@testing-library/react-native';
import MemberHeaderView from '../../../components/HeaderView/MemberHeaderView';

describe( 'MemberHeaderView', () => {
	const testID = 'testing-headerView-component';
	const pilotName = 'A pilot name';
	const primaryAircraftMakeAndModel = 'Cessna 1234';
	const homeAirport = '4h';

	it( 'renders headerView', () => {
		const component = render(
			<MemberHeaderView
				testID={testID}
				pilotName={pilotName}
				primaryAircraftMakeAndModel={primaryAircraftMakeAndModel}
				homeAirport={homeAirport}
			/>
		);

		expect( component.queryByTestId( testID ) ).toBeDefined();
		expect( component.queryByText( pilotName ) ).not.toBeNull();
		expect( component ).toMatchSnapshot();
	} );
} );
