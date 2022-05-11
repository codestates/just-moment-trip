const data = await diary.findAll({
  where: {
    trip_id,
    [Op.or]: [
      { title: { [Op.regexp]: fuzzy.createFuzzyMatcher(search) } },
      {
        title:
          levenshteinDistance.levenshteinDistance(search, Sequelize.col("diary.title")) <= 1
            ? false
            : true,
      },
    ],
  },
});
