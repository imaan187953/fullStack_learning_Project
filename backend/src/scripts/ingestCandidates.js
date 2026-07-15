require("dotenv").config();

console.log(process.env.TMDB_ACCESS_TOKEN);

const {
  fetchMovies,
  fetchTVShows,
  fetchSeasons,
} = require("../services/tmdbRetriever.service");

const {
  buildMediaDocument,
} = require("../utils/documentBuilder");

const {
  createEmbedding,
} = require("../services/embedding.service");

const {
  createCollection,
  pointExists,
  upsertMedia,
} = require("../services/qdrant.service");

async function ingestCandidates() {
  try {
    console.log("\n==============================");
    console.log(" CineTrack AI Ingestion Started");
    console.log("==============================\n");

    // Ensure collection exists
    await createCollection();

    // Fetch TMDB media
    console.log("Fetching Movies...");
    const movies = await fetchMovies();

    console.log("Fetching TV Shows...");
    const tvShows = await fetchTVShows();

    console.log("Fetching Seasons...");
    const seasons = await fetchSeasons(tvShows);

    const media = [
      ...movies,
      ...tvShows,
      ...seasons,
    ];

    console.log(`\nTotal Media Retrieved: ${media.length}\n`);

    let uploaded = 0;
    let skipped = 0;

    for (const item of media) {
      // Skip existing vectors
      const exists = await pointExists(item.tmdbId);

      if (exists) {
        skipped++;
        console.log(`Skipped: ${item.title}`);
        continue;
      }

      // Build semantic document
      const document = buildMediaDocument(item);

      // Generate embedding
      const embedding = await createEmbedding(document);

      // Store in Qdrant
      await upsertMedia(
        item,
        embedding,
        document
      );

      uploaded++;

      console.log(
        `[${uploaded}] Uploaded -> ${item.title}`
      );
    }

    console.log("\n==================================");
    console.log(" AI Ingestion Completed");
    console.log("==================================");
    console.log(`Uploaded : ${uploaded}`);
    console.log(`Skipped  : ${skipped}`);
    console.log(`Total    : ${media.length}`);
    console.log("==================================\n");

  } catch (error) {
    console.error(error);
  }
}

ingestCandidates();