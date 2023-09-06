class HttpService {
  constructor(URI) {
    this.URI = URI;
  };

  async getAll(PATH = "") {
    try {

      const data = await fetch(this.URI+PATH);
      return await data.json();
      
    } catch (err) {
      console.log(err);
    };
  };

  async post(PATH = "", body) {
    body = JSON.stringify(body);
    try {
      await fetch(this.URI+PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      console.log("Task Created!");
    } catch (err) {
      console.log(err);
    };
  };

  async patch(PATH = "", id, body) {
    body = JSON.stringify(body);
    id = "/"+id;
    try {
      await fetch(this.URI+PATH+id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      console.log("Task Updated!");
    } catch (err) {
      console.log(err);
    };
  };

  async delete(PATH = "", id) {
    id = "/"+id;
    try {
      await fetch(this.URI+PATH+id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Task Deleted!");
    } catch (err) {
      console.log(err);
    };
  }

};

export default new HttpService("http://localhost:3001");