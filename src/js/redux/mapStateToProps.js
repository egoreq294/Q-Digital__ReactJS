function mapStateToProps(component) {
    switch (component) {
        case 'SliderSection': {
            return function (state) {
                return {
                    imgStore: state.imgStore,
                };
            };
        }

        default:
            return undefined;
    }
}

export default mapStateToProps;
