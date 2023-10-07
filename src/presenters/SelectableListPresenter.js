export default class SelectableListPresenter {
	constructor( {
		items,
		onItemSelected,
		onItemDeselected,
		makeAutoObservable
	} = {} ) {
		this.setItems( items );
		this.selectedItemKey = null;
		this._selectedItem = null;
		this.onItemSelected = onItemSelected;
		this.onItemDeselected = onItemDeselected;

		makeAutoObservable( this );
	}

	get items() {
		return new Map( this._items.map( ( item ) => [ item.id, item ] ) );
	}

	get isAnyItemSelected() {
		return this.selectedItemKey != null;
	}

	get selectedItem() {
		return this._selectedItem;
	}

	onItemPressed( itemKey ) {
		const item = this.items.get( itemKey );

		if ( !item ) return;

		if ( itemKey === this.selectedItemKey ) {
			this._deselectItem( item );
			return;
		}

		this._selectItem( item, itemKey );
	}

	setItems( items ) {
		this._items = items;
	}

	clearSelection() {
		this._deselectItem( this._selectedItem );
	}

	_deselectItem( item ) {
		this.selectedItemKey = null;
		this._selectedItem = null;
		this.onItemDeselected( item );
	}

	_selectItem( item, itemKey ) {
		this.selectedItemKey = itemKey;
		this._selectedItem = item;
		this.onItemSelected( item );
	}
}
