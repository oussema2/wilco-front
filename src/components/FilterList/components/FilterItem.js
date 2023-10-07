import React from 'react';
import {
	Text, TouchableOpacity, View
} from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from '../FilterList.styles';
import { remove } from '../../../assets/icons';
import { Image } from '../../Image';
import { truncate } from '../../../helpers/strings';

const FilterItem = ( {
	onRemove, tag, testID
} ) => (
	<View style={styles.textWithIcon} testID={testID}>
		<View style={{ justifyContent: 'center' }}>
			<Text style={styles.text} numberOfLines={1} testID={`text-${testID}`}>
				{truncate( tag, 16 )}
			</Text>
		</View>
		<TouchableOpacity onPress={() => onRemove( tag )} testID={`remove-${testID}`} style={{ justifyContent: 'center' }}>
			<Image source={remove} style={styles.removeIcon} tintColor="black" />
		</TouchableOpacity>
	</View>
);

FilterItem.propTypes = {
	testID: PropTypes.string.isRequired,
	onRemove: PropTypes.func,
	tag: PropTypes.string.isRequired
};

FilterItem.defaultProps = {
	onRemove: () => {}
};

export default observer( FilterItem );
