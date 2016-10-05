/*eslint-disable no-unused-vars*/
/*eslint-disable no-console*/
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contractActions from '../actions/contractActions'; 
import ContractList from '../components/Contracts/ContractList';
/* office ui fabric */
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
//import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Link } from 'office-ui-fabric-react/lib/Link';
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
        this._getSelectionDetails = this._getSelectionDetails.bind(this);
        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
        });


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
        };
    }

    _onRenderItemColumn (item, index, column) {
        if (column.key.isRowHeader) {
            return "Header";
        } else if (column.key === 'Title') {
            return <Link data-selection-invoke={true}>{ item[column.key] }</Link>;
        } else if (column.key === 'StartDate' || column.key === 'EndDate') {
            return new Date(item[column.key]).toLocaleDateString();
        } else {
            return item[column.key];
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

    _handleChange (e) {
        e.preventDefault();
        let value = e.target.value;
        let { contracts } = this.props;
        this.setState(
        { 
            contracts: value ? contracts.filter(i => i.Title.toLowerCase().indexOf(value) > -1) : contracts 
        });
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
