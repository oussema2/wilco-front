---
to: src/tests/interactors/<%=Name%>.test.js
---

import <%=Name%> from '../../interactors/<%=Name%>';

describe( '<%=Name%>', () => {
	let <%=name%>;

	beforeEach( () => {
		jest.clearAllMocks();
		<%=name%> = new <%=Name%>();
	} );

	describe( '@execute()', () => {
		it.todo( '' );
	} );
} );
