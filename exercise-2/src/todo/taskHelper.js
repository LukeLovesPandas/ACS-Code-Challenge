
const buildTask = (taskItem) => {
    const todoTemplate = document.getElementById("todoItemTemplate");
    const newTodo = document.importNode(todoTemplate.content, true);
    newTodo.querySelector('li').id = `task_${taskItem.id}`;
    newTodo.querySelector('label').innerText = taskItem.value;
    newTodo.querySelector('input[type=text]').value = taskItem.value;
    newTodo.querySelector('button.edit').addEventListener('click', () => toggleTaskElementEdit(taskItem.id),  false)
    newTodo.querySelector('button.delete').addEventListener('click', () => deleteTaskElement(taskItem.id), false)
    newTodo.querySelector("input[type=checkbox]").addEventListener('click', () => toggleTaskCompletion(taskItem.id), false);
    const incompleteTaskItemList = document.getElementById('incomplete-tasks');
    incompleteTaskItemList.appendChild(newTodo);

    toggleTaskElementEditMode(taskItem.id, taskItem.isEditing);
    toggleTaskElementCompletion(taskItem.id, taskItem.isCompleted);
    return newTodo;
}

const getTaskElement = (id) => {
    return document.getElementById(`task_${id}`);
}

const toggleTaskElementEditMode = (id, isEditing) => {
    const taskElement = getTaskElement(id);
    if (isEditing) {
        getEditText(taskElement).value = getDisplayLabel(taskElement).innerText;
        taskElement.classList.add("editMode");
    } else {
        getDisplayLabel(taskElement).innerText = getEditText(taskElement).value;
        taskElement.classList.remove("editMode");
    }
    getEditButton(taskElement).innerText = isEditing ? "Save" : "Edit";
}

const getEditText = (taskElement) => {
    return taskElement.querySelector("input[type=text");
}

const getDisplayLabel = (taskElement) => {
    return taskElement.querySelector("label");
}

const getEditButton = (taskElement) => {
    return taskElement.querySelector("button.edit");
}

const getTaskValue = (id) => {
    return getDisplayLabel(getTaskElement(id)).innerText;
}

const deleteTaskFromList = (id) => {
    const taskToDelete = getTaskElement(id);
    const parentList = taskToDelete.parentNode;
    parentList.removeChild(taskToDelete);
}

const toggleTaskElementCompletion = (id, isCompleted) => {
    const taskToToggleCompletion = getTaskElement(id);
    const parentListIdentifier = isCompleted ? 'completed-tasks' : 'incomplete-tasks';
    document.getElementById(parentListIdentifier).appendChild(taskToToggleCompletion);
}