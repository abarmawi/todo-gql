---
sidebar_position: 3
---

# UpdateTodo

## Mutation

Creates a new pending todo.
if todoListId is provided, then the todo will be added to that list.
else, a new list will be created using todoListName, and the todo will be added to that new list.

```gql
mutation UpdateTodo($todoId: Int!, $status: TodoStatus, $title: String) {
  updateTodo(todoId: $todoId, status: $status, title: $title) {
    id
    title
    status
    todoListId
  }
}
```

This query accepts the following params

```json
{
  "todoId": 16,
  "status": "COMPLETED",
  "title": "Call my son doctor"
}
```

And returns the updated todo

```json
{
  "data": {
    "updateTodo": {
      "id": 16,
      "title": "Call my son doctor",
      "status": "COMPLETED",
      "todoListId": 1
    }
  }
}
```
