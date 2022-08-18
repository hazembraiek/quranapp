const catchAsync = require("../utils/catchAsync");
const SaveData = require("./../utils/saveData");
const fs = require("fs");
const AppError = require("../utils/appError");
const { default: axios } = require("axios");
const QuranModel = require("../model/quranModel");

const getSurah = (nbAyah, Quran) => {
  const { name, englishName, revelationType, number, englishNameTranslation } =
    Quran.find((surah) => surah.ayahs.find((ayah) => ayah.number === nbAyah));
  return { number, name, englishName, revelationType, englishNameTranslation };
};

const FilterData = ({ data }) => {
  const ValuesNumbers = Object.keys(data.surahs);
  const result = ValuesNumbers.flatMap((val) =>
    data.ayahs.filter((ayah) => ayah.surah.number == val)
  ).map((val) => (val = { ...val, surah: val.surah.number }));
  return { ayahs: result, surahs: data.surahs };
};

exports.GetQuran = catchAsync(async (req, res, next) => {
  const Quran = await QuranModel.find();
  const { surah, page } = req.query;
  if (surah > Quran.length || surah < 1) {
    return next(new AppError("surah not Found", 400));
  }
  if (page < 1) {
    return next(new AppError("Pgae not Found", 400));
  }
  let Surahs = Quran;
  if (page && !surah) {
    Surahs = Surahs.flatMap((surah) => surah.ayahs).filter(
      (ayah) => ayah.page == page
    );
  } else if (surah) {
    Surahs = Quran[surah - 1];
    const firstPage = Quran[surah - 1].ayahs[0].page - 1 + (+page || 1);
    Surahs = Surahs.ayahs.filter((ayah) => ayah.page === firstPage);
    if (Surahs.length === 0)
      return next(new AppError("this surah has no " + page + " page", 404));
  }
  const Surah = getSurah(Surahs[0].number, Quran);
  res.status(200).json({
    status: "success",
    numberAyahs: surah || page ? Surahs.length : 6236,
    data: !surah && !page ? { Quran: Surahs } : { Surah, Quran: Surahs },
  });
});

exports.GetJuz = catchAsync(async (req, res, next) => {
  const Juz = +req.params.juz;
  if (Juz > 30 || Juz < 1) return next(new AppError("Juz Not Found", 404));
  const data = await axios.get(
    `http://api.alquran.cloud/v1/juz/${Juz}/ar.asad`
  );
  FilterData(data.data);
  res.status(200).json({
    status: "success",
    data: FilterData(data.data),
  });
});
