import { createSignal } from "solid-js";
import "./TodoList.css"

interface Task {
  text: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = createSignal<Task[]>([]);
  const [newTask, setNewTask] = createSignal<string>("");

  const addTask = () => {
    if (newTask()) {
      setTasks([...tasks(), { text: newTask(), completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (index: number) => {
    const updatedTasks = tasks().map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    setTasks(tasks().filter((_, i) => i !== index));
  };

  return (
    <div>
    <div class="row">
      <input
        type="text"
        value={newTask()}
        onInput={(e) => setNewTask(e.target.value)}
      />
      <button class="addTask" onClick={addTask}>Ekle</button>
      </div>
      <div class="tasks">
        {tasks().map((task, index) => (
          <div class="task" key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            <span onClick={() => toggleComplete(index)}>{task.text}</span>
            <button class="remove" onClick={() => removeTask(index)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}