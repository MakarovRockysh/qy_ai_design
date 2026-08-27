const scenes = window.SCENARIOS || [];
const stageOrder = [...new Set(scenes.map(item => item.stage))];
const allPageEntries = scenes.flatMap(item => item.pages.map((page, index) => ({ scene: item, page, index })));

const state = {
  view: "catalog",
  sceneId: scenes[0]?.id || "",
  pageId: scenes[0]?.pages[0]?.id || "",
  search: ""
};

const defaultWorkOrderCategories = ["服务态度", "设施安全", "票务纠纷", "消费价格", "环境卫生", "秩序管理", "宣传误导"];
const workOrderData = {
  categories: defaultWorkOrderCategories.map((name, index) => ({ name, createdAt: index < 4 ? "2026-08-01" : "2026-08-12", count: [16, 8, 21, 13, 6, 9, 4][index] })),
  selectedCategory: "消费价格"
};

const previewState = { sceneId: "", pageId: "" };

const screenMediaCatalog = {
  scenic: { src: "assets/scenic-day.webp", alt: "宋韵园区河岸与石桥场景图" },
  night: { src: "assets/lantern-night.webp", alt: "宋韵园区夜游灯会场景图" },
  show: { src: "assets/tokyo-show.webp", alt: "大型水景实景演出场景图" },
  banquet: { src: "assets/song-banquet.webp", alt: "宋韵宴席与餐厅场景图" },
  hotel: { src: "assets/family-hotel.webp", alt: "宋韵客栈家庭客房场景图" },
  family: { src: "assets/family-trip.webp", alt: "家庭游客在园区游览的场景图" },
  parking: { src: "assets/parking.webp", alt: "景区停车场与入口场景图" }
};

const screenMediaAssignments = {
  scenic: ["s05-about", "s05-offers", "s10-mall", "s10-eligibility", "s12-list", "s12-detail", "s17-categories"],
  night: ["s02-activity", "s02-activity-change", "s05-offer-detail", "s10-voucher"],
  show: ["s05-programs", "s05-program-detail", "s11-shows", "s11-detail", "s11-success", "s22-order-rating", "s27-route", "s27-success"],
  banquet: ["s11-banquet-detail", "s11-banquet-seat", "s11-banquet-success", "s13-trip"],
  hotel: [],
  family: ["s13-synced", "s13-synced-adjusted", "s26-route", "s26-success"],
  parking: ["s18-mode", "s18-routes", "s18-parking", "s18-detail", "s18-arrived", "s28-crowd", "s28-adjusted"]
};

const $ = selector => document.querySelector(selector);

function escapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function resetWorkOrderData() {
  workOrderData.categories = defaultWorkOrderCategories.map((name, index) => ({ name, createdAt: index < 4 ? "2026-08-01" : "2026-08-12", count: [16, 8, 21, 13, 6, 9, 4][index] }));
  workOrderData.selectedCategory = "消费价格";
}

function renderWorkOrderCategoryChoices() {
  return workOrderData.categories.map((item, index) => {
    const selected = item.name === workOrderData.selectedCategory;
    const icon = ["服", "安", "票", "价", "卫", "序", "宣"][index] || "类";
    return `<button type="button" class="${selected ? "active" : ""}" data-work-order-category="${escapeText(item.name)}" aria-pressed="${selected}"><i>${icon}</i><span><b>${escapeText(item.name)}</b><small>${item.count} 条历史工单</small></span><em>${selected ? "✓" : "○"}</em></button>`;
  }).join("");
}

function renderWorkOrderCategoryOptions() {
  return workOrderData.categories.map(item => `<option>${escapeText(item.name)}</option>`).join("");
}

function renderWorkOrderCategoryTable() {
  return `<div class="s20-category-table"><table><thead><tr><th>类目名称</th><th>关联工单</th><th>创建时间</th><th>状态</th></tr></thead><tbody>${workOrderData.categories.map(item => `<tr><td><b>${escapeText(item.name)}</b></td><td>${item.count} 条</td><td>${escapeText(item.createdAt)}</td><td><span>启用</span></td></tr>`).join("")}</tbody></table></div>`;
}

function renderScreenBody(screen) {
  const body = String(screen.body || "")
    .replaceAll("{{WORK_ORDER_CATEGORY_CHOICES}}", renderWorkOrderCategoryChoices())
    .replaceAll("{{WORK_ORDER_CATEGORY_OPTIONS}}", renderWorkOrderCategoryOptions())
    .replaceAll("{{WORK_ORDER_CATEGORY_TABLE}}", renderWorkOrderCategoryTable())
    .replaceAll("{{SELECTED_WORK_ORDER_CATEGORY}}", escapeText(workOrderData.selectedCategory));
  if (screen.surface !== "mobile" || screen.aiChat || screen.home) return body;
  const mediaKey = Object.keys(screenMediaAssignments).find(key => screenMediaAssignments[key].includes(screen.id));
  const media = mediaKey ? screenMediaCatalog[mediaKey] : null;
  return media ? `<figure class="screen-media media-${mediaKey}"><img src="${media.src}" alt="${media.alt}"></figure>${body}` : body;
}

function getScene(id = state.sceneId) {
  return scenes.find(item => item.id === id) || scenes[0];
}

function getPage(scene = getScene(), id = state.pageId) {
  return scene?.pages.find(item => item.id === id) || scene?.pages[0];
}

function stateClass(value) {
  return value === "exception" ? "exception" : value === "result" ? "result" : "";
}

