import { bindActionCreators } from 'redux';
import toggleLocalOrRemoteCreator from './actionCreators';

function mapDispatchToProps(component) { 
    switch(component) {
        case "Slider": return function(dispatch) {
            return {
                changeToggle: bindActionCreators(toggleLocalOrRemoteCreator, dispatch)
            };
        };
        
        default: return undefined;
    }
}

export default mapDispatchToProps;