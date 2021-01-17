import React, {useState, useEffect, useRef} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;

    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length; i--;) {
        if (scripts[i].src === url) return true;
    }
    document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery)
    );
}

async function handlePlaceSelect(updateQuery, updateValidity) {
    const addressObject = autoComplete.getPlace();
    const address = addressObject.formatted_address;

    if (addressObject.address_components) {
        updateQuery({
            value: address,
            valid: true
        });
    } else {
        updateQuery({
            value: address,
            valid: false
        });
    }
}

function SearchLocationInput(props) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);

    return (
        <div className="search-location-input">
            <label htmlFor="addressSearch" className="text-2xl block mb-4">Enter your spaces address:</label>
            <div className="relative">
                <input
                    id="addressSearch"
                    className="pr-16"
                    ref={autoCompleteRef}
                    onChange={event => setQuery({value: event.target.value, valid: false})}
                    placeholder="Enter an Address"
                    value={query.value ? query.value : ''}
                />
                <button type="button" onClick={() => props.pageHandler(2)}
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 h-full flex items-center px-5 text-gray-200 pointer-events-none ${query.valid && 'text-green-400 pointer-events-auto hover:text-black'}`}>
                    <FontAwesomeIcon size="lg" icon={['fas', 'arrow-alt-circle-right']}/></button>
            </div>
        </div>
    );
}

export default SearchLocationInput;
