
const mockData = [
    { id: 1, name: 'item one', done: true },
    { id: 2, name: 'item two', done: false },
    { id: 3, name: 'item three', done: false }
];

const TASK_LS_ID = 'be330d68-66d7-4a42-8107-62b60d637f97';

function loadDataFromLocal() {
    let tasks = window.localStorage.getItem(TASK_LS_ID);
    if (tasks) {
        tasks = window.JSON.parse(window.atob(tasks)).tasks;
        return tasks;
    }
    return null;
}

export default {
    saveLocal: (tasks) => {
        tasks = window.btoa(window.JSON.stringify({tasks}));
        window.localStorage.setItem(TASK_LS_ID, tasks);
    },

    fetchLocal: () => {
        return new Promise((resolve, reject) => {
            let tasks = loadDataFromLocal();
            if (tasks) {
                resolve(tasks);
            } else {
                reject('No Tasks Found in Local Storage');
            }
        });
    },

    fetchRemote: () => {
        // simulate remote using mock data for now
        return new Promise((resolve, reject) => {
            if (false) {
                reject('Network Error');
            } else {
                setTimeout(() => resolve(mockData), 300);
            }
        });
    }
};
