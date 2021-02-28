
const connection = require('./connection');

const questionMarks = (num) => {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  };

const orm = {
    selectAll(tableInput, cb){
        const queryString= `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    insertOne(table, cols, vals, cb){
        console.log(`vals: ${vals}`)
        let queryString = `INSERT INTO ${table}`;
        queryString += ' (';
        queryString += cols;
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += questionMarks(vals.length);
        queryString += '); ';

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    updateOne(table, objColVals, condition, cb){
        let queryString = `UPDATE ${table}`;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, (err, result) => {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
    },
};

module.exports = orm;