import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { SelectableListItem } from '../SelectableListItem';
import { HorizontalPadding } from '../HorizontalPadding';
import { styles } from './ExpansionPanel.styles';

const ExpansionPanel = ( {
	testID, bar, data, renderItem, keyExtractor, selectedItemKey, onItemSelected
} ) => {
	const hasSelectedItem = !!data.find( ( item ) => keyExtractor( item ) === selectedItemKey );

	const [ expanded, setExpanded ] = useState( hasSelectedItem );

	useEffect( () => {
		if ( hasSelectedItem )setExpanded( hasSelectedItem );
	}, [ hasSelectedItem ] );

	const accordionContent = (
		<ListItem.Content>
			<HorizontalPadding>
				{bar}
			</HorizontalPadding>
		</ListItem.Content>
	);

	const selectableList = data.map( ( item ) => {
		const itemKey = keyExtractor( item );
		const isSelected = itemKey === selectedItemKey;
		return (
			<SelectableListItem
				key={itemKey}
				itemKey={itemKey}
				item={item}
				isSelected={isSelected}
				onItemSelected={onItemSelected}
				renderItem={renderItem}
			/>
		);
	} );

	return (
		<ListItem.Accordion
			testID={testID}
			content={accordionContent}
			isExpanded={expanded}
			onPress={() => setExpanded( !expanded )}
			style={styles.accordion}
			containerStyle={styles.accordionContainer}
			underlayColor="transparent"
			animation={{ type: 'spring', duration: 0 }}
		>
			{ expanded && selectableList }
		</ListItem.Accordion>
	);
};

ExpansionPanel.propTypes = {
	testID: PropTypes.string,
	bar: PropTypes.node.isRequired,
	data: PropTypes.arrayOf( PropTypes.any ).isRequired,
	renderItem: PropTypes.func.isRequired,
	keyExtractor: PropTypes.func.isRequired,
	selectedItemKey: PropTypes.any,
	onItemSelected: PropTypes.func
};

ExpansionPanel.defaultProps = {
	testID: 'expansionPanel-component',
	selectedItemKey: null,
	onItemSelected: () => {}
};

export default ExpansionPanel;
