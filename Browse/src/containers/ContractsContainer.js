/*eslint-disable no-unused-vars*/
/*eslint-disable no-console*/
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contractActions from '../actions/contractActions'; 
import ContractList from '../components/Contracts/ContractList';
/* office ui fabric */
import { DetailsRow, DetailsList, buildColumns, IColumn, 
    Selection, DetailsListLayoutMode as LayoutMode, 
    IContextualMenuProps, IGroup,
    ConstrainMode, SelectionMode, 
    ColumnActionsMode
} from 'office-ui-fabric-react/lib/DetailsList';

import { ContextualMenu, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';
import { CommandBar } 
    from 'office-ui-fabric-react/lib/CommandBar';
//import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';
import autobind from 'autobind-decorator';
import classNames from 'classnames';

import { assign } from 'office-ui-fabric-react/lib/utilities/object';

const DEFAULT_ITEM_LIMIT = 5;
const PAGING_SIZE = 10;
const PAGING_DELAY = 5000;
const ITEM_COUNT = 0;

let _items;
//let globalVariable;

class ContractsContainer extends React.Component {
    //private selection: Selection;
    constructor(props) {
        super(props);

        if(!_items) {
            _items = Object.assign({}, props.contracts);
        }
        
        this._handleChange = this._handleChange.bind(this);
        this._getSelectionDetails = this._getSelectionDetails.bind(this);
        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({ selectionDetails: this._getSelectionDetails() });
            }
        });
        this._selection.setItems(_items, false);
        //this._onSelectionChanged = this._onSelectionChanged.bind(this); 

        this._buildColumns = this._buildColumns.bind(this);
        
        //this._onToggleLazyLoad = this._onToggleLazyLoad.bind(this);
        this._onColumnClick = this._onColumnClick.bind(this);
        //this._onContextualMenuDismissed = this._onContextualMenuDismissed.bind(this);
        //this._onItemLimitChanged = this._onItemLimitChanged.bind(this);
        //this._onAddRow = this._onAddRow.bind(this);
        //this._onDeleteRow = this._onDeleteRow.bind(this);
        this._onRenderRow = this._onRenderRow.bind(this);
        this._onRenderCheck = this._onRenderCheck.bind(this);
        this._onSortColumn = this._onSortColumn.bind(this);
        this._onContextualMenuDismissed = this._onContextualMenuDismissed.bind(this);
        this._getContextualMenuProps = this._getContextualMenuProps.bind(this);
        this._getCommandItems = this._getCommandItems.bind(this);
        this._getCommandFarItems = this._getCommandFarItems.bind(this);
        this._getOverflowItems = this._getOverflowItems.bind(this);
        this._onFarItemRender = this._onFarItemRender.bind(this);

        this.state = {
            contracts: props.contracts, //Object.assign({}, props.contracts),//_items, 
            group: null,
            groupItemLimit: DEFAULT_ITEM_LIMIT,
            selectionDetails: this._getSelectionDetails(),
            filterValue: 'Filter by contract number',
            layoutMode: LayoutMode.fixedColumns,
            constrainMode: ConstrainMode.unconstrained,
            selectionMode: SelectionMode.single,
            canResizeColumns: true,
            columns: this._buildColumns(_items, true, this._onColumnClick, '', false),
            sortedColumnKey: 'Title',
            isSortedDescending: false,
            isLazyLoaded: false,
            isHeaderVisible: true,
            contextualMenuProps: null,
            selectionCountVisible: false,
            searchBoxVisible: true,
            showFarItems: false
            //commandItems: this._getCommandItems().bind(this)
        };
    }

    /*componentWillReceiveProps(nextProps) {
        _items = nextProps.contracts;
        if(this.props !== nextProps) {
             this.setState({
                contracts: _items, //Object.assign({}, _items),
                columns: this._buildColumns(_items, true, this._onColumnClick, '', false)
            });
        }       
    }*/

    componentWillReceiveProps(nextProps) {
        _items = nextProps.contracts;
        if (this.props.contracts != nextProps.contracts) {
        // Necessary to populate form when existing course is loaded directly.
        this.setState({
                contracts: nextProps.contracts, //Object.assign({}, nextProps.contracts),
                columns: this._buildColumns(_items, true, this._onColumnClick, '', false)
            });
        }
    }

    _onRenderItemColumn (item, index, column) {
        let fieldContent = item[column.fieldName];
        switch(column.key) {
            case 'Title':
                return <Label><Link data-selection-invoke={true}>{ fieldContent }</Link></Label>;
            default: 
                return <span> { fieldContent }</span>;
        }
    }

    _getSelectionDetails() {
        let selection = this._selection.getSelection();
        //console.log('Selection: ' + JSON.stringify(selection));
        let selectionCount = this._selection.getSelectedCount();
        /*switch (selectionCount) {
            case 0:
                return 'No items';//No items selected';
            case 1:
                return '1 item selected: ' + (this._selection.getSelection()[0]).Title;
            default:
                return `${ selectionCount } selected`;
        }*/
        if (selectionCount > 0) {
            this.setState({
                selectionCountVisible: true
            });
            return `${ selectionCount } selected`; // <i className="ms-Icon ms-Icon--Cancel" aria-hidden="true" />;
        } else {
            return '';
        }
     }

    _handleChange (e) {
        e.preventDefault();
        let value = e.target.value;
        let { contracts } = this.state;
        this.setState(
        { 
            contracts: value ? contracts.filter(c => c.Title.toLowerCase().indexOf(value.toLowerCase()) > -1) : contracts 
        });
    }

    _buildColumns (items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending) {        
        let columns = buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending);        
        columns.forEach(column => {
            switch(column.key) {
                case '__metadata':
                    column.name = '';
                    column.columnActionsMode = ColumnActionsMode.disabled;
                    column.maxWidth = 0;
                    column.onRender = (item) => ('');
                    break;
                case 'Title':
                    column.name = `Contracts`;
                    column.columnActionsMode = ColumnActionsMode.hasDropdown;
                    //column.contextualMenu = ContextualMenu.items();
                    break;
                case 'StartDate':
                    column.name = `Start date`;
                    column.columnActionsMode = ColumnActionsMode.hasDropdown;
                    column.onRender = (item) => (
                         <Label>{new Date(item.StartDate).toLocaleDateString('en-US')}</Label>
                    );
                    break;                
                case 'EndDate':
                    column.name = 'End date';
                    column.columnActionsMode = ColumnActionsMode.hasDropdown;
                    column.onRender = (item) => (
                         <Label>{new Date(item.EndDate).toLocaleDateString('en-US')}</Label>
                    );
                    break;          
            }
            //return column;
        });
        return columns;
    }    
    
    _onRenderRow(props) {
        return <DetailsRow {...props} /*onRenderCheck={ this._onRenderCheck }*/ />;
    }

    _onRenderCheck(props) {
        let checkClass = classNames({
            'ms-DetailsRow-check': true,
            'is-checked': props.anySelected
        });

        return (
            <div
                className={checkClass}
                    role="button"
                    aria-pressed={props.isSelected}
                    data-selection-toggle={true}
                    aria-label={props.ariaLabel}
                >
                <input
                    className="ms-Check"
                    type="radio"
                    checked={props.isSelected}
                />
            </div>
        );
    }

    _onSortColumn(key, isSortedDescending) {
        let { contracts } = this.state;
        let sortedItems = contracts.slice(0).sort((a, b) => (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1);

        this.setState({
            contracts: sortedItems,
            groups: null,
            columns: this._buildColumns(sortedItems, true, this._onColumnClick, key, isSortedDescending),
            isSortedDescending: isSortedDescending,
            sortedColumnKey: key
        });
    }

    _onContextualMenuDismissed() {
        this.setState({
            contextualMenuProps: null
        });
    }

    _getContextualMenuProps(column, ev) {
        let items;
        switch(column.key) {
            case 'Title':
                items = [
                    {
                        key: 'aToZ',
                        name: 'A to Z',
                        icon: 'SortUp',
                        canCheck: true,
                        isChecked: column.isSorted && !column.isSortedDescending,
                        onClick: () => this._onSortColumn(column.key, false)
                    },
                    {
                        key: 'zToA',
                        name: 'Z to A',
                        icon: 'SortDown',
                        canCheck: true,
                        isChecked: column.isSorted && column.isSortedDescending,
                        onClick: () => this._onSortColumn(column.key, true)
                    }
                ];
                break;
            case 'StartDate':
            case 'EndDate':
                items = [
                    {
                        key: 'olderToNewer',
                        name: 'Older to newer',
                        icon: 'SortUp',
                        canCheck: true,
                        isChecked: column.isSorted && !column.isSortedDescending,
                        onClick: () => this._onSortColumn(column.key, false)
                    },
                    {
                        key: 'newerToOlder',
                        name: 'Newer to older',
                        icon: 'SortDown',
                        canCheck: true,
                        isChecked: column.isSorted && column.isSortedDescending,
                        onClick: () => this._onSortColumn(column.key, true)
                    }
                ];
                break;
            default:
                break;
        }        
        
        return {
            items: items,
            targetElement: ev.currentTarget,
            directionalHint: DirectionalHint.bottomLeftEdge,
            gapSpace: 10,
            isBeakVisible: true,
            onDismiss: this._onContextualMenuDismissed
        };
    }

    _onColumnClick (column, ev) {
        ev.preventDefault();
        this.setState({
            contextualMenuProps: this._getContextualMenuProps(column, ev)
        });
    }

    _getCommandItems() {
        let { layoutMode, constrainMode, selectionMode, canResizeColumns, isLazyLoaded, isHeaderVisible } = this.state;

        return [
            //Add Contract
            {
                key: 'addRow',
                name: 'Add contract',
                icon: 'Add',
                onClick: this._onAddRow
            },
            //Edit Contract
            {
                key: 'editRow',
                name: 'Edit contract',
                icon: 'Edit',
                onClick: this._onEditRow
            },
            //Delete Contract
            {
                key: 'deleteRow',
                name: 'Delete row',
                icon: 'Delete',
                onClick: this._onDeleteRow
            },
            //Configure Contract
            {
                key: 'configure',
                name: 'Configure',
                icon: 'Settings',
                items: [
                {
                    key: 'resizing',
                    name: 'Allow column resizing',
                    canCheck: true,
                    isChecked: canResizeColumns,
                    onClick: this._onToggleResizing
                },
                {
                    key: 'headerVisible',
                    name: 'Is header visible',
                    canCheck: true,
                    isChecked: isHeaderVisible,
                    onClick: () => this.setState({ isHeaderVisible: !isHeaderVisible })
                },
                {
                    key: 'lazyload',
                    name: 'Simulate async loading',
                    canCheck: true,
                    isChecked: isLazyLoaded,
                    onClick: this._onToggleLazyLoad
                },
                {
                    key: 'dash',
                    name: '-'
                },
                {
                    key: 'layoutMode',
                    name: 'Layout mode',
                    items: [
                    {
                        key: LayoutMode[LayoutMode.fixedColumns],
                        name: 'Fixed columns',
                        canCheck: true,
                        isChecked: layoutMode === LayoutMode.fixedColumns,
                        onClick: this._onLayoutChanged,
                        data: LayoutMode.fixedColumns
                    },
                    {
                        key: LayoutMode[LayoutMode.justified],
                        name: 'Justified columns',
                        canCheck: true,
                        isChecked: layoutMode === LayoutMode.justified,
                        onClick: this._onLayoutChanged,
                        data: LayoutMode.justified
                    }
                    ]
                },
                {
                    key: 'selectionMode',
                    name: 'Selection mode',
                    items: [
                    {
                        key: SelectionMode[SelectionMode.none],
                        name: 'None',
                        canCheck: true,
                        isChecked: selectionMode === SelectionMode.none,
                        onClick: this._onSelectionChanged,
                        data: SelectionMode.none

                    },
                    {
                        key: SelectionMode[SelectionMode.single],
                        name: 'Single select',
                        canCheck: true,
                        isChecked: selectionMode === SelectionMode.single,
                        onClick: this._onSelectionChanged,
                        data: SelectionMode.single
                    },
                    {
                        key: SelectionMode[SelectionMode.multiple],
                        name: 'Multi select',
                        canCheck: true,
                        isChecked: selectionMode === SelectionMode.multiple,
                        onClick: this._onSelectionChanged,
                        data: SelectionMode.multiple
                    },
                    ]
                },
                {
                    key: 'constrainMode',
                    name: 'Constrain mode',
                    items: [
                    {
                        key: ConstrainMode[ConstrainMode.unconstrained],
                        name: 'Unconstrained',
                        canCheck: true,
                        isChecked: constrainMode === ConstrainMode.unconstrained,
                        onClick: this._onConstrainModeChanged,
                        data: ConstrainMode.unconstrained
                    },
                    {
                        key: ConstrainMode[ConstrainMode.horizontalConstrained],
                        name: 'Horizontal constrained',
                        canCheck: true,
                        isChecked: constrainMode === ConstrainMode.horizontalConstrained,
                        onClick: this._onConstrainModeChanged,
                        data: ConstrainMode.horizontalConstrained
                    }
                    ]
                }
                ]
            }
        ];
    }

    _getOverflowItems(){
        return [
            {
                key: 'renameItem',
                name: 'Rename',
                icon: 'Edit'
            }
        ];
    }
    
    _onFarItemRender() {
        let { selectionDetails } = this.state;
        
        return <i className="ms-Icon ms-Icon--Mail" aria-hidden="true"/>;
    }

    _getCommandFarItems() {
        let { selectionDetails } = this.state;
        
        return [
            {
                key: 'selectedItems',
                name: selectionDetails,
                icon: 'Cancel',
                onClick: this._onClearSelection 
            }
        ];
    }

    _onClearSelection() {
        this._selection.toggleAllSelected();
        return false;
    }
    
    render() {
        //let { contracts, columns } = this.state; // (this.state.contracts.length > 0) ? this.state : this.props;
        let { contracts, columns, groups, groupItemLimit, selectionDetails, layoutMode, 
                selectionMode, constrainMode, isHeaderVisible, contextualMenuProps, 
                selectionCountVisible, searchBoxVisible } = this.state;
        
        //let { contracts} = this.props;
        
        let columnsRender = this._buildColumns(contracts, true, this._onColumnClick);
        
        let isGrouped = groups && groups.length > 0;
        let groupProps = {
            getGroupLimit: () => {
                return contracts.length;
            },
            footerProps: {
                showAllLinkText: 'Show all'
            }
        };

        let farCommandItems = this._getCommandFarItems();

        let filteredFarItems = farCommandItems.map(item => assign({}, item, {
            name: selectionCountVisible ? item.name : '',
            icon: selectionCountVisible ? item.icon : 'info'
        }));

        return (
            <div>
                <form onSubmit={(e) => { e.preventDefault();}}> 
                    <CommandBar
                        isSearchBoxVisible={searchBoxVisible}
                        searchPlaceholderText="Contract..."
                        searchOnChange= {(e) => {this._handleChange(e);}}
                        elipisisAriaLabel="More options"
                        items={this._getCommandItems()}
                        overflowItems={this._getOverflowItems()}
                        farItems={filteredFarItems}/>
                </form>
                <ContractList 
                    contracts={contracts}
                    contractColumns={columns}
                    selectedDetails={this._selection}
                    renderItemColumn={this._onRenderItemColumn.bind(this)}
                    selectionMode={selectionMode}
                    constrainMode={constrainMode}
                    isHeaderVisible={isHeaderVisible}
                    onRenderRow={this._onRenderRow} />
                 
                { contextualMenuProps && (
                        <ContextualMenu {...contextualMenuProps} />
                ) }

            </div>
        );
    }   
}

ContractsContainer.propTypes = {
    contracts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        contracts: state.contracts
    };    
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(contractActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractsContainer);
