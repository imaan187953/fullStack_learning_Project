const model = require("../config/gemini");

const List = require("../models/list.model");
const ListItem = require("../models/listItem.model");
const Rating = require("../models/rating.model");
const Review = require("../models/review.model");
const Media = require("../models/media.model");

const generateRecommendations = async (userId) => {
    // Step 1
    const lists = await List.find({ user: userId });

    const listIds = lists.map((list) => list._id);

    // Step 2
    const listItems = await ListItem.find({
        list: { $in: listIds },
    }).populate("media");

    // Step 3
    const ratings = await Rating.find({ user: userId }).populate("media");

    // Step 4
    const reviews = await Review.find({ user: userId }).populate("media");

    // Step 5
    const watched = listItems.map((item) => ({
        title: item.media.title,
        mediaType: item.media.mediaType,
    }));

    const rated = ratings.map((rating) => ({
        title: rating.media.title,
        rating: rating.rating,
    }));

    const reviewed = reviews.map((review) => ({
        title: review.media.title,
        review: review.reviewText,
    }));

    // Step 6
    const prompt = `
You are an expert movie and TV recommendation assistant.

The user has watched:

${JSON.stringify(watched, null, 2)}

The user ratings:

${JSON.stringify(rated, null, 2)}

The user reviews:

${JSON.stringify(reviewed, null, 2)}

Recommend:

5 Movies

5 TV Shows

Do NOT recommend anything already watched.

Return ONLY JSON.

Format:

{
"movies":[
{
"title":"",
"reason":""
}
],
"tvShows":[
{
"title":"",
"reason":""
}
]
}
`;

    // Step 7
    const result = await model.generateContent(prompt);

    let response = result.response.text();

    // Remove Markdown code fences if Gemini adds them
    response = response.replace(/```json/g, "");
    response = response.replace(/```/g, "");
    response = response.trim();

    try {
        return JSON.parse(response);
    } catch (error) {
        throw new Error("Gemini returned an invalid JSON response.");
    }
};

module.exports = {
    generateRecommendations,
};