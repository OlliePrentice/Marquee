import format from 'date-fns/format';
import { enGB } from 'date-fns/locale';

const locales = {
    en: enGB,
};

export default function formatLocale(date, formatStr) {
    return format(date, formatStr, {
        locale: locales[global.__localeId__]
    })
};
