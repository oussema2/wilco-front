---
to: src/tests/components/<%=Name%>/<%=Name%>.test.js
---

import React from 'react';
import { render } from '@testing-library/react-native';
import { <%=Name%> } from '../../../components/<%=Name%>';

describe( '<<%=Name%> />', () => {
	let component;
	const testID = 'testing-<%=Name%>-Component';

	const setUp = () => {
		component = render( <<%=Name%> testID={testID}/> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the <%=Name%> component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
