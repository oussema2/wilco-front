import React from 'react';
import {
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { SuplementalTitle } from '../../../components/SuplementalTitle';
import { styles } from './CommunityTags.styles';
import { users } from '../../../assets/icons';
import { TextWithIcon } from '../../../components/TextWithIcon';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import EmptyStateText from '../../../components/EmptyStateText/EmptyStateText';

const CommunityTags = ( {
	testID,
	presenter
} ) => (
	<View testID={testID}>
		<HorizontalPadding style={styles.horizontalPadding}>
			<SuplementalTitle testID="communities-title" text="Communities" style={styles.title} />

			{presenter.hasCommunityTags && (
				<View testID="communities-data-testID" style={styles.container}>
					{
						presenter.communityTags?.map( ( tag, index ) => (
							<TextWithIcon
								/* eslint-disable-next-line react/no-array-index-key */
								key={index}
								icon={users}
								style={styles.textWithIcon}
								imageStyle={styles.communityTagsIcon}
								numberOfLines={1}
							>
								{tag}
							</TextWithIcon>
						) )
					}
				</View>
			) }

			{!presenter.hasCommunityTags && (
				<View testID="empty-state-communities-testID" style={{ marginBottom: 20 }}>
					<EmptyStateText text={presenter.emptyCommunitiesText} />
				</View>
			)}

			<View style={styles.separatorViewBottom} />
		</HorizontalPadding>
	</View>
);

CommunityTags.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.shape( {
		communityTags: PropTypes.any,
		hasCommunityTags: PropTypes.any,
		emptyCommunitiesText: PropTypes.string
	} ).isRequired
};

CommunityTags.defaultProps = {
	testID: 'communities-component'
};

export default observer( CommunityTags );
