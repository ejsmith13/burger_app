
const connection = require('./connection');

const questionMarks = (num) => {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  };

const omr = {
    selectAl(tableInput, cb){
        const queryString= `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    insertOne(table, cols, vals, cb){
        let querystring = `INSERT INTO ${table}`;
        querystring += ' (';
        querystring += cols.tostring();
        querystring += ') ';
        querystring += 'VALUES (';
        querystring += questionMarks(val.length);
        querystring += ') ';

        console.log(querystring);

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