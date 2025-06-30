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
    const hashedPassword = hashPassword(password, salt);
    const org_code = '';

    try {
      await db('users').insert({
        nickname,
        org_code,
        salt,
        password: hashedPassword,
        created_at: new Date(),
      });
      res.status(201).json({ message: 'ユーザ登録成功' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '登録に失敗しました' });
    }
  },

  async login(req, res) {
    const nickname = req.body.nickName;
    const password = req.body.password;
    // 入力されたuser名が存在しなければerror
    try {
      const usersArr = await db('users').where({ nickname });

      // 入力されたuser名が存在しなければerror
      if (usersArr.length === 0) {
        return res.status(401).json({ error: 'ユーザー名が存在しません' });
      } else {
        usersArr.filter((user) => {
            // 入力されたパスワードと、usersの記録から取得したsaltを組み合わせてhash化
          const inputHash = hashPassword(password, user.salt);
          return inputHash === user.password;
        });
      }

      if (usersArr.length === 0) {
        return res.status(401).json({ error: 'パスワードが間違ってます' });
      }

      // ログインが成功したらセッションを手動で作成
      const token = crypto.randomBytes(16).toString('hex');
      const expires_at = new Date(Date.now + 24*60*60*1000); //トークンの有効期間24時間に設定
      await db('sessions').insert({
        token,
        user_id: user[0].user_id,
        expires_at ,
      });
      res.cookie('token', token, { httpOnly: true });
      res.cookie('userId', user[0].user_id, { httpOnly: true });
      res.json({ message: 'ログイン成功' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'ログインエラー' });
    }
  },

  async logout(req, res) {
    try {
        const token = req.cookies.token;
        console.log('🚀 ~ router.get ~ token:', token);
    
        res.clearCookie('token');
        res.clearCookie('userId');
        res.json({ message: 'ログアウト成功' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'ログアウトエラー' });
      }
    
  },
};
