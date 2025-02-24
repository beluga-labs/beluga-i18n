import { useContext } from 'react';
import { TranslationsContext } from './TranslationsProvider';

const getNestedTranslation = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const useTranslation = () => {
    const context = useContext(TranslationsContext);
    if (!context) {
        throw new Error(
            'useTranslations must be used within a TranslationsProvider'
        );
    }
    const { translations, language } = context;

    return {
        t: (key: string) => {
            const translation = getNestedTranslation(
                translations?.[language],
                key
            );
            return translation || key;
        },
        changeLanguage: context.changeLanguage
    };
};

export default useTranslation;
