import { LitElement, html, css } from 'lit';

// Actions
import { createATask } from '../actions/tasks.action';

export class TodoForm extends LitElement {

  static styles = css `
    :host {
      display: block;
      margin: 1rem; 
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    button {
      align-self: center;
    }
  `;

  render() {
    return html `
      <form id="form" @submit="${ this.handleSubmit }">
        <label for="task">Task Name:</label>
        <input type="task" id="task" name="task" placeholder="Set your task here" />
        <button type="submit">Submit</button>
      </form>      
    `;
  };

  handleSubmit(e) {
    e.preventDefault();

    const form = this.shadowRoot.getElementById("form");
    const formData = new FormData(form);

    const taskName = formData.get("task");

    if(!taskName.trim()) return alert("Task field could not be empty. Please set a task name.");

    this.createTask(taskName.trim());

    form.reset();

    setTimeout(()=>location.reload(), 1000);

  };

  async createTask(taskName) {
    try {
      await createATask({ taskName, completed: false });
    } catch (err) {
      console.log(err);
    }
  };

};

customElements.define("todo-form", TodoForm);