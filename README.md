# ValtheraDB Client

This is the client library for 
[ValtheraDB-server](https://github.com/wxn0brP/ValtheraDB-server)
powered by
[ValtheraDB](https://github.com/wxn0brP/ValtheraDB)

## Installation

```bash
npm install @wxn0brp/db-client
```

## Usage

```js
import { ValtheraRemote } from "@wxn0brp/db-client";

const db = new ValtheraRemote({
    url: "http://localhost:14785",
    auth: "your-auth-token",
    name: "myDatabase"
});
// or
const db2 = new ValtheraRemote("http://myDatabase:your-auth-token@localhost:14785");

await db.add("user", { name: "John Doe" });
```

## License

MIT