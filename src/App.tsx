import { useMemo, useState } from 'react'
import './App.css'

type Topic = {
  id: string
  stage: '初中' | '高中'
  module: string
  title: string
  keywords: string[]
  models: string[]
}

type ModelTemplate = {
  id: string
  title: string
  domain: string
  level: '基础' | '高频' | '综合'
  description: string
  objects: string[]
  steps: string[]
}

const topics: Topic[] = [
  {
    id: 'junior-force',
    stage: '初中',
    module: '力学',
    title: '力、运动和简单机械',
    keywords: ['力的作用效果', '二力平衡', '摩擦力', '压强', '浮力', '杠杆', '滑轮'],
    models: ['受力分析', '斜面与摩擦', '杠杆平衡', '滑轮组'],
  },
  {
    id: 'junior-heat',
    stage: '初中',
    module: '热学',
    title: '分子热运动与内能',
    keywords: ['扩散', '分子运动', '温度', '内能', '比热容', '热机'],
    models: ['宏观到微观放大', '扩散模型', '冷热对比'],
  },
  {
    id: 'junior-electric',
    stage: '初中',
    module: '电学',
    title: '电路、欧姆定律和电功率',
    keywords: ['串并联', '电流', '电压', '电阻', '欧姆定律', '电功率'],
    models: ['电路拓扑', '电表示数变化', '滑动变阻器'],
  },
  {
    id: 'senior-kinematics',
    stage: '高中',
    module: '运动学',
    title: '匀变速直线运动',
    keywords: ['位移', '速度', '加速度', '图像', '追及相遇'],
    models: ['数轴运动', 'v-t 图像', '追及相遇'],
  },
  {
    id: 'senior-dynamics',
    stage: '高中',
    module: '动力学',
    title: '牛顿运动定律',
    keywords: ['整体隔离', '连接体', '斜面', '弹簧', '临界问题'],
    models: ['斜面滑块', '连接体', '弹簧临界', '传送带'],
  },
  {
    id: 'senior-energy',
    stage: '高中',
    module: '能量',
    title: '机械能与动量',
    keywords: ['动能定理', '机械能守恒', '动量守恒', '碰撞'],
    models: ['能量转化', '碰撞过程', '圆周轨道'],
  },
  {
    id: 'senior-em',
    stage: '高中',
    module: '电磁学',
    title: '电场、磁场和电磁感应',
    keywords: ['电场线', '带电粒子', '洛伦兹力', '法拉第定律', '楞次定律'],
    models: ['粒子偏转', '电磁感应', '磁场圆周运动'],
  },
]

const templates: ModelTemplate[] = [
  {
    id: 'incline-block',
    title: '斜面滑块/木板模型',
    domain: '高中力学',
    level: '高频',
    description: '白底几何图，物体沿斜面运动，按研究对象逐步显示重力、支持力、摩擦力和加速度。',
    objects: ['斜面', '物块 A/B', '木板 C', '挡板 P', '角度 θ', '受力箭头'],
    steps: ['还原题图', '选择研究对象', '受力分解', '建立方程', '播放运动过程', '给出结论'],
  },
  {
    id: 'circuit-change',
    title: '电路动态分析模型',
    domain: '初中/高中电学',
    level: '高频',
    description: '把复杂电路转成清晰拓扑，滑片移动时同步展示电表示数和电流路径变化。',
    objects: ['电源', '开关', '电阻', '滑动变阻器', '电压表', '电流表'],
    steps: ['识别串并联', '标电流路径', '等效化简', '滑片移动', '量表示数变化'],
  },
  {
    id: 'macro-micro',
    title: '宏观到微观放大模型',
    domain: '初中热学',
    level: '基础',
    description: '先展示真实容器或实验现象，再用放大镜推进到微观粒子，解释扩散、热运动等概念。',
    objects: ['宏观实验图', '放大镜', '分子粒子', '运动轨迹', '扩散云团'],
    steps: ['宏观现象', '提出问题', '镜头放大', '粒子运动', '概念总结'],
  },
  {
    id: 'vt-graph',
    title: '运动图像模型',
    domain: '高中运动学',
    level: '基础',
    description: '物体运动和 s-t / v-t 图像同步播放，让图像斜率、面积、交点直接可见。',
    objects: ['运动小车', '数轴', '坐标系', '速度线', '面积阴影'],
    steps: ['读题建轴', '运动同步', '图像生成', '面积/斜率强调', '结论'],
  },
  {
    id: 'pulley-system',
    title: '滑轮组受力模型',
    domain: '初中力学',
    level: '综合',
    description: '用简洁线条展示动滑轮、定滑轮、绳端拉力和机械效率计算。',
    objects: ['定滑轮', '动滑轮', '绳子', '重物', '拉力 F', '位移关系'],
    steps: ['画结构', '标绳段', '受力分析', '位移关系', '效率计算'],
  },
  {
    id: 'particle-field',
    title: '带电粒子场中运动模型',
    domain: '高中电磁学',
    level: '综合',
    description: '以极简坐标系展示粒子入射、受力方向、轨迹弯曲和临界边界。',
    objects: ['坐标系', '粒子', '电场/磁场', '速度 v', '力 F', '轨迹'],
    steps: ['确定场区', '画受力', '轨迹预测', '方程求解', '边界判断'],
  },
]

