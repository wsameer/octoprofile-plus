export const convertMapToArray = data => {
    const result = [];
    [...data]
        .sort((a, b) => b[1] - a[1])
        .forEach(([key, value]) => {
            let objectToAdd = { key, value };
            result.push(objectToAdd);
        });
    return result;
};
