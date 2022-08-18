const mongoose = require("mongoose");

const quranSchema = new mongoose.Schema({
  number: Number,
  name: String,
  englishName: String,
  englishNameTranslation: String,
  revelationType: String,
  ayahs: [
    {
      number: Number,
      text: String,
      numberInSurah: Number,
      juz: Number,
      manzil: Number,
      page: Number,
      ruku: Number,
      hizbQuarter: Number,
      //   sajda: Boolean,
    },
  ],
});

const QuranModel = mongoose.model("QuranModel", quranSchema);

module.exports = QuranModel;
