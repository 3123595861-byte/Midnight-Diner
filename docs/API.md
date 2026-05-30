# 后端 API 文档

前端接入时只需调用以下三个接口。

---

## GET /api/catalog

获取食材、厨具及经济常量（游戏初始化）。

**响应 `data` 示例：**

```json
{
  "initial_money": 1000,
  "guests_per_day": 3,
  "poison_penalty": 500,
  "star_income_multiplier": { "5": 3, "4": 2, "3": 1, "2.5": 1, "2": 0, "1": 0, "0": 0 },
  "ingredients": [{ "id": "noodles", "name": "拉面", "category": "other", "price": 12, "asset_key": "noodles.png" }],
  "utensils": [{ "id": "pot", "name": "炖锅", "asset_key": "pot.png" }]
}
```

---

## GET /api/guest?day=1&index=0

获取当天第 N 位客人的故事（**不含**核心食材答案）。

**响应 `data` 示例：**

```json
{
  "guest_id": "guest_01",
  "name": "上班族",
  "story": "老板，加班到现在……给我来一碗豚骨拉面吧……",
  "difficulty": "direct",
  "asset_key": "Customer1",
  "day": 1,
  "index": 0,
  "guests_total": 3
}
```

---

## POST /api/cook

完整烹饪流程：**预检 → AI 判定 → 星级校正 → 生图 → 经济结算**。

**请求体：**

```json
{
  "guest_story": "老板，加班到现在……给我来一碗豚骨拉面吧……",
  "guest_id": "guest_01",
  "player_recipe": {
    "ingredient_ids": ["noodles", "pork_bone", "green_onion"],
    "utensil_id": "pot"
  },
  "current_day": 1,
  "current_money": 1000
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `guest_story` | ✅ | 客人故事 |
| `player_recipe.ingredient_ids` | ✅ | 所选食材 ID |
| `player_recipe.utensil_id` | ✅ | 厨具 ID |
| `guest_id` | 推荐 | 自动匹配核心食材，用于星级校正 |
| `current_day` | 否 | 默认 1，影响 AI 判定严苛度 |
| `current_money` | 否 | 默认 1000，用于计算 `remaining_money` |

**响应 `data` 示例：**

```json
{
  "food_name": "浓汤豚骨拉面",
  "star_rating": 5,
  "star_rating_raw": 5,
  "evaluation": "老板……就是这个味道。",
  "image_url": "https://...",
  "settlement": {
    "ingredient_cost": 33,
    "payment_received": 99,
    "poison_penalty": 0,
    "net_change": 66,
    "remaining_money": 1066,
    "is_bankrupt": false
  },
  "meta": {
    "has_core_ingredient": true,
    "is_poisonous": false,
    "incompatible_label": null,
    "star_rating_adjusted": false,
    "adjustment_reason": "none",
    "current_day": 1,
    "guest_id": "guest_01"
  }
}
```

### 星级与经济规则

| 星级 | 收入（相对食材成本） | 说明 |
|------|----------------------|------|
| 5 | 300% | 猜中核心食材 + 搭配合理 |
| 4 | 200% | 很好；或未猜中但做得极好（封顶） |
| 3 / 2.5 | 100% | 保本 |
| 1 / 2 | 0% | 亏损食材费 |
| 0 | 0% + 医药费 500 | 相克组合（如牛奶+柠檬） |

### 后端校正规则（`meta.star_rating_adjusted`）

- 相克组合 → 强制 0 星
- 未含核心食材 → 最高 4 星（即使 AI 给了 5 星）

---

## 推荐前端调用顺序

```
1. GET  /api/catalog          → 加载食材/厨具/初始资金
2. GET  /api/guest?day=&index= → 展示客人故事
3. 玩家选料后 POST /api/cook  → 展示评价、图片、结算
4. 用 settlement.remaining_money 更新本地资金，继续下一位客人
```
