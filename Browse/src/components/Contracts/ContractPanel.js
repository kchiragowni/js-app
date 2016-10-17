import React, { PropTypes } from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Button } from 'office-ui-fabric-react/lib/Button';

class ContractPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPanel: true
        };
    }
    _showPanel() {
        this.setState( {showPanel: true } );
    }

    _closePanel() {
        this.setState( {showPanel: false } );
    }

    render(){
        <div>
            <Button 
                description="Opens the Sample Panel" 
                onClick={this._showPanel.bind(this)}>Open Panel
            </Button>
            <Panel
                isOpen={this.state.showPanel}
                isLightDismiss={true}
                onDismiss= {this._closePanel.bind(this)}
                headerText="Light Dismiss Panel"
            >
                <span className="ms-font-m">Light Dismiss usage is meant for the Contextual Menu on mobile sized breakpoints.</span>
            </Panel>
        </div>
    }
}


ContractPanel.propTypes = {
    togglePanel: PropTypes.bool
};

export default ContractPanel;