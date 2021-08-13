import localForage from "localforage";

export default async function integrateWithLocalForage(card) {
    const { cardKey, listParent } = card;
    try {
        await localForage.setItem(`${listParent}+${cardKey}`, card);

        const val = await localForage.getItem(`${listParent + cardKey}`, card);
        console.log(val);
    } catch (err) {
        console.log(err);
    }
}
