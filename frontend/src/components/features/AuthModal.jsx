import React, { useState } from 'react';
import { X, Mail, Lock, User, Building2, GraduationCap, CreditCard, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const AuthModal = ({ isOpen, onClose, initialMode = 'register' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    nim: '',
    batchYear: '2025',
    university: 'UIN Syarif Hidayatullah Jakarta',
    email: '',
    password: '',
  });

  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      if (mode === 'register') {
        await register({
          email: formData.email,
          password: formData.password,
          nim: formData.nim.trim(),
          fullName: formData.fullName.trim(),
          university: formData.university.trim(),
          batchYear: formData.batchYear,
        });

        setSuccessMsg('Pendaftaran berhasil! Silakan periksa email untuk konfirmasi atau langsung masuk jika konfirmasi dinonaktifkan.');
        setTimeout(() => {
          onClose();
          navigate('/profile');
        }, 1500);
      } else {
        await login(formData.email, formData.password);
        onClose();
        navigate('/profile');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat memproses permintaan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-primary-600 p-8 text-white relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-3xl font-bold mb-2">
              {mode === 'register' ? 'Daftar Akun Baru' : 'Selamat Datang'}
            </h2>
            <p className="text-primary-100 text-sm">
              {mode === 'register' 
                ? 'Bergabunglah dengan komunitas guru alumni PPG.' 
                : 'Masuk untuk melanjutkan aktivitas berbagi Anda.'}
            </p>
          </div>

          {/* Feedback messages */}
          <div className="px-8 pt-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl mb-2">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm rounded-xl mb-2">
                {successMsg}
              </div>
            )}
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: Rina Susanti, S.Pd."
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-colors text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">NIM (Terdaftar)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard size={16} className="text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        name="nim"
                        value={formData.nim}
                        onChange={handleChange}
                        required
                        placeholder="Contoh: 1122001"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Angkatan</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GraduationCap size={16} className="text-slate-400" />
                      </div>
                      <select 
                        name="batchYear"
                        value={formData.batchYear}
                        onChange={handleChange}
                        required 
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-colors text-sm appearance-none cursor-pointer"
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">LPTK / Universitas</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building2 size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: UIN Syarif Hidayatullah Jakarta"
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-colors text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@contoh.com"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-colors text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-primary-600/20 mt-4 flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 size={18} className="animate-spin" />}
              {mode === 'register' ? 'Daftar Sekarang' : 'Masuk ke Akun'}
            </button>

            <div className="text-center mt-4 text-sm text-slate-500">
              {mode === 'register' ? (
                <>
                  Sudah punya akun?{' '}
                  <button type="button" onClick={() => { setMode('login'); setErrorMsg(''); }} className="text-primary-600 font-bold hover:underline">
                    Masuk di sini
                  </button>
                </>
              ) : (
                <>
                  Belum punya akun?{' '}
                  <button type="button" onClick={() => { setMode('register'); setErrorMsg(''); }} className="text-primary-600 font-bold hover:underline">
                    Daftar sekarang
                  </button>
                </>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
