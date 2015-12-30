
const mockData = [
    { id: 1, name: 'item one', done: true },
    { id: 2, name: 'item two', done: false },
    { id: 3, name: 'item three', done: false }
];

export default {
    fetch: () => {
        return new Promise((resolve, reject) => {
            if (false) {
                reject('Network Error');
            } else {
                setTimeout(() => resolve(mockData), 300);
            }
        });
    }
};
