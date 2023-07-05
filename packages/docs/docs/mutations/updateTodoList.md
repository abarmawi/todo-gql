---
sidebar_position: 3
---

# updateTodoList

## Mutation

Updates a todo list.

```gql
mutation UpdateTodoList($todoListId: Int!, $title: String) {
  updateTodoList(todoListId: $todoListId, title: $title) {
    id
    title
  }
}
```

This query accepts the following params

```json
{
  "todoListId": 2,
  "title": "Check my work email"
}
```

And returns the updated list

```json
{
  "data": {
    "updateTodoList": {
      "id": 2,
      "title": "Check my work email"
    }
  }
}
```
