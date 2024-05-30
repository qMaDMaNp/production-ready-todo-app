export const getObjectByKeyValue = (arr, value, key = 'id') => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === value) return arr[i];
    }

    return null;
};

export const getObjectIndexByKeyValue = (arr, value, key = 'id') => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === value) return i;
    }

    return null;
};

export const getExistenceByKeyValue = (arr, value, key = 'id') => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === value) return true;
    }

    return false;
};

export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
};