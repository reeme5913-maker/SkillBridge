const createEmptyTrack = () => ({
  skills: {},
  completedSteps: [],
  projectProgress: {},
});

export const getAllTrackProgress = () => {
  return JSON.parse(localStorage.getItem("trackProgress")) || {};
};

export const getTrackProgress = (careerName) => {
  const allTracks = getAllTrackProgress();

  return allTracks[careerName] || createEmptyTrack();
};

export const saveTrackProgress = (careerName, progress) => {
  const allTracks = getAllTrackProgress();

  allTracks[careerName] = progress;

  localStorage.setItem(
    "trackProgress",
    JSON.stringify(allTracks)
  );
};

export const initializeTrack = (careerName) => {
  const allTracks = getAllTrackProgress();

  if (!allTracks[careerName]) {
    allTracks[careerName] = createEmptyTrack();

    localStorage.setItem(
      "trackProgress",
      JSON.stringify(allTracks)
    );
  }
};

export const resetTrackProgress = (careerName) => {
  const allTracks = getAllTrackProgress();

  delete allTracks[careerName];

  localStorage.setItem(
    "trackProgress",
    JSON.stringify(allTracks)
  );
};