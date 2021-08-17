import localForage from "localforage";

export default async function getFromLocalForage(cardKey, listParent) {
    try {
        const val = await localForage.getItem(`${listParent}+${cardKey}`);
        if (val) return val;
        else return null;
    } catch (err) {
        return err;
    }
}
