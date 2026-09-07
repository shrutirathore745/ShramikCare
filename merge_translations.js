import { readFileSync, writeFileSync } from 'fs';

const p1 = 'src/pages/translations.js';
const p2 = 'src/data/translations.js';

let t1 = readFileSync(p1, 'utf8');
let t2 = readFileSync(p2, 'utf8');

const keysToAdd = [
    'stepOf', 'step1Title', 'step2Title', 'step3Title',
    'fieldName', 'fieldNamePlaceholder', 'fieldAge', 'fieldGender',
    'genderMale', 'genderFemale', 'genderOther', 'fieldOriginState',
    'fieldAudioLang', 'fieldConditions', 'fieldAbhaId', 'fieldAbhaPlaceholder',
    'abhaGeneratedNotice', 'stepPrev', 'successTitle', 'successSubtitle',
    'btnEnrollAnother', 'alertKioskPinInvalid'
];

['en', 'hi', 'bn', 'ml'].forEach(lang => {
    // extract block for lang in t1
    const regex1 = new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\\}`, 'm');
    const m1 = t1.match(regex1);
    if (!m1) return;
    const langBlock1 = m1[1];
    
    // build the new keys string
    let newKeysStr = '';
    keysToAdd.forEach(key => {
        const regexKey = new RegExp(`${key}:\\s*"([^"]+)"`);
        const mKey = langBlock1.match(regexKey);
        if (mKey) {
            newKeysStr += `    ${key}: "${mKey[1]}",\n`;
        }
    });
    
    // inject into t2
    const replaceRegex = new RegExp(`(${lang}:\\s*\\{)`);
    t2 = t2.replace(replaceRegex, `$1\n${newKeysStr}`);
});

writeFileSync(p2, t2, 'utf8');
console.log("Done merging!");
