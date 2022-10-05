const fs = require('fs/promises');
const path = require('path');
class FileBrowser {

    listFiles = async (req, res) => {
        let source = process.env.SOURCE_DIR;
        if (req.query.path) {
            source = path.join(source, decodeURI(req.query.path))
        }
        try {


            const stats = await fs.stat(source);
            let files;
            if (stats.isDirectory()) {
                files = await fs.readdir(source);
                files = files.filter(item => item.indexOf('.') !== 0);
            } else {
                files = [source]
            }
            const fileList = {
                files: [],
                directories: []
            };
            for await (const f of files) {
                const stat = await fs.stat(path.join(source, f));
                if (stat.isDirectory()) {
                    fileList.directories.push(f);
                }
                if (stat.isFile()) {
                    fileList.files.push(f);
                }
            }            
            res.send(fileList);
        } catch (e) {
            console.log("ERROR", e);
            res.sendStatus(500);
        }
    }
}
module.exports = FileBrowser;