const {Router}=require('express');
const {cnn_mysql}=require('./../config/database')
const router = Router();

//POST para insertar registros en la tabla TIPO_MARCA
router.post('/marca', async(req, res) => {
    try{
        const {DESC_MARCA, ACTIVO} = req.body;
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO TIPO_MARCA (ID_MARCA, DESC_MARCA, ACTIVO) VALUES (NULL, ?, ?);`, [DESC_MARCA, ACTIVO]);
        if(rows.affectedRows>0){
            res.json({
                ID_MARCA: rows.insertId,
                DESC_MARCA:DESC_MARCA,
                ACTIVO:ACTIVO
            });
        }else{
            res.json({err:'Ningun registro agregado.'})
        }
    }catch(e){
        res.status(500).json({
            errorCode: e.errno,
            message: "Se ha presentado un pequeño error."
        });
    }
});

//POST para insertar registros en la tabla TIPO_LINEA
router.post('/linea', async(req, res) => {
    try{
        const {DESC_LINEA, ID_MARCA, ACTIVO} = req.body;
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO TIPO_LINEA (ID_LINEA, DESC_LINEA, ID_MARCA, ACTIVO) VALUES (NULL, ?, ?, ?);`, [DESC_LINEA, ID_MARCA, ACTIVO]);
        if(rows.affectedRows>0){
            res.json({
                ID_LINEA:rows.insertId,
                DESC_LINEA:DESC_LINEA,
                ID_MARCA:ID_MARCA,
                ACTIVO:ACTIVO
            });
        }else{
            res.json({err:'Ningun registro agregado.'})
        }
    }catch(e){
        res.status(500).json({
            errorCode: e.errno,
            message: "Se ha presentado un pequeño error."
        });
    }
});

//POST para insertar registros en la tabla VEHICULOS
router.post('/vehiculo', async(req, res) => {
    try{
        const {NRO_PLACA, ID_LINEA, MODELO, FECHA_VEN_SEGURO, FECHA_VEN_TECNOMECANICA, FECHA_VEN_CONTRATODO} = req.body;
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO VEHICULOS (NRO_PLACA, ID_LINEA, MODELO, FECHA_VEN_SEGURO, FECHA_VEN_TECNOMECANICA, FECHA_VEN_CONTRATODO) VALUES (?, ?, ?, ?, ?, ?);`, [NRO_PLACA, ID_LINEA, MODELO, FECHA_VEN_SEGURO, FECHA_VEN_TECNOMECANICA, FECHA_VEN_CONTRATODO]);
        if(rows.affectedRows>0){
            res.json({
                NRO_PLACA:NRO_PLACA, 
                ID_LINEA:ID_LINEA, 
                MODELO:MODELO, 
                FECHA_VEN_SEGURO:FECHA_VEN_SEGURO, 
                FECHA_VEN_TECNOMECANICA:FECHA_VEN_TECNOMECANICA, 
                FECHA_VEN_CONTRATODO:FECHA_VEN_CONTRATODO
            });
        }else{
            res.json({err:'Ningun registro agregado.'})
        }
    }catch(e){
        res.status(500).json({
            errorCode: e.errno,
            message: "Se ha presentado un pequeño error."
        });
    }
});

//GET para ver y validar el número de registros de la tabla VEHICULOS
router.get('/vehiculo', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(NRO_PLACA) FROM VEHICULOS;`, (error, resulset, fields) => {
        if (error) {
            return res.status(500).send("Se ha presentado un pequeño error.");
        } else {
            if(resulset[0]["COUNT(NRO_PLACA)"]==30){
                return res.json({
                    numero_de_registros:`Idóneo, pues tiene ${resulset[0]["COUNT(NRO_PLACA)"]}/30 autos registrados.`
                });
            }else{
                return res.json({
                    numero_de_registros:`Erróneo, pues tiene ${resulset[0]["COUNT(NRO_PLACA)"]}/30 autos registrados.`
                });
            }
        }
    });
});

//GET para ver y validar el número de registros de la tabla TIPO_MARCA
router.get('/marca', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(ID_MARCA) FROM TIPO_MARCA;`, (error, resulset, fields) => {
        if (error) {
            return res.status(500).send("Se ha presentado un pequeño error.");
        } else {
            if(resulset[0]["COUNT(ID_MARCA)"]==5){
                return res.json({
                    numero_de_registros:`Idóneo, pues tiene ${resulset[0]["COUNT(ID_MARCA)"]}/5 marcas registradas.`
                });
            }else{
                return res.json({
                    numero_de_registros:`Erróneo, pues tiene ${resulset[0]["COUNT(ID_MARCA)"]}/5 marcas registradas.`
                });
            }
        }
    });
});

//GET para ver y validar el número de registros de la tabla TIPO_LINEA
router.get('/linea', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(ID_LINEA) FROM TIPO_LINEA;`, (error, resulset, fields) => {
        if (error) {
            return res.status(500).send("Se ha presentado un pequeño error.");
        } else {
            if(resulset[0]["COUNT(ID_LINEA)"]==20){
                return res.json({
                    numero_de_registros:`Idóneo, pues tiene ${resulset[0]["COUNT(ID_LINEA)"]}/20 lineas registradas.`
                });
            }else{
                return res.json({
                    numero_de_registros:`Erróneo, pues tiene ${resulset[0]["COUNT(ID_LINEA)"]}/20 lineas registradas.`
                });
            }
        }
    });
});

