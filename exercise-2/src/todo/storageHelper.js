const taskTemplate = {isCompleted: false, isEditing: false, value: null, id: null}
const storageKey = "taskList";

const generateTaskAndStore = (value) => {
    const newTask = { ...taskTemplate, id: getNewTaskId(), value }
    addTask(newTask);
    return newTask;
}

const getTask = (id) => {
    return getTasks().find(x => x.id === id);
}

const getTasks = () => {
    return JSON.parse(window.localStorage.getItem(storageKey)) || [];
}

const getNewTaskId = () => {
    var lastTask = [...getTasks()].reverse()[0];
    return !!lastTask ? lastTask.id + 1 : 1;
}

const setTasks = (tasks) => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
}

const addTask = (task) => {
    const tasks = getTasks();
    tasks.push(task);
    setTasks(tasks);
}

const updateTask = (task) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map(itrTask => itrTask.id === task.id ? {...itrTask, ...task} : itrTask)
    setTasks(updatedTasks);    
}

const removeTask = (id) => {
    const tasks = getTasks();
    const filteredTasks = tasks.filter(x => x.id != id);
    setTasks(filteredTasks);
}




