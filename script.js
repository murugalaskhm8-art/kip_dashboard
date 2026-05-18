/* ============================================================
   FoodPro Sales KPI Dashboard — script.js
   All chart logic, data, counters, and interactions
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────
   1.  GLOBAL CHART.JS DEFAULTS
   ────────────────────────────────────────────── */
Chart.defaults.color          = '#7a849a';
Chart.defaults.font.family    = "'DM Sans', sans-serif";
Chart.defaults.font.size      = 11;
Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.tooltip.backgroundColor = '#1e2535';
Chart.defaults.plugins.tooltip.borderColor      = 'rgba(255,255,255,0.08)';
Chart.defaults.plugins.tooltip.borderWidth      = 1;
Chart.defaults.plugins.tooltip.titleColor       = '#e8eaf0';
Chart.defaults.plugins.tooltip.bodyColor        = '#7a849a';
Chart.defaults.plugins.tooltip.padding          = 10;
Chart.defaults.plugins.tooltip.cornerRadius     = 8;

const CLR_GREEN  = '#3ecf8e';
const CLR_ORANGE = '#f97316';
const CLR_BLUE   = '#3b9eff';
const CLR_YELLOW = '#f5c542';
const CLR_RED    = '#f94e4e';
const CLR_PURPLE = '#a78bfa';

/* ──────────────────────────────────────────────
   2.  DATASET
   ────────────────────────────────────────────── */
const DATA = {
kpi: {
  revenue: 12503560,
  units: 84720,
  customers: 3580,
  profit: 8565260,
  revenueTarget: 16500000
},

  weekly: {
    labels: Array.from({length: 21}, (_, i) => `W${i + 1}`),
    revenue: [
      310000, 298000, 330000, 345000, 390000, 410000, 360000,
      420000, 450000, 480000, 460000, 510000, 530000, 500000,
      560000, 590000, 570000, 620000, 660000, 640000, 690000
    ],
    target: Array(21).fill(595000)
  },

  monthly: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    revenue: [820000,870000,910000,960000,1020000,1080000,1010000,1140000,1200000,1170000,1250000,1280000],
  },

  category: {
    labels: ['Dairy Products','Packaged Foods','Beverages','Grains & Pulses'],
    values: [40, 25, 20, 15],
    colors: [CLR_GREEN, CLR_BLUE, CLR_ORANGE, CLR_YELLOW]
  },

  products: [
    { name:'Full Cream Milk',    cat:'Dairy',    catClr:CLR_GREEN,  units:18400, revenue:1932000, margin:32, growth:+14.2, status:'hot'  },
    { name:'Whole Wheat Biscuit',cat:'Packaged', catClr:CLR_BLUE,   units:15200, revenue:1216000, margin:28, growth:+8.7,  status:'good' },
    { name:'Mango Fruit Drink',  cat:'Beverage', catClr:CLR_ORANGE, units:12800, revenue:1024000, margin:24, growth:+22.1, status:'hot'  },
    { name:'Brown Rice (5kg)',   cat:'Grains',   catClr:CLR_YELLOW, units:9600,  revenue:864000,  margin:19, growth:+5.3,  status:'good' },
    { name:'Cheddar Cheese',     cat:'Dairy',    catClr:CLR_GREEN,  units:7400,  revenue:1258000, margin:41, growth:-2.1,  status:'slow' },
    { name:'Mixed Dal Pack',     cat:'Grains',   catClr:CLR_YELLOW, units:11200, revenue:728000,  margin:22, growth:+9.8,  status:'good' },
    { name:'Cold Coffee RTD',    cat:'Beverage', catClr:CLR_ORANGE, units:8900,  revenue:623000,  margin:31, growth:+18.6, status:'hot'  },
    { name:'Paneer Block 500g',  cat:'Dairy',    catClr:CLR_GREEN,  units:6200,  revenue:868000,  margin:36, growth:+7.4,  status:'good' },
  ],

  regions: [
    { name:'Tamil Nadu',      pct:32, clr: CLR_GREEN  },
    { name:'Karnataka',       pct:24, clr: CLR_BLUE   },
    { name:'Andhra Pradesh',  pct:20, clr: CLR_ORANGE },
    { name:'Kerala',          pct:15, clr: CLR_YELLOW },
    { name:'Others',          pct:9,  clr: CLR_PURPLE },
  ],

  sparkData: {
    spark1: [88, 90, 95, 98, 102, 100, 105, 104, 108, 105, 107, 105],
    spark2: [2100,2150,2200,2260,2310,2380,2400,2440,2490,2510,2540,2560],
    spark3: [310, 305, 298, 302, 295, 288, 292, 285, 290, 282, 285, 286],
    spark4: [3100,3180,3220,3300,3350,3400,3380,3420,3440,3410,3430,3420],
  }
};

/* ──────────────────────────────────────────────
   3.  COUNTER ANIMATION
   ────────────────────────────────────────────── */
