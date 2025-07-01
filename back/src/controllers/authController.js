const authModel = require('../models/Auth');

const crypto = require('crypto');

function hashPassword(password, salt) {
  return crypto
    .createHash('sha256')
    .update(salt + password)
    .digest('hex');
}

module.exports = {
  async registerUser(req, res) {
    const nickname = req.body.nickName;
    const password = req.body.password;
    const salt = crypto.randomBytes(6).toString('hex');
    const hash = hashPassword(password, salt);
    const org_code = '';
    const argObj = { nickname, org_code, salt, hash };

    try {
      authModel.saveAccounts(argObj);
      res.status(201).json({ message: 'ユーザ登録成功' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '登録に失敗しました' });
    }
  },

  async login(req, res) {
    // console.log("req",req);
    // console.log("req.data",req.data);
    const nickname = req.body.nickName;
    const password = req.body.password;
    console.log(req.body);
    
    console.log(nickname, password);
    
    let usersArr;
    let user;
    // 入力されたuser名が存在しなければerror
    try {
        usersArr = await authModel.searchAccount(nickname);
    } catch {
        return res.status(401).json({ error: 'ユーザー名が存在しません' });
    }
    // 入力されたuser名が存在しなければerror
    
    user = usersArr.filter((user) => {
        // 入力されたパスワードと、usersの記録から取得したsaltを組み合わせてhash化
        const inputHash = hashPassword(password, user.salt);
        return inputHash === user.hash;
    });
    console.log(user,'user');
    
    if (user.length !== 1) {
        console.log('kokomade');
        return res.status(401).json({ error: 'パスワードが間違ってます' });
    }
    // ログインが成功したらセッションを作成
    const token = crypto.randomBytes(16).toString('hex');
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); //トークンの有効期間24時間に設定
    const argObj = {
        token,
        user_id: user[0].id,
        expires_at,
    };
    try {
      await authModel.saveSessions(argObj);
      res.cookie('token', token, { httpOnly: true });
      res.cookie('userId', user[0].id, { httpOnly: true });
      res.json({
        message: 'ログイン成功',
        data: { userId: user[0].id, nickName: user[0].nickname, searchId: user[0].search_id },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'ログインエラー' });
    }
  },

  async logout(req, res) {
    try {
      res.clearCookie('token');
      res.clearCookie('userId');
      res.json({ message: 'ログアウト成功' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'ログアウトエラー' });
    }
  },
};
