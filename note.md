//migration
npx sequelize model:generate --name Store --attributes name:string,code:string,location:string,category:string

npx sequelize model:generate --name Employee --attributes firstName:string,lastName:string,dateOfBirth:date,education:string,position:string,StoreId:integer

//addColoum

npx sequelize migration:create --name add-coloum-salary
