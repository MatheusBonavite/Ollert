import localForage from "localforage";

export default async function removeFromLocalForage(listParent, cardKey) {
    console.log("Trying to remove from localForage! ", listParent, cardKey);
    try {
        if (cardKey && listParent) {
            const doesKeyExists = await localForage.getItem("keys");
            const doesCardExists = await localForage.getItem(
                `${listParent}+${cardKey}`
            );
            if (!doesKeyExists?.length && !doesCardExists) {
                console.log("Card does not exists! Nothing to remove!");
            } else {
                const newKeyValues = doesKeyExists.filter(
                    (values) => values != `${listParent}+${cardKey}`
                );
                await localForage.removeItem(`${listParent}+${cardKey}`);
                console.log("newKeyValues >> ", newKeyValues);
                await localForage.setItem("keys", newKeyValues);
            }
        }
    } catch (err) {
        console.log(err);
    }
}
