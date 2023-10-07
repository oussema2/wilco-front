import React from 'react';
import { Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { award } from '../../../assets/icons';
import { styles } from '../Post.styles';
import { truncate } from '../../../helpers/strings';
import { Image } from '../../Image';

const CommunityItem = ( {
	testID, tag, maxLength
} ) => (
	<View testID={testID}>
		<View style={styles.communityTagItem}>
			<View style={styles.communityTagItemContainer}>
				<Text style={styles.communityTagItemText} numberOfLines={1} testID={`text-${testID}`}>
					{truncate( tag, maxLength )}
				</Text>
			</View>
			<View style={styles.communityTagItemContainer}>
				<Image source={award} style={styles.communityTagItemIcon} tintColor="black" />
			</View>
		</View>
	</View>
);

CommunityItem.propTypes = {
	testID: PropTypes.string,
	tag: PropTypes.string.isRequired,
	maxLength: PropTypes.number
};

CommunityItem.defaultProps = {
	testID: 'post-communities-item-component',
	maxLength: 50
};

export default observer( CommunityItem );
