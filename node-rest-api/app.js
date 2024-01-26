const express = require("express");
const SftpClient = require("ssh2-sftp-client");
const cors = require('cors');
const app = express();
const port = 3000;

const sftpConfig = {
  host: "192.168.100.185",
  port: 2225,
  username: "foo",
  password: "pass",
};

const sftp = new SftpClient();

// Configuración del middleware CORS
app.use(cors());

app.get("/list", async (req, res) => {

  let path = req.query.ruta || '/';
  path = `/${path}`; // Agrega una barra inclinada al comienzo si no está presente

  try {
    await sftp.connect(sftpConfig);
    const list = await sftp.list(path);

    // Formatear el JSON con sangrado de 2 espacios
    const formattedJson = JSON.stringify(list, null, 2);

    res.setHeader("Content-Type", "application/json");
    res.send(formattedJson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al listar directorios" });
  } finally {
    sftp.end();
  }
});

app.get("/download", async (req, res) => {

  let path = req.query.ruta || '/';
  path = `/${path}`; // Agrega una barra inclinada al comienzo si no está presente

  try {
    await sftp.connect(sftpConfig);
    const fileData = await sftp.get(path);
    res.attachment(path);
    res.send(fileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al descargar el archivo" });
  } finally {
    sftp.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
