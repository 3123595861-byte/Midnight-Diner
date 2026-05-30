"use client";

import { COOKING_CONFIG } from "@/components/cooking/config";

interface ChefThoughtPanelProps {
  value: string;
  onChange: (value: string) => void;
}

/** 左侧：厨师心里话（单气泡、靠左上、尾巴在右下、20字限制） */
export function ChefThoughtPanel({ value, onChange }: ChefThoughtPanelProps) {
  const { chefThoughtPrompt, font } = COOKING_CONFIG;
  const MAX_LENGTH = 20; // 限制最大字数为20

  return (
    <div className="absolute top-[8%] left-[4%] w-[35%] min-w-[300px] z-10">
      
      {/* 主泡泡框 */}
      <div className="relative bg-white border-4 border-black rounded-[2.5rem] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.7)] flex flex-col gap-3">
        
        {/* 顶部小标签 */}
        <div className="absolute -top-5 left-8 bg-yellow-400 border-4 border-black px-4 py-1 rounded-full text-sm font-bold text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rotate-[-3deg]" aria-hidden="true">
          思
        </div>

        {/* 提示语与字数统计 */}
        <div className="flex justify-between items-end mb-1">
          {chefThoughtPrompt && (
            <p 
              className="font-bold text-black/80 order-pixel-text" 
              style={{ fontSize: font?.size }}
            >
              {chefThoughtPrompt}
            </p>
          )}
          {/* 实时字数显示 */}
          <span className="text-xs font-bold text-gray-400 font-pixel">
            {value.length}/{MAX_LENGTH}
          </span>
        </div>

        {/* 文本输入区：加入 maxLength 限制 */}
        <textarea
          className="w-full h-24 bg-transparent resize-none outline-none text-black leading-relaxed placeholder:text-gray-400 font-pixel"
          style={{ fontSize: font?.size }}
          placeholder="在这里写下想对顾客说的话……"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          maxLength={MAX_LENGTH}
          aria-label="想对顾客说的话"
        />

        {/* 唯一的思考气泡尾巴，放在右下方 */}
        <div className="absolute -bottom-6 right-12 w-8 h-8 bg-white border-4 border-black rounded-full shadow-[4px_4px_0_0_rgba(0,0,0,0.7)]" />
      </div>
    </div>
  );
}