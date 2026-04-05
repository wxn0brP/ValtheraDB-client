import { Remote } from "./remote";

export function parseRemote(remote: string | Remote) {
    if (typeof remote === "string") {
        const urlObj = new URL(remote);
        const name = urlObj.username;
        const auth = urlObj.password;
        if (!name || !auth) throw new Error("Invalid remote database");

        urlObj.username = "";
        urlObj.password = "";
        const url = urlObj.toString().slice(0, -1);

        remote = {
            name,
            url,
            auth
        };
    }

    if (remote.url.endsWith("/"))
        remote.url = remote.url.slice(0, -1);

    return remote;
}
