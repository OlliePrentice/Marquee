import { Component } from 'react';
import FormButton from '../elements/form-button';
import FormLabel from '../elements/form-label';
export default class AddCategories extends Component {

    constructor(props) {
        super(props);

        this.state = {pageComplete: false, checkedItems: []};
        this.handleChecked = this.handleChecked.bind(this);
        this.handlePageComplete = this.handlePageComplete.bind(this);
    }

    handleChecked(e, item) {
        const itemsArray = [...this.state.checkedItems];

        if(e.target.checked) {
            itemsArray.push(item);
        } else {
            itemsArray.splice(item, 1);
        }
        
        this.setState({
            checkedItems: itemsArray,
        })

        this.handlePageComplete(itemsArray);
    }

    handlePageComplete(items) {

        this.setState({
            pageComplete: items.length > 0 ? true : false,
        });
    }


    render() {
        return (
            <div>
                <div className="relative mb-12">
                    <FormLabel>Pick some tags:</FormLabel>
                    <ul className="-mx-2">
                        {this.props.categories.map((item, i) => {
                            return (
                                <li key={i} className="mb-3 inline-block px-2">
                                    <input type="checkbox" onChange={(e) => this.handleChecked(e, item.name)} value={item.name}
                                           id={item.name + '-category'}
                                           name="level_one_category"/>
                                    <label htmlFor={item.name + '-category'} className="radio-btn">{item.title}</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div>
                    <FormButton type="button"
                            disabled={!this.state.pageComplete}
                            onClick={() => this.props.pageHandler(3)}>Next</FormButton>
                </div>

            </div>
        );
    }
}

