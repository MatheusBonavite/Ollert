import localForage from "localforage";

export default async function integrateWithLocalForage(card) {
    const { cardKey, listParent } = card;
    try {
        if(cardKey && listParent) {
            const doesKeyExists = await localForage.getItem("keys");
            if (!doesKeyExists?.length) {
                await localForage.setItem("keys", [`${listParent}+${cardKey}`]);
            } else {
                if (
                    !doesKeyExists.find(
                        (item) => item == `${listParent}+${cardKey}`
                    )
                ) {
                    doesKeyExists.push(`${listParent}+${cardKey}`);
                    await localForage.setItem("keys", doesKeyExists);
                }
            }
            await localForage.setItem(`${listParent}+${cardKey}`, card);

            const val = await localForage.getItem(`${listParent}+${cardKey}`);
            console.log(val);
        }
    } catch (err) {
        console.log(err);
    }
}
