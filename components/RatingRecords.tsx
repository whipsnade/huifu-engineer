import React, { useState, useMemo } from 'react';
import { ArrowLeft, Star, ThumbsUp, MoreHorizontal } from 'lucide-react';

interface RatingRecordsProps {
  onBack: () => void;
}

type FilterType = 'all' | 'good' | 'bad';

const MOCK_REVIEWS = [
  {
    id: 1,
    userName: '张**师傅',
    avatar: 'https://i.pravatar.cc/150?img=11',
    time: '2天前',
    rating: 5,
    tag: '超赞',
    content: '师傅上门很快，店里的POS机突然无法开机，大概十分钟就排查出是电源模块的问题并更换了，完全没有耽误正常营业，非常专业！',
    likes: 12,
  },
  {
    id: 2,
    userName: '李**店长',
    avatar: 'https://i.pravatar.cc/150?img=32',
    time: '5天前',
    rating: 5,
    tag: '超赞',
    content: '后厨打印机一直卡纸，之前找别人弄过几次没根治。这次刘师傅过来拆开仔细清理了传感器，动作麻利，现在使用非常顺畅。',
    likes: 8,
  },
  {
    id: 3,
    userName: '王**',
    avatar: 'https://i.pravatar.cc/150?img=44',
    time: '1个星期前',
    rating: 4,
    tag: '满意',
    content: '稍微晚到了一会，不过提前打了电话沟通。收银机的网络故障很快就解决好了，整体服务态度还是挺不错的。',
    likes: 3,
  },
  {
    id: 4,
    userName: '赵**老板',
    avatar: 'https://i.pravatar.cc/150?img=15',
    time: '2个星期前',
    rating: 1,
    tag: '极差',
    content: '检修时间太长了，在店里弄了两个多小时还没找到收银系统闪退的原因，严重影响了我们点单，希望技术能再熟练一点。',
    likes: 24,
  },
  {
    id: 5,
    userName: '孙**',
    avatar: 'https://i.pravatar.cc/150?img=68',
    time: '1个月前',
    rating: 5,
    tag: '超赞',
    content: '监控摄像头黑屏，小伙子干活很利索，不仅修好了线路，还顺便帮我把另外几个摄像头的角度调正了，十分感谢！',
    likes: 45,
  },
  {
    id: 6,
    userName: '吴**',
    avatar: 'https://i.pravatar.cc/150?img=59',
    time: '2个月前',
    rating: 2,
    tag: '不满意',
    content: '说是去车上拿个配件，结果等了半个多小时才回来，维修过程感觉也是比较生疏。',
    likes: 5,
  },
  {
    id: 7,
    userName: '郑**主管',
    avatar: 'https://i.pravatar.cc/150?img=22',
    time: '3个月前',
    rating: 5,
    tag: '超赞',
    content: '大半夜下的紧急保修单，师傅二话没说就赶过来了。排线老化导致短路，火速更换，保住了明天的早高峰，太给力了！',
    likes: 102,
  }
];

const RatingRecords: React.FC<RatingRecordsProps> = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredReviews = useMemo(() => {
    return MOCK_REVIEWS.filter(review => {
      if (activeFilter === 'good') return review.rating >= 4;
      if (activeFilter === 'bad') return review.rating <= 3;
      return true;
    });
  }, [activeFilter]);

  const counts = useMemo(() => {
    const good = MOCK_REVIEWS.filter(r => r.rating >= 4).length;
    const bad = MOCK_REVIEWS.filter(r => r.rating <= 3).length;
    return { all: MOCK_REVIEWS.length, good, bad };
  }, []);

  return (
    <div className="absolute inset-0 z-[110] bg-[#f5f5f5] dark:bg-slate-950 flex flex-col overflow-y-auto no-scrollbar animate-in slide-in-from-right-8 duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#f5f5f5] dark:bg-slate-950 px-4 py-3 pt-10 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-800 dark:text-slate-200">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">评价记录</h1>
        <div className="w-10"></div>
      </header>

      {/* Filters */}
      <div className="px-4 pb-3 pt-2 sticky top-[72px] z-10 bg-[#f5f5f5] dark:bg-slate-950">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium border ${activeFilter === 'all' ? 'bg-[#fff0f0] border-[#ff4d4f] text-[#ff4d4f] dark:bg-red-950/30' : 'bg-white border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
          >
            全部 {counts.all}
          </button>
          <button 
            onClick={() => setActiveFilter('good')}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium border ${activeFilter === 'good' ? 'bg-[#fff0f0] border-[#ff4d4f] text-[#ff4d4f] dark:bg-red-950/30' : 'bg-white border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
          >
            好评 {counts.good}
          </button>
          <button 
            onClick={() => setActiveFilter('bad')}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium border ${activeFilter === 'bad' ? 'bg-[#fff0f0] border-[#ff4d4f] text-[#ff4d4f] dark:bg-red-950/30' : 'bg-white border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
          >
            差评 {counts.bad}
          </button>
        </div>
        
        <div className="flex items-center gap-4 mt-3 px-1">
            <span className="text-[13px] font-bold text-slate-900 dark:text-white">综合</span>
            <span className="text-[13px] font-medium text-slate-400">最新</span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="px-3 pb-safe-bottom space-y-3 pb-8">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-slate-900 rounded-[1rem] p-4 shadow-sm">
            {/* User Info */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <img src={review.avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-medium text-slate-900 dark:text-slate-100">{review.userName}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{review.time}</span>
                </div>
              </div>
              <button className="text-slate-300 dark:text-slate-600">
                  <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Rating Tag */}
            <div className="flex items-center gap-1 mb-2.5">
              <Star className={`w-3.5 h-3.5 ${review.rating >= 4 ? 'text-[#ff4d4f] fill-[#ff4d4f]' : 'text-slate-400 fill-slate-400'}`} />
              <span className={`text-[12px] font-bold ${review.rating >= 4 ? 'text-[#ff4d4f]' : 'text-slate-500'}`}>{review.tag}</span>
            </div>

            {/* Content */}
            <p className="text-[14px] text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
              {review.content}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>浏览 1234</span>
              <button className="flex items-center gap-1 hover:text-slate-600 transition-colors">
                <ThumbsUp size={14} />
                <span>{review.likes}</span>
              </button>
            </div>
          </div>
        ))}
        {filteredReviews.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
                暂无相关评价信息
            </div>
        )}
      </div>
    </div>
  );
};

export default RatingRecords;
