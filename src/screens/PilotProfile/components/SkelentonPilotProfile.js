import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { styles } from './SkeletonPilotProfile.styles';
import { palette } from '../../../Theme';

const SkeletonPilotProfile = ( ) => (
	<HorizontalPadding testID="skeleton-container-testID">
		<SkeletonPlaceholder
			backgroundColor={palette.skeleton.background}
			highlightColor={palette.skeleton.highlight}
		>
			<View testID="skeleton-pilot-profile-testID">
				<View style={[ styles.headerContainer, styles.headerMargin ]}>
					<View style={styles.userName} />
				</View>

				<View style={styles.headerContainer}>
					<View style={styles.userAvatar} />
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.contentLine1} />
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.contentLine2} />
					<View style={styles.contentLine3} />
					<View style={styles.contentLine4} />
					<View style={styles.contentLine5} />
				</View>

				<View>
					<View style={styles.contentLine6} />
					<View style={styles.contentLine7} />
				</View>
			</View>
		</SkeletonPlaceholder>
	</HorizontalPadding>
);

SkeletonPilotProfile.propTypes = {
};

export default SkeletonPilotProfile;
