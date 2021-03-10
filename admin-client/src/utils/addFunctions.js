export function formatSelectList(list) {
    if (list && list.length > 0) {
        let newSelectList = []
        for (let i = 0; i < list.length; i++) {
            newSelectList.push({value: list[i].id, label: list[i].name})
        }
        return newSelectList;
    } else return []
}

export function sortByEnumType(list, enumType) {
    if (list && list.length > 0) {
        let newSelectList = []
        for (let i = 0; i < list.length; i++) {
            if (list[i].clientStatusEnum === enumType) {
                newSelectList.push({value: list[i].id, label: list[i].name})
            }
        }
        return newSelectList;
    } else return []
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

export function sortList(list) {
    let items = [...list]
    items.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    return items;
}

export function formatParentPhone(parrentsPhoneString) {
    var cleaned = ('' + parrentsPhoneString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
    }
    return null
}

export function normalizeInput(value, previousValue) {
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {

        // returns: "x", "xx", "xxx"
        if (cvLength < 4) return currentValue;

        // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
        if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

        // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
}

export function setBg() {
    let ketmon = '0'
    while (ketmon.substring(0, 1) < 5 && ketmon.substring(0, 1) < 9) {
        ketmon = Math.floor(Math.random() * 16777215).toString(16);
    }
    return "#" + ketmon;
}