const UI = {
  hero(kicker, title, text, light = false) {
    return `<section class="ui-hero ${light ? "light" : ""}"><small>${kicker}</small><h5>${title}</h5><p>${text}</p></section>`;
  },
  banner(kicker, title, text, badge = "今日开放 09:00—22:00") {
    return `<section class="ui-banner"><div class="ui-banner-copy"><small>${kicker}</small><h5>${title}</h5><p>${text}</p><span>${badge}</span></div><div class="ui-banner-dots"><i></i><i></i><i></i></div></section>`;
  },
  quick(items) {
    return `<div class="ui-quick-grid">${items.map(item => `<button type="button" class="ui-quick-item" data-ui-quick><i>${item[0]}</i><b>${item[1]}</b><small>${item[2] || ""}</small></button>`).join("")}</div>`;
  },
  serviceBar(items) {
    return `<div class="ui-service-bar">${items.map(item => `<div><b>${item[0]}</b><span>${item[1]}</span></div>`).join("")}</div>`;
  },
  requirements(items) {
    return `<div class="ui-requirements">${items.map(item => `<article><header><i>${item[0]}</i><div><h6>${item[1]}</h6><p>${item[2]}</p></div></header><dl>${item[3].map(rule => `<div><dt>${rule[0]}</dt><dd>${rule[1]}</dd></div>`).join("")}</dl></article>`).join("")}</div>`;
  },
  people(items, note = "") {
    return `<div class="ui-people">${items.map(item => `<button type="button" class="ui-person ${item[3] || ""}" data-ui-person aria-pressed="${item[3] === "selected"}" ${item[3] === "disabled" ? "disabled" : ""}><i>${item[3] === "disabled" ? "×" : item[3] === "selected" ? "✓" : "○"}</i><span><b>${item[0]}</b><small>${item[1]}</small></span><em>${item[2] || "编辑"}</em></button>`).join("")}</div>${note ? `<p class="ui-helper">${note}</p>` : ""}`;
  },
  counters(items) {
    return `<div class="ui-counter-list">${items.map(item => `<div class="ui-counter-row"><span><b>${item[0]}</b><small>${item[1] || ""}</small></span><div><button type="button" data-ui-counter="minus" aria-label="减少${item[0]}">−</button><strong data-ui-counter-value>${item[2] || 0}</strong><button type="button" data-ui-counter="plus" aria-label="增加${item[0]}">＋</button></div></div>`).join("")}</div>`;
  },
  consent(label, checked = true) {
    return `<label class="ui-consent"><input type="checkbox" ${checked ? "checked" : ""}><span>${label}</span></label>`;
  },
  composer(value = "", hint = "输入问题，也可以按住说话") {
    return `<div class="ui-composer"><button type="button" class="composer-tool" data-ui-action="添加内容">＋</button><input value="${value}" placeholder="${hint}" aria-label="输入问题"><button type="button" class="composer-tool" data-ui-action="语音输入">◉</button><button type="button" data-ui-send>发送</button></div>`;
  },
  actionStrip(items) {
    return `<div class="ui-action-strip">${items.map(item => `<button type="button" data-ui-action="${item[1]}"><i>${item[0]}</i><span>${item[1]}</span></button>`).join("")}</div>`;
  },
  seatMap(selected = [8, 9, 10]) {
    return `<div class="ui-seat-map"><div class="seat-stage">舞台</div>${Array.from({ length: 5 }, (_, row) => `<div class="seat-row"><b>${row + 8}排</b>${Array.from({ length: 10 }, (_, seat) => { const isSelected = row === 2 && selected.includes(seat + 1); const isSold = (row + seat) % 7 === 0; return `<button type="button" data-ui-seat class="${isSelected ? "selected" : isSold ? "sold" : ""}" aria-pressed="${isSelected}" ${isSold ? "disabled" : ""}>${seat + 1}</button>`; }).join("")}</div>`).join("")}<div class="seat-legend"><span><i></i>可选</span><span><i class="selected"></i>已选</span><span><i class="sold"></i>已售</span></div></div>`;
  },
  chips(items, active = 0) {
    const multiple = Array.isArray(active);
    return `<div class="ui-chip-row" data-ui-choice-group data-ui-multiple="${multiple ? "1" : "0"}">${items.map((item, index) => { const selected = multiple ? active.includes(index) : active === index; return `<button type="button" class="ui-chip ${selected ? "active" : ""}" data-ui-choice aria-pressed="${selected}">${item}</button>`; }).join("")}</div>`;
  },
  section(title, content, action = "") {
    return `<section class="ui-section"><div class="ui-section-head"><h6>${title}</h6><span>${action}</span></div>${content}</section>`;
  },
  rows(items) {
    return `<div class="ui-list">${items.map(item => { const selected = item[3] === "已选择" || item[3] === "已选"; const behavior = item[4] ? `data-ui-route="${item[4]}"` : `data-ui-row aria-pressed="${selected}"`; return `<button type="button" class="ui-row ${selected ? "active" : ""}" ${behavior}><i>${item[0]}</i><span><b>${item[1]}</b><small>${item[2] || ""}</small></span><em>${item[3] || "›"}</em></button>`; }).join("")}</div>`;
  },
  cards(items) {
    return `<div class="ui-card-list" data-ui-card-group>${items.map(item => { const behavior = item[4] ? `data-ui-route="${item[4]}"` : `data-ui-card aria-pressed="${Boolean(item[3])}"`; return `<button type="button" class="ui-card ${item[3] ? "selected" : ""}" ${behavior}><h6>${item[0]}</h6><p>${item[1]}</p>${item[2] ? `<span class="price">${item[2]}</span>` : ""}</button>`; }).join("")}</div>`;
  },
  form(fields) {
    return `<div class="ui-form">${fields.map((item, index) => { const label = String(item[0]).replace(/^\*\s*/, ""); const value = item[1] || ""; const placeholder = item[3] || "请选择"; const control = item[2] === "textarea" ? `<textarea aria-label="${label}" placeholder="${placeholder}">${value}</textarea>` : `<input aria-label="${label}" value="${value}" placeholder="${placeholder}">`; return `<label class="ui-field ${item[2] === "textarea" ? "ui-textarea" : ""}"><span>${item[0]}</span>${control}</label>`; }).join("")}</div>`;
  },
  notice(type, title, text, route = "") {
    return route ? `<button type="button" class="ui-notice ${type || ""}" data-ui-route="${route}"><b>${title}</b>${text}<i>›</i></button>` : `<div class="ui-notice ${type || ""}"><b>${title}</b>${text}</div>`;
  },
  summary(items) {
    return `<div class="ui-summary">${items.map(item => `<div><span>${item[0]}</span><b>${item[1]}</b></div>`).join("")}</div>`;
  },
  timeline(items) {
    return `<div class="ui-timeline">${items.map(item => `<article class="${item[2] || ""}"><b>${item[0]}</b><p>${item[1]}</p></article>`).join("")}</div>`;
  },
  upload(items) {
    return `<div class="ui-upload">${items.map(item => `<button type="button" data-ui-upload class="${item[2] || ""}"><span><b>${item[0]}</b><br>${item[1]}</span><em>${item[2] === "ok" ? "✓" : item[2] === "fail" ? "!" : "+"}</em></button>`).join("")}</div>`;
  },
  map(title = "搜索景点、演出、餐厅…", route = false) {
    return `<div class="ui-map"><label class="map-search">⌕ <input aria-label="搜索地图" placeholder="${title}"></label><button type="button" class="map-pin p1" data-ui-action="查看景点"><span>景</span></button><button type="button" class="map-pin p2" data-ui-action="查看服务点"><span>服</span></button><button type="button" class="map-pin p3" data-ui-action="查看当前位置"><span>我</span></button>${route ? `<div class="map-route"></div>` : ""}</div>`;
  },
  success(title, text, error = false) {
    return `<div class="ui-success ${error ? "error" : ""}"><i>${error ? "!" : "✓"}</i><h5>${title}</h5><p>${text}</p></div>`;
  },
  qr(code, note) {
    return `<section class="ui-voucher"><span class="ui-qr" aria-label="演示二维码">${Array.from({ length: 81 }, (_, index) => `<i class="${((index * 7 + index % 5) % 3) ? "on" : ""}"></i>`).join("")}</span><b>${code}</b><p>${note}</p></section>`;
  },
  chat(messages) {
    return `<div class="ui-chat">${messages.map(item => `<div class="chat-bubble ${item[0]}">${item[1]}</div>`).join("")}</div>`;
  },
  rating(value = 5) {
    return `<div class="ui-rating">${Array.from({ length: 5 }, (_, index) => `<button type="button" data-ui-rating="${index + 1}" class="${index < value ? "active" : ""}" aria-label="${index + 1}星" aria-pressed="${index < value}">${index < value ? "★" : "☆"}</button>`).join("")}</div>`;
  },
  ratingRows(items) {
    return `<div class="ui-rating-list">${items.map(item => `<div><span>${item[0]}</span>${UI.rating(item[1])}</div>`).join("")}</div>`;
  },
  progress(labels, current) {
    return `<div class="ui-progress">${labels.map((label, index) => `<span class="${index <= current ? "done" : ""}">${label}</span>`).join("")}</div>`;
  },
  adminTable(rows) {
    return `<div class="admin-filter"><label>关键词<input placeholder="工单编号、标题、游客或手机号"></label><label>投诉类目<select><option>全部类目</option>{{WORK_ORDER_CATEGORY_OPTIONS}}</select></label><label>工单状态<select><option>全部状态</option><option>待受理</option><option>处理中</option><option>待补充</option><option>已完成</option></select></label><label>处理部门<select><option>全部部门</option><option>客服组</option><option>商务部</option><option>票务组</option><option>安全保卫部</option><option>工程物业部</option><option>运营管理部</option></select></label><label>优先级<select><option>全部</option><option>普通</option><option>紧急</option></select></label><div class="admin-filter-actions"><button type="button" data-ui-action="查询工单">查询</button><button type="button" data-ui-action="重置条件">重置</button></div></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>工单编号</th><th>投诉类目</th><th>游客</th><th>状态</th><th>入园记录</th><th>当前部门</th><th>处理人</th><th>优先级</th><th>处理策略</th><th>提交时间</th><th>操作</th></tr></thead><tbody>${rows.map(row => `<tr data-type="${row[1]}" data-status="${row[3]}" data-department="${row[5]}" data-priority="${row[7]}"><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td><span class="status-tag ${row[10] || ""}">${row[3]}</span></td><td>${row[4]}</td><td>${row[5]}</td><td>${row[6]}</td><td>${row[7]}</td><td>${row[11] === "冷处理" ? `<span class="status-tag cold">冷处理</span>` : "正常"}</td><td>${row[8]}</td><td class="link">${String(row[9]).split(/\s+/).filter(Boolean).map(label => `<button type="button" data-ui-admin-op="${label}">${label}</button>`).join("")}</td></tr>`).join("")}</tbody></table></div>`;
  },
  adminDetail(groups) {
    return `<div class="admin-detail">${groups.map(group => `<section><h5>${group[0]}</h5><dl>${group[1].map(item => `<dt>${item[0]}</dt><dd>${item[1]}</dd>`).join("")}</dl></section>`).join("")}</div>`;
  }
};

const action = (label, target = "", kind = "primary", extra = {}) => ({ label, target, kind, ...extra });
const page = (id, title, purpose, body, actions = [], state = "normal", extra = {}) => ({ id, title, purpose, body, actions, state, surface: "mobile", role: "游客端", ...extra });
const adminPage = (id, title, purpose, body, actions = [], state = "normal", extra = {}) => ({ id, title, purpose, body, actions, state, surface: "admin", role: "工作人员端", ...extra });
const scene = (id, stage, title, actor, trigger, outcome, summary, source, pages) => ({ id, stage, title, actor, trigger, outcome, summary, source, pages });

const S06UI = {
  chat() {
    return `<section class="s06-chat-page">
      <div class="s06-assistant-head"><i>清</i><div><b>清园行程助手</b><span>把人数、日期和预算告诉我</span></div></div>
      <div class="s06-chat-thread">
        <div class="s06-chat-bubble ai"><b>你好，我可以帮你安排门票、住宿、用餐和节目。</b><span>信息不完整时，我只会继续询问缺少的内容。</span></div>
        <div class="s06-chat-bubble user">三个人预算 5000，含住宿和吃饭；8 月 22 日入住，8 月 23 日入园。</div>
      </div>
      <div class="s06-prompt-row"><button type="button" data-s06-prompt="一家三口，周末玩两天，预算 5000 元，需要住宿和晚间演出">家庭两日游</button><button type="button" data-s06-prompt="两位老人，游玩一天，少走路，预算 1500 元">长者轻松游</button></div>
      <div class="s06-chat-composer"><textarea data-s06-request aria-label="描述出游需求">三个人预算 5000，含住宿和吃饭；8 月 22 日入住，8 月 23 日入园。</textarea><button type="button" data-s06-page="s06-recognized" aria-label="发送需求">↑</button></div>
    </section>`;
  },
  recognized() {
    return `<section class="s06-recognized">
      <div class="s06-result-head"><i>✓</i><div><b>已整理出游信息</b><span>点击内容可直接修改</span></div></div>
      <div class="s06-edit-grid">
        <label><span>成人</span><input value="2 人" aria-label="成人数量"></label>
        <label><span>儿童</span><input value="1 人" aria-label="儿童数量"></label>
        <label class="wide"><span>总预算</span><input value="¥5,000" aria-label="总预算"></label>
        <label><span>入住日期</span><input type="date" value="2026-08-22" aria-label="入住日期"></label>
        <label><span>入园日期</span><input type="date" value="2026-08-23" aria-label="入园日期"></label>
      </div>
      <div class="s06-recognized-tags"><button type="button" class="active" data-s06-toggle aria-pressed="true">需要住宿</button><button type="button" class="active" data-s06-toggle aria-pressed="true">安排用餐</button><button type="button" data-s06-toggle aria-pressed="false">行动不便</button></div>
      <p class="s06-inline-tip">还需要选择抵达方式、住宿、餐厅和节目。</p>
    </section>`;
  },
  hotel() {
    return `<section class="s06-selection-page">
      <div class="s06-section-title"><b>怎么到景区？</b><span>用于推荐停车或接驳路线</span></div>
      <div class="s06-segments s06-select-group">
        <button type="button" data-s06-select>高铁</button><button type="button" class="active" data-s06-select>自驾</button><button type="button" data-s06-select>飞机</button><button type="button" data-s06-select>当地出发</button>
      </div>
      <div class="s06-section-title"><b>住在哪里？</b><span>8 月 22 日入住 · 1 晚</span></div>
      <div class="s06-hotel-list s06-select-group">
        <button type="button" class="s06-hotel active" data-s06-select><i class="hotel-one"></i><span><b>满庭芳精品客栈</b><small>景区内 · 家庭房 · 含双早</small><em><strong>¥598</strong> / 晚　距离入口 320m</em></span><u>✓</u></button>
        <button type="button" class="s06-hotel" data-s06-select><i class="hotel-two"></i><span><b>官驿度假酒店</b><small>免费接驳 · 双床房 · 含早餐</small><em><strong>¥428</strong> / 晚　车程约 10 分钟</em></span><u>○</u></button>
        <button type="button" class="s06-hotel no-image" data-s06-select><span><b>不需要住宿</b><small>当日往返，不计入住宿费用</small></span><u>○</u></button>
      </div>
    </section>`;
  },
  food() {
    return `<section class="s06-selection-page">
      <div class="s06-section-title"><b>选择主要用餐</b><span>可在行程生成后调整时间</span></div>
      <div class="s06-food-list s06-select-group">
        <button type="button" class="active" data-s06-select><i>清</i><span><b>清明食府</b><small>家常菜 · 适合儿童 · 清淡选择多</small></span><em>约 ¥80/人</em></button>
        <button type="button" data-s06-select><i>食</i><span><b>东京食坊</b><small>园区小吃 · 方便灵活分食</small></span><em>约 ¥55/人</em></button>
      </div>
      <div class="s06-section-title"><b>想看的节目</b><span>已选择 4 项</span></div>
      <div class="s06-program-grid">
        <button type="button" class="active" data-s06-toggle aria-pressed="true"><i>梦</i><b>东京梦华</b><span>晚间必看</span></button>
        <button type="button" class="active" data-s06-toggle aria-pressed="true"><i>岳</i><b>岳飞枪挑小梁王</b><span>日间演出</span></button>
        <button type="button" class="active" data-s06-toggle aria-pressed="true"><i>包</i><b>包公迎宾</b><span>09:00</span></button>
        <button type="button" class="active" data-s06-toggle aria-pressed="true"><i>俗</i><b>民俗体验</b><span>亲子推荐</span></button>
      </div>
    </section>`;
  },
  travelers(complete = false) {
    return `<section class="s06-traveler-page">
      <div class="s06-count-summary"><div><b>需要 3 位出行人</b><span>${complete ? "已选择 3 人，可以继续" : "已选择 2 人，还缺 1 位儿童"}</span></div><strong class="${complete ? "ok" : ""}">${complete ? "3/3" : "2/3"}</strong></div>
      <div class="s06-traveler-list">
        <button type="button" class="selected" data-s06-toggle aria-pressed="true"><i>赵</i><span><b>赵敏</b><small>成人 · 身份证 410***********5127</small></span><em>✓</em></button>
        <button type="button" class="selected" data-s06-toggle aria-pressed="true"><i>李</i><span><b>李明</b><small>成人 · 身份证 410***********0728</small></span><em>✓</em></button>
        ${complete ? `<button type="button" class="selected" data-s06-toggle aria-pressed="true"><i>小</i><span><b>小明</b><small>儿童 · 身份证 410***********5129</small></span><em>✓</em></button>` : `<button type="button" class="add" data-s06-page="s06-traveler-method"><i>＋</i><span><b>添加儿童出行人</b><small>用于实名购票和票型匹配</small></span><em>›</em></button>`}
      </div>
      <p class="s06-inline-tip ${complete ? "success" : "error"}">${complete ? "已匹配 2 张成人票和 1 张儿童优惠票。" : "人数不足时不能生成行程。"}</p>
    </section>`;
  },
  travelerMethods() {
    return `<section class="s06-methods">
      <button type="button" data-s06-page="s06-traveler-form"><i>填</i><span><b>手动填写</b><small>姓名、证件和监护人信息</small></span><em>推荐</em></button>
      <button type="button" data-s06-page="s06-traveler-form"><i>扫</i><span><b>拍身份证添加</b><small>拍摄后核对识别结果</small></span><em>›</em></button>
      <button type="button" data-s06-page="s06-traveler-form"><i>邀</i><span><b>邀请同行人填写</b><small>生成一次性填写链接</small></span><em>›</em></button>
      <button type="button" data-s06-page="s06-traveler-form"><i>批</i><span><b>批量录入</b><small>适合家庭和团队</small></span><em>›</em></button>
    </section>`;
  },
  travelerForm() {
    return `<section class="s06-real-form">
      <label><span>姓名</span><input value="小明" required></label>
      <label><span>证件类型</span><select><option>居民身份证</option><option>护照</option></select></label>
      <label><span>证件号码</span><input value="410***********5129" required></label>
      <label><span>出生日期</span><input type="date" value="2015-08-18" required></label>
      <div class="s06-form-divider">监护人信息</div>
      <label><span>监护人</span><input value="赵敏" required></label>
      <label><span>联系电话</span><input value="187****7128" required></label>
      <label class="agreement"><input type="checkbox" checked><span>保存到常用出行人</span></label>
    </section>`;
  },
  generating() {
    return `<section class="s06-generating-page"><div class="s06-generating-mark"><i></i><b>正在安排两天行程</b><span>预计还需 3 秒</span></div><ol><li class="done"><i>✓</i><span><b>节目场次</b>东京梦华 19:30 有余票</span></li><li class="done"><i>✓</i><span><b>游览路线</b>减少南苑、北苑重复往返</span></li><li class="current"><i></i><span><b>费用核算</b>正在匹配门票、酒店和餐饮</span></li><li><i></i><span><b>生成方案</b>即将完成</span></li></ol></section>`;
  },
  itinerary() {
    return `<section class="s06-itinerary-page">
      <div class="s06-itinerary-cover"><span>家庭两日宋韵之旅</span><b>8月22日—23日</b><em>2大1小 · 自驾 · 住1晚</em></div>
      <div class="s06-day-tabs"><button type="button" class="active" data-s06-day="day1">第1天</button><button type="button" data-s06-day="day2">第2天</button></div>
      <div class="s06-day-panel active" data-s06-day-panel="day1">
        <article><time>16:00</time><i>住</i><span><b>满庭芳精品客栈</b><small>办理入住 · 家庭房</small></span><em>可调整</em></article>
        <article><time>18:00</time><i>食</i><span><b>东京食坊</b><small>园区晚餐 · 约 60 分钟</small></span></article>
        <article><time>19:30</time><i>游</i><span><b>汴河夜游</b><small>从虹桥码头出发</small></span></article>
      </div>
      <div class="s06-day-panel" data-s06-day-panel="day2">
        <article><time>09:00</time><i>门</i><span><b>迎宾门入园</b><small>建议提前 20 分钟到达</small></span></article>
        <article><time>10:30</time><i>演</i><span><b>岳飞枪挑小梁王</b><small>演武场 · 约 30 分钟</small></span></article>
        <article><time>19:30</time><i>梦</i><span><b>大宋·东京梦华</b><small>B区 · 尚未选座</small></span><em>需购买</em></article>
      </div>
      <div class="s06-price-bar"><span>预计总额 <b>¥4,326</b></span><em>预算剩余 ¥674</em></div>
    </section>`;
  },
  order() {
    return `<section class="s06-order-page">
      <div class="s06-order-group"><h6>门票与演出</h6><article><i>票</i><span><b>景区日间票</b><small>2 成人 + 1 儿童 · 8月23日</small></span><strong>¥300</strong></article><article><i>演</i><span><b>大宋·东京梦华</b><small>B区 3席 · 19:30</small></span><strong>¥747</strong></article></div>
      <div class="s06-order-group"><h6>住宿与餐饮</h6><article><i>住</i><span><b>满庭芳精品客栈</b><small>家庭房 1晚 · 含双早</small></span><strong>¥598</strong></article><article><i>食</i><span><b>清明食府家庭套餐</b><small>3人套餐 · 8月23日</small></span><strong>¥240</strong></article></div>
      <div class="s06-bill"><div><span>商品合计</span><b>¥1,885</b></div><div><span>平台优惠</span><b class="red">-¥80</b></div><div class="total"><span>应付</span><b>¥1,805</b></div></div>
    </section>`;
  },
  payment() {
    return `<section class="s06-payment-page"><div class="s06-pay-amount"><span>支付剩余 14:56</span><b>¥1,805</b><em>清明上河园组合订单</em></div><div class="s06-pay-methods s06-select-group"><button type="button" class="active" data-s06-select><i>微</i><span><b>微信支付</b><small>187****8527</small></span><em>✓</em></button><button type="button" data-s06-select><i>卡</i><span><b>其他支付方式</b><small>银行卡或云闪付</small></span><em>○</em></button></div><div class="s06-payment-note"><span>订单号</span><b>QY202608170026</b></div></section>`;
  },
  success() {
    return `<section class="s06-success-page"><div class="s06-success-mark">✓</div><h5>支付成功</h5><p>订单和行程已保存，可在“我的行程”中查看。</p><div><span><b>家庭两日宋韵之旅</b><small>8月22日—23日 · 2大1小</small></span><em>¥1,805</em></div><ul><li><i>1</i><span>8月22日 16:00</span><b>办理酒店入住</b></li><li><i>2</i><span>8月23日 09:00</span><b>迎宾门入园</b></li><li><i>3</i><span>8月23日 19:30</span><b>观看东京梦华</b></li></ul></section>`;
  }
};

const S03UI = {
  assistantHead(status = "在线") {
    return `<div class="s03-assistant-head"><span class="s03-avatar">清</span><div><b>小清 AI 助手</b><small>${status} · 景区信息实时查询</small></div><button type="button" data-s03-page="s03-history">历史</button></div>`;
  },
  welcome() {
    return `<section class="s03-chat-page s03-welcome-page">
      ${this.assistantHead()}
      <div class="s03-welcome-copy"><span>上午好，赵女士</span><h5>今天想了解什么？</h5><p>我可以查询节目、门票、路线、餐饮，也能直接帮你生成游园安排。</p></div>
      <div class="s03-prompt-grid">
        <button type="button" data-s03-prompt="第一次来清明上河园，一天怎么玩？"><i>行</i><span><b>第一次来怎么玩</b><small>生成一日游建议</small></span><em>›</em></button>
        <button type="button" data-s03-prompt="今天有哪些必看的演出？"><i>演</i><span><b>今天必看演出</b><small>查询场次与地点</small></span><em>›</em></button>
        <button type="button" data-s03-prompt="东京梦华晚上还有票吗？"><i>票</i><span><b>东京梦华余票</b><small>查询场次与票价</small></span><em>›</em></button>
        <button type="button" data-s03-prompt="自驾到景区停在哪里最方便？"><i>车</i><span><b>交通与停车</b><small>查看到园路线</small></span><em>›</em></button>
      </div>
      <div class="s03-capabilities"><span>还可以问</span><button type="button" data-s03-prompt="带老人游园怎么少走路？">长者游园</button><button type="button" data-s03-prompt="园区里适合儿童的项目有哪些？">亲子项目</button><button type="button" data-s03-prompt="园区里有哪些特色餐厅？">餐饮推荐</button></div>
    </section>`;
  },
  loading() {
    return `<section class="s03-chat-page">
      ${this.assistantHead("正在回答")}
      <div class="s03-thread">
        <div class="s03-message user"><p>第一次来清明上河园，一天怎么玩？</p><time>09:41</time></div>
        <div class="s03-message ai generating"><span class="s03-avatar small">清</span><div><p>我正在结合今日节目时间和园区路线，为你安排一条少走回头路的一日游路线。</p><ol><li class="done">已查询今日开放信息</li><li class="done">已匹配热门演出场次</li><li class="current">正在整理游览顺序</li></ol><span class="s03-typing"><i></i><i></i><i></i></span></div></div>
      </div>
    </section>`;
  },
  error() {
    return `<section class="s03-chat-page">
      ${this.assistantHead("连接已中断")}
      <div class="s03-thread">
        <div class="s03-message user"><p>第一次来清明上河园，一天怎么玩？</p><time>09:41</time></div>
        <div class="s03-message ai"><span class="s03-avatar small">清</span><div><p>建议上午从迎宾门入园，先看 09:00 包公迎宾，再前往演武场观看岳飞枪挑小梁王……</p><div class="s03-interrupt"><b>回答中断</b><span>网络连接不稳定，已保留上面的内容。</span><button type="button" data-s03-page="s03-loading">继续生成</button></div></div></div>
      </div>
    </section>`;
  },
  answer() {
    return `<section class="s03-chat-page">
      ${this.assistantHead()}
      <div class="s03-thread">
        <div class="s03-message user"><p>第一次来清明上河园，一天怎么玩？</p><time>09:41</time></div>
        <div class="s03-message ai answer"><span class="s03-avatar small">清</span><div class="s03-answer-sheet">
          <header><small>已结合今日节目单</small><h5>第一次来，建议这样安排一天</h5><p>从迎宾门入园，按南苑到北苑的顺序游览，晚间观看东京梦华，路线更顺。</p></header>
          <ol class="s03-route-list">
            <li><time>09:00</time><span><b>迎宾门 · 包公迎宾</b><small>建议提前 20 分钟到达</small></span></li>
            <li><time>10:30</time><span><b>演武场 · 岳飞枪挑小梁王</b><small>步行约 12 分钟 · 演出 30 分钟</small></span></li>
            <li><time>12:00</time><span><b>东京食坊 · 午餐</b><small>附近可休息约 60 分钟</small></span></li>
            <li><time>14:00</time><span><b>汴河沿线 · 民俗体验</b><small>虹桥、上善门、勾栏瓦肆</small></span></li>
            <li><time>19:30</time><span><b>大宋·东京梦华</b><small>B 区有余票 · 需提前购票</small></span></li>
          </ol>
          <p class="s03-ai-disclosure">内容由 AI 生成，请核对票价、场次等关键信息。</p>
          <p class="s03-source">信息来源：今日节目单、园区开放公告 · 09:41 更新</p>
          <div class="s03-answer-actions"><button type="button" data-s03-action="复制">复制</button><button type="button" data-s03-action="分享">分享</button><button type="button" data-s03-page="s03-context">继续追问</button><button type="button" data-s03-page="s03-cannot-answer">咨询停演</button><button type="button" data-s03-page="s03-feedback">评价</button></div>
        </div></div>
        <div class="s03-business-links">
          <button type="button" data-s03-page="s06-input"><i>行</i><span><b>生成完整一日行程</b><small>可继续调整节目和用餐</small></span><em>›</em></button>
          <button type="button" data-s03-page="s10-mall"><i>票</i><span><b>查看东京梦华余票</b><small>19:30 / 20:45 两个场次</small></span><em>›</em></button>
          <button type="button" data-s03-page="s16-map"><i>图</i><span><b>在园区地图查看路线</b><small>定位景点和步行距离</small></span><em>›</em></button>
        </div>
      </div>
    </section>`;
  },
  history() {
    return `<section class="s03-history-page"><label class="s03-history-search">⌕<input type="search" placeholder="搜索历史问题" aria-label="搜索历史问题"></label><div class="s03-history-group"><span>今天</span><button type="button" data-s03-page="s03-answer"><b>第一次去清明上河园怎么玩？</b><small>09:41 · 已生成一日游建议</small><em>›</em></button><button type="button" data-s03-page="s03-answer"><b>东京梦华晚上还有票吗？</b><small>08:26 · 查询了两个场次</small><em>›</em></button></div><div class="s03-history-group"><span>更早</span><button type="button" data-s03-page="s03-answer"><b>景区附近怎么停车？</b><small>8 月 15 日</small><em>›</em></button><button type="button" data-s03-page="s03-answer"><b>带老人有哪些休息点？</b><small>8 月 14 日</small><em>›</em></button></div></section>`;
  },
  feedback() {
    return `<section class="s03-feedback-page"><div class="s03-feedback-mark">清</div><h5>这次回答有帮助吗？</h5><p>你的反馈会用于改善后续回答。</p>${UI.rating(4)}<div class="s03-feedback-tags" data-ui-choice-group data-ui-multiple="1"><button type="button" class="active" data-ui-choice aria-pressed="true">信息准确</button><button type="button" class="active" data-ui-choice aria-pressed="true">路线清晰</button><button type="button" data-ui-choice aria-pressed="false">可以直接操作</button><button type="button" data-ui-choice aria-pressed="false">内容太长</button></div><label><span>补充意见（选填）</span><textarea>路线很清楚，希望增加适合儿童的项目。</textarea></label></section>`;
  },
  context() {
    return `<section class="s03-chat-page">
      ${this.assistantHead()}
      <div class="s03-context-bar"><b>已记住本次出游条件</b><span>2 位成人 · 2 名儿童 · 只有半天 · 想看主要演出</span></div>
      <div class="s03-thread">
        <div class="s03-message user"><p>带两个孩子，只有下午半天，主要演出怎么安排？</p><time>09:46</time></div>
        <div class="s03-message ai answer"><span class="s03-avatar small">清</span><div class="s03-answer-sheet"><header><small>已沿用刚才的家庭出游信息</small><h5>建议 13:30 入园，按三个主要节目安排</h5><p>先看岳飞枪挑小梁王，再到勾栏瓦肆，傍晚衔接东京梦华；儿童项目放在两场演出之间。</p></header><ol class="s03-route-list"><li><time>13:30</time><span><b>迎宾门入园</b><small>避开午后第一波客流</small></span></li><li><time>14:20</time><span><b>岳飞枪挑小梁王</b><small>演武场 · 建议提前 15 分钟</small></span></li><li><time>16:00</time><span><b>勾栏瓦肆</b><small>室内节目 · 适合儿童休息</small></span></li><li><time>19:30</time><span><b>大宋·东京梦华</b><small>B 区尚有连座</small></span></li></ol><p class="s03-ai-disclosure">内容由 AI 生成，请以当日节目单和购票页为准。</p><p class="s03-source">信息来源：今日节目单、实时余票 · 09:46 更新</p></div></div>
        <div class="s03-business-links"><button type="button" data-ui-route="s27-request"><i>演</i><span><b>生成半日演出路线</b><small>继续核对时间和余票</small></span><em>›</em></button><button type="button" data-ui-route="s25-intake"><i>票</i><span><b>让 AI 推荐家庭票</b><small>按儿童年龄匹配票型</small></span><em>›</em></button></div>
      </div>
    </section>`;
  },
  cannotAnswer() {
    return `<section class="s03-chat-page">${this.assistantHead("需要进一步确认")}<div class="s03-thread"><div class="s03-message user"><p>明天下午东京梦华一定不会停演吗？</p><time>09:52</time></div><div class="s03-message ai"><span class="s03-avatar small">清</span><div><p>我暂时无法确认明天下午的最终演出安排。天气和现场运营可能导致临时调整，我不会替你做确定性承诺。</p><div class="s03-safe-actions"><button type="button" data-ui-route="s02-notices"><b>查看官方公告</b><span>以景区最新发布为准</span></button><button type="button" data-s03-page="s03-human"><b>联系人工客服</b><span>继续确认具体场次</span></button><button type="button" data-s03-page="s03-feedback"><b>反馈这个问题</b><span>帮助补充知识内容</span></button></div><p class="s03-source">已查询：节目单、天气提示、园区公告 · 暂无明确结论</p></div></div></div></section>`;
  },
  human() {
    return `<section class="s03-chat-page">${this.assistantHead("人工服务接入中")}<div class="s03-handoff"><span class="s03-avatar">客</span><h5>已转接游客服务中心</h5><p>已携带当前问题和对话摘要，无需重新描述。</p><dl><div><dt>咨询问题</dt><dd>明天下午东京梦华是否正常演出</dd></div><div><dt>当前排队</dt><dd>前方 2 人 · 预计 3 分钟</dd></div><div><dt>服务时间</dt><dd>08:30—21:30</dd></div></dl><button type="button" data-ui-action="取消排队">取消排队</button></div></section>`;
  }
};

