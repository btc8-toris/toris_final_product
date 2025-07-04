const db = require('../../db/index');

module.exports={
async saveAccounts({nickname, org_code, salt, hash}){
    await db('users').insert({
        nickname,
        org_code,
        salt,
        hash,
        created_at: new Date(),
      });
},

async searchAccount(nickname){
    const returnObj = await db('users').where({ nickname })
    return returnObj;
},

async saveSessions({token, user_id, expires_at}){
    await db('sessions').insert({
        token,
        user_id,
        expires_at,
      });
} ,
}