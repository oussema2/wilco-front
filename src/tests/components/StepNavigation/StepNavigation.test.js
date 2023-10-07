import * as React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import StepNavigation from '../../../components/StepNavigation/StepNavigation';

afterEach( cleanup );

describe( 'StepNavigation', () => {
	const testID = 'StepNavigation-testID';

	describe( 'with the default props', () => {
		it( 'renders the StepNavigation component correctly', () => {
			const component = render(
				<StepNavigation
					testID={testID}
					currentStep={0}
				>
					<View testID="step_one"><Text>Step one</Text></View>
					<View testID="step_two"><Text>Step two</Text></View>
				</StepNavigation>
			);

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