function renderNavigation() {
  const query = state.search.trim().toLowerCase();
  const html = stageOrder.map(stage => {
    const list = scenes.filter(item => item.stage === stage).filter(item => {
      if (!query) return true;
      const text = [item.id, item.stage, item.title, item.actor, item.trigger, item.outcome, ...item.pages.map(page => `${page.title} ${page.purpose}`)].join(" ").toLowerCase();
      return text.includes(query);
    });
    if (!list.length) return "";
    return `<section class="nav-group"><span>${stage}</span>${list.map(item => `
      <button type="button" class="nav-scene ${state.view === "scene" && state.sceneId === item.id ? "active" : ""}" data-scene-id="${item.id}">
        <b>${item.id}</b><strong>${escapeText(item.title)}</strong><em>${item.pages.length}</em>
      </button>`).join("")}</section>`;
  }).join("");
  $("#scene-nav").innerHTML = html || `<p class="nav-empty">没有匹配的业务场景。</p>`;
}

function catalogStats() {
  return {
    scenes: scenes.length,
    pages: allPageEntries.length,
    exceptions: allPageEntries.filter(item => item.page.state === "exception").length,
    results: allPageEntries.filter(item => item.page.state === "result").length
  };
}

function renderCatalog() {
  const stats = catalogStats();
  const query = state.search.trim().toLowerCase();
  const groups = stageOrder.map(stage => {
    const list = scenes.filter(item => item.stage === stage).filter(item => {
      if (!query) return true;
      return [item.id, item.stage, item.title, item.actor, item.trigger, item.outcome, item.summary].join(" ").toLowerCase().includes(query);
    });
    if (!list.length) return "";
    return `<section class="catalog-group">
      <div class="catalog-group-head"><h3>${stage}</h3><span>${list.length} 个场景</span></div>
      ${list.map(item => `
        <button class="catalog-row" type="button" data-scene-id="${item.id}">
          <span class="scene-number">${item.id}</span>
          <span><h4>${escapeText(item.title)}</h4><p>${escapeText(item.summary)}</p></span>
          <span class="actor">${escapeText(item.actor)}</span>
          <span class="flow-brief"><b>${escapeText(item.trigger)}</b><br>→ ${escapeText(item.outcome)}</span>
          <span class="page-total"><b>${item.pages.length}</b><span>原型页面</span></span>
          <span class="arrow">›</span>
        </button>`).join("")}
    </section>`;
  }).join("");
  $("#catalog-view").innerHTML = `
    <section class="catalog-intro">
      <div><h2>一个场景，一条完整流程，若干独立页面。</h2><p>这套原型不再按功能页面零散展示，而是从游客或工作人员的目标出发，把入口、关键操作、业务分支、异常状态、处理结果和后续动作完整展示出来。</p></div>
      <div class="catalog-numbers">
        <div><b>${stats.scenes}</b><span>业务场景</span></div>
        <div><b>${stats.pages}</b><span>独立原型页面</span></div>
        <div><b>${stats.exceptions}</b><span>异常与分支页面</span></div>
        <div><b>${stats.results}</b><span>结果页面</span></div>
      </div>
    </section>
    ${groups || `<p class="nav-empty">没有匹配的业务场景。</p>`}`;
}

function actionButton(item, sceneId, pageId) {
  const attributes = [
    `data-page-action="1"`,
    `data-owner-scene="${sceneId}"`,
    `data-owner-page="${pageId}"`,
    item.target ? `data-target-page="${item.target}"` : "",
    item.toast ? `data-toast="${escapeText(item.toast)}"` : "",
    item.modal ? `data-modal-action="${encodeURIComponent(JSON.stringify(item.modal))}"` : ""
  ].filter(Boolean).join(" ");
  return `<button type="button" class="screen-action ${item.kind || "primary"}" ${attributes}>${escapeText(item.label)}</button>`;
}

function actionIsAlreadyInBody(screen, item) {
  if (!item.target) return false;
  if (/^办理/.test(String(item.label || ""))) return false;
  const body = String(screen.body || "");
  const tabTargets = ["s01-logged-home", "s03-welcome", "s09-list", "s10-mall", "s24-profile"];
  return body.includes(`data-ui-route="${item.target}"`)
    || body.includes(`data-s03-page="${item.target}"`)
    || body.includes(`data-s06-page="${item.target}"`)
    || (screen.tab && tabTargets.includes(item.target));
}

function isPrototypeNavigationAction(screen, item) {
  const label = String(item.label || "").trim();
  const targetEntry = item.target ? allPageEntries.find(entry => entry.page.id === item.target) : null;
  const switchesSurface = targetEntry && targetEntry.page.surface !== screen.surface;
  return switchesSurface
    || /^完成本场景$/.test(label)
    || /^演示/.test(label)
    || /^查看.*状态$/.test(label)
    || /分支$/.test(label)
    || /^切换到/.test(label);
}

function isCommitAction(item) {
  const label = String(item.label || "").trim();
  return /^(微信手机号快捷登录|下一步|继续|按当前选择继续|确认|提交|去支付|去购买|支付|保存|生成|开始|立即购票|购买|办理|申请|绑定|添加|新增|一站式下单|客服受理|客服直接完结|商务部处理并完结|退回补充材料|转派|驳回|完成核销|展示核销二维码|发送邀请|设置|订阅|采用|选择日期|选择出行人|选择使用人|选择席位|加入行程|汇总待购项目|检查完成|核对投诉内容|解除冷处理并受理|维持冷处理|移除餐饮项目|恢复餐饮项目|删除全部项目|直接拨打园区安保)/.test(label);
}

function resolveMobileActions(screen) {
  const visible = (screen.actions || []).filter(item => !isPrototypeNavigationAction(screen, item) && !actionIsAlreadyInBody(screen, item));
  const commitActions = visible.filter(isCommitAction);
  if (!commitActions.length) return { fixed: [], inline: visible };
  const backwardAction = visible.find(item => /^(返回|上一步|取消|暂不)/.test(String(item.label || "")));
  let fixed = commitActions.length > 2 ? [commitActions.at(-1)] : [...commitActions];
  if (commitActions.length === 1 && backwardAction && !fixed.includes(backwardAction)) fixed.unshift(backwardAction);
  return { fixed, inline: visible.filter(item => !fixed.includes(item)) };
}

