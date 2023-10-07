import React from 'react';
import { observer } from 'mobx-react';
import { styles } from '../ActionSheet.styles';
import { ActionSheetButton } from '../../ActionSheetButton';
import { ActionSheetGradient } from '../../ActionSheetGradient';
import { useActionSheetService } from '../../../providers/ActionSheetProvider';

const ActionSheetActions = () => {
	const actionSheetService = useActionSheetService();

	return (
		<ActionSheetGradient style={styles.actions}>
			{actionSheetService.actions.map( ( action ) => (
				<ActionSheetButton
					key={action.title}
					{...action}
					onPress={() => {
						actionSheetService.close();
						action.onPress();
					}}
				/>
			) )}
		</ActionSheetGradient>
	);
};

export default observer( ActionSheetActions );
