import React from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { binoculars } from '../../../assets/icons';
import { styles } from './Placeholder.styles';
import EmptyState from '../../../components/EmptyState/EmptyState';

const Placeholder = ( {
	testID
} ) => (
	<View testID={testID} style={styles.placeholderContainer}>
		<HorizontalPadding style={styles.horizontalPadding}>
			<EmptyState
				testID="placeholder-text"
				source={binoculars}
				imageStyle={styles.image}
				text={'We didn\'t find a post that matches your filter criteria'}
			/>
		</HorizontalPadding>
	</View>
);

Placeholder.propTypes = {
	testID: PropTypes.string
};

Placeholder.defaultProps = {
	testID: 'placeholder-home-screen'
};
export default observer( Placeholder );