const AIServiceUI = {
  head(kicker, title, text = "") {
    return `<header class="ai-service-head"><span>${kicker}</span><h5>${title}</h5>${text ? `<p>${text}</p>` : ""}</header>`;
  },
  disclosure(text = "内容由 AI 生成，请核对票价、场次等关键信息。") {
    return `<p class="ai-disclosure"><i>AI</i>${text}</p>`;
  },
  chat(user, assistant, steps = []) {
    return `<div class="ai-dialog"><div class="ai-turn user"><p>${user}</p></div><div class="ai-turn assistant"><i>清</i><div><p>${assistant}</p>${steps.length ? `<ol>${steps.map(item => `<li>${item}</li>`).join("")}</ol>` : ""}</div></div></div>`;
  },
  understood(items, note = "") {
    return `<section class="ai-understood"><header><b>已理解的信息</b><span>${note}</span></header><dl>${items.map(item => `<div><dt>${item[0]}</dt><dd>${item[1]}</dd></div>`).join("")}</dl></section>`;
  },
  reasons(title, items) {
    return `<section class="ai-reasons"><h6>${title}</h6>${items.map(item => `<div><i>${item[0]}</i><p><b>${item[1]}</b><span>${item[2]}</span></p></div>`).join("")}</section>`;
  },
  source(text) {
    return `<p class="ai-source">参考：${text}</p>`;
  },
  crowd(level, title, text) {
    return `<div class="ai-crowd ${level}"><span><i></i><b>${title}</b></span><p>${text}</p></div>`;
  }
};

const S24UI = {
  profile() {
    return `<section class="s24-profile-page"><header><span>赵</span><div><h5>赵女士</h5><p>187****8527 · 已实名</p></div><button type="button" data-ui-route="s24-clear">设置</button></header><div class="s24-profile-shortcuts"><button type="button" data-ui-route="s09-list"><b>1</b><span>待出行</span></button><button type="button" data-ui-route="s14-list"><b>3</b><span>待使用</span></button><button type="button" data-ui-route="s20-c-detail"><b>1</b><span>服务处理中</span></button></div>${UI.rows([["行", "我的行程", "查看、调整和提醒", "", "s09-list"], ["单", "我的订单", "门票、演出和退款", "", "s14-list"], ["诉", "我的投诉", "查看处理进度和结果", "", "s20-c-detail"], ["人", "常用出行人", "已保存 4 人", "", "s23-list"], ["藏", "我的收藏", "景点、节目和攻略", "", "s24-favorites"], ["约", "服务协议与隐私政策", "当前版本 2026.08", "", "s24-agreement"]])}</section>`;
  },
  agreement() {
    return `<section class="s24-policy-page">
      <nav><button type="button" class="active" data-s24-policy-tab="service">服务协议</button><button type="button" data-s24-policy-tab="privacy">隐私政策</button></nav>
      <article data-s24-policy-panel="service">
        <header><h5>清明上河园小程序服务协议</h5><p>更新日期：2026 年 8 月 1 日<br>生效日期：2026 年 8 月 1 日</p></header>
        <p>欢迎使用清明上河园小程序。使用购票、行程、导览和游客服务前，请阅读并理解本协议。</p>
        <h6>一、服务内容</h6><p>小程序提供景区信息查询、门票及演出购买、行程规划、园区导览、订单管理和游客服务。具体内容以页面实际提供为准。</p>
        <h6>二、账号与授权</h6><p>部分服务需要微信手机号授权。你应保证提交的实名购票人、联系方式和订单信息真实、准确，并妥善保管账号。</p>
        <h6>三、票务与履约</h6><p>门票、演出和餐饮等商品的使用日期、适用人群、退改规则及核验要求，以订单确认页和商品详情页展示为准。</p>
        <h6>四、使用规范</h6><p>不得利用本服务发布违法信息、干扰正常经营秩序，或实施虚假交易、恶意投诉及侵犯他人权益的行为。</p>
        <h6>五、服务调整</h6><p>因天气、安全、设备检修或现场运营需要，景区可能调整开放区域和节目场次，并通过公告及时提示。</p>
        <h6>六、联系我们</h6><p>如对本协议或服务有疑问，可通过小程序“游客服务”联系景区游客服务中心。</p>
      </article>
      <article data-s24-policy-panel="privacy" hidden>
        <header><h5>清明上河园小程序隐私政策</h5><p>更新日期：2026 年 8 月 1 日<br>生效日期：2026 年 8 月 1 日</p></header>
        <p>我们仅在提供对应功能所必需的范围内处理个人信息，并通过页面提示说明使用目的。</p>
        <h6>一、我们收集的信息</h6><p>登录时处理微信授权手机号；实名购票时处理姓名和证件信息；支付、核销和售后时处理订单信息；地图导航或应急求助时，经授权处理位置信息。</p>
        <h6>二、信息使用目的</h6><p>上述信息用于账号识别、票务履约、订单处理、路线导航、游客求助和必要的服务联系，不用于与这些目的无关的用途。</p>
        <h6>三、权限使用</h6><p>相机、相册、位置和麦克风仅在你主动使用拍照识别、地图导航、材料上传或语音提问时申请；你可以在系统设置中关闭权限。</p>
        <h6>四、信息共享与保存</h6><p>除完成支付、票务核验和依法必须提供的情形外，我们不会向无关第三方提供个人信息，并在实现服务所需期限内保存。</p>
        <h6>五、你的权利</h6><p>你可以在“我的”中查询和修改常用出行人等信息，也可以联系游客服务中心申请更正、删除或注销相关信息。</p>
        <h6>六、未成年人保护</h6><p>为未成年人购票或添加出行人时，应由其监护人操作并确认信息使用。</p>
        <h6>七、联系我们</h6><p>如对个人信息处理有疑问，可通过小程序“游客服务”联系景区游客服务中心。</p>
      </article>
    </section>`;
  },
  dataSettings() {
    return `<section class="s24-settings-page"><div class="s24-setting-group"><h5>隐私与授权</h5><button type="button" data-ui-route="s24-agreement"><span><b>服务协议与隐私政策</b><small>当前版本 2026.08</small></span><em>›</em></button><button type="button" data-ui-action="管理系统权限"><span><b>系统权限管理</b><small>位置、相机、相册与麦克风</small></span><em>›</em></button></div><div class="s24-setting-group"><h5>本地演示数据</h5><div><span><b>清除并恢复预置数据</b><small>订单、行程、收藏和对话将恢复为演示初始状态；常用出行人保留。</small></span></div></div></section>`;
  }
};

const S04UI = {
  overview() {
    return `<section class="s04-weather-page"><div class="s04-weather-hero"><span>开封 · 8月17日 周一</span><div><b>18°</b><em>多云转晴</em></div><p>15° / 23° · 东南风 3 级</p><i>适宜游园</i></div><div class="s04-hourly"><div><span>现在</span><b>18°</b><small>多云</small></div><div><span>11时</span><b>20°</b><small>晴</small></div><div><span>14时</span><b>23°</b><small>晴</small></div><div><span>17时</span><b>21°</b><small>多云</small></div></div><div class="s04-advice"><header><b>今日游园建议</b><span>08:30 更新</span></header><div><i>衣</i><p><b>薄外套 + 长袖</b><small>早晚温差较大，中午可脱下外套。</small></p></div><div><i>晒</i><p><b>午后注意防晒</b><small>11:00—15:00 紫外线较强。</small></p></div><div><i>演</i><p><b>户外演出正常</b><small>今日节目暂未受天气影响。</small></p></div></div></section>`;
  },
  forecast() {
    return `<section class="s04-weather-page"><div class="s04-forecast-head"><span>开封市</span><h5>未来 7 日天气</h5><p>选择出行日期查看游园影响</p></div><div class="s04-day-list" data-ui-choice-group><button type="button" class="active" data-ui-choice><span>今天<small>8/17</small></span><i>☁</i><b>15° / 23°</b><em>适宜</em></button><button type="button" data-ui-choice><span>明天<small>8/18</small></span><i>☂</i><b>16° / 21°</b><em>带伞</em></button><button type="button" data-ui-choice><span>周三<small>8/19</small></span><i>ϟ</i><b>15° / 20°</b><em class="warn">雷雨</em></button><button type="button" data-ui-choice><span>周四<small>8/20</small></span><i>☀</i><b>17° / 26°</b><em>适宜</em></button><button type="button" data-ui-choice><span>周五<small>8/21</small></span><i>☀</i><b>18° / 27°</b><em>较热</em></button></div><div class="s04-risk-card"><span>8月19日</span><b>午后可能有雷阵雨</b><p>户外演出和水上项目可能临时调整，建议出发前再次确认。</p></div></section>`;
  },
  warning() {
    return `<section class="s04-weather-page"><div class="s04-alert-head"><i>ϟ</i><span>雷雨天气提示</span><h5>8月19日 14:00 后</h5><p>预计出现短时雷雨和 6 级阵风</p></div><div class="s04-impact"><h6>可能受影响</h6><div><span>户外演出</span><b>可能延迟或取消</b></div><div><span>水上项目</span><b>可能暂停运营</b></div><div><span>园区交通</span><b>以现场引导为准</b></div></div><div class="s04-alternative"><h6>建议安排</h6><button type="button" data-ui-route="s05-programs"><i>室</i><span><b>宣和殿室内节目</b><small>步行约 8 分钟</small></span><em>›</em></button><button type="button" data-ui-route="s16-map"><i>避</i><span><b>最近避雨点</b><small>游客中心 · 260 米</small></span><em>›</em></button></div></section>`;
  }
};

const S05UI = {
  about() {
    return `<section class="s05-page"><div class="s05-cover"><small>国家 5A 级旅游景区</small><h5>一朝步入画卷<br>一日梦回千年</h5><p>以《清明上河图》为蓝本，再现北宋东京市井与皇家园林。</p><div><span>09:00—22:00</span><span>40+ 场演出</span></div></div><nav class="s05-subnav"><button class="active">景区概览</button><button data-ui-route="s05-programs">节目演出</button><button data-ui-route="s05-offers">活动优惠</button></nav><div class="s05-zone-list"><article><i>南</i><span><b>南苑 · 市井民俗</b><small>虹桥、东京食坊、勾栏瓦肆</small></span><em>建议 3 小时</em></article><article><i>北</i><span><b>北苑 · 皇家园林</b><small>景龙湖、宣和殿、拂云阁</small></span><em>建议 2 小时</em></article><article><i>演</i><span><b>特色演艺</b><small>日间演出与大型水景实景演出</small></span><em>查看节目</em></article></div></section>`;
  },
  programs() {
    return `<section class="s05-page"><div class="s05-program-head"><span>今日 · 8月17日</span><h5>节目演出</h5><p>共 38 场，时间以当日公告为准</p></div><div class="s05-filter" data-ui-choice-group><button class="active" data-ui-choice>全部</button><button data-ui-choice>上午</button><button data-ui-choice>下午</button><button data-ui-choice>夜间</button><button data-ui-choice>室内</button></div><div class="s05-program-list"><article><time>09:00</time><div><b>包公迎宾</b><small>迎宾门 · 约 20 分钟</small><span>含景区门票</span></div><em>›</em></article><article><time>10:30</time><div><b>岳飞枪挑小梁王</b><small>演武场 · 约 30 分钟</small><span>含景区门票</span></div><em>›</em></article><article class="featured"><time>19:30</time><div><b>大宋·东京梦华</b><small>东京梦华剧场 · 约 60 分钟</small><span>需单独购票 · B区有余票</span></div><em>›</em></article><article><time>20:45</time><div><b>大宋·东京梦华</b><small>东京梦华剧场 · 约 60 分钟</small><span>需单独购票</span></div><em>›</em></article></div></section>`;
  },
  programDetail() {
    return `<section class="s05-page"><div class="s05-detail-cover"><span>大型水景实景演出</span><h5>大宋·东京梦华</h5><p>声、光、电、火、水共同再现北宋汴京盛景。</p></div><div class="s05-detail-meta"><div><small>演出时长</small><b>约 60 分钟</b></div><div><small>演出地点</small><b>东京梦华剧场</b></div><div><small>入场时间</small><b>提前 30 分钟</b></div></div><div class="s05-session"><h6>选择场次</h6><button class="active"><span><b>19:30</b><small>18:50 开始入场</small></span><em>B区有余票</em></button><button><span><b>20:45</b><small>20:05 开始入场</small></span><em>余票紧张</em></button></div><div class="s05-price"><span>B 区票价</span><b>¥249 起</b></div></section>`;
  },
  offers() {
    return `<section class="s05-page"><div class="s05-offer-head"><span>活动中心</span><h5>当前优惠</h5><p>购票前请确认适用人群和使用日期。</p></div><div class="s05-offer-list"><article><div><span>限时</span><h6>生肖属马免首道门票</h6><p>持本人有效身份证件核验</p></div><button type="button" data-ui-route="s05-offer-detail">查看条件</button></article><article class="red"><div><span>夜游</span><h6>上元灯会夜场优惠</h6><p>18:00 后入园 · 不含东京梦华</p></div><b>¥80</b></article><article><div><span>年卡</span><h6>个人畅游年卡</h6><p>本人实名使用 · 366 天有效</p></div><b>¥199起</b></article></div></section>`;
  },
  offerDetail() {
    return `<section class="s05-page"><div class="s05-coupon"><span>限时福利</span><h5>生肖属马<br>免首道门票</h5><p>2026.08.18—08.31</p></div><dl class="s05-rule-list"><div><dt>适用人群</dt><dd>身份证生肖属马游客</dd></div><div><dt>所需证件</dt><dd>本人有效身份证</dd></div><div><dt>领取方式</dt><dd>购票页选择“生肖活动票”</dd></div><div><dt>不含项目</dt><dd>东京梦华、宋宴</dd></div><div><dt>叠加规则</dt><dd>不可与其他优惠同时使用</dd></div></dl><p class="s05-rule-note">资格以购票人实名信息和现场验票结果为准。</p></section>`;
  },
  ineligible() {
    return `<section class="s05-page s05-ineligible"><div class="s05-ineligible-mark">!</div><h5>当前出行人不符合条件</h5><p>赵女士的身份证生肖信息不在本次活动范围内。</p><div><button type="button" data-ui-route="s10-mall"><span><b>成人日间票</b><small>当日单次入园</small></span><em>¥120</em></button><button type="button" data-ui-route="s10-mall"><span><b>夜场票</b><small>18:00 后入园</small></span><em>¥80</em></button><button type="button" data-ui-route="s12-list"><span><b>个人畅游年卡</b><small>366 天有效</small></span><em>¥199起</em></button></div></section>`;
  }
};

const S07UI = {
  progress(active = 0) {
    return `<div class="s07-progress">${["人数", "日期预算", "偏好", "方案"].map((item, index) => `<span class="${index <= active ? "active" : ""}"><i>${index + 1}</i><b>${item}</b></span>`).join("")}</div>`;
  },
  entry() {
    return `<section class="s07-page s07-entry-page"><div class="s07-entry-cover"><span>创建游园行程</span><h5>选择适合你的<br>规划方式</h5><p>生成后仍可继续修改节目、路线和预算。</p></div><div class="s07-mode-list"><button type="button" data-ui-route="s06-input"><i>说</i><span><b>一句话生成</b><small>直接描述人数、日期、预算和偏好</small></span><em>更快</em></button><button type="button" class="active" data-ui-route="s07-people"><i>选</i><span><b>分步规划</b><small>逐项选择人数、日期和游玩项目</small></span><em>更清楚</em></button></div></section>`;
  },
  people() {
    return `<section class="s07-page">${this.progress(0)}<div class="s07-step-head"><span>第 1 步</span><h5>几个人一起出游？</h5><p>儿童和老人数量会用于匹配适用票型。</p></div><div class="s07-counter-list">${UI.counters([["成人", "18周岁及以上", 2], ["儿童", "按实际年龄匹配票型", 1], ["老人", "60周岁及以上", 0]])}</div><p class="s07-helper">优惠资格将在选择实名出行人时按证件核验。</p></section>`;
  },
  days() {
    return `<section class="s07-page">${this.progress(1)}<div class="s07-step-head"><span>第 2 步</span><h5>计划玩几天？</h5><p>预算为本次行程的整体参考范围。</p></div><div class="s07-days" data-ui-choice-group><button data-ui-choice><b>1 天</b><small>经典项目快速游览</small></button><button class="active" data-ui-choice><b>2 天</b><small>日间项目 + 夜游演出</small></button><button data-ui-choice><b>3 天</b><small>深度体验与周边住宿</small></button></div><h6 class="s07-section-title">预算范围</h6><div class="s07-budget" data-ui-choice-group><button data-ui-choice><span><b>经济型</b><small>基础门票与必看节目</small></span><em>¥2,000以内</em></button><button class="active" data-ui-choice><span><b>舒适型</b><small>含住宿、餐饮和重点演出</small></span><em>¥3,000—5,000</em></button><button data-ui-choice><span><b>品质型</b><small>更高标准住宿与深度体验</small></span><em>¥5,000以上</em></button></div></section>`;
  },
  transport() {
    return `<section class="s07-page">${this.progress(1)}<div class="s07-step-head"><span>抵达方式</span><h5>你准备怎么来？</h5><p>用于推荐停车场、接驳或入园路线。</p></div><div class="s07-option-cards" data-ui-choice-group><button class="active" data-ui-choice><i>车</i><span><b>自驾</b><small>需要停车场和入园路线</small></span><em>✓</em></button><button data-ui-choice><i>铁</i><span><b>高铁 / 火车</b><small>从开封北站或开封站抵达</small></span><em>○</em></button><button data-ui-choice><i>近</i><span><b>当地出发</b><small>公交、网约车或步行</small></span><em>○</em></button></div></section>`;
  },
  stay() {
    return `<section class="s07-page">${this.progress(2)}<div class="s07-step-head"><span>住宿与餐饮</span><h5>补充非必需偏好</h5><p>不需要的项目可直接跳过。</p></div><div class="s07-form"><label><span>住宿安排</span><select><option>住 1 晚</option><option>不住宿</option></select></label><label><span>酒店偏好</span><select><option>景区内 · 家庭房</option><option>景区周边</option></select></label><label><span>餐饮偏好</span><input value="清淡 · 适合儿童"></label><label><span>忌口</span><input value="不吃辣"></label></div></section>`;
  },
  programs() {
    return `<section class="s07-page">${this.progress(2)}<div class="s07-step-head"><span>游玩偏好</span><h5>哪些项目一定要去？</h5><p>可多选，生成方案时会自动检查场次冲突。</p></div><div class="s07-program-grid" data-ui-choice-group data-ui-multiple="1"><button class="active" data-ui-choice><i>梦</i><b>东京梦华</b><small>大型水景演出</small></button><button class="active" data-ui-choice><i>岳</i><b>岳飞枪挑小梁王</b><small>经典实景演出</small></button><button class="active" data-ui-choice><i>包</i><b>包公迎宾</b><small>迎宾门演出</small></button><button data-ui-choice><i>宴</i><b>宋宴</b><small>沉浸式用餐</small></button><button class="active" data-ui-choice><i>俗</i><b>民俗体验</b><small>传统手作项目</small></button><button class="active" data-ui-choice><i>船</i><b>汴河游船</b><small>夜游推荐</small></button></div></section>`;
  },
  generating() {
    return `<section class="s07-page s07-generating"><div class="s07-generating-mark"><i></i><h5>正在生成方案</h5><p>根据场次、区域和体力节奏安排两天路线</p></div><ol><li class="done"><i>✓</i><span><b>已确认出游条件</b><small>2大1小 · 2天 · 自驾</small></span></li><li class="done"><i>✓</i><span><b>已匹配节目场次</b><small>避开已知时间冲突</small></span></li><li class="current"><i></i><span><b>正在安排园区路线</b><small>减少南北苑重复往返</small></span></li><li><i></i><span><b>等待核算费用</b><small>控制在舒适型预算</small></span></li></ol></section>`;
  },
  plan() {
    return `<section class="s07-page s07-plan-page">${this.progress(3)}<div class="s07-plan-cover"><span>亲子两日游</span><b>8月22日—23日</b><small>2大1小 · 自驾 · 住1晚</small></div><div class="s07-plan-tabs"><button class="active">第1天</button><button>第2天</button></div><div class="s07-itinerary"><article><time>16:00</time><i>住</i><span><b>满庭芳精品客栈</b><small>办理入住 · 家庭房</small></span></article><article><time>18:00</time><i>食</i><span><b>东京食坊</b><small>适合儿童 · 约60分钟</small></span></article><article><time>19:30</time><i>船</i><span><b>汴河夜游</b><small>虹桥码头出发</small></span></article></div><div class="s07-plan-total"><span>预计费用 <b>¥3,860</b></span><em>预计步行 8.2 公里</em></div></section>`;
  },
  conflict() {
    return `<section class="s07-page s07-conflict-page"><div class="s07-conflict-head"><i>!</i><h5>两个项目时间冲突</h5><p>宋宴结束时间与东京梦华入场时间重叠。</p></div><div class="s07-conflict-time"><div><span>宋宴</span><b>17:30—19:00</b></div><i>冲突</i><div><span>东京梦华</span><b>19:00前入场</b></div></div><div class="s07-solution-list" data-ui-choice-group><button class="active" data-ui-choice><span><b>宋宴改到 11:30</b><small>保留东京梦华 19:30 场</small></span><em>推荐</em></button><button data-ui-choice><span><b>东京梦华改到 20:45</b><small>晚间结束时间顺延</small></span><em>○</em></button><button data-ui-choice><span><b>取消宋宴</b><small>改为普通晚餐</small></span><em>○</em></button></div></section>`;
  },
  saved() {
    return `<section class="s07-page s07-saved-page"><div class="s07-saved-mark">✓</div><h5>行程已保存</h5><p>当前为行程草稿，门票、演出和酒店尚未购买。</p><dl><div><dt>行程名称</dt><dd>亲子两日游</dd></div><div><dt>出行日期</dt><dd>2026-08-22—08-23</dd></div><div><dt>待购买项目</dt><dd>3 项</dd></div></dl><div class="s07-next"><b>下一步建议</b><span>一站式确认门票、酒店和节目订单</span></div></section>`;
  }
};

