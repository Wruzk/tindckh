module.exports.config = {
    name: "tapngon",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "...",
    description: "táp chết con mẹ nó luôn, đừng đùa với lửa, bố mày táp chết con đĩ mẹ mà luôn",
    commandCategory: "QTV",
    usages: "tapngon @mention",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event }) {
    const fs = global.nodemodule["fs-extra"];
    // Đường dẫn tới file, điều chỉnh lại nếu cần
    let warFilePath = process.cwd() + "/data/ngonwar.txt";
    let fileContent;
    try {
        fileContent = await fs.readFile(warFilePath, "utf8");
    } catch (error) {
        return api.sendMessage("Không thể đọc file war từ /data/ngonwar.txt", event.threadID);
    }
    
    // Giả sử các message được phân cách bởi dấu "////"
    let messages = fileContent.split("////").map(item => item.trim()).filter(item => item.length > 0);
    
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn đáp ngôn vào mặt nó", event.threadID);
    let name = event.mentions[mention];
    var arraytag = [];
    arraytag.push({ id: mention, tag: name });
    
    // Hàm gửi tin nhắn
    var a = function(message) { 
        api.sendMessage(message, event.threadID);
    }
    
    const delays = [0, 3000, 5000, 7000, 9000, 12000, 15000, 450000, 455000, 460000, 465000];
    
    for (let i = 0; i < messages.length; i++) {
        let delay = delays[i] !== undefined ? delays[i] : 3000 * i;
        setTimeout(() => {
            let messageToSend = messages[i].replace(/\{name\}/g, name);
            a({ body: messageToSend, mentions: arraytag });
        }, delay);
    }
}
