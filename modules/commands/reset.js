const fs = require('fs-extra');
const path = require('path');
const messageCountFolderPath = path.join(__dirname, '../../modules/commands/_checktt');

module.exports.config = {
  name: 'reset', 
  version: '1.0.0', 
  credits: 'Vtuan', 
  hasPermssion: 3,
  description: 'Reset data checktt khi có các nhóm dưa thừa!',
  commandCategory: 'Admin',
  usages: '...',
  cooldowns: 0
};

module.exports.run = async ({ api, event }) => {
  let threads = await api.getThreadList(100, null, ['INBOX']);
  let threadsInfo = await Promise.all(threads.map((thread) => api.getThreadInfo(thread.threadID)));
  let activeThreadIDs = threadsInfo.filter(thread => thread.isGroup && thread.participantIDs.includes(api.getCurrentUserID())).map(thread => thread.threadID.toString());

  let files = await fs.readdir(messageCountFolderPath);
  files = files.filter(file => file.endsWith('.json'));
  for (const file of files) {
    const fileThreadID = file.replace('.json', '');
    if (!activeThreadIDs.includes(fileThreadID)) {
      await fs.remove(path.join(messageCountFolderPath, file));
      console.log(`Deleted data for thread ID: ${fileThreadID}`);
    }
  }

  api.sendMessage('Đã xóa dữ liệu các box dư thừa.', event.threadID);
};