const JourneyPlannerUI = {
  conditions() {
    return `<div class="journey-condition-strip"><span>8月22日—23日</span><span>2大1小</span><span>郑州自驾</span><span>预算 ¥5,000</span><span>住1晚</span><span>饮食清淡</span><span>必看东京梦华</span></div>`;
  },
  assistantHead() {
    return `<div class="journey-assistant-head"><i>清</i><div><b>清园 AI 行程管家</b><span>根据你的需求安排完整旅程</span></div><em>在线</em></div>`;
  },
  plannerHub() {
    return `<section class="journey-page journey-planner-hub">
      <div class="journey-planner-cover"><img src="assets/family-trip.webp" alt="家庭游客在清园游览"><div><span>AI 行程规划</span><h5>一句话，开始安排清园之旅</h5><p>说出日期、同行人和想看的内容；信息不完整时，我会继续询问。</p></div></div>
      <div class="journey-hub-composer"><button type="button" data-ui-action="语音输入">⌁</button><textarea aria-label="描述本次出游需求" placeholder="例如：周末带孩子玩两天，希望看东京梦华"></textarea><button type="button" data-journey-plan-send>↑</button></div>
      <div class="journey-hub-examples"><span>可以这样说</span><button type="button" data-ui-route="s06-input"><b>信息完整，直接生成</b><small>8月22日从郑州自驾，一家三口游玩两天……</small></button><button type="button" data-ui-route="s07-input"><b>先说大概，由AI补问</b><small>周末想带孩子来玩两天</small></button></div>
      <div class="journey-hub-more"><button type="button" data-ui-route="s08-people"><i>选</i><span><b>分步规划</b><small>按人数、预算和偏好逐项选择</small></span><em>›</em></button><button type="button" data-ui-route="s08-template"><i>模</i><span><b>使用推荐模板</b><small>从成熟路线快速开始</small></span><em>›</em></button></div>
      <div class="journey-hub-intents"><button type="button" data-ui-route="s26-request">亲子一日游</button><button type="button" data-ui-route="s27-request">半日演出游</button><button type="button" data-ui-route="s28-request">节假日避峰</button></div>
    </section>`;
  },
  completeInput() {
    return `<section class="journey-page journey-chat-page">
      ${this.assistantHead()}
      <div class="journey-chat-intro"><span>一句话规划</span><h5>说清需求，直接生成</h5><p>信息完整时无需逐项填写。</p></div>
      <div class="journey-chat-thread">
        <div class="journey-bubble ai">告诉我出行日期、同行人、交通方式和想体验的内容。</div>
        <div class="journey-bubble user">8月22日从郑州自驾，一家三口带一名10岁儿童游玩两天，预算5000元，希望看东京梦华，住一晚，饮食清淡。</div>
        <div class="journey-bubble ai compact"><b>信息已经完整</b><span>我会直接生成两日攻略，实名出行人可在购票时补充。</span></div>
      </div>
      <div class="journey-composer"><button type="button" data-ui-action="语音输入">⌁</button><textarea aria-label="描述出游需求">8月22日从郑州自驾，一家三口带一名10岁儿童游玩两天，预算5000元，希望看东京梦华，住一晚，饮食清淡。</textarea><button type="button" data-ui-route="s06-generating">↑</button></div>
    </section>`;
  },
  followup(round = 1) {
    if (round === 1) return `<section class="journey-page journey-chat-page">
      ${this.assistantHead()}
      <div class="journey-chat-thread followup">
        <div class="journey-bubble user">周末想带孩子去清明上河园玩两天。</div>
        <div class="journey-recognized"><b>已识别</b><span>亲子出游</span><span>2天</span><span>周末</span></div>
        <div class="journey-bubble ai"><b>还需要确认出发安排</b><span>具体哪天出发？从哪里来、选择什么交通方式？预算大约多少？</span></div>
        <div class="journey-quick-answers"><button type="button" data-ui-route="s07-followup-2">8月22日 · 郑州自驾 · 预算5000</button><button type="button" data-ui-action="换一组回答">其他安排</button></div>
      </div>
      <div class="journey-composer"><button type="button" data-ui-action="语音输入">⌁</button><textarea aria-label="补充出发安排" placeholder="输入补充信息"></textarea><button type="button" data-ui-route="s07-followup-2">↑</button></div>
    </section>`;
    return `<section class="journey-page journey-chat-page">
      ${this.assistantHead()}
      <div class="journey-chat-thread followup">
        <div class="journey-bubble user">8月22日从郑州自驾，预算5000元。</div>
        <div class="journey-recognized"><b>新增识别</b><span>8月22日</span><span>郑州</span><span>自驾</span><span>¥5,000</span></div>
        <div class="journey-bubble ai"><b>最后补充同行偏好</b><span>孩子多大？是否住宿？饮食有什么要求，有没有一定要看的节目？</span></div>
        <div class="journey-quick-answers"><button type="button" data-ui-route="s07-confirm">10岁 · 住1晚 · 清淡 · 东京梦华</button><button type="button" data-ui-action="换一组回答">分别回答</button></div>
      </div>
      <div class="journey-composer"><button type="button" data-ui-action="语音输入">⌁</button><textarea aria-label="补充同行偏好" placeholder="输入补充信息"></textarea><button type="button" data-ui-route="s07-confirm">↑</button></div>
    </section>`;
  },
  followupConfirm() {
    return `<section class="journey-page journey-confirm-page">
      <header><span>需求已补充完整</span><h5>准备生成家庭两日游</h5><p>只核对影响路线与推荐的关键信息。</p></header>
      ${this.conditions()}
      <dl><div><dt>第一天</dt><dd>郑州出发、办理入住、晚餐和夜游</dd></div><div><dt>第二天</dt><dd>入园游览、重点节目、餐饮和返程</dd></div><div><dt>购票说明</dt><dd>生成攻略不需要实名信息，购票时再选择出行人</dd></div></dl>
    </section>`;
  },
  generating(mode = "已理解完整需求") {
    return `<section class="journey-page journey-generating-page">
      <div class="journey-generating-mark"><i></i><span>AI 正在生成</span><h5>家庭两日宋韵之旅</h5><p>${mode}</p></div>
      ${this.conditions()}
      <ol><li class="done"><i>✓</i><span><b>匹配节目场次</b><small>东京梦华 19:30 场可安排</small></span></li><li class="done"><i>✓</i><span><b>规划抵达与停车</b><small>郑州出发，推荐迎宾门停车场</small></span></li><li class="current"><i></i><span><b>组合两日路线</b><small>减少跨区往返并预留亲子休息时间</small></span></li><li><i></i><span><b>整理费用与办理方式</b><small>区分待购买、需预约和现场办理</small></span></li></ol>
    </section>`;
  },
  stepProgress(active = 0) {
    return `<div class="journey-step-progress">${["人数", "日期预算", "交通住宿", "游玩偏好"].map((label, index) => `<span class="${index <= active ? "active" : ""}"><i>${index + 1}</i><b>${label}</b></span>`).join("")}</div>`;
  },
  plannerEntry() {
    return `<section class="journey-page journey-mode-page">
      <div class="journey-mode-hero"><img src="assets/family-trip.webp" alt="家庭游客在园区游览"><div><span>AI 行程规划</span><h5>选择适合你的规划方式</h5><p>不同方式最终生成同一套完整攻略。</p></div></div>
      <div class="journey-mode-list"><button type="button" data-ui-route="s06-entry"><i>说</i><span><b>一句话规划</b><small>信息完整直接生成，缺少内容时由AI继续询问</small></span><em>推荐</em></button><button type="button" data-ui-route="s08-people"><i>选</i><span><b>分步规划</b><small>按人数、预算、交通和偏好逐项选择</small></span><em>›</em></button><button type="button" data-ui-route="s08-template"><i>模</i><span><b>使用推荐模板</b><small>从经典路线快速开始并继续修改</small></span><em>›</em></button><button type="button" data-ui-route="s08-manual"><i>手</i><span><b>手动或导入行程</b><small>熟悉园区时自行添加，也可导入好友安排</small></span><em>›</em></button></div>
    </section>`;
  },
  stepPeople() {
    return `<section class="journey-page journey-step-page">${this.stepProgress(0)}<header><span>第 1 步</span><h5>谁和你一起出游？</h5><p>只确定人数和年龄构成，实名信息在购票时补充。</p></header><div class="journey-counter-list">${UI.counters([["成人", "18周岁及以上", 2], ["儿童", "10岁", 1], ["老人", "60周岁及以上", 0]])}</div></section>`;
  },
  stepBasics() {
    return `<section class="journey-page journey-step-page">${this.stepProgress(1)}<header><span>第 2 步</span><h5>什么时候来，准备花多少？</h5><p>日期用于匹配节目场次和开放信息。</p></header><div class="journey-fields"><label><span>出行日期</span><input type="date" value="2026-08-22"></label><label><span>游玩天数</span><select><option>2天1晚</option><option>1天</option></select></label></div><h6>预算范围</h6><div class="journey-choice-list" data-ui-choice-group><button data-ui-choice><span><b>经济安排</b><small>核心门票与重点节目</small></span><em>¥3,000以内</em></button><button class="active" data-ui-choice><span><b>舒适安排</b><small>住宿、餐饮和重点演出</small></span><em>¥3,000—5,000</em></button><button data-ui-choice><span><b>品质安排</b><small>更高标准住宿与体验</small></span><em>¥5,000以上</em></button></div></section>`;
  },
  stepTravel() {
    return `<section class="journey-page journey-step-page">${this.stepProgress(2)}<header><span>第 3 步</span><h5>补充交通与住宿</h5><p>用于规划外部导航、停车和第一天安排。</p></header><div class="journey-fields"><label class="wide"><span>出发地</span><input value="郑州市"></label></div><div class="journey-choice-grid" data-ui-choice-group><button class="active" data-ui-choice><i>车</i><b>自驾</b><small>安排停车与返程</small></button><button data-ui-choice><i>铁</i><b>高铁</b><small>安排接驳路线</small></button></div><div class="journey-choice-list" data-ui-choice-group><button class="active" data-ui-choice><span><b>满庭芳精品客栈</b><small>景区附近 · 家庭房 · 含早餐</small></span><em>需电话确认</em></button><button data-ui-choice><span><b>当日往返</b><small>不安排住宿</small></span><em>○</em></button></div></section>`;
  },
  stepPreferences() {
    return `<section class="journey-page journey-step-page">${this.stepProgress(3)}<header><span>第 4 步</span><h5>哪些体验最重要？</h5><p>可多选，AI会检查场次冲突和体力节奏。</p></header><div class="journey-preference-grid" data-ui-choice-group data-ui-multiple="1"><button class="active" data-ui-choice><i>梦</i><b>东京梦华</b><small>一定要看</small></button><button class="active" data-ui-choice><i>亲</i><b>亲子体验</b><small>适合10岁儿童</small></button><button class="active" data-ui-choice><i>食</i><b>特色餐饮</b><small>口味清淡</small></button><button data-ui-choice><i>慢</i><b>少走路</b><small>增加休息</small></button></div><div class="journey-fields"><label class="wide"><span>忌口或补充说明</span><input value="少辣，午后安排一次休息"></label></div></section>`;
  },
  templateList() {
    return `<section class="journey-page journey-template-page"><header><span>推荐模板</span><h5>从成熟路线快速开始</h5><p>选择后补充日期和人数，仍可继续调整。</p></header><div><button type="button" class="active" data-ui-route="s08-template-details"><img src="assets/family-trip.webp" alt="亲子游"><span><b>亲子经典两日游</b><small>夜游、重点节目与亲子体验</small><em>2天1晚 · 9个项目</em></span></button><button type="button" data-ui-route="s08-template-details"><img src="assets/scenic-day.webp" alt="宋韵文化游"><span><b>宋韵文化一日游</b><small>建筑、民俗与经典演艺</small><em>约8小时 · 7个项目</em></span></button></div></section>`;
  },
  templateDetails() {
    return `<section class="journey-page journey-template-detail"><div class="journey-template-cover"><img src="assets/family-trip.webp" alt="家庭两日游"><div><span>推荐模板</span><h5>亲子经典两日游</h5><p>夜游、演艺、餐饮与亲子体验</p></div></div><div class="journey-fields"><label><span>出行日期</span><input type="date" value="2026-08-22"></label><label><span>同行人数</span><input value="2成人 + 1儿童"></label></div><ol><li><time>第1天</time><span><b>抵达、入住与夜游</b><small>4个安排</small></span></li><li><time>第2天</time><span><b>入园、演出与返程</b><small>7个安排</small></span></li></ol></section>`;
  },
  manualCreate() {
    return `<section class="journey-page journey-manual-page"><header><span>手动创建</span><h5>添加想去的地点</h5><button type="button" data-ui-route="s08-import">导入好友行程</button></header><label class="journey-search"><i>⌕</i><input value="虹桥" aria-label="搜索游览点"></label><nav><button class="active">推荐</button><button>演出</button><button>餐饮</button><button>服务</button></nav><div class="journey-manual-list" data-ui-choice-group data-ui-multiple="1"><button type="button" data-ui-choice class="active"><i>桥</i><span><b>虹桥</b><small>地标景点 · 建议停留30分钟</small></span><em>已添加</em></button><button type="button" data-ui-choice><i>演</i><span><b>岳飞枪挑小梁王</b><small>10:30 · 演武场</small></span><em>＋ 添加</em></button><button type="button" data-ui-choice><i>食</i><span><b>清明食府</b><small>适合家庭 · 可在线购买套餐</small></span><em>＋ 添加</em></button></div></section>`;
  },
  importTrip(error = false) {
    return `<section class="journey-page journey-import-page"><header><span>导入好友行程</span><h5>${error ? "未找到可导入行程" : "输入分享口令"}</h5><p>${error ? "口令可能已失效，请向分享人获取新口令。" : "导入后生成独立副本，可以继续修改。"}</p></header><label><span>分享口令</span><input value="${error ? "QY-0000" : "QY-8H2K-91"}"></label>${error ? `<div class="journey-inline-error"><b>口令无效</b><span>请检查字符或重新获取。</span></div>` : `<dl><div><dt>行程名称</dt><dd>亲子经典两日游</dd></div><div><dt>项目数量</dt><dd>9个</dd></div><div><dt>导入方式</dt><dd>生成独立副本</dd></div></dl>`}</section>`;
  },
  guideOverview(prefix = "s06", mode = "pending", dayPrefix = prefix) {
    const purchased = ["purchased", "late", "purchased-adjusted", "late-adjusted"].includes(mode);
    const adjusted = ["adjusted", "purchased-adjusted", "late-adjusted"].includes(mode);
    const lateAdjusted = mode === "late" || mode === "late-adjusted";
    const showTime = lateAdjusted ? "20:45" : "19:30";
    const guideStatus = purchased && adjusted ? "订单与调整结果已同步" : purchased ? "订单已同步到攻略" : adjusted ? "攻略已按建议更新" : "AI 已生成完整攻略";
    const adjustRoute = prefix === "s09" ? "s09-guide-adjust" : `${prefix}-adjust`;
    const serviceRow = (label, detail, status, route, state = "") => `<button type="button" class="journey-service-row ${state}" data-ui-route="${route}"><span>${label}</span><b>${detail}</b><em>${status}</em><i>›</i></button>`;
    return `<section class="journey-page journey-guide-page">
      <div class="journey-guide-hero"><img src="assets/family-trip.webp" alt="家庭游客的宋韵两日游"><div><span>${guideStatus}</span><h5>家庭两日宋韵之旅</h5><p>8月22日—23日 · 2大1小 · 郑州自驾</p></div></div>
      ${this.conditions()}
      ${adjusted ? `<div class="journey-adjusted-strip"><i>✓</i><span><b>${lateAdjusted ? "场次与返程已同步调整" : "已调整晚间安排"}</b><small>${lateAdjusted ? "东京梦华改为20:45场，返程顺延至22:30，其他已购项目保持不变。" : "晚餐提前至17:00，18:50前往剧场，东京梦华仍保留19:30场。"}</small></span></div>` : ""}
      <section class="journey-reason"><div><span>为什么这样安排</span><button type="button" data-ui-route="${adjustRoute}">用一句话调整</button></div><p>第一天以入住和夜游为主，第二天按南苑到北苑顺序游览，午后预留亲子休息，避免跨区往返并确保${showTime}前进入东京梦华。</p></section>
      <div class="journey-guide-insights"><span><i>童</i><b>适合10岁儿童</b><small>连续步行不超过90分钟</small></span><span><i>食</i><b>清淡用餐</b><small>午餐已避开高峰时段</small></span><span><i>演</i><b>必看已保留</b><small>提前30分钟到达剧场</small></span></div>
      <figure class="journey-route-map"><img src="assets/guide-map.webp" alt="两日游路线地图"><figcaption><span><b>两日路线</b><small>郑州 → 客栈 → 夜游 → 迎宾门 → 演武场 → 虹桥 → 东京梦华 → 返程</small></span><button type="button" data-ui-route="s09-route-map">展开地图</button></figcaption></figure>
      <div class="journey-day-summary"><button type="button" data-ui-route="${dayPrefix}-day1"><time>第1天</time><span><b>抵达、入住与汴河夜游</b><small>约3.5小时 · 步行2.1公里 · 预计¥2,543</small></span><em>查看详情 ›</em></button><button type="button" data-ui-route="${dayPrefix}-day2"><time>第2天</time><span><b>经典演艺与宋韵园区深度游</b><small>约12小时 · 步行6.1公里 · 预计¥1,383</small></span><em>查看详情 ›</em></button></div>
      <section class="journey-service-status"><header><b>服务与办理状态</b><span>${purchased ? "已支付 ¥1,287" : "3项待办理 · ¥1,287"}</span></header><p class="journey-data-freshness">节目、票务与停车信息 · 10:06 更新</p><dl>
        ${serviceRow("门票", "2成人 + 1儿童", purchased ? "已购买" : "待购买", purchased ? "s14-suborder" : "s13-travelers", purchased ? "done" : "wait")}
        ${serviceRow("东京梦华", `${showTime} · B区3席`, purchased ? "已购买" : "待购买", purchased ? "s14-master" : "s13-travelers", purchased ? "done" : "wait")}
        ${serviceRow("家庭餐", "清明食府3人套餐", purchased ? "已购买" : "待购买", purchased ? "s14-master" : "s13-travelers", purchased ? "done" : "wait")}
        ${serviceRow("住宿", "满庭芳家庭房1晚", "电话确认", "s09-hotel-confirm", "method")}
        ${serviceRow("停车", "迎宾门停车场", "到场缴费", "s09-parking", "method")}
      </dl></section>
      <section class="journey-expense-breakdown"><header><b>费用预计</b><span>预算 ¥5,000</span></header><dl><div><dt>城际交通</dt><dd>¥860</dd></div><div><dt>住宿</dt><dd>¥1,120</dd></div><div><dt>门票、演出与家庭餐</dt><dd>¥1,287</dd></div><div><dt>第一天晚餐与夜游</dt><dd>¥563</dd></div><div><dt>停车</dt><dd>¥96</dd></div><div><dt>备用预算</dt><dd>¥400</dd></div><div class="total"><dt>预计总额</dt><dd>¥4,326</dd></div></dl><p>预算剩余 ¥674，实际金额以办理页面和现场支付为准。</p></section>
    </section>`;
  },
  guideDay(day = 1, prefix = "s06", mode = "pending") {
    const dayOne = day === 1;
    const purchased = mode === "purchased" || mode === "late";
    const draggable = prefix === "s09";
    const showTime = mode === "late" ? "20:45" : "19:30";
    const items = dayOne ? [
      ["13:30", "出发", "郑州出发前往清园", "约2小时 · 直接唤起外部导航", "导航", "s09-depart"],
      ["15:40", "到达", "满庭芳精品客栈", "办理入住 · 家庭房 · 需电话确认", "确认", "s09-hotel-confirm"],
      ["17:30", "用餐", "东京食坊家庭晚餐", "口味清淡 · 建议停留60分钟", "定位", "s09-route-map"],
      ["19:00", "夜游", "虹桥与汴河夜景", "客栈步行620米 · 建议游玩90分钟", "路线", "s09-route-map"],
      ["21:00", "休息", "返回客栈", "为第二天完整游园保留体力", "导航", "s09-navigation"]
    ] : [
      ["08:20", "出发", "前往迎宾门停车场", "客栈驾车12分钟 · 余位充足", "导航", "s09-day2-depart"],
      ["09:00", "入园", "迎宾门与包公迎宾", purchased ? "建议提前20分钟 · 门票已购" : "建议提前20分钟 · 门票待购买", purchased ? "凭证" : "购买", purchased ? "s14-suborder" : "s13-travelers"],
      ["10:30", "演出", "岳飞枪挑小梁王", "演武场 · 约30分钟 · 免费项目", "详情", "s09-poi"],
      ["12:00", "午餐", "清明食府家庭套餐", purchased ? "步行380米 · 套餐已购" : "步行380米 · 套餐待购买", purchased ? "凭证" : "购买", purchased ? "s14-master" : "s13-travelers"],
      ["13:30", "游览", "虹桥与宋代民俗体验", "亲子互动 · 建议游玩120分钟", "路线", "s09-route-map"],
      ["16:00", "休息", "景龙湖休息区", "补水休息40分钟，减少儿童疲劳", "定位", "s09-route-map"],
      [showTime, "演出", "大宋·东京梦华", purchased ? "B区 · 演出票已购 · 提前30分钟入场" : "B区 · 建议提前30分钟入场", purchased ? "凭证" : "购票", purchased ? "s14-master" : "s13-travelers"],
      [mode === "late" ? "22:30" : "21:15", "返程", "停车缴费并返回郑州", mode === "late" ? "预计00:20抵达" : "预计23:20抵达", "缴费", "s09-parking"]
    ];
    const guideTarget = prefix === "s09" && purchased ? "s09-guide-purchased" : prefix.startsWith("s09-") ? "s09-guide-purchased" : `${prefix}-guide`;
    return `<section class="journey-page journey-day-page"><div class="journey-day-hero"><img src="assets/${dayOne ? "lantern-night" : "scenic-day"}.webp" alt="${dayOne ? "清园夜游" : "清园日间游览"}"><div><span>第${day}天 · 8月${dayOne ? "22" : "23"}日</span><h5>${dayOne ? "抵达、入住与汴河夜游" : "经典演艺与宋韵深度游"}</h5><p>${dayOne ? "约3.5小时 · 步行2.1公里" : "约12小时 · 步行6.1公里"}</p></div></div><div class="journey-day-nav"><button type="button" data-ui-route="${guideTarget}">攻略总览</button><button type="button" class="${dayOne ? "active" : ""}" data-ui-route="${prefix}-day1">第1天</button><button type="button" class="${dayOne ? "" : "active"}" data-ui-route="${prefix}-day2">第2天</button></div>${draggable ? `<div class="journey-drag-tip"><i>↕</i><span><b>拖动调整时间</b><small>按住行程项右侧拖动柄，拖到需要安排的时间位置</small></span></div>` : ""}<ol class="journey-detail-timeline" ${draggable ? "data-journey-draggable" : ""}>${items.map((item, index) => `<li class="${index === 0 ? "current" : ""}" ${draggable ? `data-journey-node aria-label="${item[0]} ${item[2]}，可拖动调整时间"` : ""}><time ${draggable ? "data-journey-time" : ""}>${item[0]}</time><i>${item[1].slice(0,1)}</i><div><span>${item[1]}</span><b>${item[2]}</b><small>${item[3]}</small><button type="button" ${item[5] ? `data-ui-route="${item[5]}"` : `data-ui-action="${item[4]}${item[2]}"`}>${item[4]} ›</button></div>${draggable ? `<span class="journey-drag-handle" data-journey-drag-handle role="button" aria-label="拖动调整${item[2]}时间">⠿</span>` : ""}</li>`).join("")}</ol><div class="journey-guide-tips">${dayOne ? `<span><b>夜游提示</b><small>虹桥东侧适合拍摄汴河夜景，20:30后客流逐步下降。</small></span><span><b>亲子节奏</b><small>长途自驾后不安排正式入园，21:00前返回客栈。</small></span>` : `<span><b>亲子休息</b><small>景龙湖休息区附近有卫生间和饮水点，适合午后停留。</small></span><span><b>演出提醒</b><small>东京梦华需提前30分钟入场，凭证可从行程直接打开。</small></span>`}</div><p class="journey-day-note">${dayOne ? "第一天不安排正式入园，减少长途自驾后的体力消耗。" : "如节目或客流发生变化，只调整受影响节点并由游客确认。"}</p></section>`;
  },
  guideAdjust(prefix = "s06", purchased = false) {
    const target = purchased ? "s09-guide-adjust-order" : `${prefix}-guide-adjusted`;
    const request = purchased ? "第二天少走一点，并把东京梦华改到晚一场。" : "晚餐提前一点，孩子晚上不要太赶。";
    return `<section class="journey-page journey-adjust-page journey-adjust-chat"><header><span>用一句话调整</span><h5>告诉我哪里需要改变</h5><p>AI只重排受影响的节点，确认前不会修改攻略和订单。</p></header><div class="journey-chat-thread"><div class="journey-bubble user">${request}</div><div class="journey-bubble ai"><b>已整理调整方案</b><span>${purchased ? "减少步行约800米，将东京梦华改为20:45场；门票和家庭餐不受影响。" : "晚餐提前到17:00，18:50前往剧场；东京梦华仍保留19:30场。"}</span></div></div><div class="journey-adjust-diff"><div><span>调整前</span><b>${purchased ? "步行6.1km · 东京梦华19:30" : "晚餐17:30 · 19:00前往剧场"}</b></div><i>→</i><div><span>调整后</span><b>${purchased ? "步行5.3km · 东京梦华20:45" : "晚餐17:00 · 18:50前往剧场"}</b></div></div>${purchased ? `<div class="journey-order-impact"><i>票</i><span><b>发现1个已购项目受影响</b><small>需要确认20:45场余票和原演出票处理方式。</small></span></div>` : `<div class="journey-order-impact safe"><i>✓</i><span><b>暂无已购订单受影响</b><small>费用预计仍为¥4,326。</small></span></div>`}<div class="journey-composer compact"><button type="button" data-ui-action="语音输入">⌁</button><textarea aria-label="继续描述调整要求" placeholder="继续补充，例如：预算再低一点"></textarea><button type="button" data-ui-action="继续调整">↑</button></div><button type="button" class="journey-inline-primary" data-ui-route="${target}">${purchased ? "检查订单影响" : "确认更新攻略"}</button></section>`;
  },
  guideOrderImpact() {
    return `<section class="journey-page journey-order-impact-page"><header><span>已购项目影响确认</span><h5>东京梦华需要换场</h5><p>AI不会自动修改已支付订单，请确认后再更新。</p></header><div class="journey-impact-status"><i>✓</i><span><b>20:45场 B区仍有58席</b><small>原票价不变，无需补款或退款</small></span></div><dl><div><dt>景区门票</dt><dd>不受影响 · 保持原订单</dd></div><div><dt>家庭餐套餐</dt><dd>不受影响 · 保持12:00</dd></div><div class="changed"><dt>东京梦华</dt><dd>19:30 → 20:45</dd></div><div><dt>返程时间</dt><dd>21:15 → 22:30</dd></div><div><dt>预计到家</dt><dd>23:20 → 次日00:20</dd></div></dl><div class="journey-impact-note"><b>变更规则</b><span>同票档换场且价格一致，可直接确认；若后续库存或价格变化，将再次征求确认。</span></div></section>`;
  },
  routeMap(day = "all") {
    const title = day === 1 ? "第1天抵达与夜游路线" : day === 2 ? "第2天园内游览路线" : "家庭两日游路线";
    const route = day === 1 ? "郑州 → 客栈 → 东京食坊 → 虹桥 → 客栈" : day === 2 ? "迎宾门 → 演武场 → 清明食府 → 虹桥 → 景龙湖 → 东京梦华" : "郑州 → 客栈 → 夜游 → 迎宾门 → 园内路线 → 东京梦华 → 返程";
    const stops = `<button data-ui-route="s09-day1"><b>第1天 · 抵达与夜游</b><small>客栈、晚餐、虹桥夜景 · 步行2.1km</small><em>5站 ›</em></button><button data-ui-route="s09-day2"><b>第2天 · 园内深度游</b><small>迎宾门、演武场、虹桥、东京梦华 · 步行6.1km</small><em>8站 ›</em></button><button data-ui-route="s09-pretrip"><b>出发前办理</b><small>门票、住宿、车辆与提醒</small><em>查看 ›</em></button>`;
    return `<section class="journey-page journey-full-map"><div class="journey-map-stage"><img src="assets/guide-map.webp" alt="${title}"><div class="journey-map-route-line"></div><i class="map-node n1">1</i><i class="map-node n2">2</i><i class="map-node n3">3</i><i class="map-node n4">4</i><span>节目、停车与客流信息 · 10:06更新</span></div><div class="journey-map-head"><span>路线地图</span><h5>${title}</h5><p>${route}</p></div><div class="journey-map-stops">${stops}</div></section>`;
  },
  poiDetail() {
    return `<section class="journey-page journey-poi-detail"><div class="journey-poi-hero"><img src="assets/scenic-day.webp" alt="演武场节目区域"><div><span>行程第2天 · 10:30</span><h5>岳飞枪挑小梁王</h5><p>演武场 · 免费节目 · 约30分钟</p></div></div><dl><div><dt>距当前位置</dt><dd>420米 · 步行约6分钟</dd></div><div><dt>建议到达</dt><dd>10:15前 · 前排更适合儿童</dd></div><div><dt>适合家庭</dt><dd>武术实景表演，儿童观看参与感强</dd></div><div><dt>附近服务</dt><dd>卫生间90米 · 饮水点120米</dd></div></dl><div class="journey-poi-tip"><b>攻略提示</b><span>看台无遮阳，晴天建议准备遮阳帽；散场后从东侧出口前往清明食府更顺路。</span></div></section>`;
  },
  navigation(live = true) {
    return `<section class="journey-page journey-walk-navigation"><div class="journey-map-stage navigation"><img src="assets/guide-map.webp" alt="园内步行导航"><div class="journey-map-route-line"></div><i class="map-node n1">我</i><i class="map-node n3">终</i></div><div class="journey-live-head"><span>${live ? "园内导航中" : "路线预览"}</span><h5>前方120米右转</h5><p>前往演武场 · 剩余420米 · 约6分钟</p></div><ol><li class="done"><i>✓</i><span><b>迎宾门检票口</b><small>已通过</small></span></li><li class="current"><i>1</i><span><b>沿御街向北直行</b><small>120米后在牌坊右转</small></span></li><li><i>2</i><span><b>到达演武场东入口</b><small>节目10:30开始</small></span></li></ol><p>路线由园区地图承接，起点和终点已从当前行程传入。</p></section>`;
  },
  reminders() {
    return `<section class="journey-page journey-reminder-page"><div class="journey-stage-head"><span>行程提醒</span><h5>这些时间会主动提醒你</h5><p>提醒已根据路程、办理状态和节目入场时间生成。</p></div><ol><li class="done"><time>8月21日 20:00</time><span><b>明天准备出发</b><small>门票、住宿和车辆信息均已完成</small></span><em>已开启</em></li><li><time>8月22日 11:30</time><span><b>出发提醒</b><small>建议13:30从郑州出发，预计15:15到达</small></span><em>提前2小时</em></li><li><time>8月23日 09:50</time><span><b>节目提醒</b><small>岳飞枪挑小梁王10:30开演 · 步行约6分钟</small></span><em>提前40分钟</em></li><li><time>8月23日 19:00</time><span><b>东京梦华入场提醒</b><small>打开演出票凭证并前往B区入口</small></span><em>提前30分钟</em></li><li><time>离园前</time><span><b>停车缴费提醒</b><small>缴费后30分钟内驶离停车场</small></span><em>到点触发</em></li></ol></section>`;
  },
  taskComplete() {
    return `<section class="journey-page journey-task-complete-page"><div class="journey-saved-mark">✓</div><span>当前项目已完成 · 11:02</span><h5>岳飞枪挑小梁王</h5><p>已记录到本次行程，下一站为清明食府。</p><div class="journey-next-action"><span>下一站 · 12:00</span><h6>清明食府家庭午餐</h6><p>距当前位置380米 · 步行约5分钟 · 套餐已购</p><button type="button" data-ui-route="s14-master">打开用餐凭证</button></div><dl><div><dt>建议出发</dt><dd>11:45</dd></div><div><dt>途中安排</dt><dd>可在虹桥东侧停留约20分钟</dd></div><div><dt>当前客流</dt><dd>适中 · 无需调整</dd></div></dl></section>`;
  },
  liveStage(stage = "lunch") {
    const show = stage === "show";
    return `<section class="journey-page journey-inpark-page"><div class="journey-live-head"><span>第2天 · ${show ? "18:48" : "11:42"}</span><h5>${show ? "下一站：大宋·东京梦华" : "下一站：清明食府"}</h5><p>${show ? "距剧场560米 · 距入场截止42分钟" : "距餐厅380米 · 建议11:45出发"}</p><button type="button" data-ui-route="s09-navigation">开始导航</button></div><div class="journey-live-context"><span><b>${show ? "B区12排 · 3席" : "家庭套餐 · 3人"}</b><small>${show ? "演出票已购，入场凭证可用" : "套餐已购，12:00—13:10可使用"}</small></span><button type="button" data-ui-route="s14-master">打开凭证</button></div>${show ? `<div class="journey-live-alert success"><i>铃</i><span><b>入场提醒已触发</b><small>请在19:00前出发，19:30正式开演。</small></span></div>` : `<div class="journey-live-alert"><i>!</i><span><b>14:00后有阵雨</b><small>AI已准备室内替代方案，不影响午餐。</small></span><button type="button" data-ui-route="s09-weather-change">查看</button></div>`}<ol class="journey-live-timeline"><li class="done"><time>10:30</time><span><b>岳飞枪挑小梁王</b><small>已完成 · 11:02</small></span><em>✓</em></li><li class="${show ? "done" : "current"}"><time>12:00</time><span><b>清明食府午餐</b><small>${show ? "已使用" : "套餐已购 · 距离380米"}</small></span><em>${show ? "✓" : "当前"}</em></li><li class="${show ? "done" : ""}"><time>15:10</time><span><b>虹桥与民俗体验</b><small>${show ? "已完成" : "根据天气可能调整"}</small></span></li><li class="${show ? "current" : ""}"><time>19:30</time><span><b>大宋·东京梦华</b><small>B区12排 · 提前30分钟入场</small></span><em>${show ? "下一站" : ""}</em></li></ol></section>`;
  },
  weatherChange() {
    return `<section class="journey-page journey-change-page"><header><span>天气变化</span><h5>14:00后预计有阵雨</h5><p>虹桥室外体验可能受影响，AI只调整下午两项安排。</p></header><div class="journey-change-map"><img src="assets/guide-map.webp" alt="雨天替代路线"><span>改走清明文化馆连廊</span></div><dl><div><dt>保持不变</dt><dd>午餐、东京梦华和返程时间</dd></div><div><dt>原安排</dt><dd>13:30虹桥与露天民俗体验</dd></div><div><dt>替代安排</dt><dd>13:40清明文化馆，15:20雨停后再到虹桥</dd></div><div><dt>预计影响</dt><dd>多步行120米 · 费用不变</dd></div></dl><p>天气信息最近更新于11:40，采用后才会修改提醒。</p></section>`;
  },
  saved() {
    return `<section class="journey-page journey-saved-page"><div class="journey-saved-mark">✓</div><span>已保存到我的行程</span><h5>家庭两日宋韵之旅</h5><p>攻略已保留，出发前可以继续购买、预约和调整。</p><dl><div><dt>出行日期</dt><dd>8月22日—23日</dd></div><div><dt>同行人数</dt><dd>2成人 + 1名10岁儿童</dd></div><div><dt>待购买</dt><dd>门票、东京梦华、家庭餐</dd></div><div><dt>待确认</dt><dd>酒店电话预约、车辆信息</dd></div></dl></section>`;
  },
  tripList() {
    return `<section class="journey-page journey-trip-list"><header><div><span>赵女士</span><h5>我的行程</h5></div><button type="button" data-ui-route="s08-entry">＋ 新建</button></header><nav data-ui-choice-group><button class="active" data-ui-choice>待出行</button><button data-ui-choice>游玩中</button><button data-ui-choice>已完成</button></nav><article class="journey-featured-trip"><img src="assets/family-trip.webp" alt="家庭两日游"><div><span>待出行 · 距出发5天</span><h6>家庭两日宋韵之旅</h6><p>8月22日—23日 · 2大1小 · 郑州自驾</p><dl><div><dt>出发前任务</dt><dd>3项待完成</dd></div><div><dt>路线节点</dt><dd>13个</dd></div></dl><button type="button" data-ui-route="s09-pretrip">查看行程</button></div></article><div class="journey-other-trips"><button type="button" data-ui-route="s09-inpark"><span><b>今日园内行程</b><small>游玩中 · 下一站岳飞枪挑小梁王</small></span><em>继续 ›</em></button><button type="button" data-ui-route="s09-completed"><span><b>经典一日游</b><small>8月10日 · 已完成</small></span><em>回顾 ›</em></button></div></section>`;
  },
  preTrip(mode = "pending") {
    const purchased = mode === "purchased" || mode === "ready";
    const ready = mode === "ready";
    const guideTarget = purchased ? "s09-guide-purchased" : "s09-guide";
    const next = !purchased
      ? ["先完成待购项目", "门票、东京梦华和家庭餐需要选择实名出行人并支付。", "去办理", "s13-travelers"]
      : ready
          ? ["出发准备已完成", "订单、住宿、车辆和提醒均已确认，可以开始第一天行程。", "查看路线", "s09-depart"]
          : ["确认住宿和车辆", "订单已经同步到攻略，再完成酒店和车牌信息即可出发。", "确认酒店", "s09-hotel-confirm"];
    return `<section class="journey-page journey-pretrip-page"><div class="journey-stage-head ${ready ? "success" : ""}"><span>出发前 · 距出发5天</span><h5>家庭两日宋韵之旅</h5><p>${ready ? "所有准备事项已经完成。" : "完成待办后即可安心出发。"}</p></div><div class="journey-view-switch"><button type="button" data-ui-route="${guideTarget}">攻略</button><button class="active">行程</button></div><section class="journey-next-action"><span>下一步</span><h6>${next[0]}</h6><p>${next[1]}</p><button type="button" data-ui-route="${next[3]}">${next[2]}</button></section><ol class="journey-task-list"><li class="done"><i>✓</i><span><b>两日攻略已保存</b><small>13个行程节点</small></span><button type="button" data-ui-route="${guideTarget}">查看</button></li><li class="${purchased ? "done" : ""}"><i>${purchased ? "✓" : "1"}</i><span><b>${purchased ? "待购项目已完成支付" : "选择实名出行人并购买"}</b><small>${purchased ? "3个子订单 · 已同步至行程" : "门票、东京梦华、家庭餐"}</small></span><button type="button" data-ui-route="${purchased ? "s14-master" : "s13-travelers"}">${purchased ? "订单" : "办理"}</button></li><li class="${ready ? "done" : ""}"><i>${ready ? "✓" : "2"}</i><span><b>${ready ? "满庭芳客栈已确认" : "电话确认满庭芳客栈"}</b><small>家庭房1晚 · 0371-2566****</small></span><button type="button" data-ui-route="${ready ? "s09-pretrip-ready" : "s09-hotel-confirm"}">${ready ? "已确认" : "确认"}</button></li><li class="${ready ? "done" : ""}"><i>${ready ? "✓" : "3"}</i><span><b>${ready ? "车辆与提醒已保存" : "补充车牌并开启提醒"}</b><small>豫A·8Q226 · 出发前2小时提醒</small></span><button type="button" data-ui-route="s09-vehicle">${ready ? "修改" : "保存"}</button></li></ol></section>`;
  },
  hotelConfirm(confirmed = false) {
    return `<section class="journey-page journey-booking-page"><div class="journey-stage-head ${confirmed ? "success" : ""}"><span>住宿办理</span><h5>${confirmed ? "客栈已电话确认" : "联系满庭芳精品客栈"}</h5><p>${confirmed ? "入住信息已经同步到行程。" : "该住宿暂不支持在线预订，请电话确认房态。"}</p></div><dl><div><dt>入住日期</dt><dd>8月22日 · 1晚</dd></div><div><dt>房型</dt><dd>家庭房 · 含早餐</dd></div><div><dt>入住人</dt><dd>赵敏 · 2成人1儿童</dd></div><div><dt>联系电话</dt><dd>0371-2566****</dd></div><div><dt>预计到店</dt><dd>15:40</dd></div><div><dt>当前状态</dt><dd>${confirmed ? "已确认保留房间" : "待电话确认"}</dd></div></dl>${confirmed ? `<div class="journey-booking-result"><i>✓</i><span><b>确认号 MT20260822018</b><small>到店出示手机号即可办理入住。</small></span></div>` : `<div class="journey-contact-line"><span><b>电话沟通要点</b><small>确认房态、早餐、儿童入住和停车位置</small></span><button type="button" data-ui-action="拨打客栈电话">拨打电话</button></div>`}</section>`;
  },
  vehicle() {
    return `<section class="journey-page journey-booking-page"><div class="journey-stage-head"><span>出发准备</span><h5>车辆与提醒</h5><p>用于停车缴费、到达提醒和返程导航。</p></div><div class="journey-fields"><label class="wide"><span>车牌号码</span><input value="豫A·8Q226"></label><label><span>出发提醒</span><select><option>提前2小时</option><option>提前1天</option></select></label><label><span>节目提醒</span><select><option>提前30分钟</option><option>提前1小时</option></select></label></div><div class="journey-booking-result"><i>行</i><span><b>建议13:30从郑州出发</b><small>预计15:15到达客栈，已为晚间安排预留时间。</small></span></div><button type="button" class="journey-reminder-link" data-ui-route="s09-reminders"><span><b>预览5条行程提醒</b><small>出发、节目、凭证和停车缴费</small></span><em>›</em></button></section>`;
  },
  dayOneComplete() {
    return `<section class="journey-page journey-day-transition"><div class="journey-complete-hero"><img src="assets/lantern-night.webp" alt="第一天夜游结束"><div><span>第1天已完成 · 21:18</span><h5>今晚回客栈休息</h5><p>晚餐、虹桥和汴河夜游均已完成</p></div></div><ol class="journey-task-list"><li class="done"><i>✓</i><span><b>满庭芳客栈入住</b><small>家庭房 · 已办理</small></span></li><li class="done"><i>✓</i><span><b>东京食坊家庭晚餐</b><small>17:32—18:28</small></span></li><li class="done"><i>✓</i><span><b>虹桥与汴河夜游</b><small>19:02—20:46</small></span></li></ol><section class="journey-next-action"><span>明早安排</span><h6>07:30早餐，08:10退房</h6><p>退房后驾车前往迎宾门停车场，预计08:32到达。</p></section></section>`;
  },
  dayTwoDepart() {
    return `<section class="journey-page journey-day-transition"><div class="journey-stage-head"><span>第2天 · 08:10</span><h5>退房后前往迎宾门</h5><p>车辆、停车场和入园凭证都已准备。</p></div><div class="journey-day-bridge"><div><i>住</i><span><b>满庭芳精品客栈</b><small>已退房 · 08:10</small></span></div><em>驾车约12分钟 · 6.8公里</em><div><i>停</i><span><b>迎宾门停车场</b><small>预计08:32到达 · 余位充足</small></span></div><em>步行约8分钟</em><div><i>园</i><span><b>迎宾门检票口</b><small>门票已购 · 凭证可用</small></span></div></div></section>`;
  },
  depart() {
    return `<section class="journey-page journey-depart-page"><div class="journey-navigation-hero"><img src="assets/parking.webp" alt="前往清园停车场"><div><span>第1天 · 13:30出发</span><h5>郑州市 → 满庭芳精品客栈</h5><p>约68公里 · 预计1小时45分钟</p></div></div><div class="journey-view-switch"><button type="button" data-ui-route="s09-guide">攻略</button><button class="active">行程</button></div><section class="journey-navigation-route"><div><i>起</i><span><b>郑州市金水区</b><small>当前定位</small></span></div><em>连霍高速 · 实时路况畅通</em><div><i>终</i><span><b>满庭芳精品客栈停车区</b><small>目的地已传入地图应用</small></span></div></section><div class="journey-route-options" data-ui-choice-group><button class="active" data-ui-choice><span><b>高德地图</b><small>预计15:15到达</small></span><em>✓</em></button><button data-ui-choice><span><b>百度地图</b><small>预计15:18到达</small></span><em>○</em></button></div></section>`;
  },
  arrived() {
    return `<section class="journey-page journey-arrived-page"><div class="journey-stage-head success"><span>已到达 · 15:38</span><h5>满庭芳精品客栈</h5><p>车辆已停放，接下来办理入住。</p></div><section class="journey-next-action"><span>现在去做</span><h6>办理家庭房入住</h6><p>赵女士 · 1晚 · 已电话确认</p><button type="button" data-ui-action="打开客栈位置">查看位置</button></section><ol class="journey-task-list"><li class="done"><i>✓</i><span><b>郑州出发</b><small>13:32</small></span></li><li class="done"><i>✓</i><span><b>抵达客栈停车区</b><small>15:38 · 豫A·8Q226</small></span></li><li><i>3</i><span><b>东京食坊家庭晚餐</b><small>17:30 · 步行460米</small></span><button type="button" data-ui-action="导航到东京食坊">导航</button></li><li><i>4</i><span><b>虹桥与汴河夜游</b><small>19:00 · 约90分钟</small></span></li></ol></section>`;
  },
  inPark(adjusted = false) {
    return `<section class="journey-page journey-inpark-page"><div class="journey-live-head"><span>第2天 · 游玩中 · 10:06更新</span><h5>${adjusted ? "路线已重新安排" : "下一站：岳飞枪挑小梁王"}</h5><p>${adjusted ? "已避开虹桥临时拥堵，东京梦华时间不变。" : "距离演武场420米，建议10:10前出发。"}</p><button type="button" data-ui-route="s09-navigation">开始导航</button></div><div class="journey-view-switch"><button type="button" data-ui-route="s09-guide">攻略</button><button class="active">行程</button></div>${adjusted ? `<div class="journey-update-strip"><i>✓</i><span><b>只调整受影响部分</b><small>虹桥改至15:10，景龙湖休息提前至14:20。</small></span></div>` : `<div class="journey-live-alert"><i>!</i><span><b>虹桥区域客流上升</b><small>预计排队增加25分钟，AI已准备替代安排。</small></span><button type="button" data-ui-route="s09-change">查看</button></div>`}<ol class="journey-live-timeline"><li class="done"><time>09:03</time><span><b>迎宾门入园</b><small>门票已核销</small></span><em>✓</em></li><li class="current"><time>10:30</time><span><b>岳飞枪挑小梁王</b><small>演武场 · 距离420米</small></span><em>当前</em></li><li><time>12:00</time><span><b>清明食府午餐</b><small>套餐已购 · 凭证可用</small></span><button type="button" data-ui-route="s14-qr">凭证</button></li><li><time>${adjusted ? "14:20" : "13:30"}</time><span><b>${adjusted ? "景龙湖休息区" : "虹桥与民俗体验"}</b><small>${adjusted ? "避开拥堵 · 休息40分钟" : "预计客流较高"}</small></span></li><li><time>19:30</time><span><b>大宋·东京梦华</b><small>B区12排 · 提前30分钟入场</small></span></li></ol><button type="button" class="journey-current-complete" data-ui-route="s09-lunch">完成当前项目并查看下一站</button></section>`;
  },
  change() {
    return `<section class="journey-page journey-change-page"><header><span>行程变化</span><h5>虹桥区域预计拥堵</h5><p>当前排队约45分钟，可能影响午餐和休息时间。</p></header><div class="journey-change-map"><img src="assets/guide-map.webp" alt="调整前后路线"><span>建议绕行景龙湖东岸</span></div><dl><div><dt>保持不变</dt><dd>午餐、东京梦华及返程时间</dd></div><div><dt>调整内容</dt><dd>休息提前，虹桥延后至15:10</dd></div><div><dt>预计效果</dt><dd>少排队约25分钟，多步行180米</dd></div></dl><p>采用后才会更新行程和提醒。</p></section>`;
  },
  parkingPayment() {
    return `<section class="journey-page journey-parking-pay"><div class="journey-stage-head"><span>第2天 · 21:15</span><h5>离园前缴纳停车费</h5><p>车辆已在迎宾门停车场，缴费后30分钟内离场。</p></div><div class="journey-fields"><label class="wide"><span>车牌号码</span><input value="豫A·8Q226"></label></div><dl><div><dt>入场时间</dt><dd>2026-08-23 08:32</dd></div><div><dt>停车时长</dt><dd>12小时43分钟</dd></div><div><dt>收费标准</dt><dd>以停车系统返回为准</dd></div><div class="total"><dt>应付金额</dt><dd>¥40.00</dd></div></dl><p>实际金额以停车系统实时返回结果为准。</p></section>`;
  },
  parkingPaid() {
    return `<section class="journey-page journey-parking-paid"><div class="journey-saved-mark">✓</div><span>停车费已缴纳</span><h5>请在30分钟内离场</h5><p>迎宾门停车场 · 豫A·8Q226</p><dl><div><dt>支付金额</dt><dd>¥40.00</dd></div><div><dt>支付时间</dt><dd>21:17</dd></div><div><dt>有效离场</dt><dd>21:47前</dd></div></dl><section class="journey-next-action"><span>最后一步</span><h6>返回郑州</h6><p>目的地已准备，可直接打开外部导航。</p></section></section>`;
  },
  returning() {
    return `<section class="journey-page journey-return-page"><div class="journey-navigation-hero"><img src="assets/parking.webp" alt="从清园返程"><div><span>返程 · 21:20</span><h5>迎宾门停车场 → 郑州市</h5><p>约70公里 · 预计23:05到达</p></div></div><section class="journey-navigation-route"><div><i>起</i><span><b>迎宾门停车场</b><small>停车费已缴</small></span></div><em>目的地已传入外部地图</em><div><i>终</i><span><b>郑州市金水区</b><small>预计23:05到达</small></span></div></section><div class="journey-trip-finished"><span>本次行程已完成</span><b>11个项目 · 3个订单均已履约</b></div></section>`;
  },
  completed() {
    return `<section class="journey-page journey-completed-page"><div class="journey-complete-hero"><img src="assets/lantern-night.webp" alt="清园夜游完成"><div><span>行程已完成</span><h5>家庭两日宋韵之旅</h5><p>8月22日—23日 · 感谢同行</p></div></div><div class="journey-complete-stats"><span><b>11</b><small>完成项目</small></span><span><b>8.4km</b><small>园内步行</small></span><span><b>3</b><small>已用订单</small></span></div><section class="journey-actual-summary"><header><b>计划与实际</b><span>AI已整理</span></header><dl><div><dt>原计划预算</dt><dd>¥5,000</dd></div><div><dt>预计支出</dt><dd>¥4,326</dd></div><div><dt>实际记录</dt><dd>¥4,248</dd></div><div class="saved"><dt>比预计节省</dt><dd>¥78</dd></div></dl></section><dl><div><dt>门票与演出</dt><dd>全部已核销</dd></div><div><dt>餐饮套餐</dt><dd>已使用</dd></div><div><dt>停车缴费</dt><dd>已完成</dd></div><div><dt>行程变更</dt><dd>采用1次避峰调整</dd></div></dl><div class="journey-trip-recap"><b>本次行程回顾</b><p>亲子节奏整体合适，第二天下午通过一次局部调整少排队约25分钟；下次可继续沿用“午后休息＋重点演出”的安排。</p><button type="button" data-ui-route="s06-entry">生成相似行程</button></div></section>`;
  }
};

