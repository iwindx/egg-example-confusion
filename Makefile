
RELEASE_SOURCE_DIR = out/egg-example-confusion
RELEASE_SOURCE = egg-example-confusion


build: clean
	@echo 'Build start...'
	@npm run tsc 
	@gulp build
	@cp package.json $(RELEASE_SOURCE_DIR)
	@echo 'cd $(RELEASE_SOURCE_DIR)'
	@cd $(RELEASE_SOURCE_DIR) && npm install --production
	@cd out && tar czf ${RELEASE_SOURCE}.tgz ${RELEASE_SOURCE}
	@echo 'Build complete'

clean:
	@echo 'Clean files...'
	@rm -rf ./out