function renderMobileTabs(active) {
  const tabs = [["home", "⌂", "首页", "s01-logged-home"], ["ai", "问", "AI助手", "s03-welcome"], ["trip", "行", "行程", "s09-list"], ["tickets", "票", "购票", "s10-mall"], ["mine", "人", "我的", "s24-profile"]];
  return `<nav class="mobile-tabbar">${tabs.map(item => `<button type="button" class="${active === item[0] ? "active" : ""}" data-ui-route="${item[3]}"><i>${item[1]}</i><b>${item[2]}</b></button>`).join("")}</nav>`;
}

function renderAiChatDock(config = {}) {
  if (config.mode === "loading") {
    return `<div class="s03-chat-dock generating"><span><i></i>正在生成回答</span><button type="button" data-s03-page="s03-network-error">停止</button></div>`;
  }
  return `<div class="s03-chat-dock"><button type="button" class="s03-dock-tool" data-s03-action="添加图片" aria-label="添加图片">＋</button><label><input data-s03-input value="${escapeText(config.value || "")}" placeholder="${escapeText(config.placeholder || "输入你想问的问题")}" aria-label="输入问题"></label><button type="button" class="s03-dock-voice" data-s03-action="语音输入" aria-label="语音输入">⌁</button><button type="button" class="s03-dock-send" data-s03-send aria-label="发送问题">↑</button></div>`;
}

function renderMobileDevice(sceneItem, screen, options = {}) {
  const actions = resolveMobileActions(screen);
  return `<div class="device">
    <div class="device-status"><span>09:41</span><i>● ◒ ▰</i></div>
    <div class="mobile-page scene-${sceneItem.id.toLowerCase()} screen-${screen.id} ${screen.home ? "is-home" : ""} ${screen.aiChat ? "is-ai-chat" : ""}">
      <header class="mobile-header ${screen.home ? "home-header" : ""}"><span>${screen.home ? `<b class="mini-brand">清园</b>` : "‹"}</span><h4>${escapeText(screen.headerTitle || screen.title)}</h4><em class="wx-capsule"><i>••</i><i>○</i></em></header>
      <main class="mobile-body scroll">${renderScreenBody(screen)}${actions.inline.length ? `<nav class="mobile-inline-actions" aria-label="页面相关操作">${actions.inline.map(item => actionButton(item, sceneItem.id, screen.id)).join("")}</nav>` : ""}</main>
      ${screen.aiChat ? renderAiChatDock(screen.aiChat) : ""}
      ${actions.fixed.length ? `<footer class="mobile-footer">${actions.fixed.map(item => actionButton(item, sceneItem.id, screen.id)).join("")}</footer>` : ""}
      ${screen.tab ? renderMobileTabs(screen.tab) : ""}
    </div>
  </div>`;
}

function renderAdminDevice(sceneItem, screen) {
  const actions = screen.actions || [];
  const categorySection = screen.adminSection === "categories";
  return `<div class="admin-device">
    <aside class="admin-side"><strong>清园运营后台</strong><button type="button">工作台</button><button type="button" class="${categorySection ? "" : "active"}" data-ui-route="s20-admin-list">投诉工单</button><button type="button" class="${categorySection ? "active" : ""}" data-ui-route="s20-admin-categories">工单类目</button><button type="button" data-ui-route="s21-form">游客建议</button><button type="button" data-ui-route="s20-admin-completed">处理记录</button></aside>
    <section class="admin-workspace">
      <header class="admin-top"><span>游客服务 / ${categorySection ? "工单类目" : "投诉工单"}</span><strong>王芳 · 客服组</strong></header>
      <main class="admin-page">
        <div class="admin-title"><div><h4>${escapeText(screen.title)}</h4><p>${escapeText(screen.purpose)}</p></div><span>${categorySection ? "类目管理" : "工单管理"}</span></div>
        ${renderScreenBody(screen)}
        ${actions.length ? `<div class="admin-actions page-actions">${actions.map(item => actionButton(item, sceneItem.id, screen.id)).join("")}</div>` : ""}
      </main>
    </section>
  </div>`;
}

function renderDevice(sceneItem, screen) {
  return screen.surface === "admin" ? renderAdminDevice(sceneItem, screen) : renderMobileDevice(sceneItem, screen);
}

function renderFlow(sceneItem, activeId) {
  const nodeMarkup = (pageItem, groupIndex) => `
    <div class="flow-node ${pageItem.id === activeId ? "active" : ""}">
      <button type="button" data-focus-page="${pageItem.id}">
        <b>${String(groupIndex + 1).padStart(2, "0")}</b>
        <span>${escapeText(pageItem.title)}</span>
      </button>
    </div>`;
  const groups = [
    ["normal", "主流程"],
    ["exception", "异常 / 分支"],
    ["result", "结果状态"]
  ];
  return `<div class="scene-flow grouped-flow">${groups.map(group => {
    const pages = sceneItem.pages.filter(pageItem => pageItem.state === group[0]);
    if (!pages.length) return "";
    return `<details class="flow-section flow-state-${group[0]}" open><summary><span>${group[1]}</span><em>${pages.length} 个页面</em></summary><div>${pages.map(nodeMarkup).join("")}</div></details>`;
  }).join("")}</div>`;
}