const JourneyCommerceUI = {
  tripCreate() {
    return `<section class="jc-page jc-trip-create"><div class="jc-trip-hero"><span>我的行程</span><h5>开始安排这次游园</h5><p>先保存游览计划，需要时再购买门票和节目。</p></div><div class="jc-create-actions"><button type="button" data-ui-route="s08-template"><i>模</i><span><b>使用推荐模板</b><small>经典一日游、宋韵文化线、夜游汴河</small></span><em>›</em></button><button type="button" data-ui-route="s08-manual"><i>手</i><span><b>手动添加游览点</b><small>从地图、节目和餐饮中自由选择</small></span><em>›</em></button><button type="button" data-ui-route="s08-import"><i>导</i><span><b>导入好友行程</b><small>输入分享口令生成自己的副本</small></span><em>›</em></button></div><div class="jc-recent-template"><header><b>热门模板</b><button type="button" data-ui-route="s08-template">全部模板</button></header><div><span>亲子经典一日游</span><b>8 个项目 · 约 9 小时</b><em>使用</em></div></div></section>`;
  },
  tripList() {
    return `<section class="jc-page jc-trip-list"><div class="jc-list-head"><div><span>赵女士</span><h5>我的行程</h5></div><button type="button" data-ui-route="s08-landing">＋ 新建</button></div><article class="jc-active-trip"><header><span>已下单</span><em>距出发 5 天</em></header><h6>家庭两日宋韵之旅</h6><p>8月22日—23日 · 3人 · 自驾</p><div><span><b>3</b><small>已购订单</small></span><span><b>8</b><small>行程项目</small></span><span><b>2</b><small>已设提醒</small></span></div><button type="button" data-ui-route="s09-detail">查看行程</button></article><div class="jc-draft-list"><h6>行程草稿</h6><button type="button" data-ui-route="s09-detail"><span><b>经典一日游</b><small>8月29日 · 8个游览点</small></span><em>待购买 3 项 ›</em></button></div></section>`;
  },
  mall(active, title, products) {
    const tabs = [["门票","s10-mall"],["剧场","s11-shows"],["餐饮","s15-order"],["年卡","s12-list"]];
    return `<section class="jc-page jc-mall"><div class="jc-mall-head"><span>清明上河园</span><h5>${title}</h5><p>实名购买，使用规则以商品详情为准。</p></div><nav>${tabs.map(item => `<button type="button" class="${item[0]===active?"active":""}" data-ui-route="${item[1]}">${item[0]}</button>`).join("")}</nav><div class="jc-product-list">${products.map((item,index)=>`<article class="${index===0?"featured":""}"><div class="jc-product-image"><span>${item[0].slice(0,1)}</span></div><div><small>${item[1]}</small><h6>${item[0]}</h6><p>${item[2]}</p><footer><b>${item[3]}</b><button type="button" ${item[4]?`data-ui-route="${item[4]}"`:"data-ui-action=\"查看商品\""}>${item[5]||"查看"}</button></footer></div></article>`).join("")}</div></section>`;
  },
  ticketMall() {
    return this.mall("门票", "购票商城", [["成人日间票","当日单次入园","本人身份证实名购票","¥120","s10-ticket","购买"],["儿童优惠票","优惠票","需儿童实名信息和监护人联系方式","¥60","s10-eligibility","查看要求"],["学生优惠票","优惠票","需有效学生证明，现场核验原件","¥60","s10-eligibility","查看要求"],["夜场票","18:00后入园","不含东京梦华演出","¥80","s10-ticket","购买"]]);
  },
  showMall() {
    return this.mall("剧场", "剧场与特色体验", [["大宋·东京梦华","大型水景实景演出","19:30 / 20:45 · B区有余票","¥249起","s11-detail","选场购票"],["清明上河·宋宴","宋式宴席与雅集表演","11:30 / 17:30 · 需选席","¥368起","s11-banquet-detail","选择场次"],["清园茶会","园林茶席与宋式点心","每日 14:00 / 16:00","¥128起","","查看"]]);
  },
  cardMall() {
    return this.mall("年卡", "年卡中心", [["个人畅游年卡","个人年卡","本人366天多次入园","¥199","s12-detail","查看权益"],["亲子年卡","1成人+1儿童","实名绑定后不可更换","¥299","s12-detail","查看权益"],["家庭年卡","2成人+1儿童","适合家庭多次游园","¥499","s12-detail","查看权益"]]);
  },
  orderList() {
    return `<section class="jc-page jc-order-page"><div class="jc-list-head"><div><span>订单中心</span><h5>我的订单</h5></div><button type="button" data-ui-action="搜索订单">⌕</button></div><div class="jc-order-tabs" data-ui-choice-group><button data-ui-choice>全部</button><button class="active" data-ui-choice>待使用</button><button data-ui-choice>退款/售后</button></div><div class="jc-order-list"><article><header><span>支付订单 QY202608170046</span><em>已支付</em></header><div><i>票</i><span><b>门票、餐饮与东京梦华</b><small>3个子订单 · 8月23日使用</small></span></div><footer><b>实付 ¥1,287</b><button type="button" data-ui-route="s14-master">查看子订单</button></footer></article><article><header><span>QY202608170031</span><em>待使用</em></header><div><i>学</i><span><b>学生日间票 × 1</b><small>王晓明 · 8月22日</small></span></div><footer><b>实付 ¥60</b><button type="button" data-ui-route="s10-voucher">查看凭证</button></footer></article></div></section>`;
  },
  refundList() {
    return `<section class="jc-page jc-order-page"><div class="jc-list-head"><div><span>订单售后</span><h5>选择退款项目</h5></div></div><div class="jc-refund-list"><article><div><i>票</i><span><b>景区门票 × 3</b><small>未使用 · 可退3张</small></span></div><button type="button" data-ui-route="s15-select">申请退款</button></article><article><div><i>餐</i><span><b>清明食府3人套餐</b><small>未使用 · 可退</small></span></div><button type="button" data-ui-route="s15-select">申请退款</button></article><article><div><i>演</i><span><b>东京梦华 B区 × 3</b><small>距开演2小时 · 按规则核对</small></span></div><button type="button" data-ui-route="s15-not-refundable">查看规则</button></article></div><p class="jc-order-note">退款按子订单和实际使用人申请，不影响同一支付订单中的其他项目。</p></section>`;
  }
};

const VisitorServiceUI = {
  facilities() {
    return `<section class="vs-page vs-facilities"><div class="vs-service-head"><span>园内服务</span><h5>需要找什么？</h5><p>按当前位置展示最近且正在开放的服务点。</p></div><div class="vs-service-grid"><button type="button" data-ui-route="s17-results"><i>厕</i><b>卫生间</b><small>最近180米</small></button><button type="button" data-ui-route="s17-results"><i>婴</i><b>母婴室</b><small>最近260米</small></button><button type="button" data-ui-route="s17-results"><i>医</i><b>医疗急救</b><small>5分钟可达</small></button><button type="button" data-ui-route="s17-results"><i>餐</i><b>餐饮服务</b><small>20余处</small></button><button type="button" data-ui-route="s17-results"><i>存</i><b>行李寄存</b><small>2个服务点</small></button><button type="button" data-ui-route="s19-entry"><i>助</i><b>紧急求助</b><small>联系工作人员</small></button></div><div class="vs-nearby"><header><b>离你最近</b><button type="button" data-ui-route="s16-map">地图查看</button></header><article><i>厕</i><span><b>虹桥东侧卫生间</b><small>180米 · 开放 · 无障碍</small></span><em>3分钟 ›</em></article><article><i>医</i><span><b>东京食坊医疗点</b><small>430米 · 开放</small></span><em>6分钟 ›</em></article></div></section>`;
  },
  transport() {
    return `<section class="vs-page vs-transport"><div class="vs-travel-cover"><span>到园交通</span><h5>从哪里出发？</h5><p>根据实时路况和停车余位推荐抵达方案。</p></div><div class="vs-travel-form"><label><span>出发地</span><input value="开封北站"></label><label><span>出行日期</span><input value="2026-08-23"></label><label><span>预计到达</span><input value="08:30"></label></div><h6>出行方式</h6><div class="vs-transport-modes" data-ui-choice-group><button class="active" data-ui-choice><i>车</i><span><b>自驾</b><small>停车场余位与导航</small></span><em>✓</em></button><button data-ui-choice><i>铁</i><span><b>高铁 / 火车</b><small>车站接驳方案</small></span><em>○</em></button><button data-ui-choice><i>公</i><span><b>公交</b><small>站点与步行路线</small></span><em>○</em></button></div></section>`;
  },
  emergency() {
    return `<section class="vs-page vs-emergency"><div class="vs-emergency-head"><span>安全与应急</span><h5>现在需要哪种帮助？</h5><p>如有人昏迷、呼吸困难或严重出血，请立即拨打120。</p><button type="button" data-ui-action="拨打120">立即拨打 120</button></div><div class="vs-emergency-list"><button type="button" data-ui-route="s19-guide"><i>人</i><span><b>同行人员走失</b><small>联系安保并登记特征</small></span><em>›</em></button><button type="button" data-ui-action="医疗求助"><i>医</i><span><b>身体不适或受伤</b><small>查找医疗点或园区急救</small></span><em>›</em></button><button type="button" data-ui-action="设施意外"><i>设</i><span><b>设施意外</b><small>远离现场并联系工作人员</small></span><em>›</em></button><button type="button" data-ui-action="财物遗失"><i>物</i><span><b>财物遗失</b><small>登记失物并查询进度</small></span><em>›</em></button></div><div class="vs-location"><i>⌖</i><span><b>当前位置</b><small>虹桥东侧 · 定位精度约12米</small></span><button type="button" data-ui-action="刷新位置">刷新</button></div></section>`;
  },
  feedbackEntry() {
    return `<section class="vs-page vs-feedback-entry"><div class="vs-feedback-cover"><span>游客服务</span><h5>投诉与建议</h5><p>投诉用于反馈具体问题，普通建议可直接提交。</p></div><div class="vs-feedback-actions"><button type="button" data-ui-route="s20-types"><i>诉</i><span><b>我要投诉</b><small>选择类目、核验入园记录并上传材料</small></span><em>›</em></button><button type="button" data-ui-route="s21-form"><i>议</i><span><b>提交建议</b><small>填写改进意见和联系方式</small></span><em>›</em></button><button type="button" data-ui-route="s20-c-detail"><i>查</i><span><b>我的投诉</b><small>查看受理进度和处理结果</small></span><em>›</em></button></div></section>`;
  },
  suggestionForm() {
    return `<section class="vs-page vs-suggestion"><div class="vs-form-head"><span>普通建议</span><h5>告诉我们哪里可以做得更好</h5><p>无需上传材料，提交后用于改善游览服务。</p></div><div class="vs-suggestion-form"><label><span>建议类型</span><select><option>游览体验</option><option>园区设施</option><option>节目内容</option><option>餐饮服务</option></select></label><label><span>建议内容</span><textarea>希望虹桥附近增加遮阳休息区和饮水点。</textarea></label><label><span>联系方式（选填）</span><input value="158****3115"></label></div></section>`;
  },
  surveyEntry() {
    return `<section class="vs-page vs-survey"><div class="vs-survey-head"><span>游览结束</span><h5>说说本次体验</h5><p>可评价整体游览，也可评价具体已使用订单。</p></div><div class="vs-survey-score"><span>本次游览</span><b>2026年8月23日 · 家庭亲子</b><div>${[1,2,3,4,5].map(i=>`<button type="button" class="active" data-ui-rating="${i}">★</button>`).join("")}</div><small>非常满意</small></div><div class="vs-survey-list"><button type="button" data-ui-route="s22-rating"><i>卷</i><span><b>填写游览问卷</b><small>约2分钟 · 整体体验</small></span><em>›</em></button><button type="button" data-ui-route="s22-order-rating"><i>演</i><span><b>评价大宋·东京梦华</b><small>已使用订单 SHW2026081703</small></span><em>›</em></button><button type="button" data-ui-route="s22-order-rating"><i>餐</i><span><b>评价清明食府</b><small>已使用订单 FNB2026081702</small></span><em>›</em></button></div></section>`;
  },
  travelers() {
    return `<section class="vs-page vs-travelers"><div class="jc-list-head"><div><span>实名信息</span><h5>常用出行人</h5></div><button type="button" data-ui-route="s23-method">＋ 添加</button></div><div class="vs-traveler-list"><article><span>赵</span><div><b>赵敏</b><small>成人 · 身份证 410***********5127</small></div><button type="button" data-ui-route="s23-edit">编辑</button></article><article><span>李</span><div><b>李明</b><small>成人 · 身份证 410***********0728</small></div><button type="button" data-ui-action="删除李明">删除</button></article><article><span>小</span><div><b>小明</b><small>儿童 · 学生已认证</small></div><button type="button" data-ui-route="s23-edit">编辑</button></article></div><p>出行人用于实名购票、年卡绑定和优惠资格核验。</p></section>`;
  },
  travelerMethods() {
    return `<section class="vs-page vs-traveler-method"><div class="vs-form-head"><span>添加出行人</span><h5>选择录入方式</h5><p>保存后可在购票和行程中直接选择。</p></div><div><button type="button" data-ui-route="s23-upload"><i>拍</i><span><b>拍身份证添加</b><small>自动识别姓名和证件号码</small></span><em>推荐</em></button><button type="button" data-ui-route="s23-manual"><i>填</i><span><b>手动填写</b><small>适用于护照等其他证件</small></span><em>›</em></button><button type="button" data-ui-route="s23-batch"><i>批</i><span><b>批量录入</b><small>一次填写多位同行人</small></span><em>›</em></button><button type="button" data-ui-route="s23-invite"><i>邀</i><span><b>邀请本人填写</b><small>发送链接由对方确认</small></span><em>›</em></button></div></section>`;
  }
};

const S20UI = {
  categories() {
    return `<section class="s20-page s20-category-page">
      <div class="s20-page-lead"><span>投诉与建议</span><h5>请选择投诉类目</h5><p>选择最符合问题的类目，后续只填写必要信息。</p></div>
      <div class="s20-category-list">{{WORK_ORDER_CATEGORY_CHOICES}}</div>
      <p class="s20-footnote">提交投诉前需提供一条本人入园记录。</p>
    </section>`;
  },
  entryRecord(missing = false) {
    return `<section class="s20-page s20-entry-page">
      <div class="s20-step-title"><span>投诉类目</span><b>{{SELECTED_WORK_ORDER_CATEGORY}}</b></div>
      <div class="s20-page-lead compact"><h5>选择入园记录</h5><p>用于确认你曾到园，门票或园内购买记录均可。</p></div>
      <div class="s20-entry-list" data-ui-choice-group>
        <button type="button" class="${missing ? "" : "active"}" data-ui-choice aria-pressed="${missing ? "false" : "true"}"><i>${missing ? "○" : "✓"}</i><span><b>清明上河园日间票 × 1</b><small>QY202608170026 · 8月17日已核销</small></span><em>门票</em></button>
        <button type="button" data-ui-choice aria-pressed="false"><i>○</i><span><b>东京食坊消费订单</b><small>XF202608171226 · 孙记小吃 ¥88</small></span><em>购买记录</em></button>
      </div>
      <button type="button" class="s20-upload-entry" data-ui-action="上传入园记录"><i>＋</i><span><b>上传其他入园记录</b><small>支持门票截图、订单截图或消费凭证</small></span></button>
      ${missing ? `<div class="s20-inline-error"><b>还不能继续</b><span>请选择或上传一条本人入园记录。</span></div>` : ""}
    </section>`;
  },
  materials() {
    return `<section class="s20-page s20-form-page">
      <div class="s20-proof-bar"><i>✓</i><span><b>入园记录已核验</b><small>日间票 QY202608170026 · 赵女士</small></span><button type="button" data-ui-route="s20-entry-record">更换</button></div>
      <div class="s20-form">
        <label><span>投诉类目</span><strong>{{SELECTED_WORK_ORDER_CATEGORY}}</strong></label>
        <label><span>涉及地点或商户</span><input value="东京食坊 · 孙记小吃"></label>
        <label><span>发生时间</span><input value="2026-08-17 12:20"></label>
        <label class="wide"><span>问题描述</span><textarea>菜单标价 76 元，实际支付 88 元。</textarea></label>
        <label class="wide"><span>期望处理</span><input value="退还差额并核实标价"></label>
        <label class="wide"><span>联系电话</span><input value="158****3115"></label>
      </div>
      <div class="s20-material-upload"><h6>相关材料</h6><div><button type="button" data-ui-action="查看消费小票"><i>票</i><b>消费小票</b><small>已上传</small></button><button type="button" data-ui-action="查看菜单照片"><i>图</i><b>菜单照片</b><small>已上传</small></button><button type="button" data-ui-action="继续上传"><i>＋</i><b>继续上传</b><small>照片或截图</small></button></div></div>
    </section>`;
  },
  checking() {
    return `<section class="s20-page s20-check-page"><div class="s20-checking-mark"><i></i><h5>正在检查材料</h5><p>通常只需几秒，请稍候。</p></div><ol><li class="done"><i>✓</i><span><b>入园记录</b><small>本人门票，已核销</small></span></li><li class="done"><i>✓</i><span><b>投诉类目</b><small>消费价格</small></span></li><li class="current"><i></i><span><b>消费小票与菜单照片</b><small>正在读取商户、时间和金额</small></span></li><li><i></i><span><b>必填内容</b><small>等待检查</small></span></li></ol></section>`;
  },
  recognized() {
    return `<section class="s20-page s20-recognized-page"><div class="s20-result-strip"><i>✓</i><span><b>材料有效，可以提交</b><small>请核对以下信息</small></span></div><div class="s20-proof-summary"><span>入园记录</span><b>日间票 QY202608170026</b><em>已核验</em></div><div class="s20-form"><label><span>商户</span><input value="孙记小吃"></label><label><span>订单号</span><input value="XF202608171226"></label><label><span>消费时间</span><input value="2026-08-17 12:20"></label><label><span>实际支付</span><input value="¥88"></label><label><span>菜单标价</span><input value="¥76"></label></div></section>`;
  },
  confirm() {
    return `<section class="s20-page s20-confirm-page"><div class="s20-confirm-head"><span>投诉确认</span><h5>提交前请核对</h5></div><dl><div><dt>投诉类目</dt><dd>{{SELECTED_WORK_ORDER_CATEGORY}}</dd></div><div><dt>问题摘要</dt><dd>菜单标价 ¥76，实际支付 ¥88</dd></div><div><dt>游客诉求</dt><dd>退还差额并核实标价</dd></div><div><dt>联系方式</dt><dd>158****3115</dd></div><div><dt>入园记录</dt><dd>日间票 QY202608170026 · 已核验</dd></div><div><dt>相关材料</dt><dd>消费小票、菜单照片</dd></div></dl><p>识别结果仅供核对，最终处理结果以工作人员反馈为准。</p></section>`;
  },
  coldSubmission() {
    return `<section class="s20-page s20-cold-result"><div class="s20-wait-mark">✓</div><h5>投诉已提交</h5><p>我们正在核对与本次问题相关的历史处理记录。</p><dl><div><dt>工单编号</dt><dd>QY20260817061</dd></div><div><dt>当前状态</dt><dd>待受理</dd></div><div><dt>投诉类目</dt><dd>{{SELECTED_WORK_ORDER_CATEGORY}}</dd></div><div><dt>入园记录</dt><dd>已核验</dd></div></dl><span>工作人员复核后会在工单详情中反馈。</span></section>`;
  },
  adminCategories() {
    return `<section class="s20-category-admin"><header><div><h5>工单类目</h5><p>游客端投诉类目以此处启用的数据为准。</p></div><button type="button" data-work-order-category-create>＋ 新建类目</button></header>{{WORK_ORDER_CATEGORY_TABLE}}</section>`;
  },
  adminCold() {
    return `<section class="s20-cold-admin"><div class="s20-cold-banner"><span>冷处理复核</span><b>同一游客再次提交同类投诉</b><p>先对照历史完结结果，再决定恢复正常受理或继续观察。</p></div>${UI.adminDetail([["本次工单", [["工单编号", "QY20260817061"], ["游客", "赵女士 · 158****3115"], ["投诉类目", "消费价格"], ["入园记录", "日间票 QY202608170026 · 已核验"]]], ["关联历史", [["历史工单", "QY20260817052"], ["完结时间", "2026-08-17 13:25"], ["处理结果", "已退还差额 ¥12，商户完成价签整改"], ["匹配原因", "同一游客、同一类目、历史工单已完结"]]], ["本次内容", [["涉及商户", "孙记小吃"], ["问题描述", "商户仍存在标价与结算不一致"], ["新增材料", "8月20日消费小票、菜单照片"], ["当前策略", "冷处理 · 待客服复核"]]], ["处理建议", [["恢复受理", "本次有新的入园和消费记录"], ["继续观察", "材料与历史工单完全重复时使用"]]]])}</section>`;
  }
};

