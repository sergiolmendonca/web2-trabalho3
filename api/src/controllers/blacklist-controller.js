import * as blacklistService from '../services/blacklist-service.js';

const containsListedWords = (req, res) => {
    const listedWords = blacklistService.containsListedWords(req.query.texto);

    if (listedWords.length > 0) 
        return res.json({
            contains: true,
            message: "Seu texto possui algumas palavras impróprias.",
            words: listedWords
        });

    return res.json({
        contains: false,
        message: "Seu texto está limpo."
    });
};

export {
    containsListedWords,
};