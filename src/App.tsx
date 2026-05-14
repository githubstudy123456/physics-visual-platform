import { useMemo, useState } from 'react'
import {
  books,
  chapters,
  modelTemplates,
  openAssetSources,
  type CanvasKind,
  type Chapter,
  type ModelTemplate,
} from './data/curriculum'
import './App.css'

const sampleProblem =
  '如图，斜面倾角为 θ，木板 C 放在斜面上，物块 A、B 放在木板上。释放后系统沿斜面运动，求物块与木板之间的受力关系，并判断运动过程。'

function App() {
  const [selectedBookId, setSelectedBookId] = useState(books[0].id)
  const [selectedChapterId, setSelectedChapterId] = useState(chapters[0].id)
  const [selectedTemplateId, setSelectedTemplateId] = useState(chapters[0].modelIds[0])
  const [problem, setProblem] = useState(sampleProblem)

  const visibleChapters = useMemo(
    () => chapters.filter((chapter) => chapter.bookId === selectedBookId),
    [selectedBookId],
  )

  const selectedBook = books.find((book) => book.id === selectedBookId) ?? books[0]
  const selectedChapter = chapters.find((chapter) => chapter.id === selectedChapterId) ?? chapters[0]
  const recommendedModels = selectedChapter.modelIds
    .map((id) => modelTemplates.find((template) => template.id === id))
    .filter((template): template is ModelTemplate => Boolean(template))
  const selectedTemplate =
    modelTemplates.find((template) => template.id === selectedTemplateId) ??
    recommendedModels[0] ??
    modelTemplates[0]
  const storyboard = buildStoryboard(problem, selectedChapter, selectedTemplate)

  function selectBook(bookId: string) {
    const firstChapter = chapters.find((chapter) => chapter.bookId === bookId) ?? chapters[0]
    setSelectedBookId(bookId)
    setSelectedChapterId(firstChapter.id)
    setSelectedTemplateId(firstChapter.modelIds[0])
  }

  function selectChapter(chapter: Chapter) {
    setSelectedChapterId(chapter.id)
    setSelectedTemplateId(chapter.modelIds[0])
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">P</div>
          <div>
            <h1>物理可视化平台</h1>
            <p>课程章节、模型库、题目视频工作台</p>
          </div>
        </div>

        <section className="panel book-panel">
          <div className="section-title">
            <span>教材</span>
            <small>{books.length} 本</small>
          </div>
          <div className="book-list">
            {books.map((book) => (
              <button
                key={book.id}
                type="button"
                className={book.id === selectedBook.id ? 'selected' : ''}
                onClick={() => selectBook(book.id)}
              >
                <strong>{book.title}</strong>
                <span>
                  {book.grade} · {book.volume}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel chapter-panel">
          <div className="section-title">
            <span>章节目录</span>
            <small>{visibleChapters.length} 章</small>
          </div>
          <div className="chapter-list">
            {visibleChapters.map((chapter) => (
              <button
                key={chapter.id}
                type="button"
                className={chapter.id === selectedChapter.id ? 'selected' : ''}
                onClick={() => selectChapter(chapter)}
              >
                <small>{chapter.chapterNo}</small>
                <strong>{chapter.title}</strong>
                <span>{chapter.domain}</span>
              </button>
            ))}
          </div>
        </section>
      </aside>

      <section className="main-workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Visual Physics Studio</p>
            <h2>{selectedChapter.chapterNo}：{selectedChapter.title}</h2>
            <p>{selectedBook.source}</p>
          </div>
          <div className="pipeline-status">
            <span>章节知识点</span>
            <span>模型匹配</span>
            <span>分镜脚本</span>
            <span>视频渲染</span>
          </div>
        </header>

        <div className="content-grid">
          <section className="panel chapter-detail">
            <div className="section-title">
              <span>知识点编排</span>
              <small>{selectedChapter.sections.length} 节</small>
            </div>
            <div className="lesson-list">
              {selectedChapter.sections.map((lesson, index) => (
                <article key={lesson.title} className="lesson-card">
                  <div className="lesson-index">{index + 1}</div>
                  <div>
                    <h3>{lesson.title}</h3>
                    <div className="keyword-grid">
                      {lesson.knowledge.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel template-library">
            <div className="section-title">
              <span>本章推荐模型</span>
              <small>{recommendedModels.length} 个</small>
            </div>
            <div className="template-grid compact">
              {recommendedModels.map((template) => (
                <TemplateButton
                  key={template.id}
                  template={template}
                  selected={template.id === selectedTemplate.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                />
              ))}
            </div>
            <div className="section-title all-model-title">
              <span>全部模型库</span>
              <small>{modelTemplates.length} 个</small>
            </div>
            <div className="template-grid">
              {modelTemplates.map((template) => (
                <TemplateButton
                  key={template.id}
                  template={template}
                  selected={template.id === selectedTemplate.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                />
              ))}
            </div>
          </section>

          <section className="panel canvas-panel">
            <div className="section-title">
              <span>极简可视化画布</span>
              <small>{selectedTemplate.title}</small>
            </div>
            <PhysicsCanvas kind={selectedTemplate.canvasKind} />
          </section>

          <ModelExplainer template={selectedTemplate} chapter={selectedChapter} />

          <section className="panel workbench">
            <div className="section-title">
              <span>题目工作台</span>
              <small>以后给题目就从这里生成</small>
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
              <small>简洁可视化风格</small>
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

          <section className="panel source-panel">
            <div className="section-title">
              <span>开放素材参考</span>
              <small>先参考，不直接硬依赖</small>
            </div>
            <div className="source-list">
              {openAssetSources.map((source) => (
                <a href={source.url} key={source.url} target="_blank">
                  <strong>{source.title}</strong>
                  <span>{source.note}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function ModelExplainer({ template, chapter }: { template: ModelTemplate; chapter: Chapter }) {
  const explainer = buildModelExplainer(template, chapter)

  return (
    <section className="panel explainer-panel">
      <div className="section-title">
        <span>通用模型讲解</span>
        <small>平台内置讲解模板</small>
      </div>
      <div className="explainer-layout">
        <div className="explainer-preview">
          <div className="preview-toolbar">
            <strong>{template.title}</strong>
            <span>{explainer.duration}</span>
          </div>
          <PhysicsCanvas kind={template.canvasKind} />
          <div className="playbar" aria-hidden="true">
            <span />
          </div>
        </div>

        <div className="explainer-copy">
          <p className="explainer-goal">{explainer.goal}</p>
          <ol className="explainer-steps">
            {explainer.steps.map((step) => (
              <li key={step.time}>
                <time>{step.time}</time>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="script-grid">
        <div>
          <h3>讲解词</h3>
          <div className="script-lines">
            {explainer.script.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div>
          <h3>常见题型</h3>
          <div className="question-types">
            {explainer.questionTypes.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
          <p className="render-note">
            通用模型在平台里固定沉淀；你后面把具体题目发在对话里，我按该模型单独生成分镜、配音和 MP4。
          </p>
        </div>
      </div>
    </section>
  )
}

function TemplateButton({
  template,
  selected,
  onClick,
}: {
  template: ModelTemplate
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={`template-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="level">{template.level}</span>
      <strong>{template.title}</strong>
      <small>{template.domain}</small>
      <p>{template.description}</p>
    </button>
  )
}

function buildStoryboard(problem: string, chapter: Chapter, template: ModelTemplate) {
  const firstLesson = chapter.sections[0]
  const trimmed = problem.trim()
  return [
    {
      time: '00:00',
      title: '章节定位',
      description: `${chapter.chapterNo}《${chapter.title}》，先说明本节属于 ${chapter.domain}。`,
    },
    {
      time: '00:10',
      title: '还原题目或现象',
      description: trimmed.length > 46 ? `${trimmed.slice(0, 46)}...` : trimmed,
    },
    {
      time: '00:24',
      title: '抽取核心知识点',
      description: `${firstLesson.title}：${firstLesson.knowledge.join('、')}。`,
    },
    {
      time: '00:42',
      title: '模型化可视化',
      description: `套用「${template.title}」：${template.steps.slice(0, 4).join(' → ')}。`,
    },
    {
      time: '01:08',
      title: '结论和易错点',
      description: '只保留最终判断、核心公式和一条易错提醒，适合短视频式清晰讲解。',
    },
  ]
}

function buildModelExplainer(template: ModelTemplate, chapter: Chapter) {
  const primaryLesson = chapter.sections[0]
  const coreKnowledge = primaryLesson.knowledge.slice(0, 3).join('、')
  const steps = [
    { time: '00:00', text: `先给出${chapter.domain}中的典型现象。` },
    { time: '00:12', text: `隐藏复杂条件，只保留${template.objects.slice(0, 3).join('、')}。` },
    { time: '00:26', text: `把现象抽象成「${template.title}」。` },
    { time: '00:42', text: template.steps[0] },
    { time: '00:58', text: template.steps[1] ?? '标出关键物理量和方向。' },
    { time: '01:14', text: '回到题目或实验，给出判断方法。' },
  ]

  return {
    duration: '约 90 秒',
    goal: `${template.explainer.goal} 对应「${chapter.title}」里的${coreKnowledge}。`,
    steps,
    script: [
      `这一类题先不要急着代公式。我们先看图中真正起作用的对象：${template.objects.join('、')}。`,
      ...template.explainer.narration,
      `讲解时按这个顺序推进：${template.steps.slice(0, 4).join('，')}。每一步只解决一个问题。`,
    ],
    questionTypes: buildQuestionTypes(chapter, template),
  }
}

function buildQuestionTypes(chapter: Chapter, template: ModelTemplate) {
  const generic = ['判断物理过程', '提取关键量', '建立关系式', '解释易错点']
  const domainTypes: Record<string, string[]> = {
    力学: ['受力分析', '运动状态判断', '压强浮力综合'],
    电学: ['电路识别', '表计变化', '功率与安全用电'],
    热学: ['宏观现象解释', '微观粒子模型', '能量转化'],
    光学: ['光路作图', '成像规律', '实验现象解释'],
    声学: ['波形识别', '音调响度判断', '传播条件'],
  }

  return [...template.explainer.commonTasks, ...(domainTypes[chapter.domain] ?? []), ...generic].slice(
    0,
    6,
  )
}

function PhysicsCanvas({ kind }: { kind: CanvasKind }) {
  if (kind === 'circuit') return <CircuitScene />
  if (kind === 'macroMicro') return <MacroMicroScene />
  if (kind === 'graph') return <GraphScene />
  if (kind === 'pulley') return <PulleyScene />
  if (kind === 'field') return <ParticleFieldScene />
  if (kind === 'optics') return <OpticsScene />
  if (kind === 'fluid') return <FluidScene />
  if (kind === 'energy') return <EnergyScene />
  if (kind === 'force') return <ForceScene />
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

function ForceScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="力的三要素模型">
        <rect x="320" y="172" width="112" height="74" rx="8" className="block blue" />
        <circle cx="376" cy="209" r="7" className="node red-node" />
        <Arrow x1={376} y1={209} x2={520} y2={209} color="#1f6feb" label="F" />
        <Arrow x1={376} y1={209} x2={376} y2={322} color="#7b3ff2" label="G" />
        <Arrow x1={376} y1={246} x2={376} y2={135} color="#16a34a" label="N" />
        <text x="250" y="86" className="caption-label">大小、方向、作用点决定力的作用效果</text>
        <line x1="120" y1="246" x2="650" y2="246" className="axis" />
      </svg>
    </div>
  )
}

function CircuitScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="电路模型">
        <rect x="120" y="90" width="500" height="250" rx="12" className="wire-box" />
        <line x1="180" y1="90" x2="180" y2="340" className="wire" />
        <line x1="120" y1="210" x2="620" y2="210" className="wire" />
        <circle cx="260" cy="210" r="34" className="meter" />
        <text x="248" y="219" className="label small">A</text>
        <rect x="380" y="184" width="90" height="52" rx="8" className="resistor" />
        <text x="407" y="219" className="label small">R</text>
        <rect x="500" y="230" width="86" height="40" rx="5" className="slider" />
        <circle cx="548" cy="230" r="8" className="node red-node" />
        <path d="M 548 230 L 590 180" className="signal" />
        <text x="512" y="308" className="caption-label">路径高亮 + 量表示数变化</text>
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
          <circle key={i} cx={365 + (i % 3) * 50} cy={170 + Math.floor(i / 3) * 62} r="14" className="particle" />
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
        <text x="520" y="142" className="caption-label">斜率和面积可视化</text>
      </svg>
    </div>
  )
}

function OpticsScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="光路模型">
        <line x1="380" y1="70" x2="380" y2="360" className="normal" />
        <line x1="130" y1="215" x2="630" y2="215" className="axis" />
        <path d="M 362 94 C 320 160 320 270 362 336" className="lens-outline" />
        <path d="M 398 94 C 440 160 440 270 398 336" className="lens-outline" />
        <line x1="126" y1="135" x2="380" y2="215" className="ray" />
        <line x1="380" y1="215" x2="636" y2="294" className="ray" />
        <line x1="126" y1="294" x2="380" y2="215" className="ray alt" />
        <line x1="380" y1="215" x2="636" y2="135" className="ray alt" />
        <text x="288" y="56" className="caption-label">用主光线确定成像</text>
      </svg>
    </div>
  )
}

function FluidScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="流体压强和浮力模型">
        <rect x="160" y="90" width="230" height="260" rx="18" className="jar" />
        <rect x="170" y="180" width="210" height="160" rx="8" className="water" />
        <rect x="260" y="210" width="70" height="70" rx="8" className="block blue" />
        <Arrow x1={295} y1={280} x2={295} y2={340} color="#7b3ff2" label="G" />
        <Arrow x1={295} y1={210} x2={295} y2={138} color="#16a34a" label="F浮" />
        <line x1="470" y1="120" x2="470" y2="340" className="axis" />
        <line x1="470" y1="260" x2="600" y2="260" className="pressure-line" />
        <text x="506" y="246" className="caption-label">p=ρgh</text>
      </svg>
    </div>
  )
}

function EnergyScene() {
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="能量流模型">
        <rect x="90" y="168" width="130" height="76" rx="8" className="energy-box" />
        <rect x="316" y="168" width="130" height="76" rx="8" className="energy-box hot" />
        <rect x="542" y="168" width="130" height="76" rx="8" className="energy-box motion" />
        <Arrow x1={220} y1={206} x2={316} y2={206} color="#f97316" label="" />
        <Arrow x1={446} y1={206} x2={542} y2={206} color="#1f6feb" label="" />
        <text x="116" y="216" className="label small">化学能</text>
        <text x="354" y="216" className="label small">内能</text>
        <text x="572" y="216" className="label small">机械能</text>
        <rect x="210" y="302" width="340" height="28" rx="14" className="efficiency-bg" />
        <rect x="210" y="302" width="214" height="28" rx="14" className="efficiency-fill" />
        <text x="284" y="360" className="caption-label">能量转化 + 损失 + 效率</text>
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
      <svg viewBox="0 0 760 430" role="img" aria-label="场中运动模型">
        <rect x="260" y="80" width="330" height="260" rx="10" className="field" />
        <path d="M90 246 C210 246 260 246 332 226 C430 198 486 138 560 98" className="trajectory" />
        <circle cx="126" cy="246" r="12" className="particle" />
        <Arrow x1={126} y1={246} x2={218} y2={246} color="#1f6feb" label="v" />
        <Arrow x1={354} y1={220} x2={354} y2={156} color="#7b3ff2" label="F" />
        <text x="306" y="64" className="caption-label">场区内受力改变轨迹</text>
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
      {label ? (
        <text x={(x1 + x2) / 2 + 8} y={(y1 + y2) / 2 - 8} fill={color} className="force-label">
          {label}
        </text>
      ) : null}
    </g>
  )
}

export default App
