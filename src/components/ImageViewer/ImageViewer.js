import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { styles } from './ImageViewer.styles';
import { Pagination } from '../Pagination';

const ImageViewer = ( {
	index, items, visible, onClosePress
} ) => {
	const [ localIndex, setLocalIndex ] = useState( index );

	let renderFooter = ( { imageIndex } ) => (
		items.length > 1 && (
			<View style={styles.dotContainer}>
				<Pagination length={items.length} activeIndex={imageIndex} />
			</View>
		)
	);

	return (
		<ImageView
			images={items}
			imageIndex={index}
			visible={visible}
			onRequestClose={() => onClosePress( localIndex )}
			FooterComponent={renderFooter}
			onImageIndexChange={( _index ) => setLocalIndex( _index )}
			presentationStyle="fullScreen"
			doubleTapToZoomEnabled
		/>
	);
};

ImageViewer.propTypes = {
	index: PropTypes.number,
	items: PropTypes.any,
	visible: PropTypes.bool,
	onClosePress: PropTypes.func
};

ImageViewer.defaultProps = {
	index: 0,
	items: [],
	visible: false,
	onClosePress: () => {}
};

export default observer( ImageViewer );
