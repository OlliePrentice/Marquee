import {Component} from 'react';
import axios from "axios";
import FormButton from "../elements/form-button";

const blankItems = [];
for (let i = 0; i < 5; i++) {
    blankItems.push({name: ".....", title: "....."});
}

export default class AddCategories extends Component {

    constructor(props) {
        super(props);

        this.state = {subCategories: blankItems, subCategoriesActive: false, pageComplete: false};
        this.categoryHandler = this.categoryHandler.bind(this);
        this.handlePageComplete = this.handlePageComplete.bind(this);
    }

    handlePageComplete(complete) {
        this.setState({
            pageComplete: complete,
        });
    }

    async categoryHandler(val) {

        try {
            const response = await axios.get('/api/add-space/subcategories', {
                params: {
                    category: val
                }
            });

            if (response.data.subCategories.length) {
                this.setState({
                    subCategories: response.data.subCategories,
                    subCategoriesActive: true
                });
            } else {
                this.setState({
                    subCategories: blankItems,
                    subCategoriesActive: false
                });
            }

        } catch (err) {
            console.log(err);

            this.setState({
                subCategories: blankItems,
                subCategoriesActive: false
            });

        }

    }


    render() {
        return (
            <div>

                <div className="relative mb-10">
                    <h3 className="text-2xl block mb-4">Select a category:</h3>
                    <ul className="-mx-2">
                        {this.props.categories.map((item, i) => {
                            return (
                                <li key={i} className="mb-3 inline-block px-2">
                                    <input type="radio" onChange={() => this.categoryHandler(item)} value={item.name}
                                           id={item.name + '-category'}
                                           name="level_one_category"/>
                                    <label htmlFor={item.name + '-category'} className="radio-btn">{item.title}</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div
                    className={`relative mb-10 ${!this.state.subCategoriesActive && 'pointer-events-none opacity-50'}`}>
                    <h3 className="text-2xl block mb-4">Pick a subcategory:</h3>
                    <ul className="-mx-2">
                        {this.state.subCategories.map((item, i) => {
                            return (
                                <li key={i} className="mb-3 inline-block px-2">
                                    <input type="radio" value={item.name}
                                           id={item.name + '-category'}
                                           onChange={() => this.handlePageComplete(true)}
                                           name="level_two_category"/>
                                    <label htmlFor={item.name + '-category'} className="radio-btn">{item.title}</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={`${!this.state.pageComplete && 'pointer-events-none opacity-50'}`}>
                    <FormButton type="button" title="Next" pageNumber={3} pageHandler={this.props.pageHandler}/>
                </div>
                {/*<button type="button" onClick={() => console.log('test')}>test</button>*/}

            </div>
        );
    }
}

