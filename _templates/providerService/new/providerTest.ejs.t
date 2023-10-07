---
to: src/tests/providers/<%=Name%>Provider.test.js
---
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import { <%=Name%>Provider, use<%=Name%>Service } from '../../providers/<%=Name%>Provider';
import <%=Name%>Service from '../../services/<%=Name%>Service';

describe( '<<%=Name%>Provider/>', () => {
	let provider;
	const testData = <Text>test-data</Text>;

	const setUp = () => {
		provider = render( <<%=Name%>Provider>{testData}</<%=Name%>Provider> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders children', () => {
		expect( provider.getByText( 'test-data' ) ).toBeDefined();
	} );

	it( 'passes the service as value for the provider', () => {
		const { result } = renderHook( () => use<%=Name%>Service(), {
			wrapper: <%=Name%>Provider
		} );
		expect( result.current ).toBeInstanceOf( <%=Name%>Service );
	} );
} );
