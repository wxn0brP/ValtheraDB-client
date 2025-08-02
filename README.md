# ValtheraDB Client

This is the client library for [ValtheraDB](https://github.com/wxn0brp/ValtheraDB)

## Installation

```bash
npm install @wxn0brp/db-client
```

## Usage

```js
import { ValtheraRemote } from "@wxn0brp/db-client";

const db = new ValtheraRemote({
    url: "http://localhost",
    auth: "your-auth-token",
    name: "myDatabase"
});

await db.add("user", { name: "John Doe" });
```

## License

MIT