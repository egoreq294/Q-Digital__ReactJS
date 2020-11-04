function mapStateToProps(component) {
    switch(component) {        
        case "SliderSection": {
            return function (state) {
                return {
                    toggle: state.toggle
                };
            }
        }
        
        default: return undefined;
    }
}

export default mapStateToProps;