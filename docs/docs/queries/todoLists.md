---
sidebar_position: 3
---

# todoLists

## Query

Lists all available todo lists for the user

```gql
query TodoLists {
  todoLists {
    id
    title
    todos {
      id
      title
      status
      todoListId
    }
  }
}
```

This query doesn't accept any params

And returns list of Todo Lists

```json
{
  "data": {
    "todoLists": [
      {
        "id": 1,
        "title": "Personal",
        "todos": [
          {
            "id": 16,
            "title": "Call the doctor",
            "status": "PENDING",
            "todoListId": 1
          }
        ]
      }
    ]
  }
}
```
