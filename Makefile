all: build
BEPINEX_VERSION = 6

clean:
	@dotnet clean

restore:
	@dotnet restore

build-ui:
	@npm install
	@npx esbuild ui_src/city_monitor.jsx --bundle --outfile=dist/bundle.js

dev-ui:
	@npx esbuild ui_src/city_monitor.jsx --watch --bundle --outfile="G:/SteamLibrary/steamapps/common/Cities Skylines II/Cities2_Data\StreamingAssets\~UI~\HookUI\Extensions\panel.example.city_monitor.js"

build: clean restore build-ui
	@dotnet build /p:BepInExVersion=$(BEPINEX_VERSION)

package-win: build
	@-mkdir dist
	@cmd /c copy /y "bin\Debug\netstandard2.1\0Harmony.dll" "dist\"
	@cmd /c copy /y "bin\Debug\netstandard2.1\CityMonitor.dll" "dist\"
	@echo Packaged to dist/

package-unix: build
	@-rm -r dist/
	@-mkdir dist
	@cp bin/Debug/netstandard2.1/0Harmony.dll dist
	@cp bin/Debug/netstandard2.1/CityMonitor.dll dist
	@echo Packaged to dist/