'use strict';

const achievementModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Achievements', {
    game: { type: DataTypes.STRING, required: true },
    rank: { type: DataTypes.STRING, required: false },
    progress: { type: DataTypes.STRING, required: false },
    lastplayed: { type: DataTypes.DATE, required: false },
  });

  return model;
};

module.exports = achievementModel;
