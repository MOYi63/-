import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
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
  Gamepad2,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type TabType = 'mall' | 'discover' | 'me' | 'thesaurus';
type FeatureType = 'keyword' | 'upload' | 'style';

interface GenerationState {
  isGenerating: boolean;
  resultUrl: string | null;
  error: string | null;
}

interface SkinItem {
  id: string;
  url: string;
  title: string;
  author: string;
  authorAvatar: string;
  likes: number;
}

// --- Mock Data ---

const DISCOVER_SKINS: SkinItem[] = [
  { id: '1', url: 'https://picsum.photos/seed/skin1/400/600', title: '绝美！赛博霓虹配色输入法皮肤分享', author: '设计小能手', authorAvatar: 'https://i.pravatar.cc/150?u=1', likes: 1240 },
  { id: '2', url: 'https://picsum.photos/seed/skin2/400/500', title: '梦幻马卡龙，少女心爆棚的皮肤', author: '莎拉酱', authorAvatar: 'https://i.pravatar.cc/150?u=2', likes: 890 },
  { id: '3', url: 'https://picsum.photos/seed/skin3/400/700', title: '复古浪潮：80年代的浪漫', author: '迈克尔', authorAvatar: 'https://i.pravatar.cc/150?u=3', likes: 2100 },
  { id: '4', url: 'https://picsum.photos/seed/skin4/400/450', title: '极简禅意，让打字也变成一种修行', author: '露娜Luna', authorAvatar: 'https://i.pravatar.cc/150?u=4', likes: 560 },
  { id: '5', url: 'https://picsum.photos/seed/skin5/400/550', title: '森林迷雾，把大自然装进键盘', author: '小木屋', authorAvatar: 'https://i.pravatar.cc/150?u=5', likes: 1500 },
  { id: '6', url: 'https://picsum.photos/seed/skin6/400/650', title: '太空漫游：探索未知的星辰大海', author: '星际旅人', authorAvatar: 'https://i.pravatar.cc/150?u=6', likes: 3200 },
];