const HomeUI = {
  guest() {
    return UI.banner("开封 · 多云 18℃", "一朝步入画卷", "上元灯会与主题巡游正在进行，夜场票可提前购买。", "东京梦华晚场余票紧张")
      + UI.quick([["行", "AI 行程", "快速规划"], ["票", "景区购票", "门票与剧场"], ["图", "园区导览", "路线导航"], ["演", "节目演出", "查看场次"], ["食", "餐饮服务", "餐厅与宋宴"], ["车", "交通停车", "余位查询"], ["服", "游客服务", "投诉与求助"], ["卡", "年卡中心", "权益查询"]])
      + UI.serviceBar([["18℃", "体感舒适"], ["9:00", "今日开园"], ["38 场", "节目演出"]])
      + UI.notice("warn", "园区公告", "受设备检修影响，九龙桥区域 14:00—16:00 临时绕行。", "s02-notices")
      + UI.section("热门活动", UI.cards([["上元灯会·欢乐巡游季", "18:00 后入园 · 夜游花灯与主题巡游", "限时活动", true, "s02-activity"], ["大宋·东京梦华", "19:30 / 20:45 · B 区有余票", "¥249 起", false, "s05-program-detail"]]), "全部活动");
  },
  logged() {
    return UI.banner("欢迎回来，赵女士", "周末家庭两日游", "8 月 22 日出发，门票和东京梦华均已出票。", "距出发还有 5 天")
      + UI.quick([["行", "我的行程", "1 个待出行"], ["单", "我的订单", "2 个待使用"], ["码", "入园凭证", "快速出示"], ["人", "常用出行人", "已保存 2 人"], ["图", "园区导览", "查看实时路线"], ["演", "演出提醒", "已设置 2 个"], ["服", "游客服务", "求助与反馈"], ["卡", "年卡中心", "查看权益"]])
      + UI.notice("success", "下一项行程", "8 月 23 日 09:00 迎宾门入园 · 建议提前 20 分钟到达。")
      + UI.section("待使用订单", UI.rows([["票", "景区日间票 × 3", "8 月 23 日 · 待使用", "查看凭证", "s14-qr"], ["演", "东京梦华 B 区 × 3", "8 月 23 日 20:45", "查看座位", "s14-master"]]));
  }
};

const S01UI = {
  login() {
    return `<section class="s01-login-page"><div class="s01-login-brand"><span>清园</span><h5>登录清明上河园</h5><p>登录后可保存行程、订单和游客服务记录</p></div><div class="s01-login-benefits"><div><i>行</i><span><b>保存游园行程</b><small>跨页面继续规划与调整</small></span></div><div><i>票</i><span><b>管理门票与演出</b><small>查看订单、座位和入园凭证</small></span></div><div><i>服</i><span><b>跟进游客服务</b><small>查看投诉与求助处理进度</small></span></div></div><label class="ui-consent"><input type="checkbox" checked><span>我已阅读并同意服务协议和隐私政策</span></label><div class="s01-policy-links"><button type="button" data-ui-route="s24-agreement">《服务协议》</button><button type="button" data-ui-route="s24-agreement">《隐私政策》</button></div></section>`;
  }
};

