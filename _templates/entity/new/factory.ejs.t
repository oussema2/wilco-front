---
to: src/tests/factories/<%=Name%>Factory.js
---
import { Factory } from 'fishery';
import <%= Name %> from '../../entities/<%= Name %>';

export default Factory.define( ( { sequence } ) => ( new <%= Name %>( {
	id: sequence
} ) ) );
