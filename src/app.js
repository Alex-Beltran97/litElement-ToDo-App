import { LitElement, html, css } from 'lit';

// Components
import './components/todo-form';
import './components/task-component';

// Actions
import { getAllTasks } from './actions/tasks.action';

class MyApp extends LitElement {

  static styles = css `
    :host {
      display: block;
      padding: 0 1em;
    }

    h1 {
      text-align: center;
    }

    hr {
      margin: 1em;
    }
  `;

  static properties = {
    tasks: { type: Array },
  };

  constructor() {
    super();

    this.getTasksData();
  };

  render() {
    return html `
      <h1>To-Do List</h1>
      <todo-form></todo-form>
      <hr />
      ${ this.tasks?.map( task =>{
        return html `
          <task-component
            id="${ task.id }"
            name="${ task.taskName }"
            completed=${ JSON.stringify(task.completed) }
          ></task-component>
          `; 
        })        
      }
    `;
  };

  async getTasksData() {
    try {
      const data = await getAllTasks();
      this.tasks = data;
    } catch (err) {
      console.log(err);
    };
  };

};

customElements.define("my-app", MyApp);