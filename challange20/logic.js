app.get('/', (req, res) => {
    const currentPage = req.query.page || 1;
    const limit = 3;
    const offset = (currentPage - 1) * limit;
    let params = [];

    if (req.query.idCheck && req.query.id) {
        params.push(`id = ${req.query.id}`)
    }
    if (req.query.stringCheck && req.query.string) {
        params.push(`teks LIKE '%${req.query.string}%'`)
    }
    if (req.query.numberCheck && req.query.number) {
        params.push(`nomor = ${req.query.number}`)
    }
    if (req.query.floatCheck && req.query.float) {
        params.push(`pecahan = ${req.query.float}`)
    }
    if (req.query.dateCheck && req.query.dateStart && req.query.dateEnd) {
        params.push(`tanggal BETWEEN '${req.query.dateStart}' AND '${req.query.dateEnd}'`)
    }
    if (req.query.dateCheck && req.query.boolean) {
        params.push(`kondisi  = '${req.query.boolean}'`)
    }

    let query = `SELECT * FROM bread`;
    if (params.length > 0) {
        query += ` WHERE ${params.join(' AND ')}`
    }

    console.log(query);

    db.all(query, (err, rows) => {
        if (err) {
            return console.error(err);
        }
        console.log(rows.length);
        const totalPages = Math.ceil(rows.length / limit);
        const url = req.url == '/' ? '/?page=1' : req.url;
        console.log(url)
        if ('/?page' in req.query) {
            delete url['/?page']
        }
        console.log(req.url)
        console.log(url)
        console.log(query);
        console.log(req.query);
        console.log(totalPages);
        query += ` LIMIT ${limit} OFFSET ${offset}`
        db.all(query, (err, rows) => {
            res.render('index', {
                rows,
                query: req.query,
                totalPages,
                currentPage: parseInt(currentPage),
                url
            });
        });
    })
})

app.get('/add', (req, res) => {
    res.render('add');
})