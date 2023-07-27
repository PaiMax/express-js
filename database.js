const   Sequelize=require('sequelize');
const sequelize=new Sequelize('node','root','T23jb4rk',{dialect: 'mysql',host:'localhost'});
module.exports=sequelize;