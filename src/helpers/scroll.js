import { SCROLL_T0_TIMEOUT_DEFAULT } from '../constants/theme';

export function scrollToTop( ref ) {
	ref.current?.scrollToOffset( { animated: true, offset: 0 } );
}

export const scrollTo = ( { ref, positionY, timeout = SCROLL_T0_TIMEOUT_DEFAULT } ) => {
	setTimeout( () => {
		ref?.current?.scrollTo( { y: positionY, animated: true } );
	}, timeout );
};

export const onLayout = ( event, setPositionY ) => {
	const { layout } = event.nativeEvent;
	setPositionY( layout.y );
};
