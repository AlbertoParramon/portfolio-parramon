# PortfolioParramon

## Salida del install con pnpm
```bash
$ rm -rf node_modules pnpm-lock.yaml
$ pnpm install
 WARN  3 deprecated subdependencies found: glob@7.2.3, inflight@1.0.6, rimraf@3.0.2
Packages: +525
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 602, reused 523, downloaded 0, added 525, done

dependencies:
+ @angular/common 20.1.4
+ @angular/compiler 20.1.4
+ @angular/core 20.1.4
+ @angular/forms 20.1.4
+ @angular/platform-browser 20.1.4
+ @angular/router 20.1.4
+ rxjs 7.8.2
+ tslib 2.8.1
+ zone.js 0.15.1

devDependencies:
+ @angular/build 20.1.4
+ @angular/cli 20.1.4
+ @angular/compiler-cli 20.1.4
+ @types/jasmine 5.1.8
+ jasmine-core 5.8.0 (5.9.0 is available)
+ karma 6.4.4
+ karma-chrome-launcher 3.2.0
+ karma-coverage 2.2.1
+ karma-jasmine 5.1.0
+ karma-jasmine-html-reporter 2.1.0
+ typescript 5.8.3 (5.9.2 is available)

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: @parcel/watcher, esbuild, lmdb, msgpackr-extract.                 │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 2.7s using pnpm v10.14.0
```

Y del build:

```bash
$ ng build
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-JCNJCWKA.js      | main          | 211.22 kB |                57.88 kB
polyfills-HGDOEU5L.js | polyfills     |  34.58 kB |                11.32 kB
styles-5INURTSO.css   | styles        |   0 bytes |                 0 bytes

                      | Initial total | 245.80 kB |                69.20 kB

Application bundle generation complete. [1.391 seconds]

Output location: /home/alberto.parramon/Documentos/Alberto_personal/WEB/portfolio-parramon.git/dist/portfolio-parramon
```

