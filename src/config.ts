import React from 'react';
import { 
  ShoppingBag, 
  Type, 
  Grid, 
  Image as ImageIcon, 
  Smile, 
  Zap, 
  Sparkles, 
  Palette 
} from 'lucide-react';

export const APP_CONFIG = {
  title: "皮肤中心",
  themeColor: "#FF2442", // 小红书红
  
  // 底部导航
  tabs: [
    { id: 'mall', label: '商城', icon: 'ShoppingBag' },
    { id: 'discover', label: '发现', icon: 'MessageCircle' },
    { id: 'me', label: '我的', icon: 'User' },
  ],

  // 商城分类
  categories: [
    { label: '皮肤', icon: 'ShoppingBag', color: 'bg-orange-50', iconColor: 'text-orange-500' },
    { label: '字体', icon: 'Type', color: 'bg-purple-50', iconColor: 'text-purple-500' },
    { label: '套装', icon: 'Grid', color: 'bg-blue-50', iconColor: 'text-blue-500' },
    { label: '壁纸', icon: 'ImageIcon', color: 'bg-cyan-50', iconColor: 'text-cyan-500' },
    { label: '表情', icon: 'Smile', color: 'bg-yellow-50', iconColor: 'text-yellow-500' },
    { label: '换装', icon: 'Zap', color: 'bg-indigo-50', iconColor: 'text-indigo-500' },
    { label: '定制', icon: 'Sparkles', color: 'bg-pink-50', iconColor: 'text-pink-500' },
    { label: '创意', icon: 'Palette', color: 'bg-green-50', iconColor: 'text-green-500' },
  ],

  // 功能模块文案
  features: {
    keyword: {
      title: "灵感画廊",
      desc: "输入文字 绘梦皮肤",
      sheetTitle: "灵感创作",
      placeholder: "例如：赛博朋克、治愈系猫咪..."
    },
    style: {
      title: "艺术风格馆",
      desc: "照片秒变 艺术大作",
      sheetTitle: "风格转换",
      options: ['油画', '水墨', '二次元', '像素', '赛博', '复古']
    },
    upload: {
      title: "定制工坊",
      desc: "上传照片 打造专属背景",
      sheetTitle: "照片定制"
    }
  },

  // 模拟发现页数据
  discoverSkins: [
    { id: '1', url: 'https://picsum.photos/seed/skin1/400/600', title: '赛博霓虹配色输入法皮肤', author: '设计大咖', likes: 1240 },
    { id: '2', url: 'https://picsum.photos/seed/skin2/400/500', title: '梦幻马卡龙少女心皮肤', author: '莎拉酱', likes: 890 },
    { id: '3', url: 'https://picsum.photos/seed/skin3/400/700', title: '复古浪潮：80年代浪漫', author: '迈克尔', likes: 2100 },
    { id: '4', url: 'https://picsum.photos/seed/skin4/400/450', title: '极简禅意打字皮肤', author: '露娜Luna', likes: 560 },
  ]
};