//GET para ver el mayor y el menor modelo de la tabla VEHICULOS
router.get('/modelo',(req, res)=>{
    cnn_mysql.query(`SELECT MIN(MODELO), MAX(MODELO) FROM VEHICULOS;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("Se ha presentado un pequeño error.");
        }else{
            return res.json({
                maximo_modelo:`El máximo modelo es ${resulset[0]["MAX(MODELO)"]}`,
                minimo_modelo:`El mínimo modelo es ${resulset[0]["MIN(MODELO)"]}`
            });
        }
    })
});

//GET para saber cúantas marcas están repetidas por linea
router.get('/marcas-repetidas', (req, res)=>{
    cnn_mysql.query(`SELECT DESC_MARCA,DESC_LINEA,COUNT(*) FROM TIPO_MARCA
    INNER JOIN TIPO_LINEA
    ON TIPO_MARCA.ID_MARCA=TIPO_LINEA.ID_MARCA
    GROUP BY DESC_MARCA;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json({
                AUDI:`Hay ${resulset[0]["COUNT(*)"]} lineas con la marca ${resulset[0]["DESC_MARCA"]}.`,
                FERRARI:`Hay ${resulset[1]["COUNT(*)"]} lineas con la marca ${resulset[1]["DESC_MARCA"]}.`,
                FORD:`Hay ${resulset[2]["COUNT(*)"]} lineas con la marca ${resulset[2]["DESC_MARCA"]}.`,
                HYUNDAI:`Hay ${resulset[3]["COUNT(*)"]} lineas con la marca ${resulset[3]["DESC_MARCA"]}.`,
                KIA:`Hay ${resulset[4]["COUNT(*)"]} lineas con la marca ${resulset[4]["DESC_MARCA"]}.`
            });
        }
    });
});

//POST para consultar vehiculos segun el rango de vencimiento del seguro
router.post('/vehiculos-fecha-ven', (req, res) => {
    try{
        const {rango_menor, rango_mayor} = req.body;
        cnn_mysql.query(`SELECT * FROM VEHICULOS
        WHERE FECHA_VEN_SEGURO BETWEEN '${rango_menor}' AND '${rango_mayor}';`, (error, resulset, fields)=>{
            if(error){
                return res.status(500).send("Se ha presentado un pequeño error.");
            }else{
                return res.json(resulset);
            }
        });
    }catch(e){
        res.status(500).json({
            errorCode: e.errno,
            message: "Se ha presentado un pequeño error."
        });
    }
});

//POST para consultar los vehiculos dentro de un rango de años del campo modelos
router.post('/vehiculos-modelo', (req, res) => {
    try{
        const {rango_menor, rango_mayor} = req.body;
        cnn_mysql.query(`SELECT * FROM VEHICULOS
        WHERE MODELO BETWEEN '${rango_menor}' AND '${rango_mayor}';`, (error, resulset, fields)=>{
            if(error){
                return res.status(500).send("Se ha presentado un pequeño error.");
            }else{
                return res.json(resulset);
            }
        });
    }catch(e){
        res.status(500).json({
            errorCode: e.errno,
            message: "Se ha presentado un pequeño error."
        });
    }
});

//PUT para actualizar un registro de la tabla VEHICULOS
router.put('/actualizar-vehiculo/:id', async(req, res)=>{
    try{
        const NR_PLACA=req.params.id;
        const {NRO_PLACA, ID_LINEA, MODELO, FECHA_VEN_SEGURO, FECHA_VEN_TECNOMECANICA, FECHA_VEN_CONTRATODO} = req.body;
        const [rows, fields] = await cnn_mysql.promise().execute(`UPDATE VEHICULOS
        SET NRO_PLACA='${NRO_PLACA}', ID_LINEA='${ID_LINEA}', MODELO='${MODELO}', FECHA_VEN_SEGURO='${FECHA_VEN_SEGURO}', FECHA_VEN_TECNOMECANICA='${FECHA_VEN_TECNOMECANICA}',
        FECHA_VEN_CONTRATODO='${FECHA_VEN_CONTRATODO}'
        WHERE NRO_PLACA='${NR_PLACA}';`);
        if(rows.affectedRows>0){
            res.json({
                NRO_PLACA:NRO_PLACA, 
                ID_LINEA:ID_LINEA, 
                MODELO:MODELO, 
                FECHA_VEN_SEGURO:FECHA_VEN_SEGURO, 
                FECHA_VEN_TECNOMECANICA:FECHA_VEN_TECNOMECANICA, 
                FECHA_VEN_CONTRATODO:FECHA_VEN_CONTRATODO
            });
        }else{
            res.json({err:'Ningun registro actualizado.'})
        }
    }catch(e){
        res.status(500).json({
            errorCode: e.errno,
            message: "Se ha presentado un pequeño error."
        });
    }
});

