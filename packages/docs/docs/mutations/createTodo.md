---
sidebar_position: 3
---

# createTodo

## Mutation

Creates a new pending todo.
if todoListId is provided, then the todo will be added to that list.
else, a new list will be created using todoListName, and the todo will be added to that new list.

```gql
mutation Mutation($title: String!, $todoListName: String) {
  createTodo(title: $title, todoListName: $todoListName) {
    id
    title
    status
    todoListId
    todoList {
      id
      title
    }
  }
}
```

This query accepts the following params

```json
{
  "title": "Call the doctor",
  "todoListName": "Personal"
}
```

And returns the created todo

```json
{
  "data": {
    "createTodo": {
      "id": 16,
      "title": "Call the doctor",
      "status": "PENDING",
      "todoListId": 1,
      "todoList": {
        "id": 1,
        "title": "Personal"
      }
    }
  }
}
```
