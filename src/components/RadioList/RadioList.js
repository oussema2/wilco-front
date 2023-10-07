import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	Pressable, View, FlatList, Text
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { Icon } from 'react-native-elements';
import { styles } from './Radio.styles';
import { palette } from '../../Theme';

const RadioList = ( {
	testID, options, value, onChange
} ) => {
	const keyExtractor = useCallback(
		( { value: itemValue } ) => itemValue,
		[]
	);

	const renderItemRow = ( { item: { label: itemLabel, value: itemValue } } ) => {
		const isSelected = itemValue === value;

		const radioButtonIcon = isSelected ? 'dot-circle-o' : 'circle-o';
		const radioButtonColor = isSelected ? palette.primary.darkCyan : palette.grayscale.aluminum;

		return (
			<Pressable testID={`row-${itemValue}-testID`} onPress={() => onChange( itemValue )}>
				<View style={styles.row}>
					<Icon
						name={radioButtonIcon}
						type="font-awesome"
						color={radioButtonColor}
						style={styles.radioButton}
						iconStyle={{ fontWeight: 100 }}
					/>
					<View style={styles.labelContainer}>
						<Text numberOfLines={1} style={styles.label}>{itemLabel}</Text>
					</View>
				</View>
			</Pressable>
		);
	};

	return (
		<FlatList
			testID={testID}
			style={styles.list}
			keyExtractor={keyExtractor}
			data={options}
			renderItem={renderItemRow}
		/>
	);
};

const ItemPropType = PropTypes.shape( {
	label: PropTypes.string,
	value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] )
} );

RadioList.propTypes = {
	testID: PropTypes.string,
	options: PropTypes.arrayOf( ItemPropType ).isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

RadioList.defaultProps = {
	testID: 'RadioList-Component',
	value: undefined
};

export default observer( RadioList );
