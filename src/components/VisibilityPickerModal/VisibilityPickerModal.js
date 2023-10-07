import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay } from 'react-native-elements';
import {
	FlatList, Pressable, Text, View
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { styles } from './VisibilityPickerModal.styles';
import { ModalGradient } from '../ModalGradient';
import { ActionSheetButton } from '../ActionSheetButton';
import noop from '../../helpers/noop';
import { PickerListItem } from '../PickerListItem';

const VisibilityPickerModal = ( {
	testID, open, onBackdropPress, data, onItemSelected, initialItem
} ) => {
	const [ selectedItem, setSelectedItem ] = useState();
	useEffect( () => {
		setSelectedItem( initialItem );
	}, [ open ] );

	const equalItems = ( leftItem, rightItem ) => (
		leftItem?.name === rightItem?.name && leftItem?.value === rightItem?.value
	);

	const getListItemStyles = ( item ) => ( {
		...styles.listItem,
		...( equalItems( selectedItem, item ) && styles.selectedListItem )
	} );

	const getPickerListItemStyles = ( item ) => ( {
		...( equalItems( selectedItem, item ) && styles.selectedPickerListItem )
	} );

	return (
		<Overlay
			testID={testID}
			overlayStyle={styles.overlay}
			isVisible={open}
			onBackdropPress={onBackdropPress}
		>
			<ModalGradient style={styles.modal}>
				<Text testID="picker-modal-title" style={styles.title}>
					Visibility
				</Text>
				<Text testID="picker-modal-subtitle" style={styles.subtitle}>
					Choose between showing your post to everyone on Wilco or only to yourself.
				</Text>
				<FlatList
					style={styles.listContainer}
					data={data}
					renderItem={( { item } ) => (
						<Pressable
							style={getListItemStyles( item )}
							onPress={() => setSelectedItem( item )}
						>
							<PickerListItem
								text={item.name}
								showMeatballsMenu={false}
								style={getPickerListItemStyles( item )}
							/>
						</Pressable>
					)}
					keyExtractor={( item ) => item.value}
					ListEmptyComponent={null}
				/>
				<View style={styles.actionsContainer}>
					<ActionSheetButton title="Done" onPress={() => onItemSelected( selectedItem )} type="constructive" />
					<ActionSheetButton title="Cancel" onPress={onBackdropPress} />
				</View>
			</ModalGradient>
		</Overlay>
	);
};

VisibilityPickerModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onBackdropPress: PropTypes.func,
	data: PropTypes.arrayOf( PropTypes.shape( {
		name: PropTypes.string,
		value: PropTypes.string
	} ) ),
	initialItem: PropTypes.any,
	onItemSelected: PropTypes.func
};

VisibilityPickerModal.defaultProps = {
	testID: 'PickerModal-component',
	open: false,
	onBackdropPress: noop,
	data: [],
	initialItem: null,
	onItemSelected: noop
};

export default observer( VisibilityPickerModal );
