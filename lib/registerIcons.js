import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


export default function registerIcons() {
    config.autoAddCss = false;

    library.add(fab, faArrowAltCircleRight);
}