function mapStateToProps(component) {
    switch(component) {        
        case "Slider": {
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