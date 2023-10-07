import React from 'react';
import {
	ScrollView,
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../Post.styles';
import CommunityItem from './CommunityItem';

const CommunityTags = ( {
	testID, communityTags
} ) => (
	<View>
		<View testID={testID} style={styles.communitiesContainer}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.communitiesScrollView}
			>
				{communityTags.map( ( tag, key ) => (
					// eslint-disable-next-line react/no-array-index-key
					<CommunityItem tag={tag} key={key} testID={`community-item-${key}`} />
				) )}
			</ScrollView>
		</View>

		<LinearGradient start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} colors={[ '#eeeeee', '#FFF' ]} style={styles.communitiesLinearGradient} />
	</View>
);

CommunityTags.propTypes = {
	testID: PropTypes.string,
	communityTags: PropTypes.arrayOf( PropTypes.any ).isRequired
};

CommunityTags.defaultProps = {
	testID: 'post-communities-component'
};

export default observer( CommunityTags );
