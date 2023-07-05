---
sidebar_position: 3
---

# createTodoList

## Mutation

Creates a new todo list.

```gql
mutation CreateTodoList($title: String!) {
  createTodoList(title: $title) {
    id
    title
  }
}
```

This query accepts the following params

```json
{
  "title": "Check my emails"
}
```

And returns the created list

```json
{
  "data": {
    "createTodoList": {
      "id": 2,
      "title": "Check my emails"
    }
  }
}
```
