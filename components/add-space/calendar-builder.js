import {Component} from 'react';
import FormButton from "../elements/form-button";
import CalendarType from "./calendar-sections/calendar-type";
import CalendarDivision from "./calendar-sections/calendar-division";
import CalendarDefaults from "./calendar-sections/calendar-defaults";

class CalendarBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {division: 'daily'};

        this.handleDivisionChange = this.handleDivisionChange.bind(this);
    }

    handleDivisionChange(division) {
        this.setState({
            division
        })
    }

    render() {
        return (
            <>
                <div className="mb-12">
                    <CalendarType />
                </div>
                <div className="mb-12">
                    <CalendarDivision updateDivision={this.handleDivisionChange} />
                </div>
                <div className="mb-12">
                    <CalendarDefaults division={this.state.division} />
                </div>
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
