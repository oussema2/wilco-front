import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { observer } from 'mobx-react-lite';
import { Pagination } from '../Pagination';

const OwlCarousel = ( {
	testID, items, renderItem, onWidthSet, setIndex, indexWhenCloseViewer
} ) => {
	const [ screenWidth ] = useState( Dimensions.get( 'window' ).width );
	const [ owlIndex, setOwlIndex ] = useState( 0 );
	const carouselRef = useRef( null );

	useEffect( () => {
		onWidthSet( screenWidth );
	}, [ ] );

	useEffect( () => {
		carouselRef.current.triggerRenderingHack();
	}, [ items ] );

	const _pagination = ( { items: itemsToPaginate } ) => (
		<Pagination length={itemsToPaginate.length} activeIndex={owlIndex} />
	);

	const _setCarouselIndex = ( _index ) => {
		setIndex( _index );
		setOwlIndex( _index );
	};

	return (
		<View testID={testID}>
			<Carousel
				ref={carouselRef}
				data={items}
				renderItem={renderItem}
				onSnapToItem={_setCarouselIndex}
				windowSize={3}
				sliderWidth={screenWidth}
				itemWidth={screenWidth}
				onScrollIndexChanged={_setCarouselIndex}
				firstItem={indexWhenCloseViewer}
			/>
			{ _pagination( { items } ) }
		</View>
	);
};

OwlCarousel.propTypes = {
	testID: PropTypes.string,
	items: PropTypes.arrayOf( PropTypes.any ),
	renderItem: PropTypes.func,
	onWidthSet: PropTypes.func,
	setIndex: PropTypes.func,
	indexWhenCloseViewer: PropTypes.number
};

OwlCarousel.defaultProps = {
	testID: '-Component',
	items: [],
	renderItem: () => {},
	onWidthSet: () => {},
	setIndex: () => {},
	indexWhenCloseViewer: 0
};

export default observer( OwlCarousel );
