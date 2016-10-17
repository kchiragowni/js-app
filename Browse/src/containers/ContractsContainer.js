/*eslint-disable no-unused-vars*/
/*eslint-disable no-console*/
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contractActions from '../actions/contractActions'; 
import ContractList from '../components/Contracts/ContractList';
/* office ui fabric */
import { DetailsRow, DetailsList, buildColumns, IColumn, Selection, 
    DetailsListLayoutMode as LayoutMode, IContextualMenuItem,
  IContextualMenuProps, ConstrainMode, SelectionMode, ContextualMenu, ColumnActionsMode  } from 'office-ui-fabric-react/lib/DetailsList';
//import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
//import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Link } from 'office-ui-fabric-react/lib/Link';
<<<<<<< HEAD
import autobind from 'autobind-decorator';

import classNames from 'classnames';
let _items = {};
//let globalVariable;

class ContractsContainer extends React.Component {
    //private selection: Selection;
    constructor(props) {
        super(props);
        
        //console.log(props.contracts);
        _items = Object.assign({}, props.contracts);
        //this._handleChange = this._handleChange.bind(this);
=======
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import ContractListCmdBar from '../components/Contracts/ContractListCmdBar';
import ContractPanel from '../components/Contracts/ContractPanel';

import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Button } from 'office-ui-fabric-react/lib/Button';

export const DEFAULT_ITEM_LIMIT = 5;
export const PAGING_SIZE = 10;
export const PAGING_DELAY = 5000;

class ContractsContainer extends React.Component {
    //private selection: Selection;
    constructor(props, context) {
        super(props, context);
        
        this._handleChange = this._handleChange.bind(this);
>>>>>>> 7f0d523197fb76f653116aadc8bb3647d0334edb
        this._getSelectionDetails = this._getSelectionDetails.bind(this);
        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({ selectionDetails: this._getSelectionDetails() });
            }
        });

