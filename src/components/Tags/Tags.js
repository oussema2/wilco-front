import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from './Tags.styles';
import TagItem from './components/TagItem';

const Tags = ( {
	testID, items, containerStyle, onRemove
} ) => (
	<View testID={testID}>
		<View style={[ styles.container, containerStyle ]}>
			{items.map( ( tag, index ) => (
				<TagItem testID={`item${index}-testID`} key={tag} onRemove={onRemove} tag={tag} />
			) )}
		</View>
	</View>
);

Tags.propTypes = {
	testID: PropTypes.string,
	items: PropTypes.arrayOf( PropTypes.any ),
	containerStyle: PropTypes.instanceOf( Object ),
	onRemove: PropTypes.func
};

Tags.defaultProps = {
	testID: 'tags-component',
	items: [],
	containerStyle: {},
	onRemove: null
};

export default observer( Tags );
