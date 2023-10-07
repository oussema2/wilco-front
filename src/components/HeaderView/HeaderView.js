import React from 'react';
import {
	View, Text, Image, Pressable
} from 'react-native';
import PropTypes from 'prop-types';
import { meatballsMenu, starMyFeed } from '../../assets/icons';
import { defaultStyle, smallStyle, withoutBodyStyle } from './HeaderView.styles';
import { Avatar } from '../Avatar';

const HeaderView = ( {
	testID, pilotName, titleInfo, titleExtraInfo, bodyInfo, bodySecondaryInfo,
	bodyTertiaryInfo, bodyQuaternaryInfo, optionsOnPress, pilotOnPress, imageSource, variant,
	showStar, rightAction
} ) => {
	let styles = defaultStyle;
	if ( variant === 'small' ) { styles = { ...styles, ...smallStyle }; }
	if ( !bodyInfo && !bodySecondaryInfo && !bodyTertiaryInfo ) {
		styles = { ...styles, ...withoutBodyStyle };
	}

	const _withPilotOnPress = ( component ) => (
		<Pressable onPress={pilotOnPress}>
			{component}
		</Pressable>
	);

	const _titleInfo = () => (
		<Text testID="titleInfo-Text" style={styles.titleInfo}>{` ${titleInfo}`}</Text>
	);

	const _titleExtraInfo = () => (
		<>
			<Text testID="titleExtraInfoSeparator-Text" style={styles.titleExtraInfoSeparatorView}> • </Text>
			<Text testID="titleExtraInfo-text" style={styles.titleExtraInfo}>
				{ titleExtraInfo }
			</Text>
		</>
	);

	const _titleText = () => (
		<Text testID="pilotName-text" style={styles.pilotName}>
			<Text>
				{ pilotName }
			</Text>
			{ titleInfo && _titleInfo() }
			{ titleExtraInfo && _titleExtraInfo() }
			{ showStar && '  '}
			{ showStar && <Image testID="star-image" style={styles.starImage} source={starMyFeed} />}
		</Text>
	);

	const _bodySeparator = ( secondaryOrTertiary ) => (
		<Text
			testID={`body${secondaryOrTertiary}InfoSeparator-Text`}
			style={styles.bodyExtraInfoSeparatorView}
		>
			{'  •  '}
		</Text>
	);

	const _bodyInfo = () => (
		<View style={styles.bodyView}>
			<Text testID="bodyInfo-text" style={styles.bodyInfo}>
				{ bodyInfo }
				{
					bodyInfo && bodySecondaryInfo && _bodySeparator( 'Secondary' )
				}
				{ bodySecondaryInfo }
				{
					bodySecondaryInfo && bodyTertiaryInfo && _bodySeparator( 'Tertiary' )
				}
				{ bodyTertiaryInfo }
			</Text>
			{ bodyQuaternaryInfo && (
				<Text testID="QuaternaryInfo-text" style={styles.bodyQuaternaryInfo} numberOfLines={1}>
					{ bodyQuaternaryInfo }
				</Text>
			)}
		</View>
	);

	return (
		<View testID={testID} style={styles.headerView}>
			<View style={styles.leftViewContainer}>
				<View style={styles.pilotAvatarView}>
					{_withPilotOnPress(
						<Avatar
							testID="userAvatar-image"
							size={variant}
							source={imageSource}
						/>
					)}
				</View>
				<View style={styles.titleView}>
					{ _withPilotOnPress( _titleText() ) }
					{ _bodyInfo() }
				</View>
				{ optionsOnPress && (
					<Pressable onPress={optionsOnPress}>
						<Image
							testID="options-image"
							style={styles.optionsImage}
							source={meatballsMenu}
						/>
					</Pressable>
				) }
			</View>
			{ rightAction && (
				rightAction?.imageSource && (
					<View style={styles.rightViewContainer} testID="right-component">
						<Pressable
							testID="right-component-pressable"
							onPress={rightAction.onPress}
						>
							<Image
								testID="right-component-image"
								style={styles.rightActionImage}
								source={rightAction.imageSource}
							/>
						</Pressable>
					</View>
				)
			) }
		</View>
	);
};

HeaderView.propTypes = {
	testID: PropTypes.string,
	pilotName: PropTypes.string.isRequired,
	titleInfo: PropTypes.string,
	titleExtraInfo: PropTypes.string,
	bodyInfo: PropTypes.string,
	bodySecondaryInfo: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ),
	bodyTertiaryInfo: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ),
	bodyQuaternaryInfo: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ),
	optionsOnPress: PropTypes.oneOfType( [ PropTypes.func, PropTypes.oneOf( [ false ] ) ] ),
	pilotOnPress: PropTypes.func,
	imageSource: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] ),
	variant: PropTypes.oneOf( [ 'medium', 'small' ] ),
	showStar: PropTypes.bool,
	rightAction: PropTypes.oneOfType( [ PropTypes.object ] )
};

HeaderView.defaultProps = {
	testID: 'headerView-component',
	titleInfo: null,
	titleExtraInfo: null,
	bodyInfo: null,
	bodySecondaryInfo: null,
	bodyTertiaryInfo: null,
	bodyQuaternaryInfo: null,
	optionsOnPress: null,
	pilotOnPress: () => {},
	imageSource: null,
	variant: 'medium',
	showStar: false,
	rightAction: null
};

export default HeaderView;
