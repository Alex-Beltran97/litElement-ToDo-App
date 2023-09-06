import { LitElement, html, css } from 'lit';
import { completeTask, deleteTask } from '../actions/tasks.action';

export class TaskComponent extends LitElement {

  static styles = css `
    :host {
      display: flex;
      border: 1px solid black;
      margin: 1rem;
      padding: 1rem;
      align-items: center;
      justify-content: space-between;
    }

    .options {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `;

  static properties = {
    name: { type: String },
    completed: { type: String },
    id: { type: String },
  };

  constructor() {
    super();
    
    this.completed = "false";
  };

  render() {
    return html `
      <label>${ this.name }</label>
      <div class="options">
        ${ this.inputField(this.completed, this.completeTask) }
        <p @click="${ this.confirmDeleteTask }">🗑️</p>
      </div>
    `;
  };

  inputField(status = false, callback) {
    status = JSON.parse(status);
    if(status) {
      return html `<input type="checkbox" checked @change="${ callback }" />`;
    };

    return html `<input type="checkbox" @change="${ callback }" />`
  };

  async completeTask(e) {
    try {
      await completeTask(e.target.checked, this.id);

      location.reload();
    } catch (err) {
      console.log(err);
    };
  };

  confirmDeleteTask() {
    const toDelete = confirm("Are you sure to delete this task?");

    if(toDelete) {
      this.deleteTask(this.id);
    };
  };

  async deleteTask(id = "") {
    try {
      await deleteTask(id);

      setTimeout(()=>location.reload(), 1000);
    } catch (err) {
      console.log(err);
    };
  }
};

customElements.define("task-component", TaskComponent);