'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    nama: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    tinggi: DataTypes.REAL,
    tanggallahir: DataTypes.DATE,
    menikah: DataTypes.BOOLEAN
  }, {});
  Record.associate = function(models) {
    // associations can be defined here
  };
  return Record;
};