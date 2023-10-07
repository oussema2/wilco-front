---
to: src/tests/services/<%=Name%>Service.test.js
---

import <%=Name%>Service from '../../services/<%=Name%>Service';

describe( '<%=Name%>Service', () => {
	let <%=h.changeCase.lcFirst(name)%>Service;

	beforeEach( () => {
		<%=h.changeCase.lcFirst(name)%>Service = new <%=Name%>Service();
	} );
} );
