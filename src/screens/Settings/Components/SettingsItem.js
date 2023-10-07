import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ListItem } from 'react-native-elements';
import { styles } from './SettingsItem.styles';
import { Image } from '../../../components/Image';
import noop from '../../../helpers/noop';
import { HorizontalPadding } from '../../../components/HorizontalPadding';

const SettingsItem = ( {
	testID, label, rightImage, onPress, labelStyle, renderDivisorLine
} ) => (
	<View>
		<HorizontalPadding>
			<ListItem containerStyle={styles.listItemContainer} testID={`${testID}-Item`}>
				<ListItem.Content>
					<Pressable onPress={onPress}>
						<View style={styles.listItemTitleView}>
							<Text
								testID={`${testID}-Title`}
								style={[ styles.listItemTitle, labelStyle ]}
							>
								{label}
							</Text>
							<View style={styles.listItemImageContainerView}>
								<Image testID={`${testID}-Image`} source={rightImage} style={styles.listItemImageView} />
							</View>
						</View>
					</Pressable>
				</ListItem.Content>
			</ListItem>
		</HorizontalPadding>
		{ !!renderDivisorLine && <View testID={`${testID}-DivisorLine`} style={styles.divisorLine} /> }
	</View>
);

SettingsItem.propTypes = {
	testID: PropTypes.string,
	label: PropTypes.string.isRequired,
	labelStyle: PropTypes.any,
	rightImage: PropTypes.node.isRequired,
	onPress: PropTypes.func,
	renderDivisorLine: PropTypes.bool
};

SettingsItem.defaultProps = {
	testID: 'settingItem',
	onPress: noop,
	labelStyle: null,
	renderDivisorLine: true
};

export default observer( SettingsItem );
