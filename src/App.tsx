import React, { useState, useRef } from 'react';
import { 
  Keyboard, 
  Upload, 
  Palette, 
  Sparkles, 
  X, 
  Download, 
  RefreshCw,
  Image as ImageIcon,
  Loader2,
  ChevronLeft,
  Search,
  User,
  Heart,
  Settings,
  MoreHorizontal,
  Plus,
  Bell,
  ShoppingBag,
  Type,
  Grid,
  Smile,
  Zap,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_CONFIG } from './config';

// --- Types ---

type TabType = 'mall' | 'discover' | 'me';
type FeatureType = 'keyword' | 'upload' | 'style';

interface GenerationState {
  isGenerating: boolean;
  resultUrl: string | null;
  error: string | null;
}

// Icon Mapping for Config
const Icons: Record<string, React.ReactNode> = {
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  MessageCircle: <MessageCircle className="w-6 h-6" />,
  User: <User className="w-6 h-6" />,
  Type: <Type className="w-6 h-6" />,
  Grid: <Grid className="w-6 h-6" />,
  ImageIcon: <ImageIcon className="w-6 h-6" />,
  Smile: <Smile className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
};

// --- Components ---

const KeyboardPreview = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-black/5">
      <img 
        src={imageUrl} 
        alt="Keyboard Skin" 
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex flex-col justify-end p-2 gap-1">
        <div className="grid grid-cols-10 gap-1 h-1/4">
          {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
            <div key={k} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-md flex items-center justify-center text-[10px] font-semibold text-white shadow-sm">{k}</div>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-1 h-1/4 px-[5%]">
          {['A','S','D','F','G','H','J','K','L'].map(k => (
            <div key={k} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-md flex items-center justify-center text-[10px] font-semibold text-white shadow-sm">{k}</div>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-1 h-1/4">
          <div className="col-span-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md flex items-center justify-center text-[8px] text-white">⇧</div>
          {['Z','X','C','V','B','N','M'].map(k => (
            <div key={k} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-md flex items-center justify-center text-[10px] font-semibold text-white shadow-sm">{k}</div>
          ))}
          <div className="col-span-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md flex items-center justify-center text-[8px] text-white">⌫</div>
        </div>
        <div className="grid grid-cols-6 gap-1 h-1/4">
          <div className="col-span-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md flex items-center justify-center text-[8px] text-white">123</div>
          <div className="col-span-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md flex items-center justify-center text-[8px] text-white">☺</div>
          <div className="col-span-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-md flex items-center justify-center text-[8px] text-white font-medium">空格</div>
          <div className="col-span-1 bg-blue-500/80 backdrop-blur-md border border-white/30 rounded-md flex items-center justify-center text-[8px] text-white font-bold">前往</div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('mall');
  const [activeFeature, setActiveFeature] = useState<FeatureType | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generation, setGeneration] = useState<GenerationState>({
    isGenerating: false,
    resultUrl: null,
    error: null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (!prompt && activeFeature === 'keyword') return;
    if (!selectedImage && (activeFeature === 'upload' || activeFeature === 'style')) return;

    setGeneration({ isGenerating: true, resultUrl: null, error: null });

    // Simulated Generation (No AI Dependency)
    setTimeout(() => {
      const mockUrl = `https://picsum.photos/seed/${Date.now()}/800/500`;
      setGeneration({ isGenerating: false, resultUrl: mockUrl, error: null });
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setActiveFeature(null);
    setPrompt('');
    setSelectedImage(null);
    setGeneration({ isGenerating: false, resultUrl: null, error: null });
  };

  return (
    <div className="app-viewport">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#F8F8F8] pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'mall' && (
            <motion.div 
              key="mall"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Header */}
              <div className="bg-white px-4 pb-4 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold">{APP_CONFIG.title}</h1>
                  </div>
                  <div className="flex items-center gap-4">
                    <Search className="w-6 h-6 text-gray-400" />
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="搜索皮肤、字体、表情" 
                    className="w-full h-10 bg-gray-100 rounded-full pl-10 pr-4 text-sm focus:outline-none"
                  />
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-4 gap-y-4 pt-2">
                  {APP_CONFIG.categories.map((cat, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`sogou-category-icon ${cat.color}`}>
                        {Icons[cat.icon]}
                      </div>
                      <span className="text-[11px] font-medium text-gray-600">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Sections */}
              <div className="px-4 space-y-4 pb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div onClick={() => setActiveFeature('keyword')} className="bg-white p-4 rounded-2xl shadow-sm space-y-2 cursor-pointer active:scale-95 transition-transform">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-orange-500">{APP_CONFIG.features.keyword.title}</h3>
                      <ChevronLeft className="w-4 h-4 rotate-180 text-orange-300" />
                    </div>
                    <p className="text-[10px] text-gray-400">{APP_CONFIG.features.keyword.desc}</p>
                    <div className="aspect-video bg-orange-50 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-orange-200" />
                    </div>
                  </div>
                  <div onClick={() => setActiveFeature('style')} className="bg-white p-4 rounded-2xl shadow-sm space-y-2 cursor-pointer active:scale-95 transition-transform">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-purple-500">{APP_CONFIG.features.style.title}</h3>
                      <ChevronLeft className="w-4 h-4 rotate-180 text-purple-300" />
                    </div>
                    <p className="text-[10px] text-gray-400">{APP_CONFIG.features.style.desc}</p>
                    <div className="aspect-video bg-purple-50 rounded-xl flex items-center justify-center">
                      <Palette className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                <div onClick={() => setActiveFeature('upload')} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                  <div className="space-y-1">
                    <h3 className="font-bold text-blue-500 text-lg">{APP_CONFIG.features.upload.title}</h3>
                    <p className="text-xs text-gray-400">{APP_CONFIG.features.upload.desc}</p>
                  </div>
                  <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'discover' && (
            <motion.div 
              key="discover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white min-h-full"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white z-50 border-b border-gray-100">
                <div className="flex items-center justify-between px-4 h-12">
                  <MoreHorizontal className="w-6 h-6 text-gray-400" />
                  <div className="flex items-center gap-6">
                    <span className="text-gray-400 font-bold">关注</span>
                    <div className="relative">
                      <span className="text-black font-bold">发现</span>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#ff2442] rounded-full" />
                    </div>
                    <span className="text-gray-400 font-bold">本地</span>
                  </div>
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
              </div>

              {/* Masonry Feed */}
              <div className="masonry-grid">
                {APP_CONFIG.discoverSkins.map(skin => (
                  <div key={skin.id} className="xhs-card">
                    <img src={skin.url} alt={skin.title} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                    <div className="p-2 space-y-2">
                      <h3 className="text-xs font-bold leading-tight line-clamp-2">{skin.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-gray-200" />
                          <span className="text-[10px] text-gray-500 truncate max-w-[60px]">{skin.author}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-gray-400">
                          <Heart className="w-3 h-3" />
                          <span className="text-[10px]">{skin.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'me' && (
            <motion.div 
              key="me"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white min-h-full"
            >
              <div className="h-48 bg-gradient-to-b from-gray-100 to-white p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200">
                      <img src="https://i.pravatar.cc/150?u=me" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold">用户123</h2>
                      <p className="text-xs text-gray-400">ID：123456789</p>
                    </div>
                  </div>
                  <Settings className="w-6 h-6 text-gray-400" />
                </div>
              </div>

              <div className="px-6 py-4 flex items-center gap-8 border-b border-gray-50">
                <div className="text-center">
                  <div className="font-bold">0</div>
                  <div className="text-[10px] text-gray-400">关注</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">0</div>
                  <div className="text-[10px] text-gray-400">粉丝</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">0</div>
                  <div className="text-[10px] text-gray-400">获赞与收藏</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-6 border-b border-gray-100 pb-2 mb-4">
                  <span className="text-black font-bold border-b-2 border-[#ff2442] pb-2">笔记</span>
                  <span className="text-gray-400 font-bold pb-2">收藏</span>
                  <span className="text-gray-400 font-bold pb-2">赞过</span>
                </div>
                <div className="flex flex-col items-center justify-center py-12 text-gray-300">
                  <ImageIcon className="w-12 h-12 mb-2" />
                  <span className="text-sm">暂无内容</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tab Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-20 glass flex items-center justify-around px-2 pb-2 z-40">
        {APP_CONFIG.tabs.map(tab => (
          <TabButton 
            key={tab.id}
            active={activeTab === tab.id} 
            onClick={() => setActiveTab(tab.id as TabType)}
            icon={Icons[tab.icon]}
            label={tab.label}
          />
        ))}
        {/* Plus Button */}
        <div className="relative -top-4">
          <button 
            onClick={() => setActiveFeature('keyword')}
            className="w-12 h-8 bg-[#ff2442] rounded-lg flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Generation Sheet */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center"
          >
            <div className="w-full max-w-[500px] h-[92%] bg-[#F2F2F7] rounded-t-[40px] shadow-2xl flex flex-col overflow-hidden">
              {/* Sheet Header */}
              <div className="h-14 flex items-center justify-between px-6 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <button onClick={reset} className="text-blue-500 font-medium">取消</button>
                <h3 className="font-bold text-lg">
                  {APP_CONFIG.features[activeFeature].sheetTitle}
                </h3>
                <div className="w-12" />
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Inputs */}
                <div className="space-y-6">
                  {(activeFeature === 'upload' || activeFeature === 'style') && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">原图</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video rounded-3xl bg-white border border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative shadow-sm"
                      >
                        {selectedImage ? (
                          <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <div className="p-4 bg-gray-50 rounded-full mb-2">
                              <Upload className="w-6 h-6 text-blue-500" />
                            </div>
                            <span className="text-xs text-gray-400 font-medium">点击上传照片</span>
                          </>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                      {activeFeature === 'style' ? '选择风格' : '描述'}
                    </label>
                    {activeFeature === 'style' ? (
                      <div className="grid grid-cols-3 gap-2">
                        {APP_CONFIG.features.style.options?.map(s => (
                          <button 
                            key={s}
                            onClick={() => setPrompt(s)}
                            className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all ${prompt === s ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 border border-gray-100 shadow-sm'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={APP_CONFIG.features[activeFeature].placeholder || "添加更多细节..."}
                        className="w-full h-28 p-4 bg-white border border-gray-200 rounded-3xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 resize-none shadow-sm"
                      />
                    )}
                  </div>
                </div>

                {/* Action */}
                <button 
                  onClick={handleGenerate}
                  disabled={generation.isGenerating || (!prompt && activeFeature === 'keyword') || (!selectedImage && (activeFeature === 'upload' || activeFeature === 'style'))}
                  className="w-full py-4 bg-blue-500 text-white rounded-3xl font-bold shadow-xl shadow-blue-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  {generation.isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>正在生成...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>开始生成</span>
                    </>
                  )}
                </button>

                {/* Result */}
                <AnimatePresence>
                  {generation.resultUrl && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4 pt-4 pb-12"
                    >
                      <div className="flex items-center justify-between px-1">
                        <h4 className="font-bold text-sm">预览</h4>
                        <div className="flex gap-2">
                          <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100"><Download className="w-4 h-4 text-gray-600" /></button>
                          <button onClick={handleGenerate} className="p-2 bg-white rounded-full shadow-sm border border-gray-100"><RefreshCw className="w-4 h-4 text-gray-600" /></button>
                        </div>
                      </div>
                      
                      <KeyboardPreview imageUrl={generation.resultUrl} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {generation.error && (
                  <div className="p-4 bg-red-50 text-red-500 text-xs rounded-2xl border border-red-100">
                    {generation.error}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-components ---

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, key?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-black scale-105' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <div className={active ? 'text-black' : ''}>
        {icon}
      </div>
      <span className="text-[10px] font-bold tracking-tight">{label}</span>
    </button>
  );
}
