import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Shield, 
  Pencil, 
  Trash2, 
  Zap, 
  MinusCircle, 
  BadgeCheck, 
  Plus, 
  Send, 
  Check
} from 'lucide-react';
import { WorkOrder } from '../types';

const FEE_CATALOG = [
  { name: '(一标)电工 (白班4小时)', unitPrice: 120, unit: '工日', category: '收费项', iconType: 'zap' },
  { name: '(二标)木工 (白班4小时)', unitPrice: 100, unit: '工日', category: '收费项', iconType: 'wrench' },
  { name: '高空作业费', unitPrice: 200, unit: '次', category: '附加费', iconType: 'shield' },
  { name: '夜间施工附加费', unitPrice: 150, unit: '次', category: '附加费', iconType: 'zap' },
  { name: '其他', unitPrice: 0, unit: '项', category: '其他费用', iconType: 'wrench' }
];

interface FeeDetailsTabProps {
  order: WorkOrder;
  onSubmit: (data: any) => void;
  readOnly?: boolean;
}

const FeeDetailsTab: React.FC<FeeDetailsTabProps> = ({ order, onSubmit, readOnly }) => {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', unitPrice: 0, quantity: 1, unit: '项', category: '收费项', iconType: 'wrench' });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (order) {
      setItems([
        { id: '1', iconType: 'wrench', category: '收费项', name: '基础维修费', unitPrice: (order.cost || 0) + 18, quantity: 1, unit: '次', style: 'primary', isSmall: false },
        { id: '2', iconType: 'shield', category: '其他费用', name: '人身意外险-低空A', unitPrice: -3, quantity: 1, unit: '份', style: 'error', isSmall: false },
        { id: '3', iconType: 'zap', category: '补贴', name: '准时上门补贴', unitPrice: 5, quantity: 1, unit: '项', style: 'primary', isSmall: true },
        { id: '4', iconType: 'badge', category: '奖励', name: '现场行为规范奖励', unitPrice: 10, quantity: 1, unit: '项', style: 'primary', isSmall: true },
      ]);
      setEditingId(null);
      setShowDropdown(false);
    }
  }, [order]);

  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const finalTotal = subtotal - 12 - 6; // Fixed deductions for demo

  const renderIcon = (type: string, className: string) => {
    switch(type) {
      case 'wrench': return <Wrench className={className} />;
      case 'shield': return <Shield className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'badge': return <BadgeCheck className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ 
      name: item.name, 
      unitPrice: item.unitPrice, 
      quantity: item.quantity,
      unit: item.unit || '项',
      category: item.category || '收费项',
      iconType: item.iconType || 'wrench'
    });
    setShowDropdown(false);
  };

  const handleSave = () => {
    if (!editForm.name.trim()) {
      alert('请输入或选择费用项名称');
      return;
    }
    setItems(items.map(i => i.id === editingId ? { 
      ...i, 
      name: editForm.name,
      unitPrice: Number(editForm.unitPrice), 
      quantity: Number(editForm.quantity),
      unit: editForm.unit,
      category: editForm.category,
      iconType: editForm.iconType
    } : i));
    setEditingId(null);
    setShowDropdown(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleAddItem = () => {
    const newItem = { 
      id: `new-${Date.now()}`, 
      iconType: 'plus', 
      category: '新费用', 
      name: '', 
      unitPrice: 0, 
      quantity: 1, 
      unit: '项', 
      style: 'primary', 
      isSmall: false 
    };
    
    const smallItemsIndex = items.findIndex(i => i.isSmall);
    const insertIndex = smallItemsIndex >= 0 ? smallItemsIndex : items.length;
    
    const newItems = [...items];
    newItems.splice(insertIndex, 0, newItem);
    
    setItems(newItems);
    setEditingId(newItem.id);
    setEditForm({ 
      name: '', 
      unitPrice: 0, 
      quantity: 1, 
      unit: '项', 
      category: '新费用', 
      iconType: 'plus' 
    });
    setShowDropdown(true);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Header Summary Card */}
      <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="mb-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">总金额</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">¥{finalTotal.toFixed(2)}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">报价单编号</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">#QN-2023-0892</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">最后更新</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Aug 24, 14:20</p>
          </div>
        </div>
      </section>

      {/* Itemized List Section */}
      <div className="space-y-4">
        <div className="flex items-center px-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">费用明细</h3>
        </div>

        {/* Large Items */}
        {items.filter(i => !i.isSmall).map(item => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 group relative">
            {editingId === item.id ? (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text"
                      value={editForm.name}
                      onChange={e => {
                        setEditForm({...editForm, name: e.target.value});
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      placeholder="搜索收费项或输入名称..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500"
                    />
                    {showDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                        {FEE_CATALOG.filter(f => f.name.toLowerCase().includes(editForm.name.toLowerCase())).map((f, idx) => (
                          <button
                            key={idx}
                            className="w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                            onClick={() => {
                              setEditForm({
                                ...editForm,
                                name: f.name,
                                unitPrice: f.unitPrice,
                                unit: f.unit,
                                category: f.category,
                                iconType: f.iconType
                              });
                              setShowDropdown(false);
                            }}
                          >
                            <div className="font-medium text-slate-900 dark:text-white">{f.name}</div>
                            <div className="text-[10px] text-slate-500">¥{f.unitPrice.toFixed(2)} / {f.unit}</div>
                          </button>
                        ))}
                        {editForm.name && !FEE_CATALOG.find(f => f.name === editForm.name) && (
                          <button
                            className="w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-primary-600 dark:text-primary-400 font-medium"
                            onClick={() => setShowDropdown(false)}
                          >
                            使用自定义名称 "{editForm.name}"
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <button onClick={handleSave} className="p-2 bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 rounded-lg transition-colors shrink-0">
                    <Check className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 rounded-lg px-4 py-3">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">单价 (¥)</p>
                      <input 
                        type="number" 
                        value={editForm.unitPrice} 
                        onChange={e => setEditForm({...editForm, unitPrice: parseFloat(e.target.value) || 0})}
                        className="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">数量</p>
                      <input 
                        type="number" 
                        value={editForm.quantity} 
                        onChange={e => setEditForm({...editForm, quantity: parseInt(e.target.value) || 0})}
                        className="w-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">小计</p>
                    <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      ¥{(editForm.unitPrice * editForm.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.style === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'}`}>
                      {renderIcon(item.iconType, "w-5 h-5")}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.category}</p>
                      <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    </div>
                  </div>
                  {!readOnly && (
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 rounded-lg px-4 py-3">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">单价</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.unitPrice.toFixed(2)} / {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">数量</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">× {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">小计</p>
                    <p className={`text-lg font-bold ${item.style === 'error' ? 'text-red-600 dark:text-red-400' : 'text-primary-600 dark:text-primary-400'}`}>
                      {(item.unitPrice * item.quantity) > 0 ? '' : ''}¥{(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Small Items */}
        <div className="grid grid-cols-2 gap-4">
          {items.filter(i => i.isSmall).map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                {renderIcon(item.iconType, "w-5 h-5 text-primary-600 dark:text-primary-400")}
                <div className="flex gap-1">
                  {editingId === item.id ? (
                    <button onClick={handleSave} className="text-green-600 hover:text-green-700"><Check className="w-4 h-4" /></button>
                  ) : (
                    <button onClick={() => handleEdit(item)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Pencil className="w-4 h-4" /></button>
                  )}
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-600"><MinusCircle className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.category}</p>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">{item.name}</h4>
              
              {editingId === item.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">¥</span>
                  <input 
                    type="number" 
                    value={editForm.unitPrice} 
                    onChange={e => setEditForm({...editForm, unitPrice: parseFloat(e.target.value) || 0})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary-500"
                  />
                </div>
              ) : (
                <p className="text-base font-bold text-primary-600 dark:text-primary-400">¥{(item.unitPrice * item.quantity).toFixed(2)}</p>
              )}
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        {!readOnly && (
          <button 
            onClick={handleAddItem}
            className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-xl transition-all flex flex-col items-center justify-center group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center mb-2 transition-colors text-slate-500">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">添加新费用项</span>
          </button>
        )}
      </div>

      {/* Detailed Breakdown */}
      <section className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-4 border border-slate-100 dark:border-slate-700/50">
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 pb-2">扣减项与最终结算</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">扣减管理费 (Management Fee)</p>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">-¥12.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">扣减税费 (Tax)</p>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">-¥6.00</p>
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-extrabold text-primary-600 dark:text-primary-400 uppercase">总计金额</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">最终结算金额</p>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">¥{finalTotal.toFixed(2)}</p>
          </div>
        </div>
      </section>

      {/* Submit Button */}
      {!readOnly && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => onSubmit({ total: finalTotal, items })}
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3.5 px-12 w-full max-w-[240px] active:scale-95 transition-all shadow-lg shadow-primary-600/20"
          >
            <Send className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wider">提交报价</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FeeDetailsTab;
