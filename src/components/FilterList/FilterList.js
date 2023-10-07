import React from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import FilterItem from './components/FilterItem';
import { styles } from './FilterList.styles';
import noop from '../../helpers/noop';

const FilterList = ( {
	testID, tags, hashtags, onRemoveTagPress, onRemoveHashtagPress
} ) => (
	<View testID={testID}>

		<View style={styles.container}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<View style={styles.tagItemSeparator} />
				{hashtags.map( ( tag, index ) => (
					<FilterItem testID={`item${index}-hashtag-testID`} key={tag} onRemove={onRemoveHashtagPress} tag={`#${tag}`} />
				) )}
				{tags.map( ( tag, index ) => (
					<FilterItem testID={`item${index}-tag-testID`} key={tag} onRemove={onRemoveTagPress} tag={tag} />
				) )}
			</ScrollView>
		</View>

	</View>
);

FilterList.propTypes = {
	testID: PropTypes.string,
	tags: PropTypes.arrayOf( PropTypes.any ),
	hashtags: PropTypes.arrayOf( PropTypes.any ),
	onRemoveTagPress: PropTypes.func,
	onRemoveHashtagPress: PropTypes.func
};

FilterList.defaultProps = {
	testID: 'tags-component',
	tags: [],
	hashtags: [],
	onRemoveTagPress: noop,
	onRemoveHashtagPress: noop
};

export default observer( FilterList );
