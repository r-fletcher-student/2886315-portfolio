/**
 * Groups music tracks by year and returns sorted titles
 * @param {Array} tracks - Array of track objects
 * @returns {Object} - Object with years as keys and sorted title arrays as values
 */
function getMusicTitlesByYear(tracks) {
    const grouped = Object.groupBy(tracks, (track) => track.year);
    let output = {};
    for (const yearGroup in grouped) {
        if (isNaN(yearGroup)){
            continue;
        }
        for (const song of grouped[yearGroup]) {
            if (!Array.isArray(output[yearGroup])) {
                output[yearGroup] = [];
            }
            output[yearGroup].push(song.title);
        }
    };
    for (const year in output) {
        output[year].sort();
    }
    return output;
}

/**
 * Filters tracks by criteria and adds decade information
 * @param {Array} tracks - Array of track objects
 * @param {Object} criteria - Filter criteria (minYear, maxYear, artist)
 * @returns {Array} - Filtered and transformed track objects
 */
function filterAndTransformTracks(tracks, criteria) {
    let filteredTracks = [...tracks];
    if ("minYear" in criteria) {
        filteredTracks = filteredTracks.filter(track => track.year >= criteria.minYear);
    }
    if ("maxYear" in criteria) {
        filteredTracks = filteredTracks.filter(track => track.year <= criteria.maxYear);
    }
    if ("artist" in criteria) {
        filteredTracks = filteredTracks.filter(track => track.artist.toUpperCase() == criteria.artist.toUpperCase());
    }
    for (const track in filteredTracks){
        filteredTracks[track].decade = filteredTracks[track].year.toString().slice(0, -1) + "0s"
    }
    return filteredTracks;
}

module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};
