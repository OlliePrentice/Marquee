import { useState } from 'react';
import FormButton from '../elements/form-button';
import FormLabel from '../elements/form-label';

export default function AddCategories(props) {
    const [pageComplete, setPageComplete] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);

    function handleChecked(e, item) {
        const itemsArray = [...checkedItems];

        if(e.target.checked) {
            itemsArray.push(item);
        } else {
            itemsArray.splice(item, 1);
        }
        
        setCheckedItems(itemsArray);

        handlePageComplete(itemsArray);
    }

    function handlePageComplete(items) {

        setPageComplete(items.length > 0 ? true : false);

    }

    return (
        <div>
            <div className="relative mb-12">
                <FormLabel>Pick some tags:</FormLabel>
                <ul className="-mx-2">
                    {props.categories.map((item, i) => {
                        return (
                            <li key={i} className="mb-3 inline-block px-2">
                                <input type="checkbox" onChange={(e) => handleChecked(e, item.name)} value={item.name}
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
                        disabled={!pageComplete}
                        onClick={() => props.pageHandler(3)}>Next</FormButton>
            </div>
        </div>
    )
}