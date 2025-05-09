"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractKeywords = extractKeywords;
// src/utils/searchHelpers.ts
function extractKeywords(query) {
    // Step 1: Remove special characters and normalize
    console.log("Query is :", query);
    const cleanedQuery = query
        .toLowerCase()
        .replace(/[^\w\s]/gi, ' ') // Remove special characters
        .replace(/\s+/g, ' '); // Collapse multiple spaces
    console.log("Cleaned query : ", cleanedQuery);
    // Step 2: Common English stopwords to ignore
    const stopWords = new Set([
        // Articles
        'a', 'an', 'the',
        // Prepositions
        'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around',
        'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond',
        'by', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like',
        'near', 'of', 'off', 'on', 'onto', 'out', 'over', 'through', 'to', 'toward',
        'under', 'until', 'up', 'upon', 'with', 'within', 'without',
        // Conjunctions
        'and', 'or', 'but', 'nor', 'so', 'yet', 'although', 'because', 'since', 'unless',
        // Pronouns
        'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your',
        'yours', 'yourself', 'he', 'him', 'his', 'she', 'her', 'hers', 'it', 'its',
        'they', 'them', 'their', 'theirs', 'this', 'that', 'these', 'those',
        // Common verbs
        'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
        'do', 'does', 'did', 'can', 'could', 'shall', 'should', 'will', 'would', 'may',
        'might', 'must',
        // Other common words
        'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
        'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'now',
        'then', 'here', 'there', 'when', 'where', 'why', 'how', 'what', 'which', 'who',
        'whom', 'whose'
    ]);
    console.log(cleanedQuery
        .split(' ')
        .filter(word => word.length > 2 && !stopWords.has(word) && !/\d/.test(word)));
    // Step 3: Split and filte
    return cleanedQuery
        .split(' ')
        .filter(word => word.length > 2 && // Ignore short words
        !stopWords.has(word) && // Remove stopwords
        !/\d/.test(word) // Remove numbers
    );
}
