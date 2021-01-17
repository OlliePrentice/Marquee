import {Component} from 'react';
import FormButton from "../elements/form-button";

class CalendarBuilder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>

                <div>
                    <FormButton type="button" title="Next" pageNumber={5}
                                disabled={true}
                                pageHandler={this.props.pageHandler}/>
                </div>
            </>
        )
    }
}

export default CalendarBuilder;
