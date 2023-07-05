---
sidebar_position: 3
---

# todos

## Query

Lists all available todos for the user

```gql
query Todos($searchParams: TodoSearchParams!) {
  todos(searchParams: $searchParams) {
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
  "searchParams": {
    "status": "PENDING", # COMPLETED | PENDING
    "limit": 10,
    "offset": 0,
    "todoListId": null
  }
}
```

And returns list of Todos

```json
{
  "data": {
    "todos": [
      {
        "id": 15,
        "title": "Send email to John",
        "status": "PENDING",
        "todoListId": 4,
        "todoList" {
          "id": 5,
          "title": "Work"
        }
      },
      {
        "id": 15,
        "title": "Call the doctor",
        "status": "PENDING",
        "todoListId": 3,
        "todoList" {
          "id": 2,
          "title": "Personal"
        }
      }
    ]
  }
}
```