function animateCounter(el, target, prefix = '', suffix = '') {

  let current = 0;
  const increment = target / 100;

  const counter = setInterval(() => {

    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(counter);
    }

    el.textContent =
      prefix + Math.round(current).toLocaleString('en-IN') + suffix;

  }, 20);
}
function initKPICards() {
  const { revenue, units, customers, profit } = DATA.kpi;
  animateCounter(document.getElementById('kv-revenue'),   revenue,   '₹');
  animateCounter(document.getElementById('kv-units'),     units,     '',  ' units');
  animateCounter(document.getElementById('kv-customers'), customers, '',  ' new');
  animateCounter(document.getElementById('kv-profit'),    profit,    '₹');

  const avgWeekly = Math.round(DATA.weekly.revenue.reduce((a,b)=>a+b,0) / DATA.weekly.revenue.length);
  document.getElementById('avg-weekly').textContent = '₹' + avgWeekly.toLocaleString('en-IN');

  const aboveTarget = revenue - DATA.kpi.revenueTarget;
  document.getElementById('above-target').textContent =
    (aboveTarget > 0 ? '+' : '') + '₹' + Math.abs(aboveTarget).toLocaleString('en-IN');
  document.getElementById('ti-ach').textContent  = '₹' + revenue.toLocaleString('en-IN');
  document.getElementById('ti-gap').textContent  = (aboveTarget > 0 ? '+' : '') + '₹' + Math.abs(aboveTarget).toLocaleString('en-IN');

  // Animate bars after a short delay
  setTimeout(() => {
    document.getElementById('bar1').style.width = '78%';
    document.getElementById('bar2').style.width = '63%';
    document.getElementById('bar3').style.width = '55%';
    document.getElementById('bar4').style.width = '85%';
  }, 200);
}

/* ──────────────────────────────────────────────
   4.  WEEKLY BAR CHART
   ────────────────────────────────────────────── */
function initWeeklyChart() {
  const ctx = document.getElementById('weeklyChart').getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 210);
  gradient.addColorStop(0,   CLR_GREEN + 'bb');
  gradient.addColorStop(1,   CLR_GREEN + '22');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DATA.weekly.labels,
      datasets: [
        {
          label: 'Revenue',
          data: DATA.weekly.revenue,
          backgroundColor: gradient,
          borderColor: CLR_GREEN,
          borderWidth: 0,
          borderRadius: 5,
          borderSkipped: 'bottom',
          barPercentage: 0.6,
        },
        {
          label: 'Target',
          data: DATA.weekly.target,
          type: 'line',
          borderColor: CLR_ORANGE,
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          fill: false,
          tension: 0,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { maxTicksLimit: 10 }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
          border: { display: false, dash: [4, 4] },
          ticks: {
            callback: v => '₹' + (v/1000).toFixed(0) + 'K'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => ' ₹' + ctx.parsed.y.toLocaleString('en-IN')
          }
        }
      },
      animation: { duration: 1000, easing: 'easeOutQuart' }
    }
  });
}

/* ──────────────────────────────────────────────
   5.  TARGET DONUT CHART
   ────────────────────────────────────────────── */
function initTargetChart() {
  const pct = Math.round((DATA.kpi.revenue / DATA.kpi.revenueTarget) * 100);
  const pctEl = document.getElementById('target-pct');

  // Animate pct counter
  let cur = 0;
  const step = () => {
    cur = Math.min(cur + 2, pct);
    pctEl.textContent = cur + '%';
    if (cur < pct) requestAnimationFrame(step);
  };
  setTimeout(() => requestAnimationFrame(step), 400);

  const ctx = document.getElementById('targetChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [Math.min(pct, 100), Math.max(0, 100 - pct)],
        backgroundColor: [CLR_GREEN, 'rgba(255,255,255,0.06)'],
        borderWidth: 0,
        hoverOffset: 4,
        cutout: '78%',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { tooltip: { enabled: false } },
      animation: { animateRotate: true, duration: 1200, easing: 'easeOutQuart' }
    }
  });
}

/* ──────────────────────────────────────────────
   6.  MONTHLY GROWTH LINE CHART
   ────────────────────────────────────────────── */
function initMonthlyChart() {
  const rev = DATA.monthly.revenue;
  const growthPct = (((rev[rev.length-1] - rev[0]) / rev[0]) * 100).toFixed(1);
  document.getElementById('growth-badge').textContent = '+' + growthPct + '%';

  const ctx = document.getElementById('monthlyChart').getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 170);
  grad.addColorStop(0, CLR_GREEN + '55');
  grad.addColorStop(1, CLR_GREEN + '00');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DATA.monthly.labels,
      datasets: [{
        data: rev,
        backgroundColor: rev.map((_, i) =>
          i === rev.length - 1 ? CLR_GREEN : CLR_GREEN + '66'
        ),
        borderRadius: 5,
        borderSkipped: 'bottom',
        barPercentage: 0.65,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          border: { display: false },
          ticks: { callback: v => '₹' + (v/1000).toFixed(0) + 'K' }
        }
      },
      plugins: {
        tooltip: {
          callbacks: { label: c => ' ₹' + c.parsed.y.toLocaleString('en-IN') }
        }
      },
      animation: { duration: 900 }
    }
  });
}