window.SCENARIOS = [
  scene("S01", "公共入口", "首次进入与登录授权", "游客", "首次打开小程序，或进入需要登录的功能", "登录成功后继续原任务；也可以取消并停留在游客模式", "用户先理解授权内容并勾选协议，再完成手机号授权。未同意协议或取消授权时都应有明确反馈。", "蓝湖首页、5173 首页与个人中心", [
    page("s01-home", "推荐首页", "展示完整首页结构和需要登录的业务入口", HomeUI.guest(), [action("进入 AI 助手", "s01-login")], "normal", { home: true, tab: "home", headerTitle: "清明上河园" }),
    page("s01-login", "一键登录", "勾选协议后完成手机号授权", S01UI.login(), [action("暂不登录", "s01-home", "secondary"), action("微信手机号快捷登录", "s01-logged-home", "primary", { toast: "登录成功", modal: { title: "手机号授权", note: "允许清明上河园小程序获取当前微信绑定手机号。", fields: [["授权手机号", "187****8527"]], confirm: "允许" } })]),
    page("s01-logged-home", "已登录首页", "展示登录后的完整首页与个人业务状态", HomeUI.logged(), [action("完成本场景", "", "primary", { toast: "登录授权场景已完成" })], "result", { home: true, tab: "home", headerTitle: "清明上河园" })
  ]),

  scene("S02", "游前了解", "首页浏览与景区公告", "游客", "打开推荐首页", "查看公告或活动详情，并继续进入购票或行程规划", "首页只承担信息分发：天气、公告、核心入口和热门内容。公告详情需要明确影响范围和生效时间。", "蓝湖首页、5173 首页与公告数据", [
    page("s02-home", "推荐首页", "浏览 Banner、金刚区、天气、公告和热门活动", HomeUI.guest(), [], "normal", { home: true, tab: "home", headerTitle: "清明上河园" }),
    page("s02-notices", "景区公告", "按发布时间查看当前有效公告", UI.rows([["告", "九龙桥区域临时绕行", "今天 09:10 · 影响 14:00—16:00", "置顶", "s02-notice-detail"], ["演", "东京梦华第二场加开", "昨天 18:20 · 20:45 开演", "", "s05-program-detail"], ["客", "周末客流与入园提示", "8 月 15 日 · 建议错峰"]]), []),
    page("s02-notice-detail", "公告详情", "说明公告时间、范围和游客应采取的动作", UI.hero("园区公告", "九龙桥区域临时绕行", "发布时间：2026-08-17 09:10", true) + UI.summary([["生效时间", "8 月 17 日 14:00—16:00"], ["影响区域", "九龙桥北侧通道"], ["替代路线", "宣德门—景龙湖东岸"], ["影响项目", "不影响东京梦华入场"]]), [action("在地图查看绕行", "s16-map"), action("去规划行程", "s08-entry", "secondary")]),
    page("s02-activity", "活动详情", "查看活动时间、内容和购票入口", UI.hero("限时活动", "上元灯会·欢乐巡游季", "百万花灯、主题巡游与非遗打铁花。") + UI.summary([["活动日期", "8 月 18 日—9 月 10 日"], ["开放时间", "18:00—22:00"], ["适用门票", "夜场票 / 全日票"], ["入场地点", "迎宾门、金水门"]]) + UI.notice("warn", "以当日公告为准", "极端天气可能调整户外节目。"), [action("查看临时调整", "s02-activity-change", "secondary"), action("去购买夜场票", "s10-mall")]),
    page("s02-activity-change", "活动临时调整", "极端天气时说明取消项目和替代内容", UI.hero("临时调整", "打铁花演出暂停", "受短时大风影响，8 月 18 日 20:00 场暂停。", true) + UI.summary([["暂停项目", "非遗打铁花"], ["正常进行", "花灯展、室内灯笼馆"], ["替代节目", "宣和殿宋乐雅集"], ["票务处理", "夜场票正常使用"]]), [action("返回活动详情", "s02-activity")], "exception")
  ]),

  scene("S03", "游前了解", "AI 景区知识问答", "游客", "首页热门问题、输入框或 AI 助手入口", "获得可核对的景区答案，并能追问、评价、分享或查看历史", "问答过程需要包含输入、生成中、答案、异常恢复和历史记录；业务答案要提供可继续操作的入口。", "蓝湖 AI 助手、5173 AIAssistant", [
    page("s03-welcome", "AI 助手欢迎页", "提供常用问题、文字输入、语音和历史对话入口", S03UI.welcome(), [], "normal", { tab: "ai", headerTitle: "AI 助手", aiChat: { mode: "input", placeholder: "问景区、节目、门票或路线" } }),
    page("s03-loading", "回答生成中", "在同一会话中展示检索和流式生成状态", S03UI.loading(), [], "normal", { tab: "ai", headerTitle: "AI 助手", aiChat: { mode: "loading" } }),
    page("s03-network-error", "回答中断", "保留已生成内容并允许继续生成或重新提问", S03UI.error(), [], "exception", { tab: "ai", headerTitle: "AI 助手", aiChat: { mode: "input", placeholder: "继续追问或换个问题" } }),
    page("s03-answer", "AI 回答", "展示可核对的结构化答案、业务入口和继续追问", S03UI.answer(), [], "normal", { tab: "ai", headerTitle: "AI 助手", aiChat: { mode: "input", placeholder: "继续追问这个问题" } }),
    page("s03-context", "多轮追问", "沿用人数、时间和偏好继续给出可执行建议", S03UI.context(), [], "normal", { tab: "ai", headerTitle: "AI 助手", aiChat: { mode: "input", placeholder: "继续补充出游条件" } }),
    page("s03-cannot-answer", "无法确认的回答", "不确定时明确说明边界并提供官方信息和人工入口", S03UI.cannotAnswer(), [], "exception", { tab: "ai", headerTitle: "AI 助手", aiChat: { mode: "input", placeholder: "换一种问法" } }),
    page("s03-human", "转接人工客服", "携带对话摘要进入人工服务，避免游客重复描述", S03UI.human(), [action("返回 AI 助手", "s03-welcome")], "result", { tab: "ai", headerTitle: "人工服务" }),
    page("s03-history", "历史对话", "搜索、恢复或新建对话", S03UI.history(), [action("新建对话", "s03-welcome")], "normal", { tab: "ai" }),
    page("s03-feedback", "回答评价", "评价答案并补充改进意见", S03UI.feedback(), [action("返回回答", "s03-answer", "secondary"), action("提交评价", "s03-answer", "primary", { toast: "评价已提交" })], "normal", { tab: "ai" })
  ]),

  scene("S04", "游前了解", "天气与穿着建议", "游客", "点击首页天气卡或询问 AI", "查看逐日天气、穿着和异常天气提示", "天气服务需要把预报信息转化为可执行建议，并在雷雨、高温等异常情况下说明受影响项目。", "蓝湖天气与穿着建议、5173 WeatherForecast", [
    page("s04-overview", "天气概览", "快速判断当天是否适合游园", S04UI.overview(), [action("查看 7 日天气", "s04-forecast")]),
    page("s04-forecast", "7 日天气", "选择出行日期并查看对应建议", S04UI.forecast(), [action("查看雷雨提示", "s04-warning"), action("设置出发日提醒", "s04-forecast", "secondary", { toast: "天气提醒已设置" })]),
    page("s04-warning", "异常天气提醒", "说明天气风险和可替代的园区安排", S04UI.warning(), [action("返回天气", "s04-forecast", "secondary"), action("订阅当天提醒", "s04-warning", "primary", { toast: "天气提醒已设置" })], "exception")
  ]),

  scene("S05", "游前了解", "景区、节目与优惠查询", "游客", "首页推荐、活动入口或 AI 问答", "找到感兴趣的内容并进入购票或行程规划", "景区介绍、节目和优惠是同一决策链：先了解，再查看时间与适用条件，最后进入购买或行程。", "蓝湖景区介绍/活动优惠、5173 首页节目详情", [
    page("s05-about", "景区介绍", "建立对园区区域、内容和游览重点的整体认知", S05UI.about(), [action("查看必看节目", "s05-programs")]),
    page("s05-programs", "必看节目", "按时间和类型筛选节目", S05UI.programs(), [action("查看东京梦华", "s05-program-detail"), action("查看优惠", "s05-offers", "secondary")]),
    page("s05-program-detail", "东京梦华详情", "查看节目介绍、场次、地点和票价", S05UI.programDetail(), [action("加入行程", "s08-manual", "secondary"), action("立即购票", "s11-shows")]),
    page("s05-offers", "活动与优惠", "查看当前可用优惠和适用范围", S05UI.offers(), [action("查看优惠条件", "s05-offer-detail")]),
    page("s05-offer-detail", "优惠详情", "明确优惠对象、证件和不可叠加规则", S05UI.offerDetail(), [action("查看资格不符状态", "s05-ineligible", "secondary"), action("去选择活动票", "s10-mall")]),
    page("s05-ineligible", "优惠资格不符合", "说明不符合原因并保留普通购票入口", S05UI.ineligible(), [action("返回优惠列表", "s05-offers", "secondary"), action("购买普通门票", "s10-mall")], "exception")
  ]),

  scene("S06", "行程规划", "一句话直接生成家庭两日游", "家庭游客", "进入统一AI行程规划入口", "直接获得可保存、可调整、可办理的详细攻略", "系统根据输入完整度决定直接生成或继续补问，不插入实名或普通表单。", "会议纪要：完整信息一句话直出攻略", [
    page("s06-entry", "AI行程规划入口", "同一入口根据需求完整度自动直出或补问", JourneyPlannerUI.plannerHub(), [], "normal", { tab: "ai", headerTitle: "AI 行程规划" }),
    page("s06-input", "一句话规划", "完整描述日期、人数、交通、预算和偏好", JourneyPlannerUI.completeInput(), [action("发送并生成", "s06-generating")], "normal", { tab: "ai", headerTitle: "AI 行程规划" }),
    page("s06-generating", "正在生成攻略", "提取条件并匹配两日路线", JourneyPlannerUI.generating(), [action("查看详细攻略", "s06-guide")], "normal", { tab: "ai", headerTitle: "AI 行程规划" }),
    page("s06-guide", "家庭两日游攻略", "查看推荐理由、两日地图、费用和办理状态", JourneyPlannerUI.guideOverview("s06"), [action("保存攻略", "s06-saved", "secondary"), action("办理3项 ¥1,287", "s13-travelers")]),
    page("s06-day1", "第一天攻略", "查看出发、入住、晚餐和夜游的执行细节", JourneyPlannerUI.guideDay(1, "s06"), [action("查看第二天", "s06-day2")]),
    page("s06-day2", "第二天攻略", "查看入园、节目、餐饮、演出、缴费和返程", JourneyPlannerUI.guideDay(2, "s06"), [action("返回攻略总览", "s06-guide")]),
    page("s06-adjust", "调整攻略", "修改预算、节奏、住宿和必看项目", JourneyPlannerUI.guideAdjust("s06"), [action("取消调整", "s06-guide", "secondary")], "exception"),
    page("s06-guide-adjusted", "攻略已更新", "展示游客确认后的时间、路线和费用结果", JourneyPlannerUI.guideOverview("s06", "adjusted"), [action("保存更新", "s06-saved", "secondary"), action("办理3项 ¥1,287", "s13-travelers")], "result"),
    page("s06-saved", "攻略已保存", "进入出发前任务或办理待购项目", JourneyPlannerUI.saved(), [action("查看出发前任务", "s09-pretrip", "secondary"), action("办理待购项目", "s13-travelers")], "result")
  ]),

  scene("S07", "行程规划", "AI 补问后生成家庭两日游", "家庭游客", "输入信息不完整的一句话需求", "经过两轮必要补问后生成同一套详细攻略", "补问保持对话形态，只询问会影响方案的条件。", "会议纪要：一句话不足时多轮补问", [
    page("s07-input", "第一轮补问", "补充日期、出发地、交通和预算", JourneyPlannerUI.followup(1), [], "normal", { tab: "ai", headerTitle: "AI 行程规划" }),
    page("s07-followup-2", "第二轮补问", "补充儿童、住宿、餐饮和必看项目", JourneyPlannerUI.followup(2), [], "normal", { tab: "ai", headerTitle: "AI 行程规划" }),
    page("s07-confirm", "确认出游条件", "核对 AI 整理后的完整条件", JourneyPlannerUI.followupConfirm(), [action("继续补充", "s07-followup-2", "secondary"), action("确认并生成", "s07-generating")], "normal", { tab: "ai", headerTitle: "AI 行程规划" }),
    page("s07-generating", "正在生成攻略", "按补齐后的条件匹配路线和办理状态", JourneyPlannerUI.generating(), [action("查看详细攻略", "s07-guide")], "normal", { tab: "ai", headerTitle: "AI 行程规划" }),
    page("s07-guide", "家庭两日游攻略", "查看推荐理由、两日地图、费用和办理状态", JourneyPlannerUI.guideOverview("s07"), [action("保存攻略", "s07-saved", "secondary"), action("办理3项 ¥1,287", "s13-travelers")]),
    page("s07-day1", "第一天攻略", "查看出发、入住、晚餐和夜游的执行细节", JourneyPlannerUI.guideDay(1, "s07"), [action("查看第二天", "s07-day2")]),
    page("s07-day2", "第二天攻略", "查看入园、节目、演出、缴费和返程", JourneyPlannerUI.guideDay(2, "s07"), [action("返回攻略总览", "s07-guide")]),
    page("s07-adjust", "调整攻略", "冲突或超预算时由游客确认替代方案", JourneyPlannerUI.guideAdjust("s07"), [action("保留原方案", "s07-guide", "secondary")], "exception"),
    page("s07-guide-adjusted", "攻略已更新", "展示游客确认后的时间、路线和费用结果", JourneyPlannerUI.guideOverview("s07", "adjusted"), [action("保存更新", "s07-saved", "secondary"), action("办理3项 ¥1,287", "s13-travelers")], "result"),
    page("s07-saved", "攻略已保存", "进入出发前任务或办理待购项目", JourneyPlannerUI.saved(), [action("查看出发前任务", "s09-pretrip", "secondary"), action("办理待购项目", "s13-travelers")], "result")
  ]),

  scene("S08", "行程规划", "分步规划与辅助创建", "游客", "选择分步规划、模板、手动创建或好友导入", "统一生成可调整、可保存的家庭两日游攻略", "四种创建方式共用同一攻略结构，不重复建设购买流程。", "会议纪要：半自动分步规划与辅助创建", [
    page("s08-entry", "选择创建方式", "以分步规划为主，同时保留三种辅助入口", JourneyPlannerUI.plannerEntry(), [], "normal", { tab: "trip", headerTitle: "创建行程" }),
    page("s08-people", "人数构成", "选择成人、儿童和老人数量", JourneyPlannerUI.stepPeople(), [action("返回", "s08-entry", "secondary"), action("下一步", "s08-basics")]),
    page("s08-basics", "日期与预算", "确定出行日期、天数和预算", JourneyPlannerUI.stepBasics(), [action("上一步", "s08-people", "secondary"), action("下一步", "s08-travel")]),
    page("s08-travel", "出发与交通", "填写出发地并选择交通方式", JourneyPlannerUI.stepTravel(), [action("上一步", "s08-basics", "secondary"), action("下一步", "s08-preferences")]),
    page("s08-preferences", "住宿与偏好", "选择住宿、餐饮、强度和必看项目", JourneyPlannerUI.stepPreferences(), [action("上一步", "s08-travel", "secondary"), action("生成方案", "s08-generating")]),
    page("s08-generating", "正在生成攻略", "按分步条件匹配家庭两日游方案", JourneyPlannerUI.generating(), [action("查看详细攻略", "s08-guide")]),
    page("s08-guide", "家庭两日游攻略", "查看推荐理由、两日地图、费用和办理状态", JourneyPlannerUI.guideOverview("s08"), [action("保存攻略", "s08-saved", "secondary"), action("办理3项 ¥1,287", "s13-travelers")]),
    page("s08-day1", "第一天攻略", "查看出发、入住、晚餐和夜游的执行细节", JourneyPlannerUI.guideDay(1, "s08"), [action("查看第二天", "s08-day2")]),
    page("s08-day2", "第二天攻略", "查看入园、节目、演出、缴费和返程", JourneyPlannerUI.guideDay(2, "s08"), [action("返回攻略总览", "s08-guide")]),
    page("s08-template", "选择攻略模板", "选择适合家庭出游的攻略模板", JourneyPlannerUI.templateList(), []),
    page("s08-template-details", "模板详情", "补充日期和人数后生成独立攻略", JourneyPlannerUI.templateDetails(), [action("返回模板", "s08-template", "secondary"), action("生成我的攻略", "s08-generating")]),
    page("s08-manual", "手动创建行程", "搜索、添加和调整游览项目", JourneyPlannerUI.manualCreate(), [action("返回创建方式", "s08-entry", "secondary"), action("生成攻略", "s08-generating")]),
    page("s08-import", "导入好友行程", "输入口令并生成可独立修改的副本", JourneyPlannerUI.importTrip(), [action("查看无效口令", "s08-import-error", "secondary"), action("导入并生成副本", "s08-guide")]),
    page("s08-import-error", "分享口令无效", "提示重新输入或返回选择创建方式", UI.success("未找到可导入行程", "分享口令可能已失效，请向分享人获取新的口令。", true), [action("重新输入", "s08-import"), action("返回创建方式", "s08-entry", "secondary")], "exception"),
    page("s08-adjust", "调整攻略", "冲突或超预算时由游客确认替代方案", JourneyPlannerUI.guideAdjust("s08"), [action("保留原方案", "s08-guide", "secondary")], "exception"),
    page("s08-guide-adjusted", "攻略已更新", "展示游客确认后的时间、路线和费用结果", JourneyPlannerUI.guideOverview("s08", "adjusted"), [action("保存更新", "s08-saved", "secondary"), action("办理3项 ¥1,287", "s13-travelers")], "result"),
    page("s08-saved", "攻略已保存", "进入出发前任务或办理待购项目", JourneyPlannerUI.saved(), [action("查看出发前任务", "s09-pretrip", "secondary"), action("办理待购项目", "s13-travelers")], "result")
  ]),

  scene("S09", "行程管理", "攻略保存后的全程行程管理", "游客", "打开已保存的家庭两日游", "完成出发准备、园内执行、临时调整、缴费和返程", "攻略用于完整回看，行程用于现场执行。", "会议纪要：出发前至行程完成的全生命周期", [
    page("s09-list", "我的行程", "区分待出行、游玩中和已完成行程", JourneyPlannerUI.tripList(), [], "normal", { tab: "trip", headerTitle: "我的行程" }),
    page("s09-pretrip", "出发前任务", "核对实名、待购、酒店、车辆和提醒", JourneyPlannerUI.preTrip(), [action("查看完整攻略", "s09-guide", "secondary"), action("办理待购项目", "s13-travelers")]),
    page("s09-pretrip-purchased", "出发前任务", "支付后继续确认住宿、车辆和提醒", JourneyPlannerUI.preTrip("purchased"), [action("查看已购攻略", "s09-guide-purchased", "secondary"), action("确认住宿", "s09-hotel-confirm")]),
    page("s09-pretrip-ready", "出发前任务已完成", "全部准备完成后开始第一天行程", JourneyPlannerUI.preTrip("ready"), [action("查看已购攻略", "s09-guide-purchased", "secondary"), action("开始出发导航", "s09-depart")], "result"),
    page("s09-guide", "家庭两日游攻略", "回看完整攻略、路线和办理状态", JourneyPlannerUI.guideOverview("s09"), [action("返回出发前任务", "s09-pretrip", "secondary"), action("办理3项 ¥1,287", "s13-travelers")]),
    page("s09-guide-purchased", "已购家庭两日游攻略", "购买结果同步到攻略并提供订单凭证入口", JourneyPlannerUI.guideOverview("s09", "purchased", "s09"), [action("返回出发前任务", "s09-pretrip-purchased", "secondary"), action("查看全部订单", "s14-master")]),
    page("s09-guide-adjust", "调整已购攻略", "通过自然语言调整并识别受影响订单", JourneyPlannerUI.guideAdjust("s09", true), [action("取消调整", "s09-guide-purchased", "secondary")], "exception"),
    page("s09-guide-adjust-order", "确认已购项目影响", "换场前检查库存、差价和返程变化", JourneyPlannerUI.guideOrderImpact(), [action("保留原场次", "s09-guide-purchased", "secondary"), action("确认换至20:45", "s09-guide-adjusted", "primary", { toast: "攻略、订单和返程提醒已同步更新" })]),
    page("s09-guide-adjusted", "已购攻略已更新", "在同一攻略中展示换场、步行和返程调整结果", JourneyPlannerUI.guideOverview("s09", "late-adjusted", "s09"), [action("返回出发前任务", "s09-pretrip-purchased", "secondary"), action("查看全部订单", "s14-master")], "result"),
    page("s09-day1", "第一天攻略", "查看抵达、入住、晚餐和夜游安排", JourneyPlannerUI.guideDay(1, "s09", "purchased"), [action("查看第二天", "s09-day2")]),
    page("s09-day2", "第二天攻略", "从统一时间轴进入订单、凭证、地图和停车办理", JourneyPlannerUI.guideDay(2, "s09", "purchased"), [action("返回攻略总览", "s09-guide-purchased")]),
    page("s09-route-map", "两日路线地图", "在一张地图查看两天路线和关键节点", JourneyPlannerUI.routeMap("all"), [action("开始园内导航", "s09-navigation")]),
    page("s09-poi", "行程节点详情", "查看节目玩法、亲子理由和附近服务", JourneyPlannerUI.poiDetail(), [action("返回路线地图", "s09-route-map", "secondary"), action("开始导航", "s09-navigation")]),
    page("s09-navigation", "园内步行导航", "从行程直接传递当前位置和目标点", JourneyPlannerUI.navigation(true), [action("返回当前行程", "s09-inpark", "secondary"), action("到达当前节点", "s09-inpark")]),
    page("s09-hotel-confirm", "确认住宿", "电话核实房态、入住人和到店时间", JourneyPlannerUI.hotelConfirm(false), [action("暂不确认", "s09-pretrip-purchased", "secondary"), action("已电话确认，继续填写车辆", "s09-vehicle", "primary", { toast: "住宿确认号已同步到行程" })]),
    page("s09-vehicle", "车辆与提醒", "保存车牌并设置出发和节目提醒", JourneyPlannerUI.vehicle(), [action("返回出发前任务", "s09-pretrip-purchased", "secondary"), action("保存并完成准备", "s09-pretrip-ready")]),
    page("s09-reminders", "行程提醒预览", "展示提醒实际触发的时间和内容", JourneyPlannerUI.reminders(), [action("返回车辆设置", "s09-vehicle", "secondary"), action("确认提醒", "s09-pretrip-ready")]),
    page("s09-depart", "出发导航", "直接传递郑州起点和停车场终点", JourneyPlannerUI.depart(), [action("已到达停车场", "s09-arrived")]),
    page("s09-arrived", "到达与入住", "记录停车位置并办理酒店和晚间活动", JourneyPlannerUI.arrived(), [action("完成第一天安排", "s09-day1-complete")]),
    page("s09-day1-complete", "第一天已完成", "收口入住、晚餐和夜游并提示次日安排", JourneyPlannerUI.dayOneComplete(), [action("开始第二天", "s09-day2-depart")], "result"),
    page("s09-day2-depart", "第二天出发", "从客栈退房、驾车停车并步行入园", JourneyPlannerUI.dayTwoDepart(), [action("到达并进入园区", "s09-inpark")]),
    page("s09-inpark", "园内执行", "突出当前任务、下一站、凭证和节目提醒", JourneyPlannerUI.inPark(false), [action("查看临时变更", "s09-change", "secondary")]),
    page("s09-change", "临时调整方案", "节目变更或拥堵时提供局部替代路线", JourneyPlannerUI.change(), [action("暂不调整", "s09-inpark", "secondary"), action("确认更新行程", "s09-adjusted")], "exception"),
    page("s09-adjusted", "行程已局部更新", "仅调整受影响节点并保留其他安排", JourneyPlannerUI.inPark(true), [action("完成当前项目并继续", "s09-lunch", "primary", { toast: "当前项目已完成，下一站为清明食府" })]),
    page("s09-lunch", "下一站午餐", "展示当前距离、凭证和天气变化", JourneyPlannerUI.liveStage("lunch"), [action("继续至晚间安排", "s09-show-reminder")]),
    page("s09-weather-change", "阵雨替代方案", "天气变化时只调整受影响的室外节点", JourneyPlannerUI.weatherChange(), [action("保留原路线", "s09-lunch", "secondary"), action("采用雨天方案", "s09-show-reminder")], "exception"),
    page("s09-show-reminder", "演出入场提醒", "提醒游客导航、打开凭证并按时入场", JourneyPlannerUI.liveStage("show"), [action("完成游园并缴费", "s09-parking")]),
    page("s09-parking", "停车缴费", "选择车牌并核对入场时间和费用", JourneyPlannerUI.parkingPayment(), [action("确认支付并开始返程", "s09-return", "primary", { toast: "停车费支付成功，请在30分钟内离场" })]),
    page("s09-return", "返程导航", "从停车场直接发起外部导航", JourneyPlannerUI.returning(), [action("结束本次行程", "s09-completed")]),
    page("s09-completed", "行程已完成", "查看实际完成项目、订单状态和攻略入口", JourneyPlannerUI.completed(), [action("返回我的行程", "s09-list", "secondary"), action("填写游览评价", "s22-entry")], "result")
  ]),

  scene("S10", "票务交易", "单独购买景区门票", "游客", "进入购票商城的门票分类", "完成票种资格核对、实名下单和支付，获得可核销的门票子订单", "自助购票不自动生成行程；成人、儿童、学生、军人等票种先说明适用对象和所需信息，再关联实名出行人。优惠资格不完整时不能提交订单。", "蓝湖门票信息、5173 TicketMall、Travelers、Payment", [
    page("s10-mall", "购票商城", "按商品分类浏览并查看不同票种的适用条件", JourneyCommerceUI.ticketMall(), [action("查看优惠票购票要求", "s10-eligibility")], "normal", { tab: "tickets", headerTitle: "购票商城" }),
    page("s10-eligibility", "优惠票购票要求", "在选择票种前完整说明儿童、学生和军人票所需信息", UI.requirements([
      ["童", "儿童优惠票", "需要为实际入园儿童实名购票", [["购票前填写", "姓名、证件类型、证件号码、出生日期"], ["监护信息", "监护人姓名和联系电话"], ["入园准备", "儿童本人有效身份证件或票务规则认可的证明"], ["资格校验", "系统按实名信息初检，现场按原件复核"]]],
      ["学", "学生优惠票", "需要先完成学生身份信息核对", [["购票前填写", "姓名、身份证件、学校、学号"], ["证明材料", "有效学生证或票务规则认可的学籍证明"], ["有效期限", "填写证件有效期并上传清晰照片"], ["入园准备", "本人身份证件和有效学生证明原件"]]],
      ["军", "军人优惠票", "仅限符合当前票务规则的本人使用", [["购票前填写", "姓名、身份证件、军人证件类型和号码"], ["证明材料", "军官证、士兵证、退役军人优待证等对应有效证件"], ["证件状态", "填写有效期并上传证件正反面"], ["入园准备", "本人身份证件和对应军人证件原件"]]]
    ]), [action("购买学生票", "s10-ticket")]),
    page("s10-ticket", "选择日期和数量", "确定使用日期、票型和数量", UI.form([["票型", "学生票"], ["使用日期", "2026-08-22"], ["入园时段", "09:00—21:30"]]) + UI.counters([["购买数量", "每单最多购买 5 张", 1]]) + UI.notice("warn", "需完成学生认证", "下单人或实际使用人必须提交有效学生信息。"), [action("选择出行人", "s10-traveler")]),
    page("s10-traveler", "选择出行人", "为实名票关联实际使用人，并支持在当前流程新增", UI.people([["王晓明", "12 岁 · 学生认证未完成", "去认证", ""], ["赵敏", "成人 · 不适用学生票", "不可选", "disabled"], ["李明", "成人 · 不适用学生票", "不可选", "disabled"]]) + UI.notice("error", "暂无可用出行人", "请先完成王晓明的学生认证，或新增符合条件的出行人。"), [action("新增出行人", "s10-add-traveler", "secondary"), action("去学生认证", "s10-student")], "exception"),
    page("s10-add-traveler", "新增出行人", "不离开购票流程，录入新的实名使用人", UI.form([["姓名", "王晓明"], ["证件类型", "居民身份证"], ["证件号码", "410***********3128"], ["出生日期", "2014-05-16"], ["监护人", "赵敏"], ["联系电话", "187****8527"]]), [action("取消", "s10-traveler", "secondary"), action("保存并选择", "s10-traveler-added")]),
    page("s10-traveler-added", "选择出行人", "新增完成后回到原选择页面并保持购票信息", UI.people([["王晓明", "12 岁 · 学生认证未完成", "已选", "selected"], ["赵敏", "成人 · 不适用学生票", "不可选", "disabled"], ["李明", "成人 · 不适用学生票", "不可选", "disabled"]]), [action("为王晓明认证", "s10-student")]),
    page("s10-student", "学生认证", "填写学校、学号并上传有效证件", UI.form([["学生姓名", "王晓明"], ["学校名称", "开封市实验小学"], ["学号", "20250128"], ["证件有效期", "2026-09-01"]]) + UI.upload([["学生证照片", "正面信息清晰", "ok"], ["学籍证明", "选填", ""]]), [action("提交认证并继续", "s10-confirm", "primary", { toast: "学生认证已通过" })]),
    page("s10-confirm", "订单确认", "核对票型、日期、游客和退改规则", UI.summary([["商品", "清明上河园学生日间票"], ["使用日期", "2026-08-22"], ["游客", "王晓明"], ["数量", "1 张"], ["票价", "¥60"], ["退改", "未使用且符合规则可申请"]]), [action("返回修改", "s10-ticket", "secondary"), action("提交订单", "s10-payment")]),
    page("s10-payment", "收银台", "在支付倒计时内完成付款", UI.hero("支付剩余 14:56", "应付 ¥60", "学生日间票 × 1", true) + UI.cards([["微信支付", "当前账号 · 187****8527", "", true]]) + UI.summary([["订单号", "QY202608170031"], ["优惠", "学生优惠 ¥60"], ["实付", "¥60"]]), [action("确认支付", "s10-success")]),
    page("s10-success", "支付成功", "生成订单并提示核销方式", UI.success("支付成功", "门票订单已确认，可凭身份证或订单二维码入园。") + UI.summary([["订单号", "QY202608170031"], ["使用人", "王晓明"], ["使用日期", "2026-08-22"], ["订单状态", "待使用"]]), [action("查看入园凭证", "s10-voucher")], "result"),
    page("s10-voucher", "门票核销凭证", "展示单个子订单的有效二维码和使用提示", UI.hero("待使用", "学生日间票", "使用日期：2026-08-22") + UI.qr("TKT20260817031", "出示二维码或本人身份证核验入园") + UI.notice("warn", "请准备学生证件", "现场无法核验学生资格时需按规则补差价。"), [action("完成本场景", "", "primary", { toast: "单独购买门票场景已完成" })], "result")
  ]),

  scene("S11", "票务交易", "购买东京梦华或宋宴并选座", "游客", "进入剧场分类或节目详情", "支付成功并获得指定场次、票档和座位", "演出票流程必须包含日期、场次、票档、选座、实名出行人和支付；余票不足时允许更换场次或票档。", "蓝湖东京梦华/宋宴购票、5173 TicketMall 与 SeatSelector", [
    page("s11-shows", "剧场票列表", "选择东京梦华、宋宴或茶会", JourneyCommerceUI.showMall(), [action("选择东京梦华", "s11-detail")]),
    page("s11-detail", "节目与票档详情", "了解节目、场次、票档和购买规则", UI.hero("大型水景实景演出", "大宋·东京梦华", "演出约 60 分钟，建议提前 30 分钟入场。") + UI.form([["演出日期", "2026-08-23"], ["演出场次", "19:30—20:30"], ["票档", "B 区 ¥249"]]) + UI.counters([["购票数量", "当前票档剩余 26 席", 3]]) + UI.notice("", "当前余票", "B 区可连续选择 3 个座位。"), [action("开始选座", "s11-seat")]),
    page("s11-seat", "在线选座", "在真实座位图中选择数量一致的座位", UI.seatMap([8, 9, 10]) + UI.summary([["已选座位", "10 排 8—10 座"], ["数量", "3 席"], ["合计", "¥747"]]), [action("查看余票不足状态", "s11-no-seat", "secondary"), action("确认座位", "s11-travelers")]),
    page("s11-no-seat", "连续座位不足", "在目标场次无连续座位时提供替代方案", UI.success("当前没有 3 个连续座位", "可以改选 20:45 场次、选择 A 区，或分散选座。", true) + UI.rows([["时", "改选 20:45 场", "B 区剩余 58 席", "推荐"], ["区", "改选 A 区", "19:30 场剩余 12 席"], ["散", "接受分散座位", "相邻两排"]]), [action("改选 20:45 场", "s11-seat")], "exception"),
    page("s11-travelers", "选择观演人", "将每个座位绑定到实名出行人，也可临时新增", UI.people([["赵敏", "成人 · 10 排 8 座", "已绑定", "selected"], ["李明", "成人 · 10 排 9 座", "已绑定", "selected"], ["小明", "儿童 · 10 排 10 座", "已绑定", "selected"]]), [action("新增观演人", "s11-add-traveler", "secondary"), action("确认订单", "s11-confirm")]),
    page("s11-add-traveler", "新增观演人", "在选座流程内补充实名信息", UI.form([["姓名", "王晓明"], ["证件类型", "居民身份证"], ["证件号码", "410***********3128"], ["手机号", "187****7128"]]), [action("取消", "s11-travelers", "secondary"), action("保存并绑定", "s11-travelers")]),
    page("s11-confirm", "演出订单确认", "统一核对场次、票档、座位和游客", UI.summary([["节目", "大宋·东京梦华"], ["场次", "2026-08-23 20:45"], ["票档", "B 区 × 3"], ["座位", "10 排 8—10 座"], ["游客", "赵敏、李明、小明"], ["合计", "¥747"]]), [action("返回选座", "s11-seat", "secondary"), action("去支付", "s11-payment")]),
    page("s11-payment", "收银台", "完成演出订单支付", UI.hero("支付剩余 14:56", "应付 ¥747", "东京梦华 B 区 × 3", true) + UI.cards([["微信支付", "当前账号 · 187****8527", "", true]]) + UI.summary([["订单号", "QY202608170038"], ["场次", "8 月 23 日 20:45"], ["实付", "¥747"]]), [action("确认支付", "s11-success")]),
    page("s11-success", "购票成功", "确认场次座位并提供提醒入口", UI.success("购票成功", "东京梦华 20:45 场已出票。") + UI.summary([["座位", "B 区 10 排 8—10 座"], ["入场时间", "建议 20:15 前"], ["入场地点", "东京梦华剧场"], ["凭证", "订单二维码 / 身份证"]]), [action("完成本场景", "", "primary", { toast: "演出票选场选座场景已完成" })], "result"),
    page("s11-banquet-detail", "宋宴场次与套餐", "选择用餐日期、场次、套餐和人数", UI.hero("宋式宴席与雅集表演", "清明上河·宋宴", "用餐约 90 分钟，开席后不保留座位。") + UI.form([["用餐日期", "2026-08-23"], ["宴席场次", "17:30—19:00"], ["套餐", "雅集宴 ¥368/位"]]) + UI.counters([["用餐人数", "儿童也需占用一个席位", 3]]), [action("返回节目列表", "s11-shows", "secondary"), action("选择席位", "s11-banquet-seat")]),
    page("s11-banquet-seat", "宋宴席位选择", "按桌位图选择同桌相邻席位", UI.seatMap([4, 5, 6]) + UI.summary([["桌号", "汴河厅 6 号桌"], ["席位", "4—6 号"], ["人数", "3 人"], ["合计", "¥1,104"]]), [action("返回修改场次", "s11-banquet-detail", "secondary"), action("绑定用餐人", "s11-banquet-travelers")]),
    page("s11-banquet-travelers", "选择用餐人", "为宋宴席位关联实际到店人员", UI.people([["赵敏", "成人 · 6 桌 4 号", "已绑定", "selected"], ["李明", "成人 · 6 桌 5 号", "已绑定", "selected"], ["小明", "儿童 · 6 桌 6 号", "已绑定", "selected"]]), [action("新增用餐人", "s11-add-diner", "secondary"), action("确认宋宴订单", "s11-banquet-confirm")]),
    page("s11-add-diner", "新增用餐人", "在宋宴预订中补充到店人员信息", UI.form([["姓名", "王晓明"], ["证件类型", "居民身份证"], ["证件号码", "410***********3128"], ["手机号", "187****7128"]]), [action("取消", "s11-banquet-travelers", "secondary"), action("保存并绑定", "s11-banquet-travelers")]),
    page("s11-banquet-confirm", "宋宴订单确认", "核对场次、套餐、席位和用餐人", UI.summary([["项目", "清明上河·宋宴"], ["场次", "2026-08-23 17:30"], ["套餐", "雅集宴 × 3"], ["席位", "汴河厅 6 桌 4—6 号"], ["用餐人", "赵敏、李明、小明"], ["合计", "¥1,104"]]), [action("返回选座", "s11-banquet-seat", "secondary"), action("去支付", "s11-banquet-payment")]),
    page("s11-banquet-payment", "宋宴收银台", "完成宋宴订单支付", UI.hero("支付剩余 14:56", "应付 ¥1,104", "清明上河·宋宴 × 3", true) + UI.cards([["微信支付", "当前账号 · 187****8527", "", true]]) + UI.summary([["订单号", "QY202608170041"], ["场次", "8 月 23 日 17:30"], ["实付", "¥1,104"]]), [action("确认支付", "s11-banquet-success")]),
    page("s11-banquet-success", "宋宴预订成功", "生成指定场次和席位凭证", UI.success("预订成功", "宋宴 17:30 场已确认。") + UI.summary([["桌位", "汴河厅 6 桌 4—6 号"], ["到店时间", "建议 17:15 前"], ["用餐人数", "3 人"], ["凭证", "订单二维码"]]), [action("完成本场景", "", "primary", { toast: "宋宴选场选座场景已完成" })], "result")
  ]),

  scene("S12", "票务交易", "购买并绑定年卡", "游客", "进入购票商城年卡分类", "完成年卡支付并绑定到实名使用人", "年卡购买与绑定是连续但可分开的两个动作；购买成功后未绑定时必须在订单中保留明显入口。", "蓝湖年卡入口、5173 AnnualCardPayment 与 MyOrders", [
    page("s12-list", "年卡产品", "对比年卡价格、有效期和权益", JourneyCommerceUI.cardMall(), [action("查看个人年卡", "s12-detail")]),
    page("s12-detail", "年卡权益", "说明有效期、适用范围和限制", UI.hero("个人畅游年卡", "366 天多次入园", "自购买之日起生效，仅限本人实名使用。") + UI.summary([["有效期", "支付成功后 366 天"], ["适用范围", "景区首道门票"], ["不含项目", "东京梦华、宋宴、部分专场"], ["入园方式", "身份证或年卡二维码"]]) + UI.notice("warn", "实名后不可更换", "绑定使用人前请核对姓名和证件。"), [action("选择使用人", "s12-person")]),
    page("s12-person", "选择年卡使用人", "选择已实名出行人、临时新增或稍后绑定", UI.people([["赵敏", "身份证 410***********5127", "已选", "selected"], ["李明", "身份证 410***********0728", "选择", ""], ["稍后绑定", "支付后从年卡订单进入绑定", "选择", ""]]), [action("新增使用人", "s12-add-person", "secondary"), action("查看重复绑定状态", "s12-bind-conflict", "secondary"), action("阅读购买协议", "s12-agreement")]),
    page("s12-add-person", "新增年卡使用人", "在购买过程中录入新的实名使用人", UI.form([["姓名", "王晓明"], ["证件类型", "居民身份证"], ["证件号码", "410***********3128"], ["出生日期", "2014-05-16"], ["手机号", "187****7128"]]), [action("取消", "s12-person", "secondary"), action("保存并选择", "s12-person-added")]),
    page("s12-person-added", "选择年卡使用人", "新增后回到选择状态并保留原选择", UI.people([["王晓明", "身份证 410***********3128", "选择", ""], ["赵敏", "身份证 410***********5127", "已选", "selected"], ["李明", "身份证 410***********0728", "选择", ""]]), [action("阅读购买协议", "s12-agreement")]),
    page("s12-bind-conflict", "证件已绑定其他年卡", "阻止同一证件重复绑定冲突年卡", UI.success("暂时无法绑定", "赵敏的证件已绑定一张有效个人年卡，有效期至 2027-03-18。", true) + UI.summary([["现有年卡", "个人畅游年卡"], ["当前状态", "正常"], ["到期日期", "2027-03-18"], ["可选操作", "更换使用人或查看现有年卡"]]), [action("更换使用人", "s12-person")], "exception"),
    page("s12-agreement", "年卡购买协议", "确认实名、有效期和不可转让规则", UI.summary([["年卡产品", "个人畅游年卡"], ["使用人", "赵敏"], ["有效期", "支付成功后 366 天"], ["退款规则", "激活或使用后不可退"]]) + UI.consent("我已阅读并同意《年卡购买与使用协议》"), [action("返回更换使用人", "s12-person", "secondary"), action("去支付", "s12-payment")]),
    page("s12-payment", "年卡支付", "完成年卡订单支付", UI.hero("个人畅游年卡", "应付 ¥199", "使用人：赵敏", true) + UI.cards([["微信支付", "当前账号 · 187****8527", "", true]]) + UI.summary([["年卡有效期", "2026-08-17—2027-08-17"], ["优惠", "¥0"], ["实付", "¥199"]]), [action("确认支付", "s12-success")]),
    page("s12-success", "年卡购买成功", "提示后续实名绑定状态", UI.success("购买成功", "年卡订单已生成，正在绑定使用人。") + UI.summary([["订单号", "NC202608170006"], ["年卡", "个人畅游年卡"], ["使用人", "赵敏"], ["绑定状态", "待确认"]]), [action("确认绑定", "s12-bind")], "result"),
    page("s12-bind", "确认年卡绑定", "最后核对实名信息并激活年卡", UI.hero("绑定后不可更换", "确认绑定给赵敏", "身份证 410***********5127", true) + UI.form([["姓名", "赵敏"], ["证件类型", "居民身份证"], ["证件号码", "410***********5127"], ["手机号", "187****8527"]]), [action("确认绑定并激活", "s12-active")]),
    page("s12-active", "年卡已激活", "展示有效状态、期限和入园凭证", UI.success("年卡已激活", "赵敏可凭身份证或年卡二维码入园。") + UI.summary([["年卡编号", "QYNC202608170006"], ["有效期至", "2027-08-17"], ["使用状态", "正常"], ["已使用次数", "0 次"]]), [action("完成本场景", "", "primary", { toast: "年卡购买与绑定场景已完成" })], "result")
  ]),

  scene("S13", "票务交易", "行程项目一站式下单", "游客", "打开已生成但含未购项目的行程", "汇总未购项目支付，并把订单状态同步回行程", "一键下单只汇总行程中明确标记为待购买的项目；游客可以删除不想购买的项目，再统一确认价格。", "蓝湖一站式购票、5173 TripDayView 与 ItineraryConfirm", [
    page("s13-travelers", "选择实名出行人", "仅在办理待购票务时关联实名人员并校验票型", UI.people([["赵敏", "成人 · 身份证 410***********5127", "已选", "selected"], ["李明", "成人 · 身份证 410***********0728", "已选", "selected"], ["小明", "10 岁 · 儿童票资格待核验", "已选", "selected"]]) + UI.notice("", "购票环节再实名", "生成攻略只使用人数和年龄构成；购买门票、演出时才核对实际使用人。"), [action("新增出行人", "s23-method", "secondary"), action("校验票型资格", "s13-eligibility")]),
    page("s13-eligibility", "票型资格已校验", "确认成人和儿童票型与实名信息相符", UI.success("3名出行人均可购买", "已根据出生日期和实名信息完成本次票型初检。") + UI.summary([["赵敏", "成人票 · 校验通过"], ["李明", "成人票 · 校验通过"], ["小明", "10岁儿童票 · 校验通过"], ["现场要求", "入园时携带儿童有效证件"]]), [action("查看资格异常", "s13-eligibility-error", "secondary"), action("进入待购清单", "s13-trip")]),
    page("s13-eligibility-error", "儿童票资格待补充", "缺少有效年龄信息时阻止继续并说明补充方式", UI.success("暂时无法确认儿童票资格", "小明的出生日期与证件信息不完整，请补充后重新校验。", true) + UI.summary([["缺少信息", "出生日期"], ["可补充证件", "居民身份证或户口簿信息"], ["当前处理", "保留其他两名成人选择"]]), [action("补充出行人信息", "s23-edit", "secondary"), action("重新校验", "s13-eligibility")], "exception"),
    page("s13-trip", "行程中的待购项目", "区分已购、免费和待购项目", UI.timeline([["09:00", "景区门票 · 待购买", "current"], ["10:30", "岳飞枪挑小梁王 · 含门票", "done"], ["12:00", "清明食府套餐 · 待购买", "current"], ["19:30", "东京梦华 · 待购买", "current"]]) + UI.notice("warn", "3 个项目待购买", "免费项目和已购买项目不会重复加入订单。"), [action("汇总待购项目", "s13-select")]),
    page("s13-select", "选择下单项目", "勾选或移除需要统一购买的项目", UI.people([["景区门票 × 3", "8 月 23 日使用 · ¥300", "已选", "selected"], ["清明食府 3 人套餐", "8 月 23 日 12:00 · ¥240", "已选", "selected"], ["东京梦华 B 区 × 3", "8 月 23 日 19:30 · ¥747", "已选", "selected"]]) + UI.summary([["已选项目", "3 个"], ["合计", "¥1,287"]]), [action("移除餐饮项目", "s13-select-adjusted", "secondary"), action("继续确认", "s13-confirm")]),
    page("s13-select-adjusted", "选择下单项目", "保留游客删减项目后的选中状态", UI.people([["景区门票 × 3", "8 月 23 日使用 · ¥300", "已选", "selected"], ["清明食府 3 人套餐", "8 月 23 日 12:00 · ¥240", "未选", ""], ["东京梦华 B 区 × 3", "8 月 23 日 19:30 · ¥747", "已选", "selected"]]) + UI.summary([["已选项目", "2 个"], ["合计", "¥1,047"]]), [action("恢复餐饮项目", "s13-select", "secondary"), action("按当前选择继续", "s13-confirm-adjusted")]),
    page("s13-confirm-adjusted", "组合订单确认", "按删减后的项目核对各子订单", UI.summary([["门票", "3 张 · 8 月 23 日"], ["东京梦华", "B 区 3 席 · 19:30"], ["未购买", "清明食府套餐"], ["联系人", "赵敏 187****8527"], ["合计", "¥1,047"]]), [action("返回调整项目", "s13-select-adjusted", "secondary"), action("去支付", "s13-payment-adjusted")]),
    page("s13-payment-adjusted", "组合订单支付", "支付删减后的两个待购项目", UI.hero("应付 ¥1,047", "确认组合订单", "门票、东京梦华", true) + UI.cards([["微信支付", "当前账号 · 187****8527", "", true]]) + UI.summary([["订单号", "QY202608170047"], ["子订单", "2 个"], ["实付", "¥1,047"]]), [action("确认支付", "s13-synced-adjusted")]),
    page("s13-synced-adjusted", "支付成功并同步行程", "确认订单结果并保留未购买项目", UI.success("支付成功", "门票和演出子订单已生成，家庭餐继续保留待购买状态。") + UI.timeline([["09:00", "景区门票 · 已购", "done"], ["10:30", "岳飞枪挑小梁王 · 含门票", "done"], ["12:00", "清明食府套餐 · 待购买", "current"], ["19:30", "东京梦华 · 已购", "done"]]), [action("查看订单", "s14-master", "secondary"), action("继续补办家庭餐", "s13-select")], "result"),
    page("s13-confirm", "组合订单确认", "核对各子订单的使用信息", UI.summary([["门票", "3 张 · 8 月 23 日"], ["餐饮", "3 人套餐 · 12:00"], ["东京梦华", "B 区 3 席 · 19:30"], ["联系人", "赵敏 187****8527"], ["合计", "¥1,287"]]) + UI.notice("", "支付后分单", "每个项目生成独立子订单，可分别核销和按规则退款。"), [action("库存校验失败分支", "s13-stock-error", "secondary"), action("去支付", "s13-payment")]),
    page("s13-stock-error", "部分项目库存变化", "在支付前阻止失效商品并提供替代", UI.success("东京梦华 19:30 场余票不足", "门票和餐饮仍可购买；可以改为 20:45 场后继续。", true) + UI.rows([["时", "改选 20:45 场", "B 区剩余 58 席", "推荐"], ["删", "移除东京梦华", "订单减少 ¥747"]]), [action("改选20:45场", "s13-confirm-time-adjusted")], "exception"),
    page("s13-confirm-time-adjusted", "组合订单确认", "确认换场后的时间、价格和返程影响", UI.summary([["门票", "3张 · 8月23日"], ["餐饮", "3人套餐 · 12:00"], ["东京梦华", "B区3席 · 20:45"], ["返程预计", "22:30离园 · 00:20抵达郑州"], ["合计", "¥1,287"]]) + UI.notice("warn", "行程时间将同步调整", "支付后攻略、提醒和返程时间都会更新为20:45场。"), [action("返回原订单", "s13-confirm", "secondary"), action("按20:45场支付", "s13-payment-time-adjusted")]),
    page("s13-payment-time-adjusted", "组合订单支付", "支付换至20:45场后的全部待购项目", UI.hero("应付 ¥1,287", "确认组合订单", "门票、餐饮和东京梦华20:45场", true) + UI.cards([["微信支付", "当前账号 · 187****8527", "", true]]) + UI.summary([["订单号", "QY202608170048"], ["子订单", "3个"], ["实付", "¥1,287"]]), [action("确认支付", "s13-synced-time-adjusted")]),
    page("s13-synced-time-adjusted", "支付成功并同步行程", "把20:45场次和返程时间同步到攻略与行程", UI.success("支付成功，行程已换场", "3个子订单已生成，东京梦华和返程提醒已同步更新。") + UI.timeline([["09:00", "景区门票 · 已购", "done"], ["12:00", "清明食府套餐 · 已购", "done"], ["20:45", "东京梦华 · B区3席 · 已购", "done"], ["22:30", "停车缴费并返程", "current"]]), [action("查看更新后攻略", "s09-guide-adjusted", "secondary"), action("继续出发准备", "s09-pretrip-purchased")], "result"),
    page("s13-payment", "组合订单支付", "完成全部待购项目支付", UI.hero("应付 ¥1,287", "确认组合订单", "门票、餐饮和东京梦华", true) + UI.cards([["微信支付", "当前账号 · 187****8527", "", true]]) + UI.summary([["订单号", "QY202608170046"], ["子订单", "3 个"], ["实付", "¥1,287"]]), [action("确认支付", "s13-synced")]),
    page("s13-synced", "支付成功并同步行程", "确认订单结果和全部项目购买状态", UI.success("支付成功，已同步到攻略", "3个子订单已经生成，攻略和出发前任务已更新。") + UI.timeline([["09:00", "景区门票 · 已购", "done"], ["10:30", "岳飞枪挑小梁王 · 含门票", "done"], ["12:00", "清明食府套餐 · 已购", "done"], ["19:30", "东京梦华 · 已购", "done"]]), [action("查看已更新攻略", "s09-guide-purchased", "secondary"), action("继续出发准备", "s09-pretrip-purchased")], "result")
  ]),

  scene("S14", "订单服务", "订单查询与入园核销", "游客、核销人员", "从我的订单搜索或筛选目标订单", "找到子订单并出示有效凭证，完成核销", "主订单用于支付汇总，子订单用于实际履约。二维码应明确对应哪一个子订单，并在核销后立即失效。", "蓝湖订单查询、5173 MyOrders", [
    page("s14-list", "我的订单", "按订单号和状态查找订单", JourneyCommerceUI.orderList(), [action("展开支付订单", "s14-master")]),
    page("s14-master", "主订单与子订单", "查看支付汇总和各履约项目", UI.summary([["主订单号", "QY202608170046"], ["关联行程", "家庭两日宋韵之旅"], ["支付金额", "¥1,287"], ["支付时间", "2026-08-17 11:26"]]) + UI.rows([["票", "景区门票 × 3", "子订单 TKT2026081701 · 待使用", "查看凭证", "s14-suborder"], ["餐", "清明食府 3 人套餐", "子订单 FNB2026081702 · 待使用", "查看凭证", "s14-qr"], ["演", "东京梦华 B 区 × 3", "子订单 SHW2026081703 · 待使用", "查看凭证", "s14-qr"]]), [action("返回关联行程", "s09-guide-purchased", "secondary"), action("打开门票子订单", "s14-suborder")]),
    page("s14-suborder", "门票子订单详情", "查看使用人、日期、规则和核销入口", UI.summary([["子订单号", "TKT2026081701"], ["关联行程", "家庭两日宋韵之旅 · 第2天09:00"], ["商品", "景区门票 2成人 + 1儿童"], ["使用日期", "2026-08-23"], ["使用人", "赵敏、李明、小明"], ["状态", "待使用"]]) + UI.notice("", "核销说明", "本二维码仅用于该门票子订单，不包含餐饮和演出票。"), [action("返回行程节点", "s09-day2", "secondary"), action("展示核销二维码", "s14-qr")]),
    page("s14-qr", "子订单核销码", "提供给工作人员扫描的单一凭证", UI.hero("待使用", "景区门票 × 3", "子订单 TKT2026081701") + UI.qr("TKT2026081701", "请向入口工作人员出示完整二维码") + UI.notice("warn", "请勿提前转发", "二维码动态更新，截图可能失效。"), [action("返回行程节点", "s09-day2", "secondary"), action("完成核销", "s14-used")]),
    page("s14-used", "核销成功", "同步子订单状态并展示履约记录", UI.success("核销成功", "景区门票子订单已于 2026-08-23 09:03 使用。") + UI.summary([["核销数量", "3 张"], ["核销人员", "入口 02 号闸机"], ["剩余可用", "0 张"], ["订单状态", "已使用"]]) + UI.timeline([["8 月 17 日 11:26", "订单支付成功", "done"], ["8 月 23 日 09:03", "门票核销 3 张", "done"], ["8 月 23 日 12:07", "餐饮套餐待核销", "current"], ["8 月 23 日 19:30", "东京梦华待入场", ""]]), [action("查看行程下一站", "s09-inpark", "secondary"), action("返回关联攻略", "s09-guide-purchased")], "result"),
    page("s14-invalid", "凭证已失效", "阻止重复核销并展示原核销记录", UI.success("该凭证已使用", "核销时间：2026-08-23 09:03；如有疑问请联系现场客服。", true) + UI.summary([["子订单", "TKT2026081701"], ["已核销", "3 / 3 张"], ["处理入口", "联系游客服务中心"]]), [action("返回核销记录", "s14-used")], "exception")
  ]),

  scene("S15", "售后服务", "订单退款", "游客", "在已支付子订单中点击申请退款", "提交退款申请并查看处理中或到账结果", "退款按子订单和实际使用人申请，不影响主订单中的其他项目；不可退时必须明确原因和规则。", "蓝湖售后与退票、5173 MyOrders 退款弹窗", [
    page("s15-order", "选择退款子订单", "只对可退款的项目展示操作", JourneyCommerceUI.refundList(), [action("申请门票退款", "s15-select")]),
    page("s15-select", "选择退款人员", "按实名出行人选择退款数量", UI.people([["赵敏", "成人票 · ¥120", "已选", "selected"], ["李明", "成人票 · ¥120", "已选", "selected"], ["小明", "儿童票 · ¥60", "选择", ""]]) + UI.summary([["退款数量", "2 张"], ["预计退款", "¥240"], ["剩余可用", "儿童票 1 张"]]), [action("下一步", "s15-reason")]),
    page("s15-reason", "填写退款原因", "选择原因并核对到账方式", UI.form([["退款原因", "行程变化"], ["补充说明", "两名成人无法按计划出行", "textarea"], ["退款金额", "¥240"], ["退款方式", "原支付路径"]]) + UI.notice("warn", "提交后不可撤回", "预计 3—7 个工作日到账。"), [action("查看不可退分支", "s15-not-refundable", "secondary"), action("提交退款申请", "s15-processing")]),
    page("s15-not-refundable", "当前不可退款", "明确规则限制并提供人工咨询入口", UI.success("东京梦华订单已超过可退时间", "距开演不足 2 小时，当前订单不支持线上退款。", true) + UI.summary([["演出场次", "2026-08-23 19:30"], ["退改截止", "开演前 4 小时"], ["当前时间", "17:42"], ["人工客服", "0371-25668895"]]), [action("拨打人工客服", "", "secondary", { toast: "正在呼叫游客服务中心" }), action("返回选择其他订单", "s15-order")], "exception"),
    page("s15-processing", "退款处理中", "记录申请时间、金额和预计到账时间", UI.success("退款申请已提交", "正在按原支付路径处理，预计 3—7 个工作日到账。") + UI.timeline([["8 月 17 日 11:48", "退款申请已提交 · ¥240", "done"], ["8 月 17 日 11:49", "系统校验通过", "done"], ["预计 8 月 24 日前", "原支付渠道处理", "current"]]), [action("查看到账结果", "s15-success")], "result"),
    page("s15-success", "退款成功", "确认到账金额和订单剩余权益", UI.success("退款成功", "¥240 已退回微信支付账户。") + UI.summary([["退款单号", "RF202608170019"], ["到账时间", "2026-08-18 09:12"], ["主订单状态", "部分退款"], ["赵敏成人票", "已退款"], ["李明成人票", "已退款"], ["小明儿童票", "待使用"]]), [action("完成本场景", "", "primary", { toast: "订单退款场景已完成" })], "result")
  ]),

  scene("S16", "游中服务", "园区地图、POI 与路线导航", "游客", "点击园区导览或从行程进入地图", "找到目标点并完成步行导航；目标关闭时切换替代点", "地图服务覆盖搜索、分类、点位详情、路线和到达状态。临时关闭或道路绕行应在路径中及时提示。", "蓝湖园区导览、5173 ParkGuide、PoiDetail", [
    page("s16-map", "园区导览地图", "查看当前位置、景点和服务点", UI.map() + UI.chips(["景点", "演出", "餐饮", "卫生间", "服务"], 0) + UI.notice("", "当前位置", "虹桥东侧 · 定位精度约 12 米。"), [action("搜索东京梦华剧场", "s16-search")]),
    page("s16-search", "地图搜索", "输入关键词并查看分类结果", UI.map("东京梦华", false) + UI.rows([["剧", "东京梦华剧场", "距你 860 米 · 步行约 12 分钟", "查看"], ["演", "大宋·东京梦华", "今日 19:30 / 20:45", "节目"], ["服", "剧场游客服务点", "距剧场入口 60 米", "查看"]]), [action("打开剧场点位", "s16-poi")]),
    page("s16-poi", "POI 详情", "查看地点介绍、开放状态和服务信息", UI.hero("剧场", "东京梦华剧场", "今日开放 · 距你 860 米") + UI.summary([["开放时间", "18:30—22:00"], ["当前拥挤度", "适中"], ["最近场次", "19:30"], ["建议到达", "开演前 30 分钟"]]) + UI.rows([["卫", "最近卫生间", "剧场西侧 80 米"], ["服", "游客服务点", "入口右侧"]]), [action("开始步行导航", "s16-route")]),
    page("s16-route", "路线预览", "确认距离、预计时间和绕行信息", UI.map("虹桥 → 东京梦华剧场", true) + UI.summary([["步行距离", "860 米"], ["预计用时", "12 分钟"], ["路线", "汴河东岸—九龙桥—剧场"], ["路况", "九龙桥北侧临时绕行"]]) + UI.notice("warn", "路线已调整", "已自动避开 14:00—16:00 临时封闭区域。"), [action("开始导航", "s16-navigation")]),
    page("s16-navigation", "步行导航中", "提供下一步方向和剩余距离", UI.map("向前 120 米后右转", true) + UI.hero("步行导航", "剩余 520 米 · 7 分钟", "沿汴河东岸直行，在九龙桥前右转。", true) + UI.notice("", "下一步", "前方 120 米右转，进入剧场通道。"), [action("查看临时关闭状态", "s16-closed", "secondary"), action("继续到达", "s16-arrived")]),
    page("s16-closed", "目标临时关闭", "在点位不可用时推荐附近替代目标", UI.success("剧场游客服务点临时关闭", "东京梦华剧场正常开放；如需咨询，可前往北苑游客中心。", true) + UI.rows([["服", "北苑游客中心", "距当前位置 310 米", "导航"], ["电", "电话咨询", "0371-25668895", "拨打"]]), [action("导航到替代服务点", "s16-route")], "exception"),
    page("s16-arrived", "已到达", "结束导航并展示入场操作", UI.success("已到达东京梦华剧场", "入口在前方 30 米，请提前准备订单二维码或身份证。") + UI.rows([["票", "打开演出订单", "B 区 10 排 8—10 座"], ["提", "设置开演提醒", "开演前 20 分钟"]]), [action("完成本场景", "", "primary", { toast: "园区地图与导航场景已完成" })], "result")
  ]),

  scene("S17", "游中服务", "配套设施查找", "游客", "首页配套服务、AI 提问或地图分类", "找到卫生间、母婴室、餐饮、医疗或寄存服务点", "游客通常从具体需求出发。结果要按距离、开放状态和无障碍条件排序，并可直接导航。", "蓝湖配套服务、5173 ServiceTabs 与 ParkGuide", [
    page("s17-categories", "配套服务", "按游客当前需求选择设施类型", VisitorServiceUI.facilities(), [action("查找卫生间", "s17-results")]),
    page("s17-results", "附近卫生间", "按距离和设施条件排列结果", UI.map("附近卫生间", false) + UI.rows([["厕", "虹桥东侧卫生间", "180 米 · 开放 · 无障碍", "3 分钟"], ["厕", "东京食坊卫生间", "260 米 · 开放 · 有母婴台", "4 分钟"], ["厕", "孙羊正店卫生间", "420 米 · 临时维护", "不可用"]]), [action("查看最近点位", "s17-detail")]),
    page("s17-detail", "设施点位详情", "查看开放状态、方向和设施能力", UI.hero("开放中", "虹桥东侧卫生间", "距你 180 米 · 步行约 3 分钟", true) + UI.summary([["开放时间", "08:30—21:30"], ["无障碍厕位", "有"], ["第三卫生间", "有"], ["母婴护理台", "无"], ["最近入口", "虹桥东侧 40 米"]]), [action("开始导航", "s17-navigation")]),
    page("s17-navigation", "设施导航", "将用户带到最近可用设施", UI.map("前方 60 米右转", true) + UI.notice("", "剩余 120 米", "沿主路直行，在虹桥东侧服务标识处右转。"), [action("查看关闭分支", "s17-closed", "secondary"), action("到达设施", "s17-arrived")]),
    page("s17-closed", "设施临时关闭", "展示维护原因和最近替代设施", UI.success("孙羊正店卫生间维护中", "预计 15:30 恢复，已为你推荐东京食坊卫生间。", true) + UI.summary([["替代点", "东京食坊卫生间"], ["距离", "220 米"], ["设施", "无障碍厕位、母婴护理台"]]), [action("导航到替代点", "s17-navigation")], "exception"),
    page("s17-arrived", "已到达服务点", "结束导航并允许查找其他服务", UI.success("已到达虹桥东侧卫生间", "入口位于主路右侧，现场有明显指引标识。") + UI.rows([["婴", "继续查找母婴室", "最近 260 米"], ["医", "查找医疗点", "最近 430 米"]]), [action("完成本场景", "", "primary", { toast: "配套设施查找场景已完成" })], "result")
  ]),

  scene("S18", "交通服务", "到园交通与停车", "自驾或公共交通游客", "点击交通出行或在行程中查看抵达方案", "获得到园路线、停车场实时状态和满位替代方案", "交通页先区分交通方式。自驾场景要把停车场空位、费用、入口距离和替代停车场连起来。", "蓝湖交通出行、5173 行程停车推荐", [
    page("s18-mode", "交通出行", "选择出发位置和交通方式", VisitorServiceUI.transport(), [action("生成自驾方案", "s18-routes")]),
    page("s18-routes", "抵达路线方案", "对比时间、费用和入口位置", UI.cards([["推荐 · 连霍高速—东京大道", "约 42 分钟 · 36 公里 · 拥堵较少", "过路费约 ¥15", true], ["备选 · 郑开大道—金明大道", "约 51 分钟 · 32 公里 · 红绿灯较多", "无过路费"]]) + UI.notice("", "停车建议", "优先导航至迎宾门停车场，当前剩余 286 个车位。"), [action("查看停车场", "s18-parking")]),
    page("s18-parking", "停车场状态", "按空位、入口距离和费用比较停车场", UI.cards([["迎宾门停车场", "剩余 286 / 800 · 距入口 180 米", "¥10/天", true], ["金水门停车场", "剩余 42 / 320 · 距入口 260 米", "¥10/天"], ["端门停车场", "剩余 0 / 210 · 已满", "¥10/天"]]) + UI.notice("warn", "周末 09:30 后车位紧张", "建议提前到达，空位数据以停车场入口为准。"), [action("查看迎宾门停车场", "s18-detail")]),
    page("s18-detail", "停车场详情", "查看入口、费用、服务和步行路线", UI.map("迎宾门停车场", true) + UI.summary([["当前空位", "286 个"], ["收费标准", "小型车 ¥10/天"], ["充电车位", "18 个 · 剩余 6 个"], ["入口距离", "步行 180 米"], ["开放时间", "07:30—22:30"]]), [action("开始导航", "s18-navigation")]),
    page("s18-navigation", "驾车导航", "导航到停车场入口并持续更新状态", UI.map("前方 1.2 公里右转", true) + UI.hero("预计 08:24 到达", "剩余 6.8 公里 · 14 分钟", "迎宾门停车场剩余 214 个车位。", true), [action("查看满位状态", "s18-full", "secondary"), action("到达停车场", "s18-arrived")]),
    page("s18-full", "停车场已满", "在导航途中自动推荐替代停车场", UI.success("迎宾门停车场已满", "已为你找到金水门停车场，增加车程约 6 分钟。", true) + UI.summary([["替代停车场", "金水门停车场"], ["剩余车位", "37 个"], ["距入口", "260 米"], ["路线变化", "+2.1 公里 / +6 分钟"]]), [action("切换替代停车场", "s18-navigation")], "exception"),
    page("s18-arrived", "到达停车场", "记录停车位置并提供步行入园路线", UI.success("已到达迎宾门停车场", "建议记录 B2 区 36 号车位，步行约 3 分钟到迎宾门。") + UI.summary([["停车位置", "B2 区 36 号"], ["入园入口", "迎宾门"], ["步行距离", "180 米"], ["返程提醒", "闭园前 30 分钟"]]), [action("完成本场景", "", "primary", { toast: "到园交通与停车场景已完成" })], "result")
  ]),

  scene("S19", "安全服务", "安全与应急求助", "游客、客服、安保", "遇到人员走失、身体不适、设施意外或财物遗失", "完成指引、位置共享、人工受理和处置反馈", "紧急场景先提供立即可执行的指引，再收集最少必要信息；涉及生命安全时直接拨打 120 或 110。", "蓝湖安全与应急知识、配套服务医疗点", [
    page("s19-entry", "安全与应急", "快速选择事件类型并展示紧急电话", VisitorServiceUI.emergency(), [action("同行儿童走失", "s19-guide")]),
    page("s19-guide", "人员走失指引", "先稳定现场并收集必要描述与照片", UI.notice("error", "请留在最后见面地点附近", "不要多人分散寻找；立即联系最近工作人员或园区安保。") + UI.form([["走失人员", "儿童 · 男 · 8 岁"], ["最后见面地点", "虹桥东侧"], ["走失时间", "约 10 分钟前"], ["衣着特征", "黄色上衣、蓝色短裤", "textarea"]]) + UI.upload([["近期照片", "已上传 · 正面清晰", "ok"]]), [action("直接拨打园区安保", "", "secondary", { toast: "正在呼叫园区安保" }), action("确认当前位置", "s19-location")]),
    page("s19-location", "确认求助位置", "共享当前位置并允许修正", UI.map("当前位置：虹桥东侧", false) + UI.summary([["定位结果", "虹桥东侧主路"], ["定位精度", "约 12 米"], ["联系电话", "187****8527"], ["现场情况", "游客留在原地等待"]]), [action("提交园区求助", "s19-processing")]),
    page("s19-processing", "应急处理中", "展示受理编号、工作人员位置和处理记录", UI.summary([["求助编号", "EM20260817008"], ["负责人员", "安保 07 号 · 陈浩"], ["联系电话", "0371-25668895"], ["预计到达", "3 分钟"]]) + UI.timeline([["11:06", "游客提交儿童走失求助", "done"], ["11:07", "安保 07 号已接单", "done"], ["11:09", "广播与周边岗亭同步查找", "current"], ["11:11", "工作人员正在前往游客位置", ""]]), [action("查看定位失败状态", "s19-location-fail", "secondary"), action("查看处置结果", "s19-result")]),
    page("s19-location-fail", "定位信息不足", "在定位精度不足时要求选择明显地标", UI.success("暂时无法准确定位", "请从附近地标中选择一个，或直接拨打园区救援电话。", true) + UI.rows([["桥", "虹桥东侧石碑", "约 30 米"], ["食", "东京食坊入口", "约 80 米"], ["电", "拨打园区救援电话", "0371-25668895"]]), [action("选择虹桥东侧石碑", "s19-location")], "exception"),
    page("s19-result", "应急处置完成", "记录找到人员和交接结果", UI.success("已找到走失儿童", "11:16 在东京食坊入口找到，已由安保陪同返回虹桥东侧并完成身份核对。") + UI.summary([["完成时间", "2026-08-17 11:19"], ["处置人员", "安保 07 号 · 陈浩"], ["交接结果", "已交还监护人"], ["后续建议", "为儿童佩戴联系卡"]]), [action("完成本场景", "", "primary", { toast: "安全与应急求助场景已完成" })], "result")
  ]),

  scene("S20", "游客服务", "投诉工单完整闭环", "游客、客服、处理部门", "游客选择由后台维护的投诉类目并提交本人入园记录", "客服统一受理；同人同类历史完结工单先复核；能处理则直接完结，不能处理再转派", "投诉类目由后台统一维护。每条投诉必须关联门票或购买记录；同一游客再次提交同类已完结问题时进入冷处理复核，不自动拒绝。", "qingyuan-ai-html 投诉游客端与工单后台", [
    page("s20-types", "选择投诉类目", "从后台启用的类目中选择本次问题", S20UI.categories(), [action("继续", "s20-entry-record")]),
    page("s20-entry-record", "选择入园记录", "关联本人门票或购买记录后再填写投诉", S20UI.entryRecord(), [action("演示缺少记录", "s20-entry-missing", "secondary"), action("继续填写投诉", "s20-materials")]),
    page("s20-entry-missing", "缺少入园记录", "没有门票或购买记录时阻止继续提交", S20UI.entryRecord(true), [action("返回选择入园记录", "s20-entry-record")], "exception"),
    page("s20-materials", "填写投诉与上传材料", "在已核验入园记录的基础上填写问题和相关材料", S20UI.materials(), [action("开始材料检查", "s20-checking")]),
    page("s20-checking", "材料检查中", "同时检查入园记录、类目规则、图片有效性和必填内容", S20UI.checking(), [action("查看无效材料状态", "s20-invalid", "secondary"), action("检查完成", "s20-recognized")]),
    page("s20-invalid", "材料无法识别", "指出具体问题并阻止提交", UI.upload([["消费小票", "图片模糊，金额无法辨认", "fail"], ["菜单/标价照片", "有效", "ok"]]) + UI.notice("error", "还不能提交", "请重新上传一张能看清商户、时间和实付金额的消费小票。") + UI.summary([["已识别", "菜单标价 ¥76"], ["缺少", "消费小票实付金额"]]), [action("重新上传清晰小票", "s20-checking")], "exception"),
    page("s20-recognized", "材料有效并已识别", "核对入园记录和从材料中识别出的字段", S20UI.recognized(), [action("返回重传", "s20-materials", "secondary"), action("核对投诉内容", "s20-confirm")]),
    page("s20-confirm", "投诉确认", "提交前统一核对问题、诉求、入园记录和材料", S20UI.confirm(), [action("返回修改", "s20-materials", "secondary"), action("演示同类重复提交", "s20-c-cold", "secondary"), action("确认提交", "s20-c-detail")]),
    page("s20-c-detail", "我的投诉详情", "提交后查看工单编号、状态和处理进度", UI.success("投诉已提交", "工单已进入客服待受理队列。") + UI.progress(["已提交", "已受理", "处理中", "已完成"], 0) + UI.summary([["工单编号", "QY20260817052"], ["投诉类目", "消费价格"], ["入园记录", "日间票 · 已核验"], ["当前状态", "待受理"], ["当前部门", "客服组"]]) + UI.timeline([["12:32", "游客提交投诉 · 入园记录和材料完整", "done"], ["等待客服受理", "客服判断直接处理或转派", "current"]]), [action("切换到工单后台", "s20-admin-list")], "result"),
    page("s20-c-cold", "重复问题已提交", "同人同类历史工单已完结时仍接收提交并进入复核", S20UI.coldSubmission(), [action("查看后台复核", "s20-admin-cold")], "result"),
    adminPage("s20-admin-list", "工单列表", "客服从统一待受理队列查看普通和冷处理工单", UI.adminTable([["QY20260817061", "消费价格", "赵女士", "待受理", "已核验", "客服组", "未分配", "普通", "2026-08-20 09:18", "复核", "red", "冷处理"], ["QY20260817052", "消费价格", "赵女士", "待受理", "已核验", "客服组", "未分配", "普通", "2026-08-17 12:32", "查看  受理", "", "正常"], ["QY20260814002", "票务纠纷", "李先生", "待补充", "已核验", "客服组", "王芳", "普通", "2026-08-14 15:08", "查看", "red", "正常"], ["QY20260814003", "服务态度", "周女士", "已完成", "已核验", "客服组", "王芳", "普通", "2026-08-14 09:26", "查看", "green", "正常"]]), [action("查看新工单", "s20-admin-view")]),
    adminPage("s20-admin-categories", "工单类目管理", "创建并查看游客端可选择的投诉类目", S20UI.adminCategories(), [], "normal", { adminSection: "categories" }),
    adminPage("s20-admin-cold", "冷处理复核", "对照同人同类历史完结工单并决定后续处理", S20UI.adminCold(), [action("维持冷处理", "s20-admin-cold", "secondary", { modal: { title: "维持冷处理", note: "请记录本次复核依据，工单继续保留在冷处理队列。", fields: [["复核意见", "本次材料与历史工单一致，暂不重复处理"], ["复核人", "王芳"]], confirm: "确认维持" } }), action("解除冷处理并受理", "s20-admin-processing", "primary", { modal: { title: "解除冷处理并受理", note: "本次包含新的入园和消费记录，确认恢复正常处理。", fields: [["处理人", "王芳"], ["复核意见", "本次为新的消费记录，恢复正常受理"]], confirm: "确认受理" } })], "exception"),
    adminPage("s20-admin-view", "查看工单", "客服核对游客描述、入园记录、材料和处理轨迹后决定是否受理", UI.adminDetail([["投诉内容", [["投诉类目", "消费价格"], ["问题摘要", "菜单标价 ¥76，实际支付 ¥88"], ["游客诉求", "退还差额并核实标价"], ["联系方式", "158****3115"]]], ["入园记录", [["记录类型", "清明上河园日间票"], ["订单编号", "QY202608170026"], ["核验状态", "8月17日已核销"], ["实名游客", "赵女士"]]], ["材料检查", [["消费小票", "有效 · 实付 ¥88"], ["菜单照片", "有效 · 标价 ¥76"], ["材料状态", "完整"], ["建议处理方向", "核实商户价签"]]], ["当前分配", [["当前部门", "客服组"], ["当前处理人", "未分配"], ["优先级", "普通"], ["当前状态", "待受理"]]], ["处理轨迹", [["12:32", "游客提交投诉"], ["待处理", "等待客服受理"]]]]), [action("客服受理", "s20-admin-processing", "primary", { modal: { title: "受理工单", note: "确认由客服组受理并开始核实。受理后才能转派、驳回或完结。", fields: [["处理人", "王芳"], ["受理意见", "入园记录和材料完整，进入客服核实"]], confirm: "确认受理" } })]),
    adminPage("s20-admin-processing", "客服处理中", "客服受理后先核实，能处理则直接完结，需要协同时再转派", UI.adminDetail([["工单状态", [["当前状态", "处理中"], ["当前部门", "客服组"], ["处理人", "王芳"], ["受理意见", "材料完整，进入客服核实"]]], ["核实记录", [["12:40", "已联系游客确认消费项目"], ["12:46", "商户反馈需现场核对"], ["当前判断", "可补充材料、驳回、转派或直接完结"]]], ["可用操作", [["退回补充", "现有材料无法继续核实"], ["驳回", "核实后确认是误会或事实不成立"], ["转派", "需要其他部门继续处理"], ["完结", "客服已经解决并可反馈结果"]]], ["处理轨迹", [["12:32", "游客提交"], ["12:36", "客服王芳受理"], ["12:40", "开始核实"]]]]), [action("退回补充材料", "s20-admin-needs-more", "secondary", { modal: { title: "退回补充材料", note: "请明确告诉游客缺少什么，提交后工单进入待补充。", fields: [["退回原因", "现有小票未展示具体消费项目，无法核对 12 元差额来源"], ["需要补充", "支付记录或包含商品明细的完整消费小票"]], confirm: "确认退回" } }), action("驳回分支", "s20-admin-rejected", "danger", { modal: { title: "驳回工单", note: "仅在投诉为误会、事实不成立或不属于景区责任时使用。", fields: [["驳回原因", "经核实，实际支付包含游客另购饮品，菜单价格与结算一致"]], confirm: "确认驳回" } }), action("转派商务部", "s20-admin-transferred", "secondary", { modal: { title: "转派工单", note: "客服已经受理，转派后工单继续保持处理中。", fields: [["目标部门", "商务部"], ["处理人", "张敏"], ["转派原因", "需核实商户现场标价和收款记录"]], confirm: "确认转派" } }), action("客服直接完结", "s20-admin-completed", "primary", { modal: { title: "完结工单", note: "处理结果将同步给游客。", fields: [["游客可见结果", "已核实价格并向游客说明，商户已完成现场价签检查"], ["内部备注", "客服直接收口"]], confirm: "确认完结" } })]),
    adminPage("s20-admin-needs-more", "工单待补充", "客服退回后记录原因和具体材料要求", UI.adminDetail([["当前状态", [["工单状态", "待补充"], ["当前部门", "客服组"], ["处理人", "王芳"], ["更新时间", "2026-08-17 12:48"]]], ["退回要求", [["退回原因", "小票没有展示消费明细"], ["需要补充", "支付记录或完整消费明细小票"], ["游客可见", "是"]]], ["处理轨迹", [["12:36", "客服王芳受理"], ["12:48", "退回游客补充材料"]]]]), [action("查看游客补充入口", "s20-c-supplement")], "exception"),
    page("s20-c-supplement", "补充投诉材料", "向游客展示退回原因并只补充指定材料", UI.progress(["已提交", "已受理", "待补充", "处理中"], 2) + UI.notice("error", "需要补充材料", "现有小票没有展示消费明细，暂时无法核对 12 元差额来源。") + UI.summary([["需要补充", "支付记录或包含商品明细的完整消费小票"], ["处理人员", "客服组 · 王芳"], ["补充期限", "请于 7 日内完成"]]) + UI.upload([["微信支付记录", "已上传 · ¥88", "ok"], ["完整消费小票", "已上传 · 含商品明细", "ok"]]), [action("提交补充材料", "s20-c-resubmitted")], "exception"),
    page("s20-c-resubmitted", "补充材料已提交", "补充完成后恢复客服处理并保留原工单编号", UI.success("材料已补充", "工单已恢复处理中，客服会继续核实。") + UI.summary([["工单编号", "QY20260817052"], ["当前状态", "处理中"], ["当前部门", "客服组"], ["新增材料", "支付记录、完整消费小票"]]) + UI.timeline([["12:48", "客服退回补充", "done"], ["13:02", "游客补充材料", "done"], ["13:03", "恢复客服处理", "current"]]), [action("返回客服处理", "s20-admin-processing")], "result"),
    adminPage("s20-admin-transferred", "工单已转派", "客服无法处理时转派到对应部门和具体处理人", UI.adminDetail([["当前分配", [["当前状态", "处理中"], ["当前部门", "商务部"], ["处理人", "张敏"], ["转派人", "客服王芳"]]], ["转派原因", [["原因", "需核实商户现场标价和收款记录"], ["转派时间", "2026-08-17 12:48"]]], ["处理要求", [["现场核查", "菜单、价签和收款记录"], ["游客诉求", "退还差额并核实标价"]]], ["轨迹", [["12:36", "客服受理"], ["12:48", "客服转派商务部张敏"]]]]), [action("添加处理记录", "s20-admin-transferred", "secondary", { modal: { title: "添加处理记录", note: "记录本次核实动作，游客端只展示可见内容。", fields: [["处理记录", "已到孙记小吃核对菜单、价签和收款记录"], ["游客可见", "是"]], confirm: "保存记录" } }), action("商务部处理并完结", "s20-admin-completed", "primary", { modal: { title: "完结工单", note: "填写游客可见处理结果。", fields: [["游客可见结果", "经核实，菜单标价 76 元、实际收款 88 元，已退还差额 12 元并要求商户统一价签"], ["内部备注", "商户已于 13:20 完成整改"]], confirm: "确认完结" } })], "normal", { role: "商务部" }),
    adminPage("s20-admin-rejected", "工单已驳回", "记录投诉不成立原因并同步游客端", UI.success("工单已驳回", "驳回原因已写入处理轨迹并同步给游客。", true) + UI.adminDetail([["驳回信息", [["状态", "已驳回"], ["处理部门", "客服组"], ["处理人", "王芳"], ["驳回时间", "2026-08-17 12:51"]]], ["游客可见原因", [["核实结果", "实际支付包含游客另购饮品，菜单价格与结算一致"], ["后续入口", "游客可查看详情，不开放满意度评价"]]]]), [action("查看游客端驳回结果", "s20-c-rejected")], "exception"),
    page("s20-c-rejected", "游客端驳回结果", "展示完整轨迹和清晰驳回原因", UI.progress(["已提交", "已受理", "核实处理", "已驳回"], 3) + UI.notice("error", "投诉未成立", "经核实，实际支付包含另购饮品，菜单价格与结算一致。") + UI.timeline([["12:32", "游客提交投诉", "done"], ["12:36", "客服王芳受理", "done"], ["12:40", "核对消费项目与商户记录", "done"], ["12:51", "工单已驳回", "current"]]), [action("完成驳回分支", "", "primary", { toast: "投诉驳回分支已完成" })], "exception"),
    adminPage("s20-admin-completed", "工单已完结", "保存处理结论并同步游客端", UI.success("工单已完成", "处理结果已同步游客端，等待游客查看和评价。") + UI.adminDetail([["处理结果", [["结论", "商户实际多收 12 元"], ["退款", "已退还差额 ¥12"], ["整改", "统一菜单和现场价签"], ["完成部门", "商务部 · 张敏"]]], ["完整轨迹", [["12:32", "游客提交"], ["12:36", "客服受理"], ["12:48", "转派商务部"], ["13:25", "商务部完结"]]]]), [action("查看游客端结果", "s20-c-result")], "result"),
    page("s20-c-result", "游客端处理结果", "向游客展示结论、金额和完整进度", UI.progress(["已提交", "已受理", "处理中", "已完成"], 3) + UI.notice("success", "处理完成", "经核实，商户菜单标价为 76 元、实际收款 88 元，已退还差额 12 元，并要求商户统一现场标价。") + UI.summary([["退款金额", "¥12"], ["处理部门", "商务部"], ["完成时间", "2026-08-17 13:25"], ["工单编号", "QY20260817052"]]), [action("评价处理结果", "s20-rating")], "result"),
    page("s20-rating", "满意度评价", "完成投诉闭环并收集游客意见", UI.rating(5) + UI.chips(["响应及时", "结果清楚", "处理有效", "沟通友好"], [0, 1, 2]) + UI.form([["补充意见", "差额已收到，希望加强商户价签检查", "textarea"]]), [action("返回处理结果", "s20-c-result", "secondary"), action("提交评价", "s20-c-result", "primary", { toast: "评价已提交" })])
  ]),

  scene("S21", "游客服务", "提交普通建议", "游客", "投诉与建议首页选择“提交建议”", "建议直接提交，不进入投诉材料和工单核实流程", "建议表单保持简洁，仅包含类型、内容和联系方式；不要求上传材料，也不展示内部流转。", "qingyuan-ai-html 提交建议", [
    page("s21-entry", "投诉与建议", "区分投诉、建议和历史记录", VisitorServiceUI.feedbackEntry(), [action("提交建议", "s21-form")]),
    page("s21-form", "填写建议", "填写建议类型、内容和联系方式后直接提交", VisitorServiceUI.suggestionForm(), [action("演示必填校验", "s21-form", "secondary", { toast: "请填写建议内容" }), action("提交建议", "s21-success")]),
    page("s21-success", "建议提交成功", "明确建议已收到并结束流程", UI.success("感谢你的建议", "我们已收到建议内容，将用于改善游览服务。") + UI.summary([["建议编号", "SG20260817018"], ["提交时间", "2026-08-17 14:02"]]), [action("完成本场景", "", "primary", { toast: "普通建议场景已完成" })], "result")
  ]),

  scene("S22", "游后服务", "游览问卷与订单评价", "游客", "行程结束、订单已使用或首页问卷入口", "完成评分、标签和意见提交", "评价可以从已使用订单关联具体服务；游览问卷则覆盖整体体验。必填项缺失时要明确定位问题。", "蓝湖游览问卷、5173 SurveyForm 与订单评价", [
    page("s22-entry", "本次游览反馈", "选择评价整体游览或具体订单", VisitorServiceUI.surveyEntry(), [action("填写游览问卷", "s22-rating")]),
    page("s22-rating", "总体评分", "先收集整体满意度和推荐意愿", UI.form([["游览日期", "2026-08-23"], ["同行类型", "家庭亲子"]]) + UI.section("总体满意度", UI.rating(5)) + UI.section("推荐给朋友的意愿", UI.chips(["非常愿意", "愿意", "一般", "不愿意"], 0)), [action("下一步", "s22-details")]),
    page("s22-details", "分项评价", "评价节目、环境、服务和设施", UI.ratingRows([["节目体验", 5], ["环境卫生", 5], ["工作人员服务", 4], ["餐饮体验", 4], ["导览清晰度", 5]]) + UI.chips(["节目精彩", "路线清晰", "环境整洁", "亲子友好", "排队较久"], [0, 1, 2, 3]) + UI.form([["补充意见", "东京梦华很精彩，希望热门演出入口增加遮阳区", "textarea"]]), [action("演示必填校验", "s22-details", "secondary", { toast: "请完成总体满意度" }), action("提交问卷", "s22-success")]),
    page("s22-success", "问卷提交成功", "确认问卷结果已记录", UI.success("感谢参与", "游览问卷已提交，感谢你帮助我们改进体验。") + UI.summary([["问卷编号", "SV20260823086"], ["总体评分", "5 星"], ["提交时间", "2026-08-23 21:36"]]), [action("查看订单评价入口", "s22-order-rating")], "result"),
    page("s22-order-rating", "订单评价", "把反馈关联到具体履约订单", UI.hero("已使用订单", "评价大宋·东京梦华", "2026-08-23 20:45 · B 区 10 排") + UI.rating(5) + UI.chips(["演出精彩", "入场顺畅", "座位视野好", "音效震撼"], [0, 1, 2, 3]) + UI.form([["补充评价", "整体体验很好，入场指引清晰", "textarea"]]), [action("完成本场景", "", "primary", { toast: "游览问卷与订单评价场景已完成" })], "result")
  ]),

  scene("S23", "账户服务", "常用出行人与学生认证", "游客", "我的—常用出行人，或购票时选择出行人", "新增、识别、修正、认证并选中实名出行人", "出行人支持 OCR、手动填写和批量录入。OCR 失败后可直接改为手填；学生票资格独立认证。", "5173 Travelers、TravelerAdd、StudentVerify", [
    page("s23-list", "常用出行人", "查看、选择、编辑、删除和新增实名信息", VisitorServiceUI.travelers(), [action("添加出行人", "s23-method")]),
    page("s23-edit", "编辑出行人", "修改联系方式和证件有效信息", UI.form([["姓名", "赵敏"], ["证件类型", "居民身份证"], ["证件号码", "410***********5127"], ["出生日期", "1988-03-12"], ["手机号", "187****8527"]]), [action("取消", "s23-list", "secondary"), action("保存修改", "s23-list")]),
    page("s23-method", "添加出行人", "选择拍证件、手动填写、批量录入或邀请填写", VisitorServiceUI.travelerMethods(), [action("拍身份证", "s23-upload")]),
    page("s23-upload", "拍身份证添加", "上传清晰的证件人像面", UI.upload([["身份证人像面", "点击上传或拍照", ""], ["证件示例", "四角完整、文字清晰", "ok"]]), [action("返回添加方式", "s23-method", "secondary"), action("开始识别", "s23-recognized")]),
    page("s23-recognized", "核对识别结果", "允许修改识别出的实名字段", UI.form([["姓名", "王晓明"], ["证件类型", "居民身份证"], ["证件号码", "410***********3128"], ["出生日期", "2014-05-16"], ["手机号", "187****7128"]]), [action("查看识别失败状态", "s23-failed", "secondary"), action("保存出行人", "s23-saved")]),
    page("s23-failed", "证件无法识别", "给出具体问题并允许转为手动填写", UI.upload([["身份证人像面", "反光严重，证件号码不完整", "fail"]]) + UI.notice("error", "未能识别证件", "请重新拍摄，或直接切换到手动填写。") + UI.rows([["拍", "重新拍摄", "保持证件平整、避免反光"], ["填", "手动填写", "保留已输入的手机号"]]), [action("切换手动填写", "s23-manual")], "exception"),
    page("s23-manual", "手动填写出行人", "不依赖证件识别，完整录入实名信息", UI.form([["姓名", "王晓明"], ["证件类型", "居民身份证"], ["证件号码", "410***********3128"], ["出生日期", "2014-05-16"], ["手机号", "187****7128"]]), [action("返回添加方式", "s23-method", "secondary"), action("保存出行人", "s23-saved")]),
    page("s23-batch", "批量录入出行人", "一次填写多位同行人的实名信息", UI.section("出行人 1", UI.form([["姓名", "王晓明"], ["证件号码", "410***********3128"]])) + UI.section("出行人 2", UI.form([["姓名", "刘雨"], ["证件号码", "410***********5266"]])) + UI.rows([["＋", "继续添加一位", "最多 10 人"]]), [action("返回添加方式", "s23-method", "secondary"), action("保存 2 位出行人", "s23-final")]),
    page("s23-invite", "邀请本人填写", "生成链接，由同行人自行确认实名信息", UI.form([["邀请对象", "刘女士"], ["手机号", "136****8921"], ["有效时间", "24 小时"]]) + UI.summary([["填写内容", "姓名、证件类型、证件号码"], ["提交后", "自动加入常用出行人"]]), [action("返回添加方式", "s23-method", "secondary"), action("发送邀请", "s23-invited")]),
    page("s23-invited", "邀请已发送", "等待同行人完成实名信息", UI.success("邀请已发送", "刘女士完成填写后会自动出现在常用出行人列表。") + UI.summary([["邀请状态", "待填写"], ["有效期至", "明天 14:30"], ["接收手机", "136****8921"]]), [action("返回出行人列表", "s23-list")], "result"),
    page("s23-saved", "出行人已保存", "返回列表并提示可进行学生认证", UI.success("已添加王晓明", "出行人信息已保存，可以用于购票。") + UI.summary([["年龄", "12 岁"], ["默认票型", "儿童/学生票待核验"], ["学生认证", "未完成"]]), [action("去学生认证", "s23-student")], "result"),
    page("s23-student", "学生认证", "补充学校、学号和学生证材料", UI.form([["学生姓名", "王晓明"], ["学校名称", "开封市实验小学"], ["学号", "20250129"], ["证件有效期", "2027-07-31"]]) + UI.upload([["学生证照片", "已上传", "ok"], ["学籍证明", "选填", ""]]), [action("提交认证", "s23-final", "primary", { toast: "学生认证已通过" })]),
    page("s23-final", "出行人列表已更新", "在购票时选择已经完成实名校验的出行人", UI.people([["赵敏", "成人", "选择", ""], ["李明", "成人", "选择", ""], ["小明", "学生已认证", "已选", "selected"], ["王晓明", "学生已认证", "已选", "selected"]]), [action("继续添加", "s23-method", "secondary"), action("完成本场景", "", "primary", { toast: "出行人与学生认证场景已完成" })], "result")
  ]),

  scene("S24", "账户服务", "收藏、协议与个人数据", "游客", "从“我的”进入收藏、协议或演示数据管理", "查看收藏与协议，或确认清除本地演示数据", "这些是辅助场景：收藏要有列表和空态；清除数据必须二次确认，并说明哪些信息保留。", "5173 Profile、Favorites、Agreement", [
    page("s24-profile", "我的", "集中展示订单、行程、投诉和账户入口", S24UI.profile(), [], "normal", { tab: "mine", headerTitle: "我的" }),
    page("s24-favorites", "我的收藏", "查看收藏的景点、节目和攻略", UI.chips(["全部", "景点", "节目", "攻略"], 0) + UI.rows([["桥", "虹桥", "南苑地标 · 已收藏"], ["演", "大宋·东京梦华", "20:45 场 · 已收藏"], ["攻", "亲子一日游路线", "8 个游览点 · 已收藏"]]), [action("清空收藏分支", "s24-empty", "secondary"), action("查看服务协议", "s24-agreement")]),
    page("s24-empty", "收藏为空", "在没有收藏时提供回到内容发现的入口", UI.success("还没有收藏内容", "浏览景点、节目或攻略时可以点击收藏，方便以后查看。", true) + UI.rows([["景", "浏览景区景点", "从园区地图开始"], ["演", "查看热门节目", "按时间筛选"]]), [action("返回个人中心", "s24-profile")], "exception"),
    page("s24-agreement", "服务协议与隐私政策", "以可切换的正式正文展示当前协议", S24UI.agreement()),
    page("s24-clear", "数据与隐私设置", "管理系统权限、协议和本地演示数据", S24UI.dataSettings(), [action("返回个人中心", "s24-profile", "secondary"), action("清除本地演示数据", "s24-cleared", "danger", { modal: { title: "清除本地演示数据", note: "订单、行程、收藏和对话将恢复为预置状态，常用出行人保留。此操作无法撤销。", fields: [], confirm: "确认清除" } })]),
    page("s24-cleared", "演示数据已重置", "恢复预置场景并说明结果", UI.success("已恢复预置数据", "订单、行程、收藏和对话记录已重置，可重新演示所有流程。") + UI.summary([["完成时间", "刚刚"], ["常用出行人", "已保留"], ["场景状态", "恢复初始"]]), [action("完成本场景", "", "primary", { toast: "收藏、协议与个人数据场景已完成" })], "result")
  ]),

  scene("S25", "AI 专题场景", "AI 票务顾问", "家庭游客", "在 AI 助手中描述人数、儿童年龄、日期、预算和想看的节目", "获得可解释的票型组合建议，并直接进入购票", "AI 先提取出游条件，只追问影响票型的缺失信息，再比较可售组合并解释推荐与不推荐原因。", "新增 AI 票务决策闭环", [
    page("s25-intake", "描述购票需求", "通过自然语言表达人数、预算和游玩偏好", `<section class="ai-service-page">${AIServiceUI.head("AI 票务顾问", "告诉我这次怎么游玩", "人数、日期、预算和想看的内容都可以直接说。")}${AIServiceUI.chat("我们两位大人带两个孩子，8 月 23 日玩一天，预算 800 元，想看主要演出。", "我会先核对儿童年龄和当日可售票型，再给出适合的组合。", ["识别同行人数与日期", "核对优惠票资格", "比较门票与演出组合"])}${UI.composer("两位大人带两个孩子，8 月 23 日玩一天，预算 800 元", "描述你的购票需求")}</section>`, [action("开始分析", "s25-recognized")], "normal", { tab: "ai", headerTitle: "AI 票务顾问" }),
    page("s25-recognized", "核对识别信息", "展示已提取条件并指出影响票型的缺失项", `<section class="ai-service-page">${AIServiceUI.head("正在匹配票型", "先核对出游信息")}${AIServiceUI.understood([["出游日期", "2026-08-23"], ["同行人数", "2 位成人、2 名儿童"], ["预算", "¥800"], ["主要偏好", "日间游园、重点演出"]], "已识别 4 项")}${UI.notice("warn", "还差儿童年龄", "年龄会影响儿童票或免票资格，请补充两名儿童的年龄。")}${AIServiceUI.disclosure("AI 仅整理游客输入，优惠资格以证件核验结果为准。")}</section>`, [action("重新描述", "s25-intake", "secondary"), action("补充儿童年龄", "s25-clarify")]),
    page("s25-clarify", "补充关键条件", "只补问会影响票型判断的信息", `<section class="ai-service-page">${AIServiceUI.head("补充 1 项信息", "两个孩子分别多大？", "填写年龄后即可比较可售组合。")}${UI.form([["儿童 1 年龄", "8 岁"], ["儿童 2 年龄", "5 岁"]])}${UI.summary([["已确认", "2 成人 + 2 儿童"], ["出游日期", "8 月 23 日"], ["预算上限", "¥800"]])}</section>`, [action("查看票型比较", "s25-compare")]),
    page("s25-compare", "比较票型组合", "对比价格、适用条件和包含内容", `<section class="ai-service-page">${AIServiceUI.head("已找到 3 种组合", "适合你们的票型比较")}<div class="ai-compare"><article class="recommended"><header><span>推荐</span><h6>家庭游日间票 + 东京梦华 B 区</h6></header><b>合计 ¥768</b><p>2 张成人票 + 2 张儿童票 + 4 个演出座位</p><ul><li>覆盖一天游园和主要演出</li><li>预算内剩余 ¥32</li><li>4 个连座可选</li></ul></article><article><header><span>备选</span><h6>4 张日间普通票</h6></header><b>合计 ¥640</b><p>不含东京梦华演出票</p><ul><li>价格更低</li><li>无法满足主要演出需求</li></ul></article><article><header><span>不建议</span><h6>亲子套票 2 组</h6></header><b>合计 ¥828</b><p>包含重复的亲子项目权益</p><ul><li>超出预算 ¥28</li><li>部分权益本次用不到</li></ul></article></div>${AIServiceUI.source("8 月 23 日票价、儿童票规则、东京梦华实时余票")}</section>`, [action("查看无匹配方案", "s25-no-match", "secondary"), action("采用推荐组合", "s25-recommendation")]),
    page("s25-no-match", "没有完全匹配的方案", "当预算或资格不满足时说明原因并给出替代方案", `<section class="ai-service-page">${AIServiceUI.head("当前没有完全匹配", "预算与演出需求存在冲突")}${UI.notice("error", "至少还差 ¥68", "保留 4 人日间票和东京梦华连座时，最低合计为 ¥768。")}${AIServiceUI.reasons("你可以这样调整", [["1", "保留主要演出", "将预算调整到 ¥768"], ["2", "保留 ¥700 预算", "改为免费的园内节目，不购买东京梦华"], ["3", "更换出游日期", "选择工作日优惠票型"]])}${AIServiceUI.disclosure("推荐结果基于当前价格和余票，最终以订单确认页为准。")}</section>`, [action("返回比较", "s25-compare")], "exception"),
    page("s25-recommendation", "推荐方案详情", "解释推荐原因并衔接真实购票流程", `<section class="ai-service-page">${AIServiceUI.head("推荐方案", "家庭游日间票 + 东京梦华 B 区", "8 月 23 日 · 2 成人 + 2 儿童")}${AIServiceUI.reasons("为什么推荐", [["合", "符合预算", "合计 ¥768，预算内剩余 ¥32"], ["演", "覆盖主要演出", "包含东京梦华 B 区 4 个连座"], ["童", "儿童票已匹配", "8 岁与 5 岁儿童均按对应票型核验"]])}${UI.summary([["日间门票", "¥320"], ["东京梦华 B 区", "¥448"], ["合计", "¥768"]])}${AIServiceUI.disclosure()}${AIServiceUI.source("票务系统价格、余票和官方优惠规则 · 10:18 更新")}</section>`, [action("返回调整", "s25-compare", "secondary"), action("进入购票", "s10-ticket")], "result")
  ]),

  scene("S26", "AI 专题场景", "亲子家庭一日游", "2 位成人与 2 名儿童", "家长希望一次完成票型、路线、节目和亲子项目安排", "形成适合两个孩子的一日游方案并进入确认", "方案围绕儿童年龄、休息节奏和家庭预算组织，不只展示路线，还要体现 AI 如何选择票型和项目。", "典型游客场景：亲子家庭", [
    page("s26-request", "家庭需求输入", "家长用一句话说明家庭构成和核心诉求", `<section class="ai-service-page">${AIServiceUI.head("家庭游规划", "带两个孩子，一天怎么安排？", "我会同时考虑票型、步行强度、用餐和演出。")}${AIServiceUI.chat("两位大人，孩子 8 岁和 5 岁，第一次来，想看东京梦华，孩子别太累。", "收到。我会优先安排亲子项目和休息点，并减少路线折返。")}${UI.composer("两位大人，孩子 8 岁和 5 岁，想看东京梦华", "继续补充预算或偏好")}</section>`, [action("整理家庭信息", "s26-profile")], "normal", { tab: "ai", headerTitle: "家庭游规划" }),
    page("s26-profile", "家庭画像确认", "核对儿童年龄、步行强度和预算", `<section class="ai-service-page">${AIServiceUI.head("已理解家庭需求", "确认后生成方案")}${AIServiceUI.understood([["家庭成员", "2 成人 + 2 儿童"], ["儿童年龄", "8 岁、5 岁"], ["游玩时长", "1 天"], ["必看内容", "大宋·东京梦华"], ["节奏偏好", "少折返、午后安排休息"]], "信息完整")}${UI.chips(["亲子互动", "主要演出", "少走路", "含用餐"], [0, 1, 2, 3])}</section>`, [action("查看家庭票方案", "s26-ticket")]),
    page("s26-ticket", "家庭票方案", "展示适配家庭成员的票型和费用", `<section class="ai-service-page">${AIServiceUI.head("票型已匹配", "2 成人票 + 2 儿童票")}${UI.summary([["成人日间票 × 2", "¥240"], ["儿童日间票 × 2", "¥80"], ["东京梦华家庭连座", "¥448"], ["预计合计", "¥768"]])}${AIServiceUI.reasons("匹配说明", [["童", "按年龄匹配儿童票", "入园时需携带儿童有效证件"], ["座", "优先家庭连座", "当前 B 区有 4 个相邻座位"], ["省", "未加入重复权益", "比两组亲子套票节省 ¥60"]])}${AIServiceUI.disclosure()}</section>`, [action("调整票型", "s25-compare", "secondary"), action("生成亲子路线", "s26-route")]),
    page("s26-route", "亲子一日路线", "按时间轴展示项目、休息和用餐", `<section class="ai-service-page">${AIServiceUI.head("亲子一日游", "少折返、午后有休息")}${UI.timeline([["09:00 包公迎宾", "迎宾门集合，入园后先看开园节目", "done"], ["10:00 虹桥亲子互动", "民俗体验约 45 分钟"], ["11:20 岳飞枪挑小梁王", "演武场 · 提前 15 分钟入场"], ["12:20 东京食坊午餐", "预留 70 分钟用餐和休息"], ["14:10 儿童游艺区", "低强度体验，附近有母婴室"], ["16:00 勾栏瓦肆", "室内节目，避开午后高温"], ["19:30 大宋·东京梦华", "B 区 4 连座"]])}${AIServiceUI.source("今日节目单、园区步行时间、亲子设施信息")}</section>`, [action("查看订单确认", "s26-confirm")]),
    page("s26-confirm", "家庭方案确认", "统一核对票型、路线和出行人", `<section class="ai-service-page">${AIServiceUI.head("确认家庭游方案", "8 月 23 日 · 2 大 2 小")}${UI.people([["赵敏", "成人 · 身份证 410****5127", "已选", "selected"], ["李明", "成人 · 身份证 410****0728", "已选", "selected"], ["小明", "8 岁 · 儿童票", "已选", "selected"], ["小雨", "5 岁 · 儿童票", "已选", "selected"]])}${UI.summary([["门票与演出", "¥768"], ["路线项目", "7 项"], ["预计游玩", "10.5 小时"]])}</section>`, [action("返回调整", "s26-route", "secondary"), action("保存并去购票", "s26-success")]),
    page("s26-success", "家庭方案已生成", "保存方案并提供购票和行程入口", `<section class="ai-service-page">${UI.success("亲子一日游已保存", "票型和路线已经加入待确认清单。")}${UI.summary([["出游日期", "2026-08-23"], ["同行人数", "2 成人 + 2 儿童"], ["首个安排", "09:00 包公迎宾"]])}${UI.rows([["票", "继续购买推荐票型", "合计 ¥768", "", "s10-ticket"], ["行", "在我的行程查看", "可继续调整路线", "", "s09-list"]])}</section>`, [action("返回 AI 助手", "s03-welcome")], "result")
  ]),

  scene("S27", "AI 专题场景", "半日主要演出游", "时间有限的游客", "游客只有下午半天，希望尽量看完主要演出", "根据到离园时间形成可执行的节目路线并处理场次冲突", "AI 需要理解时间窗口，查询节目时刻和步行时间；发生冲突时说明取舍，而不是简单罗列节目。", "典型游客场景：半日演出", [
    page("s27-request", "说明半日需求", "输入可用时间和必看内容", `<section class="ai-service-page">${AIServiceUI.head("半日演出助手", "只有半天，也能抓住重点", "告诉我到园和离园时间。")}${AIServiceUI.chat("下午 1 点到晚上 8 点，主要想看演出，第一次来。", "我会按演出时间、步行距离和入场提前量排出可执行顺序。")}${UI.composer("下午 1 点到晚上 8 点，主要想看演出", "补充必看节目")}</section>`, [action("分析时间窗口", "s27-window")], "normal", { tab: "ai", headerTitle: "半日演出助手" }),
    page("s27-window", "时间窗口确认", "核对到离园时间和演出偏好", `<section class="ai-service-page">${AIServiceUI.head("时间已识别", "可用 7 小时")}${AIServiceUI.understood([["到园时间", "13:00"], ["离园时间", "20:00"], ["主要偏好", "经典实景演出"], ["步行强度", "普通"], ["用餐", "预留 45 分钟"]], "条件完整")}${UI.chips(["岳飞枪挑小梁王", "东京梦华", "勾栏瓦肆", "民俗互动"], [0, 1, 2])}</section>`, [action("生成节目路线", "s27-route")]),
    page("s27-route", "半日节目路线", "串联场次、步行和用餐时间", `<section class="ai-service-page">${AIServiceUI.head("推荐路线", "3 场主要演出 + 1 次用餐")}${UI.timeline([["13:00 迎宾门入园", "建议提前线上购票", "done"], ["14:20 岳飞枪挑小梁王", "演武场 · 步行约 15 分钟"], ["16:00 勾栏瓦肆", "室内节目 · 演出 35 分钟"], ["17:00 东京食坊", "用餐约 45 分钟"], ["18:10 前往东京梦华剧场", "预留安检和入场时间"], ["19:00 大宋·东京梦华", "演出结束约 20:10"]])}${AIServiceUI.disclosure("节目时间由 AI 根据当日节目单整理，临时调整以官方公告为准。")}</section>`, [action("查看时间冲突", "s27-conflict", "secondary"), action("确认节目与票型", "s27-ticket")]),
    page("s27-conflict", "节目时间冲突", "解释冲突并提供明确取舍", `<section class="ai-service-page">${AIServiceUI.head("发现时间冲突", "20:00 前无法完整看完东京梦华")}${UI.notice("warn", "预计 20:10 结束", "若必须 20:00 离园，需要在东京梦华和准时离园之间选择。")}${AIServiceUI.reasons("可选调整", [["A", "完整观看东京梦华", "离园时间调整到 20:20"], ["B", "按时离园", "改看 18:00 的室内节目，取消东京梦华"], ["C", "提前入园", "12:30 到园，其他节目不变"]])}${AIServiceUI.source("当日节目时刻、剧场入场要求、步行距离")}</section>`, [action("采用方案 A", "s27-ticket")], "exception"),
    page("s27-ticket", "节目与票型确认", "核对场次、席位和日间门票", `<section class="ai-service-page">${AIServiceUI.head("方案 A", "完整观看主要演出")}${UI.summary([["日间门票", "成人票 × 1 · ¥120"], ["东京梦华", "19:00 场 B 区 · ¥128"], ["预计离园", "20:20"], ["合计", "¥248"]])}${UI.notice("success", "时间已校正", "已将离园时间调整到 20:20，并预留 20 分钟出场时间。")}</section>`, [action("加入行程", "s27-success")]),
    page("s27-success", "半日路线已保存", "形成带场次提醒的半日行程", `<section class="ai-service-page">${UI.success("半日演出路线已保存", "每场演出前 30 分钟会在行程中提示入场。")}${UI.timeline([["13:00", "迎宾门入园", "done"], ["14:20", "岳飞枪挑小梁王"], ["16:00", "勾栏瓦肆"], ["19:00", "大宋·东京梦华"]])}${UI.rows([["票", "继续购买门票", "日间票 + 东京梦华", "", "s10-ticket"], ["行", "查看我的行程", "已生成 4 项提醒", "", "s09-list"]])}</section>`, [action("返回 AI 助手", "s03-welcome")], "result")
  ]),

  scene("S28", "AI 专题场景", "节假日实时避峰游", "节假日游客", "游客担心排队，希望根据实时客流调整入园时间和路线", "查看拥挤区域、采用错峰路线，并在客流变化时获得替代安排", "AI 将客流、节目和路线合并成可执行建议；客流变化只调整受影响的部分，并说明数据更新时间。", "典型游客场景：实时客流避峰", [
    page("s28-request", "提出避峰需求", "说明到园方式、时间和希望避开的排队", `<section class="ai-service-page">${AIServiceUI.head("实时避峰助手", "节假日怎么少排队？", "我会结合入口、区域客流和节目开场时间调整路线。")}${AIServiceUI.chat("国庆自驾，上午 10 点左右到，带老人，不想排长队。", "我会优先选择停车更顺、步行更少的入口，并避开当前高峰区域。")}${UI.composer("国庆自驾，上午 10 点到，带老人", "补充想看的节目")}</section>`, [action("查看实时客流", "s28-crowd")], "normal", { tab: "ai", headerTitle: "实时避峰助手" }),
    page("s28-crowd", "实时客流概览", "展示入口和重点区域的拥挤程度", `<section class="ai-service-page">${AIServiceUI.head("10:02 实时客流", "北侧入口更适合现在入园")}${AIServiceUI.crowd("high", "迎宾门 · 拥挤", "预计排队 35 分钟，停车场余位较少")}${AIServiceUI.crowd("low", "金水门 · 舒适", "预计排队 8 分钟，接驳车约 6 分钟一班")}${AIServiceUI.crowd("medium", "虹桥片区 · 较忙", "11:00 前客流仍会增加")}${AIServiceUI.source("入口闸机、停车场余位、园区客流热度 · 10:02 更新")}</section>`, [action("生成错峰路线", "s28-route")]),
    page("s28-route", "错峰路线", "把入口、休息点和节目串成低拥挤路线", `<section class="ai-service-page">${AIServiceUI.head("推荐从金水门入园", "预计减少排队 27 分钟")}${UI.timeline([["10:20 金水门入园", "P3 停车场接驳到入口", "done"], ["10:40 北苑民俗区", "当前客流舒适"], ["11:30 宣和殿节目", "室内有座位，适合老人休息"], ["12:20 提前用餐", "避开 13:00 餐饮高峰"], ["14:10 虹桥片区", "预计客流回落后再前往"]])}${AIServiceUI.reasons("调整依据", [["门", "入口排队更短", "金水门约 8 分钟"], ["路", "减少往返", "路线由北向南衔接"], ["休", "增加休息点", "连续步行不超过 25 分钟"]])}${AIServiceUI.disclosure("客流会随现场变化，路线将在关键节点前再次核对。")}</section>`, [action("查看客流变化", "s28-change", "secondary"), action("采用错峰路线", "s28-saved")]),
    page("s28-change", "客流突增提醒", "客流变化时只调整受影响的节点", `<section class="ai-service-page">${AIServiceUI.head("路线需要小幅调整", "虹桥片区客流突然升高")}${AIServiceUI.crowd("high", "虹桥片区 · 拥挤", "团队游客集中到达，预计持续约 50 分钟")}${UI.notice("warn", "原 14:10 安排暂缓", "其他项目和用餐不受影响。")}${AIServiceUI.reasons("建议替换", [["原", "14:10 虹桥片区", "当前预计排队 30 分钟"], ["新", "14:10 清明文化馆", "室内有座位，步行 6 分钟"], ["后", "15:20 再到虹桥", "预计客流回落"]])}${AIServiceUI.source("园区客流热度 · 13:52 更新")}</section>`, [action("采用调整", "s28-adjusted")], "exception"),
    page("s28-adjusted", "调整后的路线", "展示替换节点和不变安排", `<section class="ai-service-page">${AIServiceUI.head("已避开虹桥高峰", "只调整 1 个节点")}${UI.timeline([["10:20", "金水门入园", "done"], ["11:30", "宣和殿节目", "done"], ["12:20", "提前用餐", "done"], ["14:10", "清明文化馆 · 新增"], ["15:20", "虹桥片区 · 延后"]])}${UI.notice("success", "预计节省 22 分钟", "路线总步行距离基本不变。")}</section>`, [action("保存调整", "s28-saved")]),
    page("s28-saved", "避峰路线已保存", "将动态路线写入我的行程并保留更新时间", `<section class="ai-service-page">${UI.success("错峰路线已保存", "到达关键节点前会再次核对客流变化。")}${UI.summary([["推荐入口", "金水门"], ["预计少排队", "约 27 分钟"], ["适合人群", "带老人、自驾游客"], ["最近更新", "13:52"]])}${UI.rows([["图", "在地图查看路线", "入口、停车和步行导航", "", "s16-route"], ["行", "加入我的行程", "保留实时调整提醒", "", "s09-list"]])}</section>`, [action("返回 AI 助手", "s03-welcome")], "result")
  ]),

  scene("S29", "AI 专题场景", "AI 投诉助手", "需要反馈问题的游客", "游客在 AI 助手中描述消费、票务或服务问题", "完成类目识别、材料补充、有效性检查并进入既有投诉工单", "AI 只负责理解问题、提示材料和识别票据信息；最终受理、处理和结论仍由客服及业务部门完成。", "AI 对话与 S20 投诉闭环衔接", [
    page("s29-chat", "描述投诉问题", "用对话方式讲清发生了什么和希望如何处理", `<section class="ai-service-page">${AIServiceUI.head("投诉助手", "请告诉我发生了什么", "我会帮你整理问题，并提示需要提交的材料。")}${AIServiceUI.chat("昨天在孙记小吃，菜单写 76 元，最后支付了 88 元。", "我理解为消费价格争议。还需要确认消费时间、支付记录和你的处理诉求。")}${UI.composer("希望核实价格并退还 12 元差额", "继续补充问题")}</section>`, [action("整理投诉信息", "s29-classify")], "normal", { tab: "ai", headerTitle: "投诉助手" }),
    page("s29-classify", "识别投诉类型", "展示问题摘要、类目和游客诉求供核对", `<section class="ai-service-page">${AIServiceUI.head("问题已整理", "消费价格争议")}${AIServiceUI.understood([["涉及商户", "孙记小吃"], ["发生时间", "2026-08-17 12:20"], ["菜单标价", "¥76"], ["实际支付", "¥88"], ["游客诉求", "核实价格并退还差额 ¥12"]], "信息完整")}${UI.chips(["消费价格", "票务纠纷", "服务态度", "其他"], 0)}${AIServiceUI.disclosure("AI 仅协助整理投诉内容，是否受理和处理结果由工作人员确认。")}</section>`, [action("修改问题", "s29-chat", "secondary"), action("查看材料要求", "s29-materials")]),
    page("s29-materials", "补充投诉材料", "按投诉类型提示必要材料并模拟上传", `<section class="ai-service-page">${AIServiceUI.head("请补充 2 项材料", "用于核对标价与实际支付")}${UI.upload([["菜单或标价照片", "menu_0817.jpg · 已上传", "ok"], ["消费小票或支付记录", "pay_0817.jpg · 已上传", "ok"]])}${UI.notice("success", "材料数量完整", "正在检查图片是否与本次消费有关，并识别关键信息。")}</section>`, [action("开始检查", "s29-checking")]),
    page("s29-checking", "材料识别与有效性检查", "展示识别字段、材料关联性和可修改结果", `<section class="ai-service-page">${AIServiceUI.head("材料有效并已识别", "请核对关键信息")}${UI.summary([["商户", "孙记小吃"], ["消费时间", "2026-08-17 12:20"], ["订单号", "XF202608171226"], ["实际支付", "¥88"], ["菜单标价", "¥76"]])}${AIServiceUI.reasons("材料检查", [["✓", "菜单照片有效", "可见商品名称和 ¥76 标价"], ["✓", "支付记录有效", "商户、时间与金额一致"], ["✓", "与投诉内容相关", "两张材料指向同一笔消费"]])}${AIServiceUI.disclosure("识别结果仅供核对，原始图片会一并提交给工作人员。")}</section>`, [action("查看无效材料", "s29-invalid", "secondary"), action("确认并提交", "s29-submitted")]),
    page("s29-invalid", "材料无效", "明确指出问题并允许重新上传", `<section class="ai-service-page">${AIServiceUI.head("有 1 项材料无法使用", "支付记录与本次投诉无关")}${UI.upload([["菜单或标价照片", "与孙记小吃消费相关", "ok"], ["支付记录", "图片为其他商户订单", "fail"]])}${UI.notice("error", "请重新上传支付记录", "需要能看到孙记小吃、支付时间和 ¥88 金额。")}${AIServiceUI.reasons("重新拍摄建议", [["1", "打开微信支付账单", "找到 8 月 17 日 12:20 的交易"], ["2", "截取完整页面", "保留商户、时间和金额"], ["3", "返回上传", "替换无关图片后重新检查"]])}</section>`, [action("重新上传", "s29-materials")], "exception"),
    page("s29-submitted", "投诉提交成功", "展示工单回执并提供详情入口", `<section class="s29-receipt-page">
      <header class="s29-result-head"><i>✓</i><h5>投诉已提交</h5><p>客服人员将统一受理，无法直接处理时再转派相关部门。</p></header>
      <section class="s29-receipt"><header><span>工单回执</span><em>待受理</em></header><strong>QY202608170026</strong><small>提交时间：2026-08-20 14:18</small><dl><div><dt>投诉类型</dt><dd>消费价格</dd></div><div><dt>提交材料</dt><dd>2 张 · 已核对</dd></div></dl></section>
      <p class="s29-result-note">材料和识别信息已随工单提交，最终处理结果以工作人员反馈为准。</p>
      <nav class="s29-result-links"><button type="button" data-ui-route="s20-c-detail"><i>单</i><span><b>查看工单详情</b><small>处理进度与客服反馈</small></span><em>›</em></button><button type="button" data-ui-route="s20-confirm"><i>核</i><span><b>查看提交内容</b><small>问题、诉求与相关材料</small></span><em>›</em></button></nav>
    </section>`, [action("返回首页", "s01-logged-home")], "result")
  ])
];
