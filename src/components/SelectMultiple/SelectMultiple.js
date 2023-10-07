import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View, Text, Image, Pressable
} from 'react-native';
import styles from './SelectMultiple.styles';
import { mergeStyles } from './style';

const itemType = PropTypes.oneOfType( [
	PropTypes.string,
	PropTypes.shape( { label: PropTypes.any, value: PropTypes.any } )
] );

const styleType = PropTypes.oneOfType( [
	PropTypes.object,
	PropTypes.number,
	PropTypes.array
] );

const sourceType = PropTypes.oneOfType( [ PropTypes.object, PropTypes.number ] );

export default class SelectMultiple extends Component {
	// eslint-disable-next-line react/static-property-placement
	static propTypes = {
		testID: PropTypes.string,
		items: PropTypes.arrayOf( itemType ).isRequired,
		selectedItems: PropTypes.arrayOf( itemType ),
		maxSelect: PropTypes.number,
		onSelectionsChange: PropTypes.func.isRequired,
		checkboxSource: sourceType.isRequired,
		selectedCheckboxSource: sourceType.isRequired,
		renderLabel: PropTypes.func,
		rowStyle: styleType,
		checkboxStyle: styleType,
		labelStyle: styleType,
		selectedRowStyle: styleType,
		selectedCheckboxStyle: styleType,
		selectedLabelStyle: styleType,
		ParentComponent: PropTypes.elementType
	}

	// eslint-disable-next-line react/static-property-placement
	static defaultProps = {
		testID: 'select-multiple-testID',
		selectedItems: [],
		rowStyle: {},
		checkboxStyle: {},
		labelStyle: {},
		maxSelect: null,
		renderLabel: null,
		selectedRowStyle: null,
		selectedCheckboxStyle: null,
		selectedLabelStyle: null,
		ParentComponent: View
	}

	items = undefined

	selectedItems = undefined

	rowData = []

	onRowPress( row ) {
		const { label, value } = row;
		let { onSelectionsChange, selectedItems, maxSelect } = this.props;

		selectedItems = ( selectedItems || [] ).map( this.toLabelValueObject );

		const index = selectedItems.findIndex( ( selectedItem ) => selectedItem.value === value );

		if ( index > -1 ) {
			selectedItems = selectedItems.filter( ( selectedItem ) => selectedItem.value !== value );
		} else if ( maxSelect != null && selectedItems.length >= maxSelect ) {
			return;
		} else {
			selectedItems = selectedItems.concat( { label, value } );
		}

		onSelectionsChange( selectedItems, { label, value } );
	}

	getRowData( items, selectedItems ) {
		if ( items !== this.items || selectedItems !== this.selectedItems ) {
			this.items = items;
			this.selectedItems = selectedItems;
			this.rowData = items?.map( this.toLabelValueObject );
			selectedItems = ( selectedItems || [] ).map( this.toLabelValueObject );

			this.rowData?.forEach( ( item ) => {
				item.selected = selectedItems.some( ( i ) => i.value === item.value );
			} );
		}

		return this.rowData;
	}

	keyExtractor = ( item, index ) => index.toString()

	toLabelValueObject( obj ) {
		if ( Object.prototype.toString.call( obj ) === '[object String]' ) {
			return { label: obj, value: obj };
		}
		return { label: obj.label, value: obj.value };
	}

	renderLabel = ( label, style, selected ) => {
		const { renderLabel } = this.props;
		if ( renderLabel ) {
			return renderLabel( label, style, selected );
		}
		return (
			<Text numberOfLines={1} style={style}>{label}</Text>
		);
	}

	renderItemRow = ( item, index ) => {
		let {
			checkboxSource,
			rowStyle,
			labelStyle,
			checkboxStyle
		} = this.props;

		const {
			selectedCheckboxSource,
			selectedRowStyle,
			selectedCheckboxStyle,
			selectedLabelStyle
		} = this.props;

		if ( item.selected ) {
			checkboxSource = selectedCheckboxSource;
			rowStyle = mergeStyles( styles.row, rowStyle, selectedRowStyle );
			checkboxStyle = mergeStyles( styles.checkbox, checkboxStyle, selectedCheckboxStyle );
			labelStyle = mergeStyles( styles.label, labelStyle, selectedLabelStyle );
		} else {
			rowStyle = mergeStyles( styles.row, rowStyle );
			checkboxStyle = mergeStyles( styles.checkbox, checkboxStyle );
			labelStyle = mergeStyles( styles.label, labelStyle );
		}

		return (
			<Pressable testID={`row-${item.value}-testID`} onPress={() => this.onRowPress( item )} key={index}>
				<View style={rowStyle}>
					<Image style={checkboxStyle} source={checkboxSource} />
					<View style={styles.labelContainer}>
						{this.renderLabel( item.label, labelStyle, item.selected )}
					</View>
				</View>
			</Pressable>
		);
	}

	render() {
		const {
			items, selectedItems, ParentComponent, testID
		} = this.props;
		return (
			<ParentComponent testID={testID}>
				{this.getRowData( items, selectedItems )?.map(
					( item, index ) => this.renderItemRow( item, index ) )}
			</ParentComponent>
		);
	}
}