<<<<<<< HEAD
        //this._selection.setItems(_items, false);

        this._buildColumns = this._buildColumns.bind(this);
        //this._onColumnClick = this._onColumnClick.bind(this);

        this.state = {
            contracts: _items, 
            selectionDetails: this._getSelectionDetails(),
            filterValue: 'Filter by contract number',
            layoutMode: LayoutMode.justified,
            constrainMode: ConstrainMode.horizontalConstrained,
            selectionMode: SelectionMode.multiple,
            sortedColumnKey: 'Title',
            isSortedDescending: false,
            isLazyLoaded: false,
            isHeaderVisible: true,
            contextualMenuProps: null,
            //columns: this._buildColumns(_items, true)
=======

        //this._onItemLimitChanged = this._onItemLimitChanged.bind(this);
        this._getCommandItems = this._getCommandItems.bind(this);
        this._onAddContract = this._onAddContract.bind(this);
        this._onDeleteContract = this._onDeleteContract.bind(this);
        this._onEditContract = this._onEditContract.bind(this);

        this.state = {
            contracts: props.contracts,
            selectionDetails: this._getSelectionDetails(),
            filterValue: 'Filter by contract number..',
            isFetchingItems: false,
            canResizeColumns: true,
            contextualMenuProps: null,
            sortedColumnKey: 'name',
            isSortedDescending: false,
            isLazyLoaded: false,
            isHeaderVisible: true,
            isSearchBoxVisible: false,
            areNamesVisible: true,
            areIconsVisible: true,
            showPanel: false
>>>>>>> 7f0d523197fb76f653116aadc8bb3647d0334edb
        };
    }

    _onRenderItemColumn (item, index, column) {
<<<<<<< HEAD
        let fieldContent = item[column.fieldName]

        switch(column.key) {
            case 'Title':
                return <Link data-selection-invoke={true}>{ fieldContent }</Link>;

            default: 
                return <span> { fieldContent }</span>;
=======
        if (column.key.isRowHeader) {
            return "Header";
        } else if (column.key === 'Title') {
            return <Link data-selection-invoke={true}>{ item[column.key] }</Link>;
        } else if (column.key === 'StartDate' || column.key === 'EndDate') {
            return new Date(item[column.key]).toLocaleDateString();
        } else {
            return item[column.key];
>>>>>>> 7f0d523197fb76f653116aadc8bb3647d0334edb
        }
    }

    _getSelectionDetails() {
        let selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
        case 0:
            return 'No items selected';
        case 1:
            return '1 item selected: ' + (this._selection.getSelection()[0]).Title;
        default:
            return `${ selectionCount } items selected`;
        }
    }

    @autobind
    _handleChange (e) {
        e.preventDefault();
        let value = e.target.value;
        let { contracts } = this.props;
        this.setState(
        { 
            contracts: value ? contracts.filter(c => c.Title.toLowerCase().indexOf(value.toLowerCase()) > -1) : contracts 
        });
<<<<<<< HEAD
    }

    _buildColumns (items, canResizeColumns) {
        
        let columns = buildColumns(items, canResizeColumns);        
        //let titleColumn = columns.filter(column => column.name === 'Title')[0];
        //titleColumn.name = '';
        //titleColumn.maxWidth = 100;
        columns.forEach(column => {            
            if(column.key === 'Title' ) {
                column.name = 'Contract';
                column.minWidth = 200;
                column.maxWidth = 200;
                column.columnActionsMode = ColumnActionsMode.disabled;
                /*column.onRender = (item) => (
                    <Link>{ item.name }</Link>
                );*/
            } else if (column.key === 'key') {
                column.columnActionsMode = ColumnActionsMode.disabled;
                column.onRender = (item) => (
                <Link href='#'>{ item.key }</Link>
                );
                column.minWidth = 90;
                column.maxWidth = 90;
            }
        });
        return columns;
    }    
    
    @autobind
    _onRenderRow(props) {
        return <DetailsRow { ...props } /*onRenderCheck={ this._onRenderCheck }*/ />;
    }

    @autobind
    _onRenderCheck(props) {
        let checkClass = classNames({
            'ms-DetailsRow-check': true,
            'is-checked': props.anySelected
        });

        return (
            <div
                className={checkClass}
                    role='button'
                    aria-pressed={ props.isSelected }
                    data-selection-toggle={ true }
                    aria-label={ props.ariaLabel }
                >
                <input
                    className="ms-Check"
                    type='radio'
                    checked={ props.isSelected }
                />
            </div>
        );
    }

    @autobind
    _onColumnClick (e) {
        e.preventDefault();
        
    }

    render() {
        let { contracts, columns } = (this.state.contracts.length > 0) ? this.state : this.props;
        let { selectionDetails, selectionMode, constrainMode, isHeaderVisible, contextualMenuProps } = this.state;
        let columnsRender = this._buildColumns(contracts);
        return (
            <div> 
                <div>{selectionDetails}</div>               
                <br/>
                <div className="ms-TextField">
                    <input type="text" 
                        placeholder={this.state.filterValue} 
                        className="ms-TextField-field" 
                        aria-describedby="TextFieldDescription1" 
                        aria-invalid="false" 
                        onChange={this._handleChange}
                        onKeyDown={(e) => {
                            if ((e.keyCode == 13) || (e.keyCode == 9)) {
                                e.preventDefault();
                            } 
                            return true;
                        }} />
                </div>                
                <ContractList 
                    contracts={contracts}
                    contractColumns={columnsRender}
                    selectedDetails={this._selection}
                    renderItemColumn={this._onRenderItemColumn.bind(this)}
                    selectionMode={selectionMode}
                    constrainMode={constrainMode}
                    isHeaderVisible={isHeaderVisible}
                    onRenderRow={ this._onRenderRow } />
                 
                 { contextualMenuProps && (
                    <ContextualMenu {...contextualMenuProps} />
                ) }

=======
    }   

    _getCommandItems() {
        //let { layoutMode, constrainMode, selectionMode, canResizeColumns, isLazyLoaded, isHeaderVisible } = this.state;
        return [
            {
                key: 'addContract',
                name: 'Add',
                icon: 'Add',
                title: 'Add contract',
                onClick: this._onAddContract
            },
            {
                key: 'deleteContract',
                name: 'Delete',
                icon: 'Delete',
                title: 'Delete contract',
                onClick: this._onDeleteContract,
                isDisabled: this._selection.getSelectedCount() == 1
            },
            {
                key: 'editContract',
                name: 'Edit',
                icon: 'Edit',
                title: 'Edit contract',
            }
        ];
    } 

     _getFarItems() {
        //let { layoutMode, constrainMode, selectionMode, canResizeColumns, isLazyLoaded, isHeaderVisible } = this.state;
        return [
            {
                key: 'selectedContacts',
                name: this.state.selectionDetails, 
                icon: 'Cancel',
                onClick: (e) => { e.preventDefault(); this._selection.getSelectedCount()}               
            },
            {
                key: 'infoContract',
                name: '',
                icon: 'Info',
                onClick: (e) => { e.preventDefault(); e.stopPropagating; this.setState({showPanel: !this.state.showPanel})} 
            }
        ];
    }

    _onAddContract() {
        return true;
    }

    _onDeleteContract() {
        return true;
    }

    _onEditContract() {
        return true;
    }

    _closePanel() {
        return true;
    }

    render() {
        let { contracts } = this.state.contracts.length == 0 ? this.props : this.state;
        let { selectionDetails, contextualMenuProps, isHeaderVisible, isSearchBoxVisible, togglePanel } = this.state;
        return (
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <ContractListCmdBar 
                        searchVisible={isSearchBoxVisible}
                        commandItems={this._getCommandItems()}
                        farItems={this._getFarItems()}/>                  
                    <br/>               
                    <div className="ms-TextField">
                        <input type="text" placeholder={this.state.filterValue} 
                            id="TextField0" className="ms-TextField-field" aria-describedby="TextFieldDescription1" 
                            aria-invalid="false" onChange={this._handleChange} />
                    </div>                
                        <ContractList 
                            contracts={contracts}
                            selectedDetails={this._selection}
                            renderItemColumn={this._onRenderItemColumn.bind(this)} />
                         <Panel
                            isOpen={this.state.showPanel}
                            isLightDismiss={true}
                            onDismiss= {this._closePanel.bind(this)}
                            headerText="Light Dismiss Panel"
                            >
                            <span className="ms-font-m">Light Dismiss usage is meant for the Contextual Menu on mobile sized breakpoints.</span>
                        </Panel>
                </div>
>>>>>>> 7f0d523197fb76f653116aadc8bb3647d0334edb
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
