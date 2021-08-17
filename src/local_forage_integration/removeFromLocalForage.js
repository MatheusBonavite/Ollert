import localForage from "localforage";

export default async function removeFromLocalForage(listParent, cardKey) {
    try {
        if (cardKey && listParent) {
            const doesKeyExists = await localForage.getItem("keys");
            const doesCardExists = await localForage.getItem(
                `${listParent}+${cardKey}`
            );
            if (!doesKeyExists?.length && !doesCardExists) {
                return "Card does not exists! Nothing to remove!";
            } else {
                const newKeyValues = doesKeyExists.filter(
                    (values) => values != `${listParent}+${cardKey}`
                );
                await localForage.removeItem(`${listParent}+${cardKey}`);
                await localForage.setItem("keys", newKeyValues);
            }
        }
    } catch (err) {
        return err;
    }
}