function renderBoardScreen(sceneItem, screen, groupIndex) {
  return `
    <article class="screen-unit ${screen.surface === "admin" ? "admin-screen" : "mobile-screen"}" id="board-${screen.id}">
      <header class="screen-label">
        <span>${String(groupIndex + 1).padStart(2, "0")}</span>
        <div><h3>${escapeText(screen.title)}</h3><p>${escapeText(screen.role)} · ${escapeText(screen.purpose)}</p></div>
      </header>
      <div class="device-wrap" data-preview-scene="${sceneItem.id}" data-preview-page="${screen.id}" title="点击打开交互预览">${renderDevice(sceneItem, screen)}</div>
    </article>`;
}

function renderSceneBoard(sceneItem, activeId) {
  const groups = [
    ["normal", "主流程", "按业务顺序展示用户完成任务的主要页面"],
    ["exception", "异常 / 分支", "仅在条件不满足或业务路径改变时出现"],
    ["result", "结果状态", "提交、支付、保存或处理完成后的页面"]
  ];
  return `<div class="scene-board-groups">${groups.map(group => {
    const pages = sceneItem.pages.filter(pageItem => pageItem.state === group[0]);
    if (!pages.length) return "";
    return `<details class="screen-board-group board-state-${group[0]}" open><summary><div><strong>${group[1]}</strong><span>${group[2]}</span></div><em>${pages.length} 个页面</em></summary><div class="screen-board">${pages.map((screen, groupIndex) => renderBoardScreen(sceneItem, screen, groupIndex)).join("")}</div></details>`;
  }).join("")}</div>`;
}

function renderInteractivePreview(pageId, sceneId = "") {
  const owner = allPageEntries.find(item => item.page.id === pageId && (!sceneId || item.scene.id === sceneId)) || allPageEntries.find(item => item.page.id === pageId);
  if (!owner) return;
  previewState.sceneId = owner.scene.id;
  previewState.pageId = owner.page.id;
  const root = $("#preview-root");
  root.hidden = false;
  root.innerHTML = `<section class="preview-shell ${owner.page.surface === "admin" ? "admin-preview" : "mobile-preview"}" role="dialog" aria-modal="true">
    <header class="preview-header">
      <div><span>${escapeText(owner.scene.id)} · ${escapeText(owner.scene.title)}</span><strong>${escapeText(owner.page.title)}</strong></div>
      <button type="button" data-action="close-preview" aria-label="关闭交互预览">×</button>
    </header>
    <div class="preview-canvas">${renderDevice(owner.scene, owner.page)}</div>
  </section>`;
}

function closeInteractivePreview() {
  const root = $("#preview-root");
  root.hidden = true;
  root.innerHTML = "";
  previewState.sceneId = "";
  previewState.pageId = "";
}

function renderScene() {
  const sceneItem = getScene();
  if (!sceneItem) return;
  if (!sceneItem.pages.some(item => item.id === state.pageId)) state.pageId = sceneItem.pages[0].id;
  const activePage = getPage(sceneItem);
  $("#scene-view").innerHTML = `
    ${renderFlow(sceneItem, activePage.id)}
    ${renderSceneBoard(sceneItem, activePage.id)}`;
}

function renderMatrix() {
  const stats = catalogStats();
  $("#matrix-view").innerHTML = `
    <div class="matrix-summary">
      <div><b>${stats.scenes}</b><span>业务场景</span></div>
      <div><b>${stats.pages}</b><span>原型页面</span></div>
      <div><b>${stats.exceptions}</b><span>异常与分支</span></div>
      <div><b>${stats.results}</b><span>结果页面</span></div>
    </div>
    <div class="matrix-wrap"><table class="matrix-table">
      <thead><tr><th>场景</th><th>角色与起点</th><th>正常流程页面</th><th>异常/分支页面</th><th>结果页面</th><th>参考来源</th></tr></thead>
      <tbody>${scenes.map(item => {
        const normal = item.pages.filter(page => page.state === "normal");
        const exception = item.pages.filter(page => page.state === "exception");
        const result = item.pages.filter(page => page.state === "result");
        const tags = (items, className = "") => items.length ? items.map(page => `<span class="matrix-dot ${className}">${escapeText(page.title)}</span>`).join("") : `<span class="matrix-dot ${className}">不适用</span>`;
        return `<tr>
          <td><b>${item.id}</b><p>${escapeText(item.title)}</p></td>
          <td>${escapeText(item.actor)}<p>${escapeText(item.trigger)}</p></td>
          <td>${tags(normal)}</td>
          <td>${tags(exception, "exception")}</td>
          <td>${tags(result, "result")}</td>
          <td>${escapeText(item.source)}</td>
        </tr>`;
      }).join("")}</tbody>
    </table></div>`;
}

function setVisibleView() {
  $("#catalog-view").hidden = state.view !== "catalog";
  $("#scene-view").hidden = state.view !== "scene";
  $("#matrix-view").hidden = state.view !== "matrix";
}

function syncHash() {
  const params = new URLSearchParams();
  params.set("view", state.view);
  if (state.view === "scene") {
    params.set("scene", state.sceneId);
    params.set("page", state.pageId);
  }
  history.replaceState(null, "", `#${params.toString()}`);
}

function render() {
  renderNavigation();
  renderCatalog();
  renderScene();
  renderMatrix();
  setVisibleView();
  syncHash();
}

