import React from 'react';
import {
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { SuplementalTitle } from '../../../components/SuplementalTitle';
import { styles } from './Credentials.styles';
import { award, certificate } from '../../../assets/icons';
import { TextWithIcon } from '../../../components/TextWithIcon';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import EmptyStateText from '../../../components/EmptyStateText/EmptyStateText';

const Credentials = ( {
	testID,
	presenter
} ) => (
	<View testID={testID} style={styles.credentialsContainer}>
		<HorizontalPadding style={styles.horizontalPadding}>
			<View style={styles.separatorViewCredentials} />

			<SuplementalTitle testID="credentials-title" text="Credentials" style={styles.title} />

			{presenter.hasAnyCredential && (
				<View testID="credentials-data-testID" style={styles.container}>
					{
						presenter.certificates?.map( ( certificateItem ) => (
							<TextWithIcon
								key={certificateItem.id}
								icon={award}
								style={styles.textWithIcon}
								imageStyle={styles.certificateIconStyle}
							>
								{certificateItem.name}
							</TextWithIcon>
						) )
					}

					{
						presenter.ratings?.map( ( rating ) => (
							<TextWithIcon
								key={rating.id}
								icon={certificate}
								style={styles.textWithIcon}
								imageStyle={styles.ratingIconStyle}
							>
								{rating.name}
							</TextWithIcon>
						) )
					}
				</View>
			)}

			{!presenter.hasAnyCredential && (
				<View testID="empty-state-credentials-testID" style={styles.emptyStateTextContainer}>
					<EmptyStateText text={presenter.emptyCredentialsText} />
				</View>
			)}

			<View style={styles.separatorViewBottom} />
		</HorizontalPadding>
	</View>
);

Credentials.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.shape( {
		certificates: PropTypes.any,
		ratings: PropTypes.any,
		hasAnyCredential: PropTypes.any,
		emptyCredentialsText: PropTypes.string
	} ).isRequired
};

Credentials.defaultProps = {
	testID: 'credentials-component'
};

export default observer( Credentials );
