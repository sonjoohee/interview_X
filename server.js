// server.js

const express = require("express");
const mariadb = require("mariadb");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // 주석 처리된 부분
const nodemailer = require("nodemailer"); // 주석 처리된 부분
require("dotenv").config(); // .env 파일에서 환경변수를 로드합니다.

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트 주소
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// COOP 및 COEP 설정 추가
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

const pool = mariadb.createPool({
  host: "biz-dev.c5mscy7z94yn.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "Userconnect0304!",
  database: "doowon_user_management",
  connectionLimit: 5,
  port: 4008, // MariaDB 기본 포트는 3306입니다.
});

// nodemailer 전송기 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendVerificationEmail = async (to, link) => {
  const mailOptions = {
    from: "endnjs33@gmail.com",
    to,
    subject: "이메일 인증",
    html: `<p>다음 링크를 클릭하여 이메일 인증을 완료하세요: <a href="${link}">이메일 인증하기</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

app.post("/signup", async (req, res) => {
  const { name, email, password, role, status } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex");
  const tokenExpiration = new Date(Date.now() + 3600000); // 1시간 후 만료

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      INSERT INTO users (name, email, password, role, status, token, tokenExpiration)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await conn.query(query, [
      name,
      email,
      hashedPassword,
      role,
      "inactive",
      token,
      tokenExpiration,
    ]);

    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(200).send("회원가입 성공.");
  } catch (err) {
    console.error("회원가입 실패:", err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).send({ error: "이미 사용 중인 이메일 주소입니다." });
    } else {
      res.status(500).send("서버 오류");
    }
  } finally {
    if (conn) conn.release();
  }
});

app.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `UPDATE users SET status = 'active', token = NULL WHERE token = ? AND status = 'inactive'`;
    const result = await conn.query(query, [token]);

    if (result.affectedRows === 0) {
      res.status(400).send("잘못되었거나 만료된 토큰입니다.");
    } else {
      res.status(200).json({ message: "이메일 인증이 완료되었습니다." });
      // res.redirect('http://localhost:3000/email-verified'); // 성공 시 임시 페이지로 리디렉션
    }
  } catch (err) {
    console.error("이메일 인증 실패:", err);
    res.status(500).send("서버 오류");
  } finally {
    if (conn) conn.release();
  }
});

app.post("/request-reset-password", async (req, res) => {
  const { name, email } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query(
      "SELECT * FROM users WHERE name = ? AND email = ?",
      [name, email]
    );

    if (user.length === 0) {
      return res
        .status(404)
        .send({ error: "등록되지 않은 이름 또는 이메일입니다." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1); // 1시간 유효기간

    await conn.query(
      "UPDATE users SET token = ?, tokenExpiration = ? WHERE email = ?",
      [token, tokenExpiration, email]
    );

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const mailOptions = {
      from: "endnjs33@gmail.com",
      to: email,
      subject: "비밀번호 재설정 요청",
      html: `<p>다음 링크를 클릭하여 비밀번호를 재설정하세요:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
  } catch (err) {
    console.error("비밀번호 재설정 요청 중 오류 발생:", err);
    res.status(500).send("서버 오류");
  } finally {
    if (conn) conn.release();
  }
});

app.use(express.json()); // JSON 형식의 요청 본문을 처리하도록 미들웨어 설정

app.post("/resend-password-reset-email", async (req, res) => {
  try {
    const { email } = req.body;
    // 여기에서 이메일 확인 및 재발송 로직을 처리
    res.json({
      success: true,
      message: "비밀번호 재설정 이메일이 발송되었습니다.",
    });
  } catch (error) {
    console.error("이메일 재발송 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

app.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const query =
      "SELECT * FROM users WHERE token = ? AND tokenExpiration > NOW()";
    const rows = await conn.query(query, [token]);

    if (rows.length === 0) {
      return res
        .status(400)
        .send({ error: "토큰이 유효하지 않거나 만료되었습니다." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery =
      "UPDATE users SET password = ?, token = NULL, tokenExpiration = NULL WHERE token = ?";
    await conn.query(updateQuery, [hashedPassword, token]);

    res
      .status(200)
      .send({ message: "비밀번호가 성공적으로 재설정되었습니다." });
  } catch (err) {
    console.error("비밀번호 재설정 실패:", err);
    res.status(500).send("서버 오류");
  } finally {
    if (conn) conn.release();
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `SELECT * FROM users WHERE email = ?`;
    const rows = await conn.query(query, [email]);

    if (rows.length === 0) {
      return res.status(400).send({ error: "사용자를 찾을 수 없습니다." });
    }

    const user = rows[0];

    if (user.status !== "active") {
      return res.status(400).send({ error: "이메일이 인증되지 않았습니다." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ error: "비밀번호가 올바르지 않습니다." });
    }

    res.status(200).send({ user });
  } catch (err) {
    console.error("로그인 실패:", err);
    res.status(500).send("서버 오류");
  } finally {
    if (conn) conn.release();
  }
});

app.post("/google-login", async (req, res) => {
  const { uid, name, email } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      INSERT INTO users (uid, name, email, status)
      VALUES (?, ?, ?, 'active')
      ON DUPLICATE KEY UPDATE name = ?, email = ?
    `;
    await conn.query(query, [uid, name, email, name, email]);

    res.status(200).send({ user: { uid, name, email } });
  } catch (err) {
    console.error("사용자 정보 저장 실패:", err);
    res.status(500).send("서버 오류");
  } finally {
    if (conn) conn.release();
  }
});

app.get("/current-user", async (req, res) => {
  const { userId } = req.query; // 클라이언트에서 userId를 쿼리로 받아옴

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `SELECT name FROM users WHERE id = ?`;
    const rows = await conn.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(400).send({ error: "사용자를 찾을 수 없습니다." });
    }

    const user = rows[0];
    res.status(200).send({ user });
  } catch (err) {
    console.error("사용자 정보 조회 실패:", err);
    res.status(500).send("서버 오류");
  } finally {
    if (conn) conn.release();
  }
});

// 이메일 재발송 엔드포인트
app.post("/resend-verification-email", async (req, res) => {
  const { email } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(404).send({ error: "등록되지 않은 이메일입니다." });
    }

    const token = user[0].token || crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1); // 1시간 유효기간

    await conn.query(
      "UPDATE users SET token = ?, tokenExpiration = ? WHERE email = ?",
      [token, tokenExpiration, email]
    );

    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(200).send("인증 이메일이 재발송되었습니다.");
  } catch (err) {
    console.error("이메일 재발송 중 오류 발생:", err);
    res.status(500).send("서버 오류");
  } finally {
    if (conn) conn.release();
  }
});

app.listen(4008, () => {
  // console.log('Server is running on https://wishresearch.kr');
});
