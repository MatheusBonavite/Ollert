import localForage from "localforage";

export default async function removeFromLocalForage(listParent, cardKey) {
    console.log("Trying to remove from localForage! ", listParent, cardKey);
    try {
        if(cardKey && listParent) {
            const doesKeyExists = await localForage.getItem("keys");
            const doesCardExists = await localForage.getItem(`${listParent}+${cardKey}`);
            if (!doesKeyExists?.length || !doesCardExists) {
                console.log("Card does not exists! Nothing to remove!");
            } else {
                await localForage.removeItem(`${listParent}+${cardKey}`)
                const newKeyValues = doesKeyExists.filter(values => values != `${listParent}+${cardKey}`);
                await localForage.setItem("keys",newKeyValues);
            }
        }
    } catch (err) {
        console.log(err);
    }
}