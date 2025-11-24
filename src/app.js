const db = firebase.firestore();

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Function to add a new task
const addTask = async () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    try {
      const docRef = await db.collection("tasks").add({
        text: taskText,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      taskInput.value = "";
      displayTasks();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};

// Function to display tasks
const displayTasks = async () => {
  taskList.innerHTML = "";
  const querySnapshot = await db.collection("tasks").get();
  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    taskList.appendChild(li);
  });
};

addTaskBtn.addEventListener("click", addTask);

// Initial display of tasks
displayTasks();
