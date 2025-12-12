import { blacklist } from "../db/blacklist.js";

const containsListedWords = (text) => {
    const lowerText = text.toLowerCase();

    const listedWords = blacklist.filter(word => {
        if (lowerText.includes(word.toLowerCase()))
            return word;
    });

    return listedWords;
};

export {
    containsListedWords,
};