const SOGOU_CATEGORIES = [
  { icon: <ShoppingBag className="w-6 h-6 text-orange-500" />, label: '皮肤', color: 'bg-orange-50' },
  { icon: <Type className="w-6 h-6 text-purple-500" />, label: '字体', color: 'bg-purple-50' },
  { icon: <Grid className="w-6 h-6 text-blue-500" />, label: '套装', color: 'bg-blue-50' },
  { icon: <ImageIcon className="w-6 h-6 text-cyan-500" />, label: '壁纸', color: 'bg-cyan-50' },
  { icon: <Smile className="w-6 h-6 text-yellow-500" />, label: '表情', color: 'bg-yellow-50' },
  { icon: <Zap className="w-6 h-6 text-indigo-500" />, label: 'AI换装', color: 'bg-indigo-50' },
  { icon: <Sparkles className="w-6 h-6 text-pink-500" />, label: 'AI皮肤', color: 'bg-pink-50' },
  { icon: <Palette className="w-6 h-6 text-green-500" />, label: '创意皮肤', color: 'bg-green-50' },
];

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

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let finalPrompt = prompt;
      if (activeFeature === 'style') {
        finalPrompt = `将这张图片转换为 ${prompt} 风格，作为手机输入法背景。保持主体构图，应用艺术风格。`;
      } else if (activeFeature === 'upload') {
        finalPrompt = `基于这张图片创建一个精美的手机输入法背景。提取主要颜色和主题。${prompt}`;
      } else {
        finalPrompt = `一个高质量、美观的手机输入法背景皮肤。主题：${prompt}。无文字，构图简洁，适合按键覆盖。`;
      }

      const contents: any = {
        parts: [{ text: finalPrompt }]
      };

      if (selectedImage) {
        contents.parts.push({
          inlineData: {
            data: selectedImage.split(',')[1],
            mimeType: "image/png"
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents,
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          }
        }
      });

      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneration({ isGenerating: false, resultUrl: imageUrl, error: null });
      } else {
        throw new Error("未生成图片");
      }
    } catch (err: any) {
      console.error(err);
      setGeneration({ isGenerating: false, resultUrl: null, error: err.message || "生成失败" });
    }
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
    <div className="iphone-container">
      {/* Dynamic Island */}
      <div className="dynamic-island" />
      
      {/* Status Bar Mock */}
      <div className="h-11 flex items-center justify-between px-8 text-[12px] font-semibold bg-white">
        <span>15:27</span>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 fill-black" />
          <div className="w-4 h-4 bg-black rounded-full" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-[calc(100%-44px-83px)] overflow-y-auto bg-[#F8F8F8]">
        <AnimatePresence mode="wait">
          {activeTab === 'mall' && (
            <motion.div 
              key="mall"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Sogou Header */}
              <div className="bg-white px-4 pb-4 pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold">装扮商城</h1>
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
                    placeholder="三丽鸥" 
                    className="w-full h-10 bg-gray-100 rounded-full pl-10 pr-4 text-sm focus:outline-none"
                  />
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-4 gap-y-4 pt-2">
                  {SOGOU_CATEGORIES.map((cat, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`sogou-category-icon ${cat.color}`}>
                        {cat.icon}
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
                      <h3 className="font-bold text-orange-500">AI 灵感画廊</h3>
                      <ChevronLeft className="w-4 h-4 rotate-180 text-orange-300" />
                    </div>
                    <p className="text-[10px] text-gray-400">输入文字 绘梦皮肤</p>
                    <div className="aspect-video bg-orange-50 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-orange-200" />
                    </div>
                  </div>
                  <div onClick={() => setActiveFeature('style')} className="bg-white p-4 rounded-2xl shadow-sm space-y-2 cursor-pointer active:scale-95 transition-transform">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-purple-500">艺术风格馆</h3>
                      <ChevronLeft className="w-4 h-4 rotate-180 text-purple-300" />
                    </div>
                    <p className="text-[10px] text-gray-400">照片秒变 艺术大作</p>
                    <div className="aspect-video bg-purple-50 rounded-xl flex items-center justify-center">
                      <Palette className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                <div onClick={() => setActiveFeature('upload')} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                  <div className="space-y-1">
                    <h3 className="font-bold text-blue-500 text-lg">照片定制工坊</h3>
                    <p className="text-xs text-gray-400">上传照片 打造专属键盘背景</p>
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
              {/* XHS Header */}
              <div className="sticky top-0 bg-white z-50 border-b border-gray-100">
                <div className="flex items-center justify-between px-4 h-12">
                  <MoreHorizontal className="w-6 h-6 text-gray-400" />
                  <div className="flex items-center gap-6">
                    <span className="text-gray-400 font-bold">关注</span>
                    <div className="relative">
                      <span className="text-black font-bold">发现</span>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-xhs-red rounded-full" />
                    </div>
                    <span className="text-gray-400 font-bold">北京</span>
                  </div>
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex items-center gap-6 px-4 h-10 overflow-x-auto no-scrollbar text-sm text-gray-500 font-medium">
                  <span className="text-black font-bold">推荐</span>
                  <span>视频</span>
                  <span>直播</span>
                  <span>短剧</span>
                  <span>穿搭</span>
                  <span>美食</span>
                </div>
              </div>

              {/* XHS Masonry Feed */}
              <div className="masonry-grid">
                {DISCOVER_SKINS.map(skin => (
                  <div key={skin.id} className="xhs-card">
                    <img src={skin.url} alt={skin.title} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                    <div className="p-2 space-y-2">
                      <h3 className="text-xs font-bold leading-tight line-clamp-2">{skin.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <img src={skin.authorAvatar} alt={skin.author} className="w-4 h-4 rounded-full" />
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
                      <h2 className="text-xl font-bold">Yo3o Zmy</h2>
                      <p className="text-xs text-gray-400">小红书号：123456789</p>
                    </div>
                  </div>
                  <Settings className="w-6 h-6 text-gray-400" />
                </div>
              </div>

              <div className="px-6 py-4 flex items-center gap-8 border-b border-gray-50">
                <div className="text-center">
                  <div className="font-bold">12</div>
                  <div className="text-[10px] text-gray-400">关注</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">450</div>
                  <div className="text-[10px] text-gray-400">粉丝</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">1.2k</div>
                  <div className="text-[10px] text-gray-400">获赞与收藏</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-6 border-b border-gray-100 pb-2 mb-4">
                  <span className="text-black font-bold border-b-2 border-xhs-red pb-2">笔记</span>
                  <span className="text-gray-400 font-bold pb-2">收藏</span>
                  <span className="text-gray-400 font-bold pb-2">赞过</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-sm overflow-hidden">
                      <img src={`https://picsum.photos/seed/me${i}/300`} alt="My Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[83px] glass flex items-center justify-around px-2 pb-6 z-40">
        <TabButton 
          active={activeTab === 'mall'} 
          onClick={() => setActiveTab('mall')}
          icon={<ShoppingBag className="w-6 h-6" />}
          label="商城"
        />
        {/* XHS Style Plus Button */}
        <div className="relative -top-2">
          <button 
            onClick={() => setActiveFeature('keyword')}
            className="w-12 h-8 bg-xhs-red rounded-lg flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <TabButton 
          active={activeTab === 'discover'} 
          onClick={() => setActiveTab('discover')}
          icon={<MessageCircle className="w-6 h-6" />}
          label="发现"
        />
        <TabButton 
          active={activeTab === 'me'} 
          onClick={() => setActiveTab('me')}
          icon={<User className="w-6 h-6" />}
          label="我的"
        />
      </div>

      {/* Generation Sheet (Apple Style) */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end"
          >
            <div className="w-full h-[92%] bg-[#F2F2F7] rounded-t-[40px] shadow-2xl flex flex-col overflow-hidden">
              {/* Sheet Header */}
              <div className="h-14 flex items-center justify-between px-6 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <button onClick={reset} className="text-blue-500 font-medium">取消</button>
                <h3 className="font-bold text-lg">
                  {activeFeature === 'keyword' ? 'AI 灵感创作' : activeFeature === 'upload' ? '照片定制' : '艺术风格转换'}
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
                        {['油画', '水墨', '二次元', '像素', '赛博', '复古'].map(s => (
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
                        placeholder={activeFeature === 'keyword' ? "例如：赛博朋克霓虹城市，治愈系猫咪..." : "添加更多细节..."}
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

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
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
