export function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
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
