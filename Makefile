all: build

install-ui-deps:
	@npm ci

bundle: install-ui-deps
	@node build.mjs

build: bundle
	@echo Build complete.

package-pwsh: build
	@powershell -Command "$$version = (Get-Content package.json | ConvertFrom-Json).version; Compress-Archive -Path './dist/city_monitor.transpiled.js' -DestinationPath \"./dist/release-$$version.zip\""

package-unix: build
	@version=$$(jq -r '.version' package.json); \
	zip ./dist/release-$$version.zip ./dist/city_monitor.transpiled.js