# glob-rename

## Description

globでファイルを指定、ファイルをリネーム（ディレクトリの変更も含む）する。  
何度も手作業で対応するようなリネーム（ディレクトリ移動）を自動化することができる。  

## Requirement

* Node.js -> check cmd `node -v`

## Install

```sh
npm i -D https://github.com/ysknk/glob-rename.git
```

## Usage

### add script in package.json

```json
{
  "scripts": {
    "glob-rename": "glob-rename"
  },
}
```

```sh
# check arguments help
npm run glob-rename -- --help
```
