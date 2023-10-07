import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Pagination as NativePagination } from 'react-native-snap-carousel';
import { styles } from './Pagination.styles';

const Pagination = ( {
	testID, length, activeIndex
} ) => (
	<View testID={testID}>
		<NativePagination
			dotsLength={length}
			activeDotIndex={activeIndex}
			containerStyle={styles.container}
			dotContainerStyle={styles.dotContainer}
			dotStyle={styles.dot}
			inactiveDotStyle={styles.inactiveDot}
			inactiveDotOpacity={1}
			inactiveDotScale={1}
		/>
	</View>
);

Pagination.propTypes = {
	testID: PropTypes.string,
	length: PropTypes.number,
	activeIndex: PropTypes.number
};

Pagination.defaultProps = {
	testID: 'pagination-testID',
	length: 0,
	activeIndex: 0
};

export default Pagination;
