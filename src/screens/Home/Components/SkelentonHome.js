import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { styles } from './SkeletonHome.styles';
import { palette } from '../../../Theme';

const SkeletonHome = ( ) => (
	<HorizontalPadding testID="skeleton-container-testID">
		{
			[ ...Array( 3 ).keys() ].map( ( itemValue ) => (
				<SkeletonPlaceholder
					key={itemValue}
					backgroundColor={palette.skeleton.background}
					highlightColor={palette.skeleton.highlight}
				>
					<View testID={`skeleton-home-item-${itemValue}-testID`}>
						<View style={styles.headerContainer}>
							<View style={styles.userAvatar} />
							<View style={styles.userInfo}>
								<View style={styles.userInfoLine1} />
								<View style={styles.userInfoLine2} />
							</View>
						</View>
						<View>
							<View style={styles.postContentLine1} />
							<View style={styles.postContentLine2} />
							<View style={styles.postContentLine3} />
							{
								[ ...Array( 4 ).keys() ].map( ( itemLine ) => (
									<View key={itemLine} style={styles.postContentLine4} />
								) )
							}
						</View>
						<View style={styles.postContentContainer}>
							<View style={styles.postContentLine5} />
							<View style={styles.postContentLine6} />
						</View>
					</View>
				</SkeletonPlaceholder>
			) )
		}
	</HorizontalPadding>
);

SkeletonHome.propTypes = {
};

export default SkeletonHome;
