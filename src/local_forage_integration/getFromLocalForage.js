import localForage from "localforage";

export default async function getFromLocalForage(cardKey, listParent) {
    try {
        console.log("From getFromLocalForage >>> ", cardKey, listParent);
        console.log(`From getFromLocalForage >>>  ${listParent}+${cardKey}`)
        const val = await localForage.getItem(`${listParent}+${cardKey}`);
        if(val) return val;
        else return null;
        
    } catch (err) {
        console.log(err);
        return err;
    }
}
