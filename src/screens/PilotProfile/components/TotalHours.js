import { Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Icon } from 'react-native-elements';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { styles } from './TotalHours.styles';
import { SuplementalTitle } from '../../../components/SuplementalTitle';
import EmptyStateText from '../../../components/EmptyStateText/EmptyStateText';

const TotalHours = ( {
	testID,
	presenter
} ) => (
	<View testID={testID}>
		<HorizontalPadding style={styles.horizontalPadding}>
			<SuplementalTitle testID="total-hours-title" text="Total Hours" style={styles.title} />

			{presenter.hasTotalHours && (
				<View testID="total-hours-data-testID" style={styles.container}>
					<Icon
						name="clock"
						type="font-awesome-5"
						color="#1F2E4E"
						solid
						iconStyle={{ fontWeight: 100 }}
					/>
					<Text
						numberOfLines={1}
						style={styles.text}
					>
						{presenter.totalHours}
					</Text>
				</View>
			) }

			{!presenter.hasTotalHours && (
				<View testID="empty-state-total-hours-testID" style={{ marginBottom: 20 }}>
					<EmptyStateText text={presenter.emptyTotalHoursText} />
				</View>
			)}

			<View style={styles.separatorViewBottom} />
		</HorizontalPadding>
	</View>
);

TotalHours.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.shape( {
		totalHours: PropTypes.string,
		hasTotalHours: PropTypes.bool,
		emptyTotalHoursText: PropTypes.string
	} ).isRequired
};

TotalHours.defaultProps = {
	testID: 'total-hours-component'
};

export default observer( TotalHours );
