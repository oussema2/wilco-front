import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { styles } from './Roles.styles';
import { SuplementalTitle } from '../../../components/SuplementalTitle';
import { TextWithIcon } from '../../../components/TextWithIcon';
import { user } from '../../../assets/icons';
import EmptyStateText from '../../../components/EmptyStateText/EmptyStateText';

const Roles = ( {
	testID,
	presenter
} ) => (
	<View testID={testID}>
		<HorizontalPadding style={styles.horizontalPadding}>
			<SuplementalTitle testID="roles-title" text="Roles" style={styles.title} />

			{presenter.hasAnyRole && (
				<View testID="roles-data-testID" style={styles.container}>
					{
						presenter.roles?.map( ( role ) => (
							<TextWithIcon
								key={role.id}
								icon={user}
								style={styles.textWithIcon}
								imageStyle={styles.communityTagsIcon}
								numberOfLines={1}
							>
								{role.name}
							</TextWithIcon>
						) )
					}
				</View>
			) }

			{!presenter.hasAnyRole && (
				<View testID="empty-state-roles-testID" style={{ marginBottom: 20 }}>
					<EmptyStateText text={presenter.emptyRolesText} />
				</View>
			)}

			<View style={styles.separatorViewBottom} />
		</HorizontalPadding>
	</View>
);

Roles.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.shape( {
		roles: PropTypes.any,
		hasAnyRole: PropTypes.any,
		emptyRolesText: PropTypes.string
	} ).isRequired
};

Roles.defaultProps = {
	testID: 'roles-component'
};

export default observer( Roles );
