## Unofficial aoi.js Functions API

### Base URL
https://aoijs-api.vercel.app/api/v1

---

## Endpoints

### `/functions`

**Method:** `GET`

**Description:** This endpoint allows you to search for a specific function.

**Query Parameters:**

- `name`: The name of the function you're searching for.

**Example Request:**

```
GET /functions?name=ban
```

**Example Response:**

```json
{
  "endpoint": "/functions",
  "status": 200,
  "data": {
    "function": "ban",
    "description": "`$ban` will ban a user of a guild.",
    "usage": "$ban[guildID;userID;days?;reason?]",
    "example": "This will ban a random user of your guild:\r\n\r\n```javascript\r\nclient.command({\r\n  name: \"ban\",\r\n  code: `\r\n  $ban[$guildID;$randomUserID;7;Imagine getting banned.]\r\n  `\r\n});\r\n```",
    "table": [
      {
        "guildID?": {
          "type": "[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)",
          "description": "From which guild the user should be banned from.",
          "required": "true"
        }
      },
      {
        "userID": {
          "type": "[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)",
          "description": "The user to ban.",
          "required": "true"
        }
      },
      {
        "days?": {
          "type": "[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)",
          "description": "Days of message history to delete, cannot be higher than 7 days",
          "required": "false"
        }
      },
      {
        "reason?": {
          "type": "[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)",
          "description": "The reason that will be displayed in the guild's audit logs.",
          "required": "false"
        }
      }
    ],
    "package": "aoi.js",
    "documentation": "https://aoi.js.org/functions/interaction/ban",
    "source-code": "https://github.com/AkaruiDevelopment/aoi.js/tree/v6/src/functions/interaction/ban.js"
  }
}
```

### `/find`

**Method:** `GET`

**Description:** This endpoint allows you to find a list of functions that match a specific name.

**Query Parameters:**

- `name`: The name of the function you're searching for.
- `list`: The number of matching functions you want to return. Defaults to 5.

**Example Request:**

```
GET /find?name=get&list=3
```

**Example Response:**

```json
{
  "endpoint": "/find",
  "status": 200,
  "functions": [
    "get",
    "getCurrentTrackDuration",
    "getFilters",
    "getAutomodRuleId",
    "getGuildAutomodNames"
  ]
}
```

### `/functionlist`

**Method:** `GET`

**Description:** This endpoint returns all function names.

**Example Request:**

```
GET /functionlist
```

**Example Response:**

```json
{
  "endpoint": "/functionlist",
  "status": 200,
  "functions": [
    "get",
    "getCurrentTrackDuration",
    "getFilters",
    "getAutomodRuleId",
    "getGuildAutomodNames",
    ...
  ]
}
```
