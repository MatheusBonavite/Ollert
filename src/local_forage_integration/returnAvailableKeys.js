import localForage from "localforage";

export default async function returnAvailableKeys() {
    try {
        const val = await localForage.getItem("keys");
        return val;
    } catch (err) {
        console.log(err);
        return err;
    }
}
