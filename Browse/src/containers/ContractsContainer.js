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
        this._getSelectionDetails = this._getSelectionDetails.bind(this);
        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({ selectionDetails: this._getSelectionDetails() });
            }
        });
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
        };
    }

    _onRenderItemColumn (item, index, column) {
        let fieldContent = item[column.fieldName]

        switch(column.key) {
            case 'Title':
                return <Link data-selection-invoke={true}>{ fieldContent }</Link>;

            default: 
                return <span> { fieldContent }</span>;
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