//GET para mostrar NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA
router.get('/union-tablas', (req, res)=>{
    cnn_mysql.query(`SELECT NRO_PLACA,MODELO,DESC_LINEA,DESC_MARCA FROM VEHICULOS
    INNER JOIN TIPO_LINEA ON VEHICULOS.ID_LINEA=TIPO_LINEA.ID_LINEA
    INNER JOIN TIPO_MARCA ON TIPO_LINEA.ID_MARCA=TIPO_MARCA.ID_MARCA;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json(resulset);
        }
    });
});

//GET para consultar NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA siempre y cuando ACTIVO=S
router.get('/union-tablas-activo', (req, res)=>{
    cnn_mysql.query(`SELECT NRO_PLACA,MODELO,DESC_LINEA,DESC_MARCA FROM VEHICULOS
    INNER JOIN TIPO_LINEA ON VEHICULOS.ID_LINEA=TIPO_LINEA.ID_LINEA
    INNER JOIN TIPO_MARCA ON TIPO_LINEA.ID_MARCA=TIPO_MARCA.ID_MARCA
    WHERE TIPO_MARCA.ACTIVO = "S" AND TIPO_LINEA.ACTIVO="S";`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json(resulset);
        }
    });
});

//GET para sumar todos los modelos (No tengo ni idea de por qué el resultado da tan extraño)
router.get('/suma-modelos', (req, res)=>{
    cnn_mysql.query(`SELECT SUM(MODELO) FROM VEHICULOS;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json({
                suma_modelos:`La suma de los modelos es: ${resulset[0]["SUM(MODELO)"]}`
            });
        }
    });
});

//GET para promediar los modelos (No tengo ni idea de por qué el resultado da tan extraño)
router.get('/prom-modelos', (req, res)=>{
    cnn_mysql.query(`SELECT AVG(MODELO) FROM VEHICULOS;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json({
                suma_modelos:`El promedio de los modelos es: ${resulset[0]["AVG(MODELO)"]}`
            });
        }
    });
});

//GET para consultar los activos y los inactivos
router.get('/activos-inactivos', (req, res)=>{
    cnn_mysql.query(`SELECT TIPO_LINEA.ACTIVO, COUNT(*) from TIPO_LINEA WHERE TIPO_LINEA.ACTIVO = 'S' UNION ALL
    SELECT TIPO_LINEA.ACTIVO, COUNT(*) from TIPO_LINEA WHERE TIPO_LINEA.ACTIVO = 'N';`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json({
                activos:`Las lineas activas son ${resulset[0]["COUNT(*)"]}`,
                inactivos:`Las lineas inactivas son ${resulset[1]["COUNT(*)"]}`
            });
        }
    });
});

//GET union de tablas por INNER JOIN
router.get('/union-tablas-inner', (req, res)=>{
    cnn_mysql.query(`SELECT NRO_PLACA,MODELO,DESC_LINEA,DESC_MARCA FROM VEHICULOS
    INNER JOIN TIPO_LINEA ON VEHICULOS.ID_LINEA=TIPO_LINEA.ID_LINEA
    INNER JOIN TIPO_MARCA ON TIPO_LINEA.ID_MARCA=TIPO_MARCA.ID_MARCA;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json(resulset);
        }
    });
});

//GET union de tablas por LEFT JOIN
router.get('/union-tablas-left', (req, res)=>{
    cnn_mysql.query(`SELECT NRO_PLACA,MODELO,DESC_LINEA,DESC_MARCA FROM VEHICULOS
    LEFT JOIN TIPO_LINEA ON VEHICULOS.ID_LINEA=TIPO_LINEA.ID_LINEA
    LEFT JOIN TIPO_MARCA ON TIPO_LINEA.ID_MARCA=TIPO_MARCA.ID_MARCA;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json(resulset);
        }
    });
});

//GET para consultar toda la tabla VEHICULOS
router.get('/consulta-vehiculos', (req, res)=>{
    cnn_mysql.query(`SELECT * FROM VEHICULOS;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json(resulset);
        }
    });
});

//GET para consultar toda la tabla TIPO_LINEA
router.get('/consulta-lineas', (req, res)=>{
    cnn_mysql.query(`SELECT * FROM TIPO_LINEA;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json(resulset);
        }
    });
});

//GET para consultar toda la tabla TIPO_MARCA
router.get('/consulta-marcas', (req, res)=>{
    cnn_mysql.query(`SELECT * FROM TIPO_MARCA;`, (error, resulset, fields)=>{
        if(error){
            return res.status(500).send("SE ha presentado un pequeño error.");
        }else{
            return res.json(resulset);
        }
    });
});

module.exports=router;


