---
to: src/components/<%=Name%>/<%=Name%>.js
---

import React from 'react';
import { } from 'react-native';
import PropTypes from 'prop-types';

import { styles } from './<%= Name %>.styles';

const <%= Name %> = ( { testID } ) => {

	return (
		<>
		</>
	);
};

<%= Name %>.propTypes = {
	testID: PropTypes.string
};

<%= Name %>.defaultProps = {
	testID: '-Component'
};

export default <%= Name %>;

