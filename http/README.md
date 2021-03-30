# COLLABOTICS - VSCODE REST CLIENT

## Setup

Plugin: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Add next code to the `.vscode/settings.json` file:

```json
{
  "rest-client.environmentVariables": {
    "$shared": {
      "host": "https://collabotics-framework-api.azurewebsites.net",
      "api": "https://collabotics-framework-api.azurewebsites.net/api"
    }
  }
}
```
