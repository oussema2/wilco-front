import React from 'react';
import { observer } from 'mobx-react';

import { View } from 'react-native';
import { styles } from '../ActionSheet.styles';
import { ActionSheetButton } from '../../ActionSheetButton';
import { useActionSheetService } from '../../../providers/ActionSheetProvider';

const ActionSheetCancelButton = () => {
	const actionSheetService = useActionSheetService();

	return (
		<View style={styles.cancelButtonContainer}>
			<ActionSheetButton
				title="Cancel"
				onPress={() => actionSheetService.close()}
			/>
		</View>
	);
};

export default observer( ActionSheetCancelButton );
