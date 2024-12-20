const simpleGit = require('simple-git');
const random = require('random');
const jsonfile = require('jsonfile');
const moment = require('moment');

const FILE_PATH = './data.json'; // File để lưu dữ liệu
const makeCommit = n => {
    if (n === 0) return simpleGit().push(); // Đẩy code lên GitHub khi xong

    const x = random.int(0, 54); // Số tuần từ đầu năm (0 - 54)
    const y = random.int(0, 6); // Ngày trong tuần (0 - 6)
    const DATE = moment().subtract(1, 'years').add(1, 'days') // Lùi 1 năm và thêm ngày
                    .add(x, 'weeks').add(y, 'days').format();

    const data = {
        date: DATE
    };

    console.log(`Committing for date: ${DATE}`);
    jsonfile.writeFile(FILE_PATH, data, () => { // Ghi vào file data.json
        simpleGit()
            .add([FILE_PATH]) // Thêm file vào stage
            .commit(DATE, {'--date': DATE}, makeCommit.bind(this, --n)); // Commit với ngày custom
    });
};

makeCommit(50); // Thực hiện 50 commit

run it
