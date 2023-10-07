import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../Home.styles';
import noop from '../../../helpers/noop';
import { FilterList } from '../../../components/FilterList';

const Filters = ( {
	hasAnyTag, hasAnyHashtag, tags, hashtags, onRemoveTagPress, onRemoveHashtagPress
} ) => (
	<View style={{ flexDirection: 'row' }}>
		{ ( hasAnyTag || hasAnyHashtag ) && (
			<View style={styles.filterItemsContainer}>
				<FilterList
					tags={tags}
					hashtags={hashtags}
					onRemoveTagPress={onRemoveTagPress}
					onRemoveHashtagPress={onRemoveHashtagPress}
				/>
			</View>
		)}
	</View>

);

Filters.propTypes = {
	hasAnyTag: PropTypes.bool,
	hasAnyHashtag: PropTypes.bool,
	tags: PropTypes.arrayOf( PropTypes.string ),
	hashtags: PropTypes.arrayOf( PropTypes.string ),
	onRemoveTagPress: PropTypes.func,
	onRemoveHashtagPress: PropTypes.func
};

Filters.defaultProps = {
	hasAnyTag: false,
	hasAnyHashtag: false,
	tags: [],
	hashtags: [],
	onRemoveTagPress: noop,
	onRemoveHashtagPress: noop
};

export default Filters;
