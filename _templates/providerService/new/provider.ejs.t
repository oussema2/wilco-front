---
to: src/providers/<%=Name%>Provider.js
---

import React from 'react';
import PropTypes from 'prop-types';
import <%=Name%>Service from '../services/<%=Name%>Service';

const <%=Name%>Context = React.createContext( null );

export const <%=Name%>Provider = ( { children } ) => {
	const <%=h.changeCase.lcFirst(name)%>Service = new <%=Name%>Service();
	return (
		<<%=Name%>Context.Provider value={<%=h.changeCase.lcFirst(name)%>Service}>
			{children}
		</<%=Name%>Context.Provider>
	);
};

<%=Name%>Provider.propTypes = {
	children: PropTypes.node.isRequired
};

export const use<%=Name%>Service = () => React.useContext( <%=Name%>Context );
