import localForage from "localforage";

export default async function getFromLocalForage(cardKey, listParent) {
    try {
        const val = await localForage.getItem(`${listParent + cardKey}`);
        console.log(val);
    } catch (err) {
        console.log(err);
    }
}
