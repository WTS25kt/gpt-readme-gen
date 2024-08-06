const fs = require('fs');
const path = require('path');

// README.mdファイルのパス
const readmePath = path.join(__dirname, 'README.md');

// README.mdファイルを読み込む関数
function readReadme() {
    return new Promise((resolve, reject) => {
        fs.readFile(readmePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// README.mdファイルを編集して保存する関数
function writeReadme(newContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile(readmePath, newContent, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// README.mdファイルの特定の部分を編集する関数
async function editReadme() {
    try {
        let content = await readReadme();

        // ここでREADME.mdの編集を行う
        // 例: "## Usage"セクションの後に新しい手順を追加する
        const newInstructions = `
## 新しい手順
1. 手順1
2. 手順2
3. 手順3
        `;

        const usageIndex = content.indexOf('## Usage');
        if (usageIndex !== -1) {
            const beforeUsage = content.substring(0, usageIndex + '## Usage'.length);
            const afterUsage = content.substring(usageIndex + '## Usage'.length);
            content = beforeUsage + newInstructions + afterUsage;
        } else {
            // "## Usage"セクションが存在しない場合は末尾に追加
            content += newInstructions;
        }

        await writeReadme(content);
        console.log('README.mdを編集しました。');
    } catch (err) {
        console.error('エラーが発生しました:', err);
    }
}

// 関数を実行
editReadme();