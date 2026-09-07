import re

p1 = 'src/pages/translations.js'
p2 = 'src/data/translations.js'

with open(p1, 'r', encoding='utf-8') as f:
    t1 = f.read()
with open(p2, 'r', encoding='utf-8') as f:
    t2 = f.read()

keys_to_add = [
    'stepOf', 'step1Title', 'step2Title', 'step3Title',
    'fieldName', 'fieldNamePlaceholder', 'fieldAge', 'fieldGender',
    'genderMale', 'genderFemale', 'genderOther', 'fieldOriginState',
    'fieldAudioLang', 'fieldConditions', 'fieldAbhaId', 'fieldAbhaPlaceholder',
    'abhaGeneratedNotice', 'stepPrev', 'successTitle', 'successSubtitle',
    'btnEnrollAnother', 'alertKioskPinInvalid'
]

for lang in ['en', 'hi', 'bn', 'ml']:
    # extract block for lang in t1
    m1 = re.search(f'{lang}: \\{{(.*?)\\}}', t1, re.DOTALL)
    if not m1: continue
    lang_block_1 = m1.group(1)
    
    # build the new keys string
    new_keys_str = ''
    for key in keys_to_add:
        m_key = re.search(f'{key}:\\s*\"(.*?)\"', lang_block_1)
        if m_key:
            new_keys_str += f'    {key}: "{m_key.group(1)}",\n'
    
    # inject into t2
    t2 = re.sub(rf'({lang}: \\{{)', rf'\1\n{new_keys_str}', t2, count=1)

with open(p2, 'w', encoding='utf-8') as f:
    f.write(t2)
print("Done merging!")
