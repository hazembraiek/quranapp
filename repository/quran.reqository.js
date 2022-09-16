const Surah = require("../model/surahsModel");
const Ayahs = require("../model/ayahsModel");

exports.getSurahs = async (filter) => {
  return await Surah.find(filter).sort({ number: 1 });
};

exports.getAyahsBySurah = async (surahID) => {
  return await Ayahs.find({ surahID }).sort({ numberInSurah: 1 });
};

exports.getAyahsByPage = async (page) => {
  return await Ayahs.find({ page });
};

exports.getSurahById = async (surahID) => {
  return await Ayahs.findById(surahID);
};
