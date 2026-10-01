const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

(async ()=>{
  try{
    const svgPath = path.resolve(__dirname, '../public/icon.svg');
    const outDir = path.resolve(__dirname, '../public/favicons');
    if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true});

    const sizes = [16,32,48,64,180,192,256,512];
    const pngPaths = [];
    for(const s of sizes){
      const out = path.join(outDir, `icon-${s}.png`);
      await sharp(svgPath)
        .resize(s, s)
        .png({quality:90})
        .toFile(out);
      pngPaths.push(out);
      console.log('wrote', out);
    }

    // create favicon.ico from 16,32,48
    const icoOut = path.join(outDir, 'favicon.ico');
    const icoSources = [
      path.join(outDir, 'icon-16.png'),
      path.join(outDir, 'icon-32.png'),
      path.join(outDir, 'icon-48.png')
    ];
    const buf = await pngToIco(icoSources);
    fs.writeFileSync(icoOut, buf);
    console.log('wrote', icoOut);

    // create apple-touch-icon (180)
    const apple = path.join(outDir, 'apple-touch-icon.png');
    await sharp(path.join(outDir, 'icon-180.png')).toFile(apple);
    console.log('wrote', apple);

    console.log('Favicons generated in', outDir);
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();
