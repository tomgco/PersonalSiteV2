qa: test lint

test:
	@./node_modules/.bin/mocha \
		-r should \
		-R spec

lint:
	@jshint `find . -name '*.js' -and -not -regex '.*/public/.*' -and -not -regex '.*/node_modules/.*'`

lint-changed:
	@jshint `git status --porcelain | sed -e "s/^...//g"`

clean:
	@find . -name '*.orig' -delete

.PHONY: test lint lint-changed clean