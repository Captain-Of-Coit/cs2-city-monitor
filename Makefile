all: build
.SHELLFLAGS = -e
SHELL=/bin/bash

install-ui-deps:
	@npm ci

bundle: install-ui-deps
	@node build.mjs

build: bundle
	@echo Build complete.

package-pwsh: build
	@powershell -Command "$$version = (Get-Content package.json | ConvertFrom-Json).version; Compress-Archive -Path './dist/city_monitor.transpiled.js' -DestinationPath \"./dist/release-$$version.zip\""

package-unix: build
	@echo "Testing Makefile execution"
	@version=$$(jq -r '.version' package.json); \
	echo "Version: $$version"; \
	echo "Zipping file to ./dist/release-$$version.zip"; \
	zip ./dist/release-$$version.zip ./dist/city_monitor.transpiled.js