function openScene(sceneId, pageId = "") {
  const sceneItem = getScene(sceneId);
  if (!sceneItem) return;
  state.view = "scene";
  state.sceneId = sceneItem.id;
  state.pageId = sceneItem.pages.some(item => item.id === pageId) ? pageId : sceneItem.pages[0].id;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function focusPage(pageId) {
  const owner = allPageEntries.find(item => item.page.id === pageId);
  if (!owner) return;
  state.sceneId = owner.scene.id;
  state.pageId = owner.page.id;
  state.view = "scene";
  render();
  document.querySelector(`#board-${CSS.escape(pageId)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function closeModal() {
  const root = $("#modal-root");
  root.hidden = true;
  root.innerHTML = "";
}

function openModal(config, targetPage, toastMessage = "", previewTarget = false) {
  const fields = config.fields || [];
  const root = $("#modal-root");
  root.hidden = false;
  root.innerHTML = `<section class="modal-dialog" role="dialog" aria-modal="true">
    <header class="modal-head"><h3>${escapeText(config.title || "确认操作")}</h3><button type="button" data-action="close-modal">×</button></header>
    <div class="modal-body">
      ${config.note ? `<p>${escapeText(config.note)}</p>` : ""}
      <div class="modal-form">${fields.map((field, index) => `<label>${escapeText(field[0])}${String(field[1]).length > 28 ? `<textarea data-modal-field="${index}">${escapeText(field[1])}</textarea>` : `<input data-modal-field="${index}" value="${escapeText(field[1])}" />`}</label>`).join("")}</div>
    </div>
    <footer class="modal-actions">${config.hideCancel ? "" : `<button type="button" data-action="close-modal">取消</button>`}<button type="button" class="primary" data-action="confirm-modal" ${targetPage ? `data-target-page="${targetPage}"` : ""} ${toastMessage ? `data-confirm-toast="${escapeText(toastMessage)}"` : ""} ${previewTarget ? `data-preview-target="1"` : ""}>${escapeText(config.confirm || "确认")}</button></footer>
  </section>`;
}

function openWorkOrderCategoryModal() {
  const root = $("#modal-root");
  root.hidden = false;
  root.innerHTML = `<section class="modal-dialog" role="dialog" aria-modal="true">
    <header class="modal-head"><h3>新建工单类目</h3><button type="button" data-action="close-modal">×</button></header>
    <div class="modal-body"><p>新建后会直接出现在游客端投诉类目中。</p><div class="modal-form"><label>类目名称<input data-work-order-category-name placeholder="例如：导览服务"></label></div></div>
    <footer class="modal-actions"><button type="button" data-action="close-modal">取消</button><button type="button" class="primary" data-work-order-category-save>确认创建</button></footer>
  </section>`;
  root.querySelector("[data-work-order-category-name]")?.focus();
}

function loadHash() {
  const raw = location.hash.startsWith("#") ? location.hash.slice(1) : location.hash;
  if (!raw) return;
  const params = new URLSearchParams(raw);
  const view = params.get("view");
  if (["catalog", "scene", "matrix"].includes(view)) state.view = view;
  const sceneId = params.get("scene");
  if (scenes.some(item => item.id === sceneId)) state.sceneId = sceneId;
  const sceneItem = getScene();
  const pageId = params.get("page");
  if (sceneItem?.pages.some(item => item.id === pageId)) state.pageId = pageId;
}

let journeyDraggedNode = null;
let journeyTimeSlots = [];
let journeyDropTarget = null;
let journeyDropAfter = false;
let journeyPointerId = null;

function clearJourneyDragState(list) {
  list?.querySelectorAll("[data-journey-node]").forEach(node => {
    node.classList.remove("dragging", "drag-over-before", "drag-over-after");
  });
}

document.addEventListener("pointerdown", event => {
  const handle = event.target.closest?.("[data-journey-drag-handle]");
  const node = handle?.closest("[data-journey-node]");
  const list = node?.closest("[data-journey-draggable]");
  if (!handle || !node || !list || (event.pointerType === "mouse" && event.button !== 0)) return;

  event.preventDefault();
  journeyDraggedNode = node;
  journeyTimeSlots = [...list.querySelectorAll("[data-journey-time]")].map(time => time.textContent.trim());
  journeyDropTarget = null;
  journeyDropAfter = false;
  journeyPointerId = event.pointerId;
  node.classList.add("dragging");
  handle.setPointerCapture?.(event.pointerId);
});

document.addEventListener("pointermove", event => {
  if (!journeyDraggedNode || event.pointerId !== journeyPointerId) return;
  event.preventDefault();
  const list = journeyDraggedNode.closest("[data-journey-draggable]");
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest?.("[data-journey-node]");
  clearJourneyDragState(list);
  journeyDraggedNode.classList.add("dragging");
  journeyDropTarget = target && target !== journeyDraggedNode && target.closest("[data-journey-draggable]") === list ? target : null;
  if (!journeyDropTarget) return;

  const rect = journeyDropTarget.getBoundingClientRect();
  journeyDropAfter = event.clientY > rect.top + rect.height / 2;
  journeyDropTarget.classList.add(journeyDropAfter ? "drag-over-after" : "drag-over-before");
});

document.addEventListener("pointerup", event => {
  if (!journeyDraggedNode || event.pointerId !== journeyPointerId) return;
  const list = journeyDraggedNode.closest("[data-journey-draggable]");
  const title = journeyDraggedNode.querySelector("b")?.textContent || "行程项目";

  if (journeyDropTarget) {
    journeyDropTarget.insertAdjacentElement(journeyDropAfter ? "afterend" : "beforebegin", journeyDraggedNode);
    [...list.querySelectorAll("[data-journey-node]")].forEach((node, index) => {
      const time = node.querySelector("[data-journey-time]");
      if (time && journeyTimeSlots[index]) time.textContent = journeyTimeSlots[index];
    });
    const newTime = journeyDraggedNode.querySelector("[data-journey-time]")?.textContent || "新时间";
    list.classList.remove("journey-time-updated");
    requestAnimationFrame(() => list.classList.add("journey-time-updated"));
    window.setTimeout(() => list.classList.remove("journey-time-updated"), 650);
    showToast(`已将“${title}”调整至 ${newTime}`);
  }

  clearJourneyDragState(list);
  journeyDraggedNode = null;
  journeyTimeSlots = [];
  journeyDropTarget = null;
  journeyDropAfter = false;
  journeyPointerId = null;
});

document.addEventListener("pointercancel", () => {
  const list = journeyDraggedNode?.closest("[data-journey-draggable]");
  clearJourneyDragState(list);
  journeyDraggedNode = null;
  journeyTimeSlots = [];
  journeyDropTarget = null;
  journeyPointerId = null;
});

document.addEventListener("click", event => {
  if (event.target === $("#modal-root")) {
    closeModal();
    return;
  }
  if (event.target === $("#preview-root")) {
    closeInteractivePreview();
    return;
  }

  const target = event.target.closest("button");
  if (!target) {
    const previewEntry = event.target.closest(".device-wrap[data-preview-page]");
    if (previewEntry) renderInteractivePreview(previewEntry.dataset.previewPage, previewEntry.dataset.previewScene);
    return;
  }

  if (target.dataset.sceneId) {
    openScene(target.dataset.sceneId);
    return;
  }
  if (target.dataset.focusPage) {
    focusPage(target.dataset.focusPage);
    return;
  }
  if (target.dataset.action === "show-catalog") {
    state.view = "catalog";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (target.dataset.action === "show-matrix") {
    state.view = "matrix";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (target.dataset.action === "reset-prototype") {
    Object.assign(state, { view: "catalog", sceneId: scenes[0]?.id || "", pageId: scenes[0]?.pages[0]?.id || "", search: "" });
    resetWorkOrderData();
    $("#scene-search").value = "";
    closeModal();
    render();
    showToast("演示已恢复初始状态");
    return;
  }
  if (target.dataset.action === "close-modal") {
    closeModal();
    return;
  }
  if (target.dataset.action === "close-preview") {
    closeModal();
    closeInteractivePreview();
    return;
  }
  if (target.dataset.action === "confirm-modal") {
    const pageId = target.dataset.targetPage;
    const returnToPreview = target.dataset.previewTarget === "1";
    closeModal();
    if (pageId && returnToPreview) renderInteractivePreview(pageId);
    else if (pageId) focusPage(pageId);
    if (target.dataset.confirmToast) showToast(target.dataset.confirmToast);
    else if (pageId) showToast("操作已保存并写入处理轨迹");
    return;
  }
  if (target.dataset.s03Page) {
    renderInteractivePreview(target.dataset.s03Page);
    return;
  }
  if (target.dataset.s03Prompt) {
    const input = target.closest(".mobile-page")?.querySelector("[data-s03-input]");
    if (input) {
      input.value = target.dataset.s03Prompt;
      input.focus();
    }
    return;
  }
  if (target.hasAttribute("data-s03-send")) {
    const input = target.closest(".s03-chat-dock")?.querySelector("[data-s03-input]");
    if (!input?.value.trim()) {
      showToast("请先输入问题");
      input?.focus();
    } else {
      renderInteractivePreview("s03-loading", "S03");
    }
    return;
  }
  if (target.dataset.s03Action) {
    const messages = { "添加图片": "已打开图片选择", "语音输入": "请按住说话", "复制": "回答已复制", "分享": "已打开分享面板", "有用": "感谢你的反馈" };
    showToast(messages[target.dataset.s03Action] || `${target.dataset.s03Action}已完成`);
    return;
  }
  if (target.dataset.s24PolicyTab) {
    const root = target.closest(".s24-policy-page");
    root?.querySelectorAll("[data-s24-policy-tab]").forEach(item => item.classList.toggle("active", item === target));
    root?.querySelectorAll("[data-s24-policy-panel]").forEach(panel => { panel.hidden = panel.dataset.s24PolicyPanel !== target.dataset.s24PolicyTab; });
    return;
  }
  if (target.dataset.workOrderCategory) {
    workOrderData.selectedCategory = target.dataset.workOrderCategory;
    const root = target.closest(".s20-category-list");
    root?.querySelectorAll("[data-work-order-category]").forEach(item => {
      const selected = item.dataset.workOrderCategory === workOrderData.selectedCategory;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", selected ? "true" : "false");
      const mark = item.querySelector(":scope > em");
      if (mark) mark.textContent = selected ? "✓" : "○";
    });
    showToast(`已选择${workOrderData.selectedCategory}`);
    return;
  }
  if (target.hasAttribute("data-work-order-category-create")) {
    openWorkOrderCategoryModal();
    return;
  }
  if (target.hasAttribute("data-work-order-category-save")) {
    const input = $("#modal-root [data-work-order-category-name]");
    const name = input?.value.trim() || "";
    if (!name) {
      showToast("请输入类目名称");
      input?.focus();
      return;
    }
    if (workOrderData.categories.some(item => item.name === name)) {
      showToast("该类目已存在");
      input?.focus();
      return;
    }
    workOrderData.categories.push({ name, createdAt: "刚刚", count: 0 });
    workOrderData.selectedCategory = name;
    closeModal();
    if (!$("#preview-root").hidden && previewState.pageId) renderInteractivePreview(previewState.pageId, previewState.sceneId);
    render();
    showToast(`已创建类目“${name}”`);
    return;
  }
  if (target.dataset.s06Page) {
    renderInteractivePreview(target.dataset.s06Page, "S06");
    return;
  }
  if (target.dataset.s06Prompt) {
    const requestInput = target.closest(".mobile-page")?.querySelector("[data-s06-request]");
    if (requestInput) {
      requestInput.value = target.dataset.s06Prompt;
      requestInput.focus();
    }
    return;
  }
  if (target.hasAttribute("data-s06-select")) {
    const group = target.closest(".s06-select-group");
    if (group) {
      group.querySelectorAll("[data-s06-select]").forEach(item => {
        item.classList.toggle("active", item === target);
        item.setAttribute("aria-pressed", item === target ? "true" : "false");
        const marker = item.matches(".s06-hotel") ? item.querySelector(":scope > u") : item.closest(".s06-pay-methods") ? item.querySelector(":scope > em") : null;
        if (marker) marker.textContent = item === target ? "✓" : "○";
      });
    }
    return;
  }
  if (target.hasAttribute("data-s06-toggle")) {
    const isTraveler = Boolean(target.closest(".s06-traveler-list"));
    const activeClass = isTraveler ? "selected" : "active";
    const nextActive = !target.classList.contains(activeClass);
    target.classList.toggle(activeClass, nextActive);
    target.setAttribute("aria-pressed", nextActive ? "true" : "false");
    const marker = isTraveler ? target.querySelector(":scope > em") : null;
    if (marker) marker.textContent = nextActive ? "✓" : "○";
    return;
  }
  if (target.dataset.s06Day) {
    const pageRoot = target.closest(".mobile-body");
    if (pageRoot) {
      pageRoot.querySelectorAll("[data-s06-day]").forEach(item => item.classList.toggle("active", item === target));
      pageRoot.querySelectorAll("[data-s06-day-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.s06DayPanel === target.dataset.s06Day));
    }
    return;
  }
  if (target.hasAttribute("data-ui-choice")) {
    const group = target.closest("[data-ui-choice-group]");
    if (group) {
      const multiple = group.dataset.uiMultiple === "1";
      const nextActive = !target.classList.contains("active");
      if (!multiple) {
        group.querySelectorAll("[data-ui-choice]").forEach(item => {
          item.classList.toggle("active", item === target);
          item.setAttribute("aria-pressed", item === target ? "true" : "false");
        });
      } else {
        target.classList.toggle("active", nextActive);
        target.setAttribute("aria-pressed", nextActive ? "true" : "false");
      }
    }
    return;
  }
  if (target.hasAttribute("data-ui-card")) {
    const group = target.closest("[data-ui-card-group]");
    if (group) {
      group.querySelectorAll("[data-ui-card]").forEach(item => {
        item.classList.toggle("selected", item === target);
        item.setAttribute("aria-pressed", item === target ? "true" : "false");
      });
    }
    return;
  }
  if (target.hasAttribute("data-ui-person")) {
    const nextActive = !target.classList.contains("selected");
    target.classList.toggle("selected", nextActive);
    target.setAttribute("aria-pressed", nextActive ? "true" : "false");
    const marker = target.querySelector(":scope > i");
    if (marker) marker.textContent = nextActive ? "✓" : "○";
    return;
  }
  if (target.hasAttribute("data-ui-counter")) {
    const row = target.closest(".ui-counter-row");
    const valueNode = row?.querySelector("[data-ui-counter-value]");
    if (valueNode) {
      const current = Number(valueNode.textContent || 0);
      const delta = target.dataset.uiCounter === "plus" ? 1 : -1;
      valueNode.textContent = String(Math.max(0, Math.min(20, current + delta)));
    }
    return;
  }
  if (target.hasAttribute("data-ui-seat")) {
    const nextActive = !target.classList.contains("selected");
    target.classList.toggle("selected", nextActive);
    target.setAttribute("aria-pressed", nextActive ? "true" : "false");
    return;
  }
  if (target.hasAttribute("data-ui-rating")) {
    const value = Number(target.dataset.uiRating || 0);
    target.closest(".ui-rating")?.querySelectorAll("[data-ui-rating]").forEach(item => {
      const active = Number(item.dataset.uiRating) <= value;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", active ? "true" : "false");
      item.textContent = active ? "★" : "☆";
    });
    showToast(`已选择 ${value} 星`);
    return;
  }
  if (target.hasAttribute("data-ui-upload")) {
    if (target.classList.contains("fail")) {
      target.classList.remove("fail");
      target.classList.add("ok");
      const marker = target.querySelector(":scope > em");
      if (marker) marker.textContent = "✓";
      showToast("已重新上传并通过检查");
    } else if (!target.classList.contains("ok")) {
      target.classList.add("ok");
      const marker = target.querySelector(":scope > em");
      if (marker) marker.textContent = "✓";
      showToast("材料已上传");
    } else {
      showToast("已查看上传材料");
    }
    return;
  }
  if (target.hasAttribute("data-ui-row")) {
    const list = target.closest(".ui-list");
    if (list) {
      list.querySelectorAll("[data-ui-row]").forEach(item => item.classList.toggle("active", item === target));
      list.querySelectorAll("[data-ui-row]").forEach(item => item.setAttribute("aria-pressed", item === target ? "true" : "false"));
    }
    return;
  }
  if (target.hasAttribute("data-ui-quick")) {
    const label = target.querySelector("b")?.textContent || "功能";
    const routes = {
      "AI 行程": "s06-entry", "景区购票": "s10-mall", "园区导览": "s16-map", "节目演出": "s05-programs",
      "餐饮服务": "s17-categories", "交通停车": "s18-mode", "游客服务": "s21-entry", "年卡中心": "s12-list",
      "我的行程": "s09-list", "我的订单": "s14-list", "入园凭证": "s14-qr", "常用出行人": "s23-list", "演出提醒": "s09-pretrip"
    };
    if (routes[label]) {
      renderInteractivePreview(routes[label]);
      return;
    }
    target.closest(".ui-quick-grid")?.querySelectorAll("[data-ui-quick]").forEach(item => item.classList.toggle("active", item === target));
    showToast(`已选择${label}`);
    return;
  }
  if (target.hasAttribute("data-ui-route")) {
    renderInteractivePreview(target.dataset.uiRoute);
    return;
  }
  if (target.hasAttribute("data-journey-plan-send")) {
    const input = target.closest(".journey-hub-composer")?.querySelector("textarea");
    const value = input?.value.trim() || "";
    if (!value) {
      showToast("请先说说这次想怎么玩");
      input?.focus();
      return;
    }
    const completeSignals = [/\d+月|明天|后天/, /\d+人|一家|带孩子/, /自驾|高铁|公交/, /预算|元/, /住|住宿|当天往返/, /想看|必看|东京梦华|演出/];
    const isComplete = completeSignals.filter(rule => rule.test(value)).length >= 5;
    showToast(isComplete ? "信息完整，正在直接生成" : "还缺少关键信息，我会继续询问");
    renderInteractivePreview(isComplete ? "s06-input" : "s07-input");
    return;
  }
  if (target.hasAttribute("data-ui-send")) {
    const input = target.closest(".ui-composer")?.querySelector("input");
    if (!input?.value.trim()) {
      showToast("请先输入问题");
      input?.focus();
    } else {
      renderInteractivePreview("s03-loading", "S03");
    }
    return;
  }
  if (target.hasAttribute("data-ui-admin-op")) {
    const operation = target.dataset.uiAdminOp;
    if (operation === "查看") {
      openModal({ title: "查看工单", note: "QY20260817052 · 消费价格", fields: [["游客", "赵女士 · 158****3115"], ["问题摘要", "菜单标价 ¥76，实际支付 ¥88"], ["入园记录", "日间票 QY202608170026 · 已核验"], ["材料", "消费小票、菜单照片 · 完整"], ["当前状态", "待受理 · 客服组"], ["处理轨迹", "12:32 游客提交，等待客服受理"]], confirm: "关闭", hideCancel: true }, "", "", false);
    } else if (operation === "受理") {
      openModal({ title: "受理工单", note: "确认由客服组受理并开始核实。", fields: [["处理人", "王芳"], ["受理意见", "材料完整，进入客服核实"]], confirm: "确认受理" }, "s20-admin-processing", "工单已受理", true);
    } else if (operation === "复核") {
      openModal({ title: "冷处理复核", note: "同一游客再次提交消费价格类投诉。", fields: [["本次工单", "QY20260817061 · 入园记录已核验"], ["关联历史", "QY20260817052 · 已退还差额 ¥12"], ["匹配原因", "同一游客、同一类目、历史工单已完结"], ["本次新增材料", "8月20日消费小票、菜单照片"]], confirm: "进入复核" }, "s20-admin-cold", "", true);
    } else {
      showToast(`${operation}操作已打开`);
    }
    return;
  }
  if (target.hasAttribute("data-ui-action")) {
    if (target.dataset.uiAction === "查询工单") {
      const filter = target.closest(".admin-filter");
      const keyword = filter?.querySelector("input")?.value.trim().toLowerCase() || "";
      const values = [...(filter?.querySelectorAll("select") || [])].map(select => select.value);
      const table = filter?.nextElementSibling?.querySelector("tbody");
      let visible = 0;
      table?.querySelectorAll("tr").forEach(row => {
        const matched = (!keyword || row.textContent.toLowerCase().includes(keyword))
          && (values[0]?.startsWith("全部") || row.dataset.type === values[0])
          && (values[1]?.startsWith("全部") || row.dataset.status === values[1])
          && (values[2]?.startsWith("全部") || row.dataset.department === values[2])
          && (values[3] === "全部" || row.dataset.priority === values[3]);
        row.hidden = !matched;
        if (matched) visible += 1;
      });
      showToast(`查询完成，共 ${visible} 条工单`);
      return;
    }
    if (target.dataset.uiAction === "重置条件") {
      const filter = target.closest(".admin-filter");
      filter?.querySelectorAll("input").forEach(input => { input.value = ""; });
      filter?.querySelectorAll("select").forEach(select => { select.selectedIndex = 0; });
      filter?.nextElementSibling?.querySelectorAll("tbody tr").forEach(row => { row.hidden = false; });
      showToast("查询条件已重置");
      return;
    }
    showToast(`${target.dataset.uiAction}已选择`);
    target.classList.toggle("active");
    return;
  }
  if (target.dataset.pageAction === "1") {
    const targetPage = target.dataset.targetPage;
    const insidePreview = Boolean(target.closest("#preview-root"));
    if (targetPage === "s01-logged-home" || targetPage === "s12-payment") {
      const consent = target.closest(".mobile-page")?.querySelector(".ui-consent input");
      if (consent && !consent.checked) {
        showToast(targetPage === "s01-logged-home" ? "请先阅读并同意服务协议和隐私政策" : "请先同意年卡购买与使用协议");
        return;
      }
    }
    if (target.dataset.modalAction) {
      openModal(JSON.parse(decodeURIComponent(target.dataset.modalAction)), targetPage, target.dataset.toast || "", true);
      return;
    }
    if (targetPage && insidePreview) renderInteractivePreview(targetPage);
    else if (targetPage) renderInteractivePreview(targetPage, target.dataset.ownerScene || "");
    if (target.dataset.toast) showToast(target.dataset.toast);
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Enter" && event.target.matches?.("[data-s03-input]")) {
    event.preventDefault();
    event.target.closest(".s03-chat-dock")?.querySelector("[data-s03-send]")?.click();
    return;
  }
  if (event.key !== "Escape") return;
  if (!$("#modal-root").hidden) closeModal();
  else if (!$("#preview-root").hidden) closeInteractivePreview();
});

$("#scene-search").addEventListener("input", event => {
  state.search = event.target.value;
  renderNavigation();
  if (state.view === "catalog") renderCatalog();
});

window.addEventListener("hashchange", () => {
  loadHash();
  render();
});

loadHash();
render();
