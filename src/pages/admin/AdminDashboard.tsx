import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2, Settings, Users, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111] border-r border-white/10 p-6 flex flex-col">
        <div className="text-2xl font-bold tracking-tighter mb-12">TSELEC Admin</div>
        
        <nav className="flex-1 space-y-2">
          {[
            { id: 'products', label: '제품 관리', icon: <Settings size={20} /> },
            { id: 'news', label: '뉴스/공지 관리', icon: <FileText size={20} /> },
            { id: 'users', label: '문의 내역', icon: <Users size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-white text-black font-medium' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors px-4 py-3 mt-auto"
        >
          <LogOut size={20} />
          로그아웃
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">
            {activeTab === 'products' && '제품 관리'}
            {activeTab === 'news' && '뉴스/공지 관리'}
            {activeTab === 'users' && '문의 내역'}
          </h1>
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <Plus size={18} />
            새로 등록하기
          </button>
        </div>

        {/* Placeholder Content for Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-400">제품명</th>
                  <th className="px-6 py-4 font-medium text-gray-400">카테고리</th>
                  <th className="px-6 py-4 font-medium text-gray-400">등록일</th>
                  <th className="px-6 py-4 font-medium text-gray-400 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { name: 'TS-MCU-2024', category: '제어기판', date: '2024-03-15' },
                  { name: 'Smart Sensor Node', category: '센서모듈', date: '2024-03-10' },
                  { name: 'Industrial Gateway', category: '통신장비', date: '2024-02-28' },
                ].map((product, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-gray-400">{product.category}</td>
                    <td className="px-6 py-4 text-gray-400">{product.date}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}