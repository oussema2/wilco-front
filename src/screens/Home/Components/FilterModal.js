import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import BaseScreen from '../../BaseScreen/BaseScreen';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { NavigationBar } from '../../../components/NavigationBar';
import CheckboxList from '../../../components/CheckboxList/CheckboxList';
import { PrimaryButton } from '../../../components';
import { TertiaryButton } from '../../../components/TertiaryButton';
import { styles } from './FilterModal.styles';
import Modals from '../../../components/Modals/Modals';

const FilterModal = ( {
	testID, presenter
} ) => (
	<Modal
		presentationStyle="overFullScreen"
		testID={testID}
		visible={presenter.filterPostsPresenter.isFilterModalVisible}
		onRequestClose={presenter.filterPostsPresenter.backArrowHeaderButton}
	>
		<BaseScreen>
			{presenter && (
				<HorizontalPadding style={styles.horizontalPadding}>
					<Modals />
					<NavigationBar
						title="Filter"
						testID="filter-modal-navigation-bar-testID"
						onBackArrowPress={presenter.filterPostsPresenter.backArrowHeaderButton}
						rightAction={{
							text: 'Select all',
							onPress: presenter.filterPostsPresenter.selectAll
						}}
					/>

					<View style={styles.checkboxListContainer}>
						<View>
							<Text testID="input-label" style={styles.label}>Communities</Text>
						</View>

						<CheckboxList
							onSelectionsChange={presenter.filterPostsPresenter.onSelectionsChange}
							selectedItems={presenter.filterPostsPresenter.selectedItems}
							items={presenter.filterPostsPresenter.tagsFromStore}
							ParentComponent={ScrollView}
						/>
					</View>

					<View style={styles.fixedBottomContentContainer}>

						<View style={styles.buttonContainer}>
							<PrimaryButton
								testID="apply-selection-button"
								title="Apply"
								size="small"
								onPress={presenter.filterPostsPresenter.applySelection}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<TertiaryButton
								testID="clear-selection-button"
								title="Clear"
								size="small"
								onPress={presenter.filterPostsPresenter.clearSelection}
							/>
						</View>
					</View>

				</HorizontalPadding>
			)}
		</BaseScreen>
	</Modal>
);

FilterModal.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.shape( {
		filterPostsPresenter: PropTypes.shape( {
			isFilterModalVisible: PropTypes.bool.isRequired,
			onSelectionsChange: PropTypes.func.isRequired,
			clearSelection: PropTypes.func.isRequired,
			selectedItems: PropTypes.arrayOf( PropTypes.object ).isRequired,
			tagsFromStore: PropTypes.arrayOf( PropTypes.object ).isRequired,
			selectAll: PropTypes.func.isRequired,
			setIsFilterModalVisible: PropTypes.func.isRequired,
			applySelection: PropTypes.func.isRequired,
			backArrowHeaderButton: PropTypes.func.isRequired
		} ).isRequired
	} ).isRequired
};

FilterModal.defaultProps = {
	testID: 'filter-post-modal-screen'
};
export default observer( FilterModal );
