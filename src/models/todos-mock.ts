/**
 * This is a naive mocked implementation of a service. Imagine it rather
 * being a decent implementation that interacts with a remote service to
 * persist/fetch data  */
 type TodoData ={
  id?:number;
  title:string;
  description:string;
  done?:boolean;
}
 export default (() => {
    let todoIdx = 3;
    let todos :TodoData[] = [
      {
        id: 1,
        title: 'Install easy-peasy',
        description:'ceci est la description',
        done: true,
      },
      {
        id: 2,
        title: 'Build an app',
        description:'ceci est la description',
        done: false,
      },
      {
        id: 3,
        title: 'Profit',
        description:'ceci est la description',
        done: false,
      },
    ];
    return {
      fetchTodos: () => Promise.resolve(todos.map(x => ({ ...x }))),
      saveTodo: (data:TodoData) => {
        todoIdx++;
        const todo = {
          id: todoIdx,
          title:data.title,
          description:data.description,
          done: false,
        };
        todos.push({ ...todo });
        return Promise.resolve(todo);
      },
      updateTodo: (id:number, data:any) => {
        const todo:any = todos.find(x => x.id === id);
        Object.keys(data).forEach((key:any) => {
          todo[key] = data[key];
        });
        return Promise.resolve({ ...todo });
      },
    };
  })();
  