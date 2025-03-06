const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS01lM3VwQ3RBT0t0b3VXM29JczRwWTFiZGNReHpmTTBZaHRnZlZkQTdHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUo5a3VBS0hudXZZdDVNeTBGeFpvdlRBcHIrMXRyU21zYWNSYlJTakwyND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSmt5d25sWjBNbTBMMHFaY3VYaFpQVWZMYUFkTnR1eHZHOHA3MzJnMEVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZZVJVcDlGU29jUjVORWZneENBU01neGQwUmVXYlROVEd2dEM2T09sQ3hNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVNK2VHd1pmNGx5ak9PK0Y5QmJIcVJidS9mTlFBL21FR0R5bFd2TzZDMjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklScXF1YzU5R3UyQllKdkNkS3FZMzN4dGJlaDhQMkIrRWhERmhkbWROQjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ09kSzA1VXlkeEV2SzBjUXl0MGluZ09JcjdYcy8zZFpnalZOTjcvdmFIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXVBRWFRWDVNdkhVT3dxekEreHFnRlVrbW83ZDA1ZHl3RE1LQXJrSlQyTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRVLy92akhtV0VDMngxQjk5Y2FFNVZOMU1sK3NGZXhYTDIxdG9hdUJPL0hSaGgxdTFBcU8rcGd6M29FR2RWUUNDbWxBMisyQ2xVbTVLclltbUdTZURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI5LCJhZHZTZWNyZXRLZXkiOiJWVkNyeFBSR2VtcnZmblRZbDlNM2ZnR3NDUi9TNGVMcEZHbTN4UG9aZGhNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJCSzM3TEQxVyIsIm1lIjp7ImlkIjoiMjM0ODE0OTQ3NTg4MToxMEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE5NDQwMzU3NDUxMzkwOToxMEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BLeXVOa0ZFUExpcDc0R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjNHSHc1TVFPd3k5TkQ1RGUrdEo0V0UzclJHZjlxbTNVdFYzRjFQWVlpWEk9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImVvZVpmcWJkVStId0lPV1F4QXlLQlFjYWprY09EbDZqT3lKeG9WVHNCK3RtNjcxYWVJSjNrcjZqTkpiSlhJNDlHOVc4VzNtVzVNKzZzRzdZcXZIMUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJPc3JJKzM1QjlYYUJKTXROYVNRaWgwckhGb1g2a3FycVN4TFJFd0ZjWWQyenBVSW9wanZMSnU5b3RMYjJIYUxaejNWcE1haHBGTkhvQTVsMDRRbjFCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNDk0NzU4ODE6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZHhoOE9URURzTXZUUStRM3ZyU2VGaE42MFJuL2FwdDFMVmR4ZFQyR0lseSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxMjg3ODA3LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