/* ──────────────────────────────────────────────
   7.  CATEGORY PIE CHART
   ────────────────────────────────────────────── */
function initCategoryChart() {
  const { labels, values, colors } = DATA.category;
  const ctx = document.getElementById('categoryChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#161b24',
        hoverOffset: 6,
        cutout: '60%',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: { label: c => ` ${c.label}: ${c.parsed}%` }
        }
      },
      animation: { duration: 1000 }
    }
  });

  // Build legend
  const legend = document.getElementById('pie-legend');
  labels.forEach((lbl, i) => {
    const item = document.createElement('div');
    item.className = 'pie-leg-item';
    item.innerHTML = `
      <span class="pie-leg-dot" style="background:${colors[i]}"></span>
      <span class="pie-leg-name">${lbl}</span>
      <span class="pie-leg-pct">${values[i]}%</span>`;
    legend.appendChild(item);
  });
}

/* ──────────────────────────────────────────────
   8.  SPARKLINE CHARTS
   ────────────────────────────────────────────── */
function mkSparkline(id, data, color) {
  const ctx = document.getElementById(id).getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 40);
  grad.addColorStop(0, color + '44');
  grad.addColorStop(1, color + '00');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array(data.length).fill(''),
      datasets: [{
        data,
        borderColor: color,
        borderWidth: 1.8,
        pointRadius: 0,
        fill: true,
        backgroundColor: grad,
        tension: 0.4,
      }]
    },
    options: {
      responsive: false,
      animation: { duration: 1200 },
      scales: { x: { display: false }, y: { display: false } },
      plugins: { tooltip: { enabled: false } },
    }
  });
}

function initSparklines() {
  const { spark1, spark2, spark3, spark4 } = DATA.sparkData;
  mkSparkline('spark1', spark1, CLR_GREEN);
  mkSparkline('spark2', spark2, CLR_BLUE);
  mkSparkline('spark3', spark3, CLR_YELLOW);
  mkSparkline('spark4', spark4, CLR_ORANGE);
}

/* ──────────────────────────────────────────────
   9.  PRODUCTS TABLE
   ────────────────────────────────────────────── */
function renderProductsTable(filter = '') {
  const tbody = document.getElementById('prod-tbody');
  tbody.innerHTML = '';

  const filtered = DATA.products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.cat.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(p => {
    const statusMap = { hot: ['st-hot','Hot 🔥'], good: ['st-good','Selling'], slow: ['st-slow','Steady'] };
    const [stCls, stLbl] = statusMap[p.status];
    const growthHtml = p.growth >= 0
      ? `<span class="growth-up">▲ ${p.growth}%</span>`
      : `<span class="growth-down">▼ ${Math.abs(p.growth)}%</span>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="prod-name">${p.name}</span></td>
      <td><span class="cat-badge" style="background:${p.catClr}20;color:${p.catClr};border:1px solid ${p.catClr}30">${p.cat}</span></td>
      <td>${p.units.toLocaleString('en-IN')}</td>
      <td>₹${p.revenue.toLocaleString('en-IN')}</td>
      <td>${p.margin}%</td>
      <td>${growthHtml}</td>
      <td><span class="status-badge ${stCls}">${stLbl}</span></td>`;
    tbody.appendChild(tr);
  });
}

document.getElementById('prod-search').addEventListener('input', e => {
  renderProductsTable(e.target.value);
});

/* ──────────────────────────────────────────────
   10. REGION BARS
   ────────────────────────────────────────────── */
function initRegions() {
  const container = document.getElementById('region-list');
  DATA.regions.forEach(r => {
    const div = document.createElement('div');
    div.className = 'region-item';
    div.innerHTML = `
      <div class="region-top">
        <span>${r.name}</span>
        <span class="region-pct">${r.pct}%</span>
      </div>
      <div class="region-bar">
        <div class="region-bar-fill" style="width:0%;background:${r.clr}" data-target="${r.pct}"></div>
      </div>`;
    container.appendChild(div);
  });

  // Animate after render
  setTimeout(() => {
    document.querySelectorAll('.region-bar-fill').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  }, 300);
}

/* ──────────────────────────────────────────────
   11. PERIOD BUTTONS
   ────────────────────────────────────────────── */
document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Placeholder: in a real app you'd re-fetch data here
  });
});

/* ──────────────────────────────────────────────
   12. EXPORT BUTTON
   ────────────────────────────────────────────── */
document.querySelector('.export-btn').addEventListener('click', () => {
  const rows = [
    ['Product','Category','Units Sold','Revenue','Margin %','Growth %'],
    ...DATA.products.map(p => [p.name, p.cat, p.units, p.revenue, p.margin, p.growth])
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'foodpro_sales_kpi.csv';
  a.click();
});

/* ──────────────────────────────────────────────
   13. INIT ALL
   ────────────────────────────────────────────── */
window.onload = function () {

  initKPICards();

  try {
    initWeeklyChart();
    initTargetChart();
    initMonthlyChart();
    initCategoryChart();
    initSparklines();
  } catch (err) {
    console.log("Chart error:", err);
  }

  renderProductsTable();
  initRegions();
};
