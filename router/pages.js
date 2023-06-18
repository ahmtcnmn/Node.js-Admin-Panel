import express from "express";
const router = express.Router();
import con from "./connect.js";
const app = express();




router.get('/', (req, res) => {
    res.render('index');
});

router.get('/iletisim', (req, res) => {
    const sql = `SELECT * FROM iletişim `
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data from the database: ' + err.stack);
            return;
        }
        res.render('iletisim/index', { data: results });
    });
});


router.get('/iletisim/:id', (req, res) => {
    const sql = `SELECT * FROM iletişim WHERE id=${req.params.id} LIMIT 1`
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data from the database: ' + err.stack);
            return;
        }
        res.render('iletisim/edit', { data: results });
    });
});

router.post('/iletisim/:id', (req, res) => {
    const trL = req.body.tr;
    const enL = req.body.en;
    const rsL = req.body.rs;
    const arL = req.body.ar;

    const sql = `UPDATE iletişim SET tr = '${trL}', en = '${enL}', rs = '${rsL}', ar = '${arL}' WHERE id = ${req.params.id}`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error updating data in the database: ' + err.stack);
            return;
        }
        console.log('Updated successfully');
        res.redirect('/iletisim'); 
    });
});

router.get('/iletisim/delete/:id', (req, res) => {
    const sql = `DELETE FROM iletişim WHERE id = ${req.params.id}`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error updating data in the database: ' + err.stack);
            return;
        }
        console.log('Data updated successfully');
        res.redirect('/iletisim'); 
    });

});

router.get('/addnew', (req, res) => {
    res.render('iletisim/addnew')
})
router.post('/addnew/new', (req, res) => {


    const trL = req.body.tr;
    const enL = req.body.en;
    const rsL = req.body.rs;
    const arL = req.body.ar;


    var sql = `INSERT INTO iletişim(id,tr,en,rs,ar) VALUES (NULL,'${trL}',' ${enL}','${rsL}','${arL}');` 
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error updating data in the database: ' + err.stack);
            return;
        }
        console.log('New data updated successfully');
        res.redirect('/iletisim'); 
    });
})


router.get('/update', (req, res) => {
    const sorgu = 'DELETE FROM iletişim WHERE id IS NULL';

    con.query(sorgu, function (err, result) {
        if (err) {
            console.error('Error : ' + err.stack);
            return;
        }
        console.log('Deleted successfully');

        
        const selectSorgu = 'SELECT * FROM iletişim ORDER BY id;';
        con.query(selectSorgu, function (err, rows) {
            if (err) {
                console.error('Error retrieving data from the database: ' + err.stack);
                return;
            }

            let count = 1;
            const updatePromises = [];

            rows.forEach((row) => {
                const updateSorgu = `UPDATE iletişim SET id = ${count} WHERE id = ${row.id};`;
                const updatePromise = new Promise((resolve, reject) => {
                    con.query(updateSorgu, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                updatePromises.push(updatePromise);
                count++;
            });

            Promise.all(updatePromises)
                .then(() => {
                    console.log('Successfully');
                })
                .catch((err) => {
                    console.error('Error : ' + err.stack);
                });
        });
    });
    res.redirect('/iletisim')
})

export default router;
