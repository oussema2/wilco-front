import React from 'react';
import {
	View, Image, Pressable
} from 'react-native';
import PropTypes from 'prop-types';
import { HIT_SLOP } from '../../constants/theme';
import { chevronLeft } from '../../assets/icons';
import { styles } from './NavigationBar.styles';

const BackArrow = ( { backArrowOnPress } ) => {
	if ( !backArrowOnPress ) return <View style={styles.backArrowPlaceholder} />;
	return (
		<Pressable onPress={backArrowOnPress} hitSlop={HIT_SLOP}>
			<Image testID="backArrow-image" style={styles.backArrow} source={chevronLeft} />
		</Pressable>
	);
};

BackArrow.propTypes = {
	backArrowOnPress: PropTypes.func
};

BackArrow.defaultProps = {
	backArrowOnPress: null
};

export default BackArrow;
