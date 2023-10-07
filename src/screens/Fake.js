import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { View, Text } from 'react-native';

const styles = {
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
};

const Fake = ( { title } ) => (
	<View testID="fake-view" style={styles}>
		<Text testID="fake-text">
			{title}
		</Text>
	</View>
);

Fake.propTypes = {
	title: PropTypes.string
};

Fake.defaultProps = {
	title: ''
};

export default observer( Fake );
