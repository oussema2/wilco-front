import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import { BottomSheet } from 'react-native-elements';
import { styles } from './ActionSheet.styles';
import { useActionSheetService } from '../../providers/ActionSheetProvider';

import ActionSheetActions from './components/ActionSheetActions';
import ActionSheetCancelButton from './components/ActionSheetCancelButton';

const ActionSheet = () => {
	const actionSheetService = useActionSheetService();

	return (
		<BottomSheet
			isVisible={actionSheetService.isOpen}
			containerStyle={styles.actionSheet}
			modalProps={{
				animationType: 'fade'
			}}
		>
			<View style={styles.container}>
				<ActionSheetActions />
				<ActionSheetCancelButton />
			</View>
		</BottomSheet>
	);
};

export default observer( ActionSheet );
