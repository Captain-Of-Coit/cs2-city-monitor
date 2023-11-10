import * as esbuild from 'esbuild'

// Useful when developing the UI, as the Game UI reloads on changes
// const outPath = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Cities Skylines II\\Cities2_Data\\StreamingAssets\\~UI~\\HookUI\\Extensions\\'
const outPath = "./dist/"

await esbuild.build({
  entryPoints: ["src/city_monitor.jsx"],
  bundle: true,
  outfile: outPath + 'city_monitor.transpiled.js',
})