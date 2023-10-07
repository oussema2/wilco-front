---
to: src/tests/entities/<%=Name%>.test.js
---

import <%=Name%> from '../../entities/<%=Name%>';
import <%=Name%>Factory from '../factories/<%=Name%>Factory';

describe( '<%=Name%> entity', () => {
	describe( 'fromJSON', () => {
		const <%=h.changeCase.lcFirst(name)%>JSON = { id: 1 };

		const <%=h.changeCase.lcFirst(name)%> = <%=Name%>.fromJSON( <%=h.changeCase.lcFirst(name)%>JSON );

		it( 'creates the <%=h.changeCase.lcFirst(name)%> with the correct properties', () => {
			expect( <%=h.changeCase.lcFirst(name)%>.id ).toEqual( 1 );
		} );
	} );

	describe( 'toJSON', () => {
		const <%=h.changeCase.lcFirst(name)%> = <%=Name%>Factory.build();
		const json = <%=h.changeCase.lcFirst(name)%>.toJSON();

		it( 'returns the <%=h.changeCase.lcFirst(name)%>\'s json', () => {
			expect( json ).toEqual( {
				id: <%=h.changeCase.lcFirst(name)%>.id
			} );
		} );
	} );
} );
