export function formatSelectList(list) {
    let newSelectList = []
    for (let i = 0; i < list.length; i++) {
        newSelectList.push({value: list[i].id, label: list[i].name})
    }
    return newSelectList;
}

export function formatPhoneNumber(phoneNumberString) {
    if (phoneNumberString && phoneNumberString.length > 8) {
        let phoneNumber = phoneNumberString.substring(0, 9)
        var cleaned = ('' + phoneNumber).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
        }
    }

    return null
}

export function formatParentPhone(parrentsPhoneString) {
    var cleaned = ('' + parrentsPhoneString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
    }
    return null
}
