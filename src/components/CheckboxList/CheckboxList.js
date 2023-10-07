import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { styles } from './CheckboxList.styles';
import { checkbox, checkboxUnselected } from '../../assets/icons';
import SelectMultiple from '../SelectMultiple/SelectMultiple';

const CheckboxList = ( {
	testID, items, selectedItems, onSelectionsChange, ParentComponent
} ) => (
	<View testID={testID}>
		<SelectMultiple
			items={items}
			rowStyle={styles.row}
			checkboxSource={checkboxUnselected}
			selectedCheckboxSource={checkbox}
			checkboxStyle={styles.checkbox}
			style={styles.selectMultiple}
			labelStyle={styles.label}
			selectedLabelStyle={styles.selectedLabel}
			selectedItems={selectedItems}
			onSelectionsChange={onSelectionsChange}
			selectedCheckboxStyle={styles.selectedCheckbox}
			ParentComponent={ParentComponent}
		/>
	</View>
);

CheckboxList.propTypes = {
	testID: PropTypes.string,
	items: PropTypes.arrayOf( PropTypes.any ).isRequired,
	selectedItems: PropTypes.arrayOf( PropTypes.any ).isRequired,
	onSelectionsChange: PropTypes.func.isRequired,
	ParentComponent: PropTypes.elementType
};

CheckboxList.defaultProps = {
	testID: 'CheckboxList-Component',
	ParentComponent: View
};

export default observer( CheckboxList );
