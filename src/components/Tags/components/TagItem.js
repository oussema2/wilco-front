import React, { useState } from 'react';
import {
	Dimensions, Text, TouchableOpacity, View
} from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from '../Tags.styles';
import { remove } from '../../../assets/icons';
import { Image } from '../../Image';
import { dimensions } from '../../../Theme';

const TagItem = ( {
	onRemove, tag, testID
} ) => {
	const [ showFullScreenTag, setShowFullScreenTag ] = useState( false );

	const onViewLayout = ( e ) => {
		const layoutWidth	= e.nativeEvent.layout.width;
		const horizontalPadding = dimensions.horizontalPadding * 2;
		const screenWidth =	Dimensions.get( 'window' ).width - horizontalPadding;
		if ( layoutWidth >= screenWidth ) setShowFullScreenTag( true );
	};

	return (
		<View onLayout={onViewLayout} style={styles.textWithIcon} testID={testID}>
			<View style={( showFullScreenTag ? { flex: 1 } : null )}>
				<Text style={styles.text} numberOfLines={1} testID={`text-${testID}`}>
					{tag}
				</Text>
			</View>
			{ onRemove && (
				<TouchableOpacity onPress={() => onRemove( tag )} testID={`remove-${testID}`}>
					<Image source={remove} style={styles.removeIcon} />
				</TouchableOpacity>
			) }
		</View>
	);
};

TagItem.propTypes = {
	testID: PropTypes.string.isRequired,
	onRemove: PropTypes.func,
	tag: PropTypes.string.isRequired
};

TagItem.defaultProps = {
	onRemove: null
};

export default observer( TagItem );