const sampleProblem =
  '如图，斜面倾角为 θ，木板 C 放在斜面上，物块 A、B 放在木板上。释放后系统沿斜面运动，求物块与木板之间的受力关系，并判断运动过程。'

function App() {
  const [stageFilter, setStageFilter] = useState<'全部' | '初中' | '高中'>('全部')
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id)
  const [selectedTemplateId, setSelectedTemplateId] = useState('incline-block')
  const [problem, setProblem] = useState(sampleProblem)

  const visibleTopics = useMemo(
    () => topics.filter((topic) => stageFilter === '全部' || topic.stage === stageFilter),
    [stageFilter],
  )

  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? topics[0]
  const selectedTemplate =
    templates.find((template) => template.id === selectedTemplateId) ?? templates[0]

  const storyboard = buildStoryboard(problem, selectedTemplate)

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">P</div>
          <div>
            <h1>物理可视化平台</h1>
            <p>知识点、模型、题目视频工作台</p>
          </div>
        </div>

        <div className="segmented" aria-label="学段筛选">
          {(['全部', '初中', '高中'] as const).map((stage) => (
            <button
              key={stage}
              type="button"
              className={stageFilter === stage ? 'active' : ''}
              onClick={() => setStageFilter(stage)}
            >
              {stage}
            </button>
          ))}
        </div>

        <section className="panel topic-panel">
          <div className="section-title">
            <span>知识点库</span>
            <small>{visibleTopics.length} 组</small>
          </div>
          <div className="topic-list">
            {visibleTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className={`topic-item ${topic.id === selectedTopic.id ? 'selected' : ''}`}
                onClick={() => setSelectedTopicId(topic.id)}
              >
                <strong>{topic.title}</strong>
                <span>
                  {topic.stage} · {topic.module}
                </span>
              </button>
            ))}
          </div>
        </section>
      </aside>

      <section className="main-workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Visual Physics Studio</p>
            <h2>把知识点和题目转成极简物理动画</h2>
          </div>
          <div className="pipeline-status">
            <span>题目解析</span>
            <span>模型匹配</span>
            <span>分镜生成</span>
            <span>视频渲染</span>
          </div>
        </header>

        <div className="content-grid">
          <section className="panel knowledge-card">
            <div className="section-title">
              <span>{selectedTopic.title}</span>
              <small>{selectedTopic.stage}</small>
            </div>
            <div className="keyword-grid">
              {selectedTopic.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
            <div className="linked-models">
              <p>关联模型</p>
              <div>
                {selectedTopic.models.map((model) => (
                  <button key={model} type="button">
                    {model}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="panel template-library">
            <div className="section-title">
              <span>常见模型模板</span>
              <small>{templates.length} 个</small>
            </div>
            <div className="template-grid">
              {templates.map((template) => (
                <button
                  type="button"
                  key={template.id}
                  className={`template-card ${template.id === selectedTemplate.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTemplateId(template.id)}
                >
                  <span className="level">{template.level}</span>
                  <strong>{template.title}</strong>
                  <small>{template.domain}</small>
                  <p>{template.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="panel canvas-panel">
            <div className="section-title">
              <span>极简可视化画布</span>
              <small>{selectedTemplate.title}</small>
            </div>
            <PhysicsCanvas templateId={selectedTemplate.id} />
          </section>

          <section className="panel workbench">
            <div className="section-title">
              <span>题目工作台</span>
              <small>输入后生成分镜草案</small>
            </div>
            <textarea value={problem} onChange={(event) => setProblem(event.target.value)} />
            <div className="object-chips">
              {selectedTemplate.objects.map((object) => (
                <span key={object}>{object}</span>
              ))}
            </div>
          </section>

          <section className="panel storyboard-panel">
            <div className="section-title">
              <span>视频分镜草案</span>
              <small>可交给 HyperFrames 渲染</small>
            </div>
            <ol className="storyboard">
              {storyboard.map((step) => (
                <li key={step.time}>
                  <time>{step.time}</time>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="panel render-card">
            <div className="section-title">
              <span>生成链路</span>
              <small>MVP</small>
            </div>
            <div className="render-flow">
              <div>
                <strong>1. 结构化</strong>
                <p>题目 → 物理对象、约束、目标量</p>
              </div>
              <div>
                <strong>2. 匹配模板</strong>
                <p>模型库 → 斜面/电路/图像/粒子</p>
              </div>
              <div>
                <strong>3. 生成脚本</strong>
                <p>分镜、字幕、配音稿、动画参数</p>
              </div>
              <div>
                <strong>4. 渲染导出</strong>
                <p>HyperFrames/Remotion → MP4</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function buildStoryboard(problem: string, template: ModelTemplate) {
  const trimmed = problem.trim()
  return [
    {
      time: '00:00',
      title: '还原题目图景',
      description: trimmed.length > 42 ? `${trimmed.slice(0, 42)}...` : trimmed,
    },
    {
      time: '00:12',
      title: '提取研究对象',
      description: `锁定 ${template.objects.slice(0, 4).join('、')}，隐藏无关文字。`,
    },
    {
      time: '00:26',
      title: '模型化分析',
      description: template.steps.slice(1, 4).join(' → '),
    },
    {
      time: '00:48',
      title: '运动或变化过程',
      description: '用少量关键帧展示状态变化，保留必要停顿，避免信息过载。',
    },
    {
      time: '01:10',
      title: '结论收束',
      description: '只保留最终判断、核心公式和易错点。',
    },
  ]
}

function PhysicsCanvas({ templateId }: { templateId: string }) {
  if (templateId === 'circuit-change') return <CircuitScene />
  if (templateId === 'macro-micro') return <MacroMicroScene />
  if (templateId === 'vt-graph') return <GraphScene />
  if (templateId === 'pulley-system') return <PulleyScene />
  if (templateId === 'particle-field') return <ParticleFieldScene />
  return <InclineScene />
}

function InclineScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="斜面滑块模型">
        <line x1="70" y1="354" x2="680" y2="354" className="axis" />
        <line x1="116" y1="306" x2="674" y2="354" className="slope-thin" />
        <polygon points="108,290 420,352 402,374 90,312" className="plank" />
        <rect x="172" y="272" width="34" height="46" rx="3" className="block red" transform="rotate(11 172 272)" />
        <rect x="292" y="296" width="34" height="46" rx="3" className="block blue" transform="rotate(11 292 296)" />
        <line x1="96" y1="289" x2="78" y2="254" className="pin" />
        <text x="45" y="260" className="label">P</text>
        <text x="176" y="260" className="label">A</text>
        <text x="306" y="284" className="label">B</text>
        <text x="422" y="380" className="label">C</text>
        <path d="M 618 354 A 54 54 0 0 0 672 350" className="theta" />
        <text x="638" y="337" className="label small">θ</text>
        <Arrow x1={306} y1={314} x2={306} y2={386} color="#7b3ff2" label="mg" />
        <Arrow x1={306} y1={314} x2={350} y2={258} color="#7b3ff2" label="N" />
        <Arrow x1={306} y1={314} x2={246} y2={302} color="#e04a3f" label="f" />
        <Arrow x1={346} y1={340} x2={430} y2={356} color="#1f6feb" label="a" />
      </svg>
    </div>
  )
}

function CircuitScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="电路动态模型">
        <rect x="120" y="90" width="500" height="250" rx="12" className="wire-box" />
        <line x1="180" y1="90" x2="180" y2="340" className="wire" />
        <line x1="120" y1="210" x2="620" y2="210" className="wire" />
        <circle cx="260" cy="210" r="34" className="meter" />
        <text x="248" y="219" className="label small">A</text>
        <rect x="380" y="184" width="90" height="52" rx="8" className="resistor" />
        <text x="407" y="219" className="label small">R</text>
        <path d="M 500 250 L 586 250" className="wire" />
        <rect x="500" y="230" width="86" height="40" rx="5" className="slider" />
        <circle cx="548" cy="230" r="8" className="node red-node" />
        <path d="M 548 230 L 590 180" className="signal" />
        <text x="512" y="308" className="caption-label">滑片移动，电流路径同步变化</text>
      </svg>
    </div>
  )
}

function MacroMicroScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="宏观到微观模型">
        <rect x="110" y="82" width="170" height="250" rx="20" className="jar" />
        <rect x="118" y="180" width="154" height="140" rx="8" className="water" />
        <path d="M 166 176 C 188 216 148 240 184 286 C 220 236 196 210 230 176" className="ink" />
        <circle cx="410" cy="210" r="116" className="lens" />
        <line x1="490" y1="292" x2="584" y2="360" className="lens-handle" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={365 + (i % 3) * 50}
            cy={170 + Math.floor(i / 3) * 62}
            r="14"
            className="particle"
          />
        ))}
        <path d="M 350 190 L 420 160 L 500 205" className="particle-path" />
        <text x="282" y="64" className="caption-label">从宏观现象放大到微观粒子</text>
      </svg>
    </div>
  )
}

function GraphScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="运动图像模型">
        <line x1="84" y1="318" x2="676" y2="318" className="axis" />
        <line x1="118" y1="338" x2="118" y2="76" className="axis" />
        <polyline points="118,318 248,270 388,206 560,112" className="graph-line" />
        <polygon points="118,318 388,206 388,318" className="area" />
        <circle cx="248" cy="270" r="9" className="node red-node" />
        <circle cx="388" cy="206" r="9" className="node blue-node" />
        <rect x="126" y="350" width="72" height="34" rx="6" className="cart" />
        <Arrow x1={198} y1={367} x2={318} y2={367} color="#1f6feb" label="v" />
        <text x="520" y="142" className="caption-label">斜率表示加速度，面积表示位移</text>
      </svg>
    </div>
  )
}

function PulleyScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="滑轮组模型">
        <line x1="140" y1="70" x2="590" y2="70" className="axis" />
        <circle cx="250" cy="150" r="44" className="pulley" />
        <circle cx="430" cy="236" r="44" className="pulley move" />
        <path d="M250 106 L430 192 L430 280 L250 194 L250 106" className="rope" />
        <rect x="390" y="286" width="80" height="72" rx="8" className="weight" />
        <Arrow x1={560} y1={140} x2={642} y2={140} color="#e04a3f" label="F" />
        <text x="292" y="384" className="caption-label">数绳段，建立力和位移关系</text>
      </svg>
    </div>
  )
}

function ParticleFieldScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="带电粒子场中运动模型">
        <rect x="260" y="80" width="330" height="260" rx="10" className="field" />
        <path d="M90 246 C210 246 260 246 332 226 C430 198 486 138 560 98" className="trajectory" />
        <circle cx="126" cy="246" r="12" className="particle" />
        <Arrow x1={126} y1={246} x2={218} y2={246} color="#1f6feb" label="v" />
        <Arrow x1={354} y1={220} x2={354} y2={156} color="#7b3ff2" label="F" />
        <text x="306" y="64" className="caption-label">场区内受力改变轨迹</text>
        <text x="614" y="334" className="label small">边界</text>
      </svg>
    </div>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  label,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  label: string
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const head = 10
  const p1 = `${x2},${y2}`
  const p2 = `${x2 - head * Math.cos(angle - Math.PI / 6)},${y2 - head * Math.sin(angle - Math.PI / 6)}`
  const p3 = `${x2 - head * Math.cos(angle + Math.PI / 6)},${y2 - head * Math.sin(angle + Math.PI / 6)}`
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4" />
      <polygon points={`${p1} ${p2} ${p3}`} fill={color} />
      <text x={(x1 + x2) / 2 + 8} y={(y1 + y2) / 2 - 8} fill={color} className="force-label">
        {label}
      </text>
    </g>
  )
}

export default App
