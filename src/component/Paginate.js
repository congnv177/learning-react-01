import React, { Component} from "react";
import PropTypes from 'prop-types';

export default class Paginate extends Component {
    static propTypes = {
        pageCount: PropTypes.number.isRequired,
        onPageChange: PropTypes.func,
        onPageActive: PropTypes.func,
        initialPage: PropTypes.number,
        forcePage: PropTypes.number,
        // prevRel: PropTypes.string,
        previousLabel: PropTypes.node,
        // previousAriaLabel: PropTypes.string,
        // previousClassName: PropTypes.string,
        // nextRel: PropTypes.string,
        nextLabel: PropTypes.node,
        containerClassName: PropTypes.string,
        activeClassName: PropTypes.string,
        // nextAriaLabel: PropTypes.string,
        // nextClassName: PropTypes.string,
        // eventListener: PropTypes.string,
        // disableInitialCallback: PropTypes.bool,
        // extraAriaContext: PropTypes.string,
    }
    
    static defaultProps = {
        pageCount: 10,
        prevRel: 'prev',
        previousLabel: 'Previous',
        previousAriaLabel: 'Previous page',
        previousClassName: 'previous',
        nextRel: 'next',
        nextLabel: 'Next',
        nextAriaLabel: 'Next page',
        nextClassName: 'next',
        disableInitialCallback: false,
        eventListener: 'onClick',
    }
    
    constructor(props) {
        super(props);
        
        let initialSelected;
        if (props.initialPage) {
            initialSelected = props.initialPage;
        } else {
            initialSelected = 0;
        }
        
        this.state = {
            selected: initialSelected,
        }
    }
    
    componentDidMount() {
        const {
            initialPage,
            disableInitialCallback,
        } = this.props;
        
        if (initialPage && !disableInitialCallback) {
            this.callCallback(initialPage);
        }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.forcePage && this.props.forcePage !== prevProps.forcePage) {
            this.setState({
                selected: this.props.forcePage
            });
        }
    }
    
    handlePrevPage = (e) => {
        const { selected } = this.state;
        
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        if (selected > 0) {
            this.handlePageSelected(selected - 1, e)
        }
    }
    
    handleNextPage = (e) => {
        const { selected } = this.state;
        const { pageCount } = this.props;
        
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        
        if (selected < pageCount - 1) {
            this.handlePageSelected(selected + 1, e);
        }
    }

    getEventListener = (handlerFunction) => {
        const { eventListener } = this.props;
        return {
            [eventListener]: handlerFunction,
        };
    };
    
    handlePageSelected = (selected, e) => {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        
        if (this.state.selected === selected) {
            this.callActiveCallback(selected);
            return;
        }
        
        this.setState({ selected: selected});
        
        // call the callback with the new selected item
        this.callCallback(selected)
    }
    
    callCallback = (selectedItem) => {
        if (typeof this.props.onPageChange !== 'undefined' && typeof this.props.onPageChange === 'function') {
            this.props.onPageChange({ selected: selectedItem});
        }
    }
    
    callActiveCallback = (selectedItem) => {
        if (typeof this.props.onPageActive !== 'undefined' && typeof this.props.onPageActive === 'function') {
            this.props.onPageActive({ selected: selectedItem});
        }
    }
    
    // pagination = () => {
    //     const items = [];
    //     const {
    //         pageRangeDisplayed,
    //         pageCount,
    //     } = this.props;
    //    
    //     const { selected } = this.state;
    //    
    //     if (pageCount <= pageRangeDisplayed) {
    //         for (let idx = 0; idx < pageCount; idx++) {
    //             items.push(this.getPageElement(idx));
    //         }
    //     } else {
    //         let leftSide = pageRangeDisplayed / 2;
    //         let rightSide = pageRangeDisplayed - leftSide;
    //     }
    // }
    
    render() {
        const {
            pageCount,
            containerClassName,
            previousLabel,
            nextLabel,
        } = this.props;
        
        const { selected } = this.state;
        
    }

}