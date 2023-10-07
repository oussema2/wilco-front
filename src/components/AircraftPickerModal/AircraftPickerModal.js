import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay } from 'react-native-elements';
import {
	FlatList, Pressable, Text, View
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { styles } from './AircraftPickerModal.styles';
import { ModalGradient } from '../ModalGradient';
import { ActionSheetButton } from '../ActionSheetButton';
import noop from '../../helpers/noop';
import { AircraftListItem } from '../AircraftListContainer/AircraftListItem';
import Aircraft from '../../entities/Aircraft';
import { EmptyAircraftList } from '../EmptyAircraftList';

const AircraftPickerModal = ( {
	testID, open, onBackdropPress, aircrafts, onAircraftSelected, initialAircraft
} ) => {
	const [ selectedAircraft, setSelectedAircraft ] = useState();
	useEffect( () => {
		setSelectedAircraft( initialAircraft );
	}, [ open ] );

	const getListItemStyles = ( item ) => ( {
		...styles.listItem,
		...( selectedAircraft === item && styles.selectedListItem )
	} );

	return (
		<Overlay
			testID={testID}
			overlayStyle={styles.overlay}
			isVisible={open}
			onBackdropPress={onBackdropPress}
		>
			<ModalGradient style={styles.modal}>
				<Text style={styles.title}>
					Primary aircraft
				</Text>
				<FlatList
					style={styles.listContainer}
					data={aircrafts}
					renderItem={( { item } ) => (
						<Pressable
							style={getListItemStyles( item )}
							onPress={() => setSelectedAircraft( item )}
						>
							<AircraftListItem showAvatar aircraft={item} showMeatballsMenu={false} />
						</Pressable>
					)}
					ListEmptyComponent={EmptyAircraftList}
				/>
				<View style={styles.actionsContainer}>
					<ActionSheetButton title="Done" onPress={() => onAircraftSelected( selectedAircraft )} type="constructive" />
					<ActionSheetButton title="Cancel" onPress={onBackdropPress} />
				</View>
			</ModalGradient>
		</Overlay>
	);
};

AircraftPickerModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onBackdropPress: PropTypes.func,
	aircrafts: PropTypes.arrayOf( PropTypes.instanceOf( Aircraft ) ),
	initialAircraft: PropTypes.instanceOf( Aircraft ),
	onAircraftSelected: PropTypes.func
};

AircraftPickerModal.defaultProps = {
	testID: 'aircraftPickerModal-component',
	open: false,
	onBackdropPress: noop,
	aircrafts: [],
	initialAircraft: null,
	onAircraftSelected: noop
};

export default observer( AircraftPickerModal );
