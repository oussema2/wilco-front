import React from 'react';
import { View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { defaultStyle, selectedStyle } from './SelectableListItem.styles';

const SelectableListItem = ( {
	testID, item, itemKey, isSelected, onItemSelected, renderItem
} ) => {
	let styles = defaultStyle;
	if ( isSelected ) { styles = { ...styles, ...selectedStyle }; }

	const onPress = () => onItemSelected( itemKey );
	return (
		<View testID={testID} style={styles.itemContainer}>
			<Pressable style={styles.innerItemContainer} onPress={onPress}>
				{renderItem( item, isSelected, onPress )}
			</Pressable>
		</View>
	);
};

SelectableListItem.propTypes = {
	testID: PropTypes.string,
	isSelected: PropTypes.bool,
	onItemSelected: PropTypes.func,
	renderItem: PropTypes.func.isRequired,
	item: PropTypes.any,
	itemKey: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number
	] ).isRequired
};

SelectableListItem.defaultProps = {
	testID: 'selectableListItem-Component',
	isSelected: false,
	onItemSelected: () => {},
	item: {}
};

export default SelectableListItem;
