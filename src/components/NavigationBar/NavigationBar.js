import React from 'react';
import {
	View, Text, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import BackArrow from './BackArrow';
import { Image } from '../Image';
import { SuplementalTitle } from '../SuplementalTitle';
import { styles } from './NavigationBar.styles';
import { palette } from '../../Theme';

const NavigationBar = ( {
	testID, title, onBackArrowPress, onTitlePress, titleComponent, rightAction
} ) => {
	const _renderRightImage = () => (
		<TouchableOpacity onPress={rightAction.onPress}>
			<Image
				testID="rightIcon-testID"
				source={rightAction.image}
				style={{ ...styles.rightImageStyle, ...( rightAction.imageStyle || {} ) }}
				tintColor={palette.grayscale.black}
			/>
		</TouchableOpacity>
	);

	const _renderRightText = () => (
		<TouchableOpacity testID="onRightTextPress-testID" onPress={rightAction.onPress}>
			<SuplementalTitle testID="rightText-testID" text={rightAction.text} style={[ styles.rightTextStyle, rightAction.textStyle ]} />
		</TouchableOpacity>
	);

	return (
		<View testID={testID} style={styles.containerView}>
			<View style={[ styles.containerView, styles.backArrowContainer ]}>
				<BackArrow backArrowOnPress={onBackArrowPress} />
			</View>

			<View style={[ styles.containerView, styles.titleContainer ]}>

				{titleComponent || (
					<Text testID="title-text" style={styles.title} onPress={onTitlePress}>
						{title}
					</Text>
				)}

			</View>

			<View style={[ styles.containerView, styles.rightTextContainer ]}>
				<View testID="rightPlaceholder-view" style={( !rightAction.text ) ? styles.rightIconPlaceholder : null}>
					{ rightAction.onPress && rightAction.image && _renderRightImage() }
					{ rightAction.onPress && rightAction.text && !rightAction.image && _renderRightText() }
				</View>
			</View>
		</View>
	);
};
NavigationBar.propTypes = {
	testID: PropTypes.string,
	title: PropTypes.string,
	onBackArrowPress: PropTypes.func,
	onTitlePress: PropTypes.func,
	titleComponent: PropTypes.any,
	rightAction: PropTypes.shape( {
		onPress: PropTypes.func,
		image: PropTypes.node,
		imageStyle: PropTypes.any,
		text: PropTypes.string,
		textStyle: PropTypes.instanceOf( Object )
	} )
};

NavigationBar.defaultProps = {
	testID: 'navigationBar-component',
	title: '',
	onBackArrowPress: null,
	onTitlePress: null,
	titleComponent: null,
	rightAction: {}
};

export default observer( NavigationBar );
