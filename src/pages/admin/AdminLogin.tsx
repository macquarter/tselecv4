import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const ADMIN_EMAIL = 'tsadmin@tselec.co.kr';

export default function AdminLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      let email = id.trim();
      if (email && email.indexOf('@') < 0) email = email + '@tselec.co.kr';
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if ((cred.user.email || '').toLowerCase() !== ADMIN_EMAIL) {
        setError('관리자 권한이 없는 계정입니다.');
        setBusy(false);
        return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-[#111] p-8 rounded-3xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2">관리자 로그인</h1>
        <p className="text-xs text-gray-500 text-center mb-8">사이트 편집(이미지·텍스트·로고)에도 동일하게 사용됩니다.</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => { setId(e.target.value); setError(''); }}
              autoCapitalize="none"
              autoCorrect="off"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="예: tsadmin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="비밀번호를 입력하세요"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {busy ? '로그인 중…' : '로그인'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
