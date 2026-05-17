'use client'

import { useEffect, useMemo, useState } from 'react'
import { Bodies, Body, Composite, Engine } from 'matter-js'
import {
  books,
  chapters,
  modelTemplates,
  type CanvasKind,
  type Chapter,
  type ModelTemplate,
} from './data/curriculum'
import {
  chapterLectures,
  knowledgePoints,
  physicsSubjectOverview,
  type ExerciseTask,
  type KnowledgePointDetail,
  type ViewMode,
} from './data/systematic'

type SimParams = {
  time: number
  angle: number
  force: number
  voltage: number
  resistance: number
  temperature: number
  density: number
  height: number
}

type ParamControl = {
  key: keyof SimParams
  label: string
  min: number
  max: number
  step: number
  unit: string
}

const modelDurationSeconds = 90

const defaultParams: SimParams = {
  time: 0,
  angle: 30,
  force: 60,
  voltage: 6,
  resistance: 10,
  temperature: 35,
  density: 55,
  height: 50,
}

function App() {
  const [selectedStage, setSelectedStage] = useState<'初中' | '高中'>(books[0].stage)
  const [selectedBookId, setSelectedBookId] = useState(books[0].id)
  const [selectedChapterId, setSelectedChapterId] = useState(chapters[0].id)
  const [selectedLessonTitle, setSelectedLessonTitle] = useState(chapters[0].sections[0].title)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [selectedView, setSelectedView] = useState<ViewMode>('subject')
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string | null>(null)

  const visibleBooks = useMemo(
    () => books.filter((book) => book.stage === selectedStage),
    [selectedStage],
  )

  const visibleChapters = useMemo(
    () => chapters.filter((chapter) => chapter.bookId === selectedBookId),
    [selectedBookId],
  )

  const selectedBook = books.find((book) => book.id === selectedBookId) ?? books[0]
  const selectedChapter = chapters.find((chapter) => chapter.id === selectedChapterId) ?? chapters[0]
  const selectedLesson =
    selectedChapter.sections.find((lesson) => lesson.title === selectedLessonTitle) ?? selectedChapter.sections[0]
  const selectedTemplate = selectedTemplateId
    ? modelTemplates.find((template) => template.id === selectedTemplateId) ?? null
    : null
  const lessonKnowledgePoints = knowledgePoints.filter(
    (point) => point.chapterId === selectedChapter.id && point.lessonTitle === selectedLesson.title,
  )
  const selectedKnowledge =
    lessonKnowledgePoints.find((point) => point.id === selectedKnowledgeId) ?? lessonKnowledgePoints[0] ?? null

  function selectBook(bookId: string) {
    const firstChapter = chapters.find((chapter) => chapter.bookId === bookId) ?? chapters[0]
    setSelectedBookId(bookId)
    setSelectedStage(books.find((book) => book.id === bookId)?.stage ?? selectedStage)
    setSelectedChapterId(firstChapter.id)
    setSelectedLessonTitle(firstChapter.sections[0].title)
    setSelectedTemplateId(null)
    setSelectedKnowledgeId(null)
    setSelectedView('chapter')
  }

  function selectStage(stage: '初中' | '高中') {
    const firstBook = books.find((book) => book.stage === stage) ?? books[0]
    const firstChapter = chapters.find((chapter) => chapter.bookId === firstBook.id) ?? chapters[0]
    setSelectedStage(stage)
    setSelectedBookId(firstBook.id)
    setSelectedChapterId(firstChapter.id)
    setSelectedLessonTitle(firstChapter.sections[0].title)
    setSelectedTemplateId(null)
    setSelectedKnowledgeId(null)
    setSelectedView('chapter')
  }

  function selectChapter(chapter: Chapter) {
    setSelectedChapterId(chapter.id)
    setSelectedLessonTitle(chapter.sections[0].title)
    setSelectedTemplateId(null)
    setSelectedKnowledgeId(null)
    setSelectedView('chapter')
  }

  function selectLesson(title: string) {
    setSelectedLessonTitle(title)
    setSelectedTemplateId(null)
    setSelectedKnowledgeId(null)
    setSelectedView('lesson')
  }

  function selectKnowledge(point: KnowledgePointDetail) {
    setSelectedLessonTitle(point.lessonTitle)
    setSelectedKnowledgeId(point.id)
    setSelectedTemplateId(null)
    setSelectedView('knowledge')
  }

  function selectPractice(point?: KnowledgePointDetail | null) {
    if (point) {
      setSelectedLessonTitle(point.lessonTitle)
      setSelectedKnowledgeId(point.id)
    }
    setSelectedTemplateId(null)
    setSelectedView('practice')
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

        <button
          type="button"
          className={selectedView === 'subject' ? 'subject-entry selected' : 'subject-entry'}
          onClick={() => {
            setSelectedTemplateId(null)
            setSelectedKnowledgeId(null)
            setSelectedView('subject')
          }}
        >
          <strong>学科总览</strong>
          <span>物理是什么、发展历史、知识框架</span>
        </button>

        <section className="panel book-panel">
          <div className="section-title">
            <span>教材</span>
            <small>{visibleBooks.length} 本</small>
          </div>
          <div className="stage-tabs">
            {(['初中', '高中'] as const).map((stage) => (
              <button
                key={stage}
                type="button"
                className={stage === selectedStage ? 'active' : ''}
                onClick={() => selectStage(stage)}
              >
                {stage}
              </button>
            ))}
          </div>
          <div className="book-list">
            {visibleBooks.map((book) => (
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
              <article
                key={chapter.id}
                className={chapter.id === selectedChapter.id ? 'chapter-card selected' : 'chapter-card'}
              >
                <button type="button" className="chapter-trigger" onClick={() => selectChapter(chapter)}>
                  <small>{chapter.chapterNo}</small>
                  <strong>{chapter.title}</strong>
                  <span>{chapter.domain}</span>
                </button>
                {chapter.id === selectedChapter.id ? (
                  <div className="sidebar-lessons">
                    {chapter.sections.map((lesson, index) => (
                      <section
                        key={lesson.title}
                        className={lesson.title === selectedLesson.title && !selectedTemplate ? 'sidebar-lesson selected' : 'sidebar-lesson'}
                      >
                        <button type="button" className="lesson-trigger" onClick={() => selectLesson(lesson.title)}>
                          {index + 1}. {lesson.title}
                        </button>
                        <div className="sidebar-keywords">
                          {lessonKnowledgePointsFor(selectedChapter.id, lesson.title).length > 0
                            ? lessonKnowledgePointsFor(selectedChapter.id, lesson.title).map((point) => (
                                <button
                                  key={point.id}
                                  type="button"
                                  className={point.id === selectedKnowledge?.id && selectedView === 'knowledge' ? 'keyword-button selected' : 'keyword-button'}
                                  onClick={() => selectKnowledge(point)}
                                >
                                  {point.title}
                                </button>
                              ))
                            : lesson.knowledge.map((item) => <span key={item}>{item}</span>)}
                        </div>
                        <div className="sidebar-models">
                          {lessonKnowledgePointsFor(selectedChapter.id, lesson.title).length > 0 ? (
                            <button type="button" onClick={() => selectPractice(lessonKnowledgePointsFor(selectedChapter.id, lesson.title)[0])}>
                              练习任务
                            </button>
                          ) : null}
                          {getLessonModels(lesson).map((template) => (
                            <button
                              key={template.id}
                              type="button"
                              className={template.id === selectedTemplate?.id ? 'selected' : ''}
                              onClick={() => {
                                setSelectedLessonTitle(lesson.title)
                                setSelectedView('model')
                                setSelectedTemplateId(template.id)
                              }}
                            >
                              {template.title}
                            </button>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </aside>

      <section className="main-workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Visual Physics Studio</p>
            <h2>{selectedView === 'subject' ? '物理学科体系' : `${selectedChapter.chapterNo}：${selectedChapter.title}`}</h2>
            <p>{selectedView === 'subject' ? physicsSubjectOverview.tagline : selectedBook.source}</p>
          </div>
          <nav className="view-switcher" aria-label="当前内容视图">
            <button
              type="button"
              className={selectedView === 'subject' ? 'active' : ''}
              onClick={() => {
                setSelectedTemplateId(null)
                setSelectedKnowledgeId(null)
                setSelectedView('subject')
              }}
            >
              学科
            </button>
            <button type="button" className={selectedView === 'chapter' ? 'active' : ''} onClick={() => selectChapter(selectedChapter)}>
              章节
            </button>
            <button type="button" className={selectedView === 'lesson' || selectedView === 'knowledge' ? 'active' : ''} onClick={() => selectLesson(selectedLesson.title)}>
              知识点
            </button>
            <button type="button" className={selectedView === 'practice' ? 'active' : ''} onClick={() => selectPractice(selectedKnowledge)}>
              练习
            </button>
            <button
              type="button"
              className={selectedView === 'model' ? 'active' : ''}
              onClick={() => {
                const modelId = selectedKnowledge?.modelIds[0] ?? getLessonModels(selectedLesson)[0]?.id ?? modelTemplates[0]?.id
                if (modelId) {
                  setSelectedTemplateId(modelId)
                  setSelectedView('model')
                }
              }}
            >
              模型
            </button>
          </nav>
        </header>

        <div className="content-grid">
          {selectedView === 'subject' ? <SubjectOverviewPanel /> : null}
          {selectedView === 'chapter' ? <ChapterLecturePanel chapter={selectedChapter} /> : null}
          {selectedView === 'lesson' ? (
            <KnowledgeExplainer
              chapter={selectedChapter}
              lesson={selectedLesson}
              points={lessonKnowledgePoints}
              onSelectKnowledge={selectKnowledge}
              onSelectPractice={selectPractice}
            />
          ) : null}
          {selectedView === 'knowledge' && selectedKnowledge ? (
            <KnowledgePointPanel
              point={selectedKnowledge}
              onSelectModel={(modelId) => {
                setSelectedTemplateId(modelId)
                setSelectedView('model')
              }}
              onSelectPractice={() => selectPractice(selectedKnowledge)}
            />
          ) : null}
          {selectedView === 'practice' ? (
            <PracticePanel chapter={selectedChapter} point={selectedKnowledge} lessonPoints={lessonKnowledgePoints} />
          ) : null}
          {selectedView === 'model' && selectedTemplate ? (
            <ModelExplainer key={selectedTemplate.id} template={selectedTemplate} chapter={selectedChapter} />
          ) : null}
        </div>
      </section>
    </main>
  )
}

function ModelExplainer({ template, chapter }: { template: ModelTemplate; chapter: Chapter }) {
  const [params, setParams] = useState<SimParams>(defaultParams)
  const [isPlaying, setIsPlaying] = useState(false)
  const explainer = buildModelExplainer(template, chapter)
  const activeStepIndex = getActiveStepIndex(params.time, explainer.steps)
  const controls = getParamControls(template)
  const observations = getObservations(template, params)

  useEffect(() => {
    if (!isPlaying) {
      return undefined
    }

    if (params.time >= modelDurationSeconds) {
      const stopTimer = window.setTimeout(() => setIsPlaying(false), 0)
      return () => window.clearTimeout(stopTimer)
    }

    const timer = window.setTimeout(() => {
      setParams((current) => {
        return { ...current, time: Math.min(modelDurationSeconds, current.time + 1) }
      })
    }, 260)

    return () => window.clearTimeout(timer)
  }, [isPlaying, params.time])

  function updateParam(key: keyof SimParams, value: number) {
    if (key === 'time') {
      setIsPlaying(false)
    }
    setParams((current) => ({ ...current, [key]: value }))
  }

  function togglePlayback() {
    setIsPlaying((current) => {
      if (!current && params.time >= modelDurationSeconds) {
        setParams((state) => ({ ...state, time: 0 }))
      }
      return !current
    })
  }

  function resetPlayback() {
    setIsPlaying(false)
    setParams((current) => ({ ...current, time: 0 }))
  }

  function stepForward() {
    setIsPlaying(false)
    setParams((current) => ({ ...current, time: Math.min(modelDurationSeconds, current.time + 5) }))
  }

  return (
    <section className="panel explainer-panel">
      <div className="section-title">
        <span>{template.title}</span>
        <small>交互仿真</small>
      </div>
      <div className="explainer-layout">
        <div className="explainer-preview">
          <div className="preview-toolbar">
            <strong>{template.title}</strong>
            <div>
              <span className={isPlaying ? 'play-state active' : 'play-state'}>
                {isPlaying ? '播放中' : '暂停'}
              </span>
              <span>{formatSeconds(params.time)} / 01:30</span>
            </div>
          </div>
          <PhysicsCanvas template={template} params={params} />
          <div className="timeline-control">
            <div className="playback-row">
              <button type="button" className="play-button" onClick={togglePlayback}>
                {isPlaying ? '暂停' : '播放'}
              </button>
              <button type="button" className="ghost-button" onClick={resetPlayback}>
                重置
              </button>
              <button type="button" className="ghost-button" onClick={stepForward}>
                快进 5 秒
              </button>
              <span className="playback-status">{isPlaying ? '自动演示中' : '可拖动时间轴'}</span>
            </div>
            <label htmlFor="model-time">
              <span>时间轴</span>
              <strong>{formatSeconds(params.time)}</strong>
            </label>
            <input
              id="model-time"
              type="range"
              min="0"
              max={modelDurationSeconds}
              step="1"
              value={params.time}
              onChange={(event) => updateParam('time', Number(event.target.value))}
            />
            <div className="timeline-progress" aria-hidden="true">
              <span style={{ width: `${(params.time / modelDurationSeconds) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="explainer-copy">
          <p className="explainer-goal">{explainer.goal}</p>
          <div className="param-panel compact">
            <div className="param-title-row">
              <h3>物理参数</h3>
              <span>即时反馈</span>
            </div>
            <div className="param-grid">
              {controls.map((control) => (
                <RangeControl
                  key={control.key}
                  control={control}
                  value={params[control.key]}
                  onChange={(value) => updateParam(control.key, value)}
                />
              ))}
            </div>
          </div>
          <div className="observation-panel">
            <h3>观测量</h3>
            {observations.map((item) => (
              <div className="observation-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <ol className="explainer-steps">
            {explainer.steps.map((step, index) => (
              <li key={step.time} className={index === activeStepIndex ? 'active' : ''}>
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

function RangeControl({
  control,
  value,
  onChange,
}: {
  control: ParamControl
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label className="range-control">
      <span>
        {control.label}
        <strong>
          {value}
          {control.unit}
        </strong>
      </span>
      <input
        type="range"
        min={control.min}
        max={control.max}
        step={control.step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  )
}

function getLessonModels(lesson: { modelIds: string[] }) {
  return lesson.modelIds
    .map((id) => modelTemplates.find((template) => template.id === id))
    .filter((template): template is ModelTemplate => Boolean(template))
}

function lessonKnowledgePointsFor(chapterId: string, lessonTitle: string) {
  return knowledgePoints.filter((point) => point.chapterId === chapterId && point.lessonTitle === lessonTitle)
}

function SubjectOverviewPanel() {
  return (
    <section className="panel knowledge-panel">
      <div className="section-title">
        <span>{physicsSubjectOverview.subject}学科总览</span>
        <small>先建立地图</small>
      </div>
      <div className="knowledge-hero">
        <p>学科定位</p>
        <h3>{physicsSubjectOverview.whatIsIt}</h3>
      </div>
      <div className="system-grid">
        <article className="system-card wide">
          <h3>发展历史</h3>
          <ol>
            {physicsSubjectOverview.history.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
        {physicsSubjectOverview.framework.map((group) => (
          <article key={group.title} className="system-card">
            <h3>{group.title}</h3>
            <div className="system-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
        <article className="system-card wide">
          <h3>学习方法</h3>
          <ul>
            {physicsSubjectOverview.studyMethod.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

function ChapterLecturePanel({ chapter }: { chapter: Chapter }) {
  const lecture = chapterLectures.find((item) => item.chapterId === chapter.id)

  return (
    <section className="panel knowledge-panel">
      <div className="section-title">
        <span>{chapter.chapterNo}：{chapter.title}</span>
        <small>章节讲义</small>
      </div>
      <div className="knowledge-hero">
        <p>本章目标</p>
        <h3>{lecture?.goal ?? '本章先按教材顺序建立知识框架，再进入知识点精讲和练习闭环。'}</h3>
      </div>
      <div className="system-grid">
        <article className="system-card wide">
          <h3>讲义版</h3>
          {(lecture?.lectureVersion ?? chapter.sections.map((section) => `${section.title}：${section.knowledge.join('、')}`)).map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>
        <article className="system-card">
          <h3>课堂讲解版</h3>
          <ol>
            {(lecture?.classroomScript ?? ['先讲概念，再讲例题，最后安排练习反馈。']).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </article>
        <article className="system-card">
          <h3>练习清单版</h3>
          <ol>
            {(lecture?.practiceList ?? ['基础巩固', '提高训练', '真题类型']).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  )
}

function KnowledgeExplainer({
  chapter,
  lesson,
  points,
  onSelectKnowledge,
  onSelectPractice,
}: {
  chapter: Chapter
  lesson: { title: string; knowledge: string[] }
  points: KnowledgePointDetail[]
  onSelectKnowledge: (point: KnowledgePointDetail) => void
  onSelectPractice: (point: KnowledgePointDetail | null) => void
}) {
  const notes = buildKnowledgeNotes(lesson.knowledge)

  return (
    <section className="panel knowledge-panel">
      <div className="section-title">
        <span>{lesson.title}</span>
        <small>{points.length > 0 ? '精讲样板' : '知识点'}</small>
      </div>
      <div className="knowledge-hero">
        <p>{chapter.chapterNo}：{chapter.title}</p>
        <h3>先把概念、条件和公式关系讲清楚；只有需要动态过程时再进入模型。</h3>
      </div>
      {points.length > 0 ? (
        <div className="knowledge-grid">
          {points.map((point) => (
            <article key={point.id} className="knowledge-card action-card">
              <strong>{point.title}</strong>
              <p>{point.definition}</p>
              <div className="card-actions">
                <button type="button" onClick={() => onSelectKnowledge(point)}>进入精讲</button>
                <button type="button" onClick={() => onSelectPractice(point)}>练习任务</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="knowledge-grid">
          {notes.map((note) => (
            <article key={note.title} className="knowledge-card">
              <strong>{note.title}</strong>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      )}
      <div className="knowledge-method">
        <h3>讲解顺序</h3>
        <ol>
          <li>先明确概念适用的对象和条件。</li>
          <li>再写出关键物理量及单位，避免直接套公式。</li>
          <li>最后用一个简单例子检查理解，不强行加入动画。</li>
        </ol>
      </div>
    </section>
  )
}

function KnowledgePointPanel({
  point,
  onSelectModel,
  onSelectPractice,
}: {
  point: KnowledgePointDetail
  onSelectModel: (modelId: string) => void
  onSelectPractice: () => void
}) {
  return (
    <section className="panel knowledge-panel">
      <div className="section-title">
        <span>{point.title}</span>
        <small>{point.needsModel ? '精讲 + 可选模型' : '精讲'}</small>
      </div>
      <div className="knowledge-hero">
        <p>{point.lessonTitle}</p>
        <h3>{point.definition}</h3>
      </div>
      <div className="detail-grid">
        <article className="system-card wide">
          <h3>为什么学</h3>
          <p>{point.why}</p>
        </article>
        <article className="system-card">
          <h3>怎么用</h3>
          <ol>
            {point.howToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
        <article className="system-card">
          <h3>公式和单位</h3>
          <p>{point.formula ?? '本知识点以概念判断和规范表达为主，不强行套公式。'}</p>
          {point.unit ? <p>{point.unit}</p> : null}
        </article>
        <article className="system-card">
          <h3>特例</h3>
          <ul>
            {point.specialCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="system-card">
          <h3>易错点</h3>
          <ul>
            {point.mistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="system-card wide">
          <h3>例题</h3>
          <p>{point.example.prompt}</p>
          <strong>{point.example.solution}</strong>
        </article>
      </div>
      <div className="pattern-grid">
        {point.patterns.map((pattern) => (
          <article key={pattern.title} className="pattern-card">
            <span>{pattern.type}</span>
            <strong>{pattern.title}</strong>
            <p>{pattern.method}</p>
            <small>{pattern.variation}</small>
          </article>
        ))}
      </div>
      <div className="card-actions block-actions">
        {point.needsModel
          ? point.modelIds.map((modelId) => {
              const model = modelTemplates.find((template) => template.id === modelId)
              return (
                <button key={modelId} type="button" onClick={() => onSelectModel(modelId)}>
                  打开模型：{model?.title ?? modelId}
                </button>
              )
            })
          : null}
        <button type="button" onClick={onSelectPractice}>查看练习任务</button>
      </div>
    </section>
  )
}

function PracticePanel({
  chapter,
  point,
  lessonPoints,
}: {
  chapter: Chapter
  point: KnowledgePointDetail | null
  lessonPoints: KnowledgePointDetail[]
}) {
  const [score, setScore] = useState(80)
  const tasks = point ? point.exercises : lessonPoints.flatMap((item) => item.exercises)
  const level = score >= 90 ? '优秀' : score >= 80 ? '合格' : '未达标'
  const advice =
    score >= 90
      ? '可以进入下一节，保留错题复盘。'
      : score >= 80
        ? '可以继续推进，但要订正错题并复讲易错点。'
        : '先回到对应知识点和易错点，重做基础巩固。'

  return (
    <section className="panel knowledge-panel">
      <div className="section-title">
        <span>{point ? `${point.title}：练习任务` : `${chapter.title}：练习任务`}</span>
        <small>80 合格 / 90 优秀</small>
      </div>
      <div className="mastery-box">
        <div>
          <p>当前得分</p>
          <strong>{score} 分 · {level}</strong>
          <span>{advice}</span>
        </div>
        <input type="range" min="0" max="100" value={score} onChange={(event) => setScore(Number(event.target.value))} />
      </div>
      <div className="exercise-grid">
        {tasks.map((task) => (
          <ExerciseTaskCard key={task.id} task={task} score={score} />
        ))}
      </div>
    </section>
  )
}

function ExerciseTaskCard({ task, score }: { task: ExerciseTask; score: number }) {
  const status = score >= task.excellentScore ? '优秀' : score >= task.passScore ? '合格' : '需重练'

  return (
    <article className="exercise-card">
      <div>
        <span>{task.tier}</span>
        <strong>{task.title}</strong>
      </div>
      <p>{task.source} · {task.pageOrRange}</p>
      <p>目标：{task.target}</p>
      <p>要求：{task.requirement}</p>
      <footer>
        <small>合格 {task.passScore} / 优秀 {task.excellentScore}</small>
        <b>{status}</b>
      </footer>
    </article>
  )
}

function buildKnowledgeNotes(items: string[]) {
  const dictionary: Record<string, string> = {
    单位换算: '先统一基本单位，再代入公式。长度常用 m、cm、mm，时间常用 s、min、h。',
    刻度尺分度值: '读数前先看相邻两条刻线代表多少，估读到分度值下一位。',
    估读: '估读不是乱猜，而是在最小分度之间判断大约位置。',
    误差: '误差不可避免，可以通过多次测量取平均值减小。',
    机械运动: '物体位置随时间改变叫机械运动，判断时必须先选参照物。',
    参照物: '描述运动和静止时被选作标准的物体，同一物体选不同参照物结果可能不同。',
    运动和静止的相对性: '运动状态取决于参照物，所以“静止”不是绝对的。',
    速度: '速度描述运动快慢，等于路程与时间的比值。',
    匀速直线运动: '物体沿直线运动且速度大小不变，任意相等时间通过路程相等。',
    'v=s/t': '计算前先统一单位，注意平均速度对应总路程除以总时间。',
    实验设计: '平均速度实验要明确测哪段路程、哪段时间，并尽量让计时更准确。',
    路程时间测量: '路程用刻度尺沿运动路径测量，时间用秒表或光电门测量。',
    平均速度: '平均速度反映一段过程的总体快慢，不等于每一时刻的速度。',
  }

  return items.map((item) => ({
    title: item,
    text: dictionary[item] ?? `围绕“${item}”明确概念、条件、单位和常见易错点；如果没有明显动态过程，用文字和例题讲清即可。`,
  }))
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

function getParamControls(template: ModelTemplate): ParamControl[] {
  const shared: ParamControl[] = [{ key: 'force', label: '外力 F', min: 10, max: 120, step: 1, unit: 'N' }]
  const byId: Partial<Record<string, ParamControl[]>> = {
    'measurement-scale': [
      { key: 'time', label: '时间 t', min: 0, max: 90, step: 1, unit: 's' },
      { key: 'force', label: '速度 v', min: 10, max: 120, step: 1, unit: 'cm/s' },
      { key: 'height', label: '路程 s', min: 20, max: 90, step: 1, unit: 'cm' },
    ],
    'kinematics-graph': [
      { key: 'height', label: '初速度 v0', min: 0, max: 90, step: 1, unit: 'm/s' },
      { key: 'force', label: '加速度 a', min: -30, max: 80, step: 1, unit: 'm/s²' },
      { key: 'time', label: '时间 t', min: 0, max: 90, step: 1, unit: 's' },
    ],
    'sound-wave': [
      { key: 'force', label: '频率 f', min: 10, max: 120, step: 1, unit: 'Hz' },
      { key: 'height', label: '振幅 A', min: 10, max: 90, step: 1, unit: '%' },
    ],
    'state-change': [
      { key: 'temperature', label: '温度 T', min: -20, max: 120, step: 1, unit: '℃' },
      { key: 'density', label: '粒子间距', min: 20, max: 90, step: 1, unit: '%' },
    ],
    'density-particle': [
      { key: 'density', label: '密集程度', min: 20, max: 120, step: 1, unit: '%' },
      { key: 'height', label: '体积 V', min: 20, max: 90, step: 1, unit: 'cm³' },
    ],
    buoyancy: [
      { key: 'height', label: '浸入深度', min: 5, max: 90, step: 1, unit: '%' },
      { key: 'density', label: '液体密度 ρ', min: 30, max: 120, step: 1, unit: '%' },
    ],
    'electric-power': [
      { key: 'voltage', label: '电压 U', min: 1, max: 12, step: 0.5, unit: 'V' },
      { key: 'resistance', label: '电阻 R', min: 2, max: 30, step: 1, unit: 'Ω' },
      { key: 'time', label: '通电时间 t', min: 0, max: 90, step: 1, unit: 's' },
    ],
    'projectile-motion': [
      { key: 'force', label: '初速度 v0', min: 20, max: 120, step: 1, unit: 'm/s' },
      { key: 'angle', label: '抛射角', min: 0, max: 70, step: 1, unit: '°' },
      { key: 'time', label: '运动时间', min: 0, max: 90, step: 1, unit: '%' },
    ],
    'circular-gravity': [
      { key: 'height', label: '轨道半径 r', min: 25, max: 90, step: 1, unit: '%' },
      { key: 'force', label: '线速度 v', min: 20, max: 120, step: 1, unit: '%' },
    ],
    'electrostatic-field': [
      { key: 'voltage', label: '电荷量 q', min: 1, max: 12, step: 0.5, unit: '级' },
      { key: 'height', label: '板间距 d', min: 20, max: 90, step: 1, unit: '%' },
    ],
    'shm-wave': [
      { key: 'height', label: '振幅 A', min: 10, max: 90, step: 1, unit: '%' },
      { key: 'force', label: '频率 f', min: 10, max: 120, step: 1, unit: '%' },
      { key: 'time', label: '相位时间', min: 0, max: 90, step: 1, unit: '%' },
    ],
    'magnetic-induction': [
      { key: 'voltage', label: '磁场 B', min: 1, max: 12, step: 0.5, unit: '级' },
      { key: 'force', label: '导体速度 v', min: 10, max: 120, step: 1, unit: '%' },
      { key: 'angle', label: '切割角度', min: 0, max: 90, step: 1, unit: '°' },
    ],
  }
  const modelControls = byId[template.id]
  if (modelControls) return modelControls

  const controls: Record<CanvasKind, ParamControl[]> = {
    incline: [
      { key: 'angle', label: '斜面角 θ', min: 10, max: 55, step: 1, unit: '°' },
      ...shared,
    ],
    force: [
      ...shared,
      { key: 'angle', label: '力的方向', min: -60, max: 60, step: 1, unit: '°' },
    ],
    circuit: [
      { key: 'voltage', label: '电压 U', min: 1, max: 12, step: 0.5, unit: 'V' },
      { key: 'resistance', label: '电阻 R', min: 2, max: 30, step: 1, unit: 'Ω' },
    ],
    macroMicro: [
      { key: 'temperature', label: '温度 T', min: 5, max: 90, step: 1, unit: '℃' },
      { key: 'density', label: '粒子数量', min: 20, max: 90, step: 1, unit: '%' },
    ],
    graph: [
      { key: 'force', label: '速度/斜率', min: 10, max: 120, step: 1, unit: '%' },
      { key: 'height', label: '面积显示', min: 10, max: 90, step: 1, unit: '%' },
    ],
    pulley: [
      ...shared,
      { key: 'height', label: '提升高度', min: 10, max: 90, step: 1, unit: 'cm' },
    ],
    field: [
      ...shared,
      { key: 'voltage', label: '场强', min: 1, max: 12, step: 0.5, unit: '级' },
    ],
    optics: [{ key: 'angle', label: '入射角', min: 10, max: 65, step: 1, unit: '°' }],
    fluid: [
      { key: 'height', label: '液体深度 h', min: 20, max: 90, step: 1, unit: 'cm' },
      { key: 'density', label: '液体密度 ρ', min: 30, max: 120, step: 1, unit: '%' },
    ],
    energy: [
      { key: 'temperature', label: '输入能量', min: 20, max: 100, step: 1, unit: '%' },
      { key: 'force', label: '有效输出', min: 10, max: 90, step: 1, unit: '%' },
    ],
  }

  return controls[template.canvasKind] ?? shared
}

function getObservations(template: ModelTemplate, params: SimParams) {
  const current = params.voltage / params.resistance
  const speed = params.force / 10
  const distance = params.height
  const travelTime = distance / speed
  const elapsedTime = travelTime * (params.time / modelDurationSeconds)
  const power = params.voltage * current
  const heat = Math.round(current * current * params.resistance * params.time)
  const phase = params.temperature < 0 ? '固态' : params.temperature < 100 ? '液态' : '气态'

  const byId: Partial<Record<string, { label: string; value: string }[]>> = {
    'measurement-scale': [
      { label: '总路程 s', value: `${distance.toFixed(0)} cm` },
      { label: '秒表读数 t', value: `${elapsedTime.toFixed(1)} s / ${travelTime.toFixed(1)} s` },
      { label: '平均速度 v', value: `${speed.toFixed(1)} cm/s` },
    ],
    'kinematics-graph': [
      { label: '速度关系', value: 'v=v0+at' },
      { label: '图像斜率', value: `a=${params.force} m/s²` },
      { label: '实验观测', value: '频闪位置与光电门' },
    ],
    'sound-wave': [
      { label: '音调', value: params.force > 70 ? '较高' : '较低' },
      { label: '响度', value: params.height > 55 ? '较大' : '较小' },
      { label: '传播条件', value: '需要介质' },
    ],
    'state-change': [
      { label: '物态', value: phase },
      { label: '热量方向', value: params.temperature > 35 ? '吸热趋势' : '放热趋势' },
      { label: '粒子运动', value: params.temperature > 60 ? '剧烈' : '较慢' },
    ],
    'density-particle': [
      { label: '密度关系', value: `ρ≈${(params.density / params.height).toFixed(2)}` },
      { label: '质量趋势', value: params.density > 70 ? '较大' : '较小' },
      { label: '比较方法', value: '同体积比质量' },
    ],
    buoyancy: [
      { label: '排开液体', value: `${params.height}%` },
      { label: '浮力趋势', value: params.height * params.density > 4200 ? '较大' : '较小' },
      { label: '判断依据', value: '比较 F浮 与 G' },
    ],
    'electric-power': [
      { label: '电流 I', value: `${current.toFixed(2)} A` },
      { label: '电功率 P', value: `${power.toFixed(1)} W` },
      { label: '焦耳热 Q', value: `${heat} J` },
    ],
    'projectile-motion': [
      { label: '水平运动', value: '匀速直线运动' },
      { label: '竖直运动', value: '匀变速运动' },
      { label: '共同时间', value: `${params.time}%` },
    ],
    'circular-gravity': [
      { label: '速度方向', value: '沿轨道切线' },
      { label: '合力方向', value: '指向圆心' },
      { label: '向心关系', value: 'F=mv²/r' },
    ],
    'electrostatic-field': [
      { label: '场强趋势', value: params.height < 45 ? '较强' : '较弱' },
      { label: '正电荷受力', value: '沿电场线方向' },
      { label: '能量判断', value: '电势能随位置变化' },
    ],
    'shm-wave': [
      { label: '波速关系', value: 'v=λf' },
      { label: '振幅', value: `${params.height}%` },
      { label: '相位', value: `${params.time}%` },
    ],
    'magnetic-induction': [
      { label: '感应条件', value: '磁通量变化' },
      { label: '电动势趋势', value: params.force * params.voltage > 420 ? '较大' : '较小' },
      { label: '方向判断', value: '楞次定律' },
    ],
  }

  return (
    byId[template.id] ?? [
      { label: '当前模型', value: template.title },
      { label: '核心变量', value: template.objects.slice(0, 2).join('、') },
      { label: '推理方式', value: template.steps.slice(0, 2).join(' → ') },
    ]
  )
}

function getActiveStepIndex(time: number, steps: { time: string }[]) {
  return steps.reduce((activeIndex, step, index) => {
    return time >= parseTime(step.time) ? index : activeIndex
  }, 0)
}

function parseTime(time: string) {
  const [minutes, seconds] = time.split(':').map(Number)
  return minutes * 60 + seconds
}

function formatSeconds(value: number) {
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function runProjectileEngine(params: SimParams) {
  const engine = Engine.create()
  engine.gravity.y = 0.9
  const angle = (params.angle * Math.PI) / 180
  const speed = params.force / 5.6
  const ball = Bodies.circle(80, 300, 9, {
    frictionAir: 0,
    restitution: 0,
  })
  Body.setVelocity(ball, {
    x: Math.cos(angle) * speed,
    y: -Math.sin(angle) * speed,
  })
  Composite.add(engine.world, ball)

  const steps = Math.max(1, Math.round(params.time * 1.2))
  const trail: { x: number; y: number }[] = []
  for (let i = 0; i <= steps; i += 1) {
    Engine.update(engine, 1000 / 60)
    if (i % 4 === 0) {
      trail.push({ x: ball.position.x, y: ball.position.y })
    }
  }

  return {
    x: Math.min(690, ball.position.x),
    y: Math.min(352, ball.position.y),
    vx: ball.velocity.x,
    vy: ball.velocity.y,
    trail,
  }
}

function runKinematicsEngine(params: SimParams) {
  const engine = Engine.create()
  engine.gravity.y = 0
  engine.gravity.x = params.force / 280
  const cart = Bodies.rectangle(80, 110, 84, 44, {
    frictionAir: 0,
    inertia: Number.POSITIVE_INFINITY,
  })
  Body.setVelocity(cart, { x: params.height / 22, y: 0 })
  Composite.add(engine.world, cart)

  const steps = Math.max(1, Math.round(params.time * 1.25))
  const samples: { t: number; v: number; x: number }[] = []
  for (let i = 0; i <= steps; i += 1) {
    Engine.update(engine, 1000 / 60)
    if (i % 8 === 0) {
      samples.push({
        t: i / 12,
        v: cart.velocity.x,
        x: cart.position.x,
      })
    }
  }

  return {
    x: Math.min(646, cart.position.x),
    v: cart.velocity.x,
    samples,
    bodies: Composite.allBodies(engine.world).length,
  }
}

function PhysicsCanvas({ template, params }: { template: ModelTemplate; params: SimParams }) {
  if (template.id === 'measurement-scale') return <MeasurementScene params={params} />
  if (template.id === 'kinematics-graph') return <KinematicsScene params={params} />
  if (template.id === 'sound-wave') return <SoundWaveScene params={params} />
  if (template.id === 'state-change') return <StateChangeScene params={params} />
  if (template.id === 'density-particle') return <DensityScene params={params} />
  if (template.id === 'buoyancy') return <BuoyancyScene params={params} />
  if (template.id === 'electric-power') return <ElectricPowerScene params={params} />
  if (template.id === 'projectile-motion') return <ProjectileScene params={params} />
  if (template.id === 'circular-gravity') return <CircularGravityScene params={params} />
  if (template.id === 'electrostatic-field') return <ElectrostaticScene params={params} />
  if (template.id === 'shm-wave') return <ShmWaveScene params={params} />
  if (template.id === 'magnetic-induction') return <MagneticInductionScene params={params} />
  const kind = template.canvasKind
  if (kind === 'circuit') return <CircuitScene params={params} />
  if (kind === 'macroMicro') return <MacroMicroScene params={params} />
  if (kind === 'graph') return <GraphScene params={params} />
  if (kind === 'pulley') return <PulleyScene params={params} />
  if (kind === 'field') return <ParticleFieldScene params={params} />
  if (kind === 'optics') return <OpticsScene params={params} />
  if (kind === 'fluid') return <FluidScene params={params} />
  if (kind === 'energy') return <EnergyScene params={params} />
  if (kind === 'force') return <ForceScene params={params} />
  return <InclineScene params={params} />
}

function MeasurementScene({ params }: { params: SimParams }) {
  const progress = Math.min(1, params.time / modelDurationSeconds)
  const distanceCm = params.height
  const speedCmS = params.force / 10
  const totalTime = distanceCm / speedCmS
  const elapsedTime = totalTime * progress
  const start = { x: 132, y: 296 }
  const end = { x: 462, y: 206 }
  const carX = start.x + (end.x - start.x) * progress
  const carY = start.y + (end.y - start.y) * progress
  const stopwatchAngle = -110 + progress * 260
  const needleAngle = (stopwatchAngle * Math.PI) / 180
  const needleX = 598 + Math.cos(needleAngle) * 46
  const needleY = 132 + Math.sin(needleAngle) * 46

  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="平均速度测量模型">
        <defs>
          <linearGradient id="bench" x1="0" x2="1">
            <stop offset="0%" stopColor="#9a6a3a" />
            <stop offset="100%" stopColor="#d7a866" />
          </linearGradient>
          <linearGradient id="metal" x1="0" x2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="cartPaint" x1="0" x2="1">
            <stop offset="0%" stopColor="#c96b32" />
            <stop offset="100%" stopColor="#f0a05c" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="760" height="430" fill="#eef6fb" />
        <rect x="58" y="332" width="452" height="34" rx="6" fill="url(#bench)" />
        <line x1="104" y1="316" x2="506" y2="206" stroke="#5b6470" strokeWidth="10" strokeLinecap="round" />
        <line x1="104" y1="316" x2="506" y2="206" stroke="#dbe4ee" strokeWidth="5" strokeLinecap="round" />
        <line x1="96" y1="348" x2="514" y2="234" stroke="#2f3b4a" strokeWidth="4" />
        <text x="104" y="392" className="label small">斜面小车测平均速度</text>

        {Array.from({ length: 11 }, (_, i) => {
          const tickProgress = i / 10
          const x = start.x + (end.x - start.x) * tickProgress
          const y = start.y + (end.y - start.y) * tickProgress
          return (
            <g key={i}>
              <line x1={x} y1={y + 12} x2={x + 10} y2={y + 48} stroke="#475569" strokeWidth={i % 5 === 0 ? 3 : 2} />
              <text x={x - 8} y={y + 66} fill="#475569" fontSize="13" fontWeight="700">
                {Math.round(distanceCm * tickProgress)}
              </text>
            </g>
          )
        })}

        <rect x="456" y="196" width="40" height="64" rx="5" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
        <text x="446" y="188" fill="#334155" fontSize="15" fontWeight="800">金属片</text>
        <line x1="126" y1="316" x2={carX + 34} y2={carY + 31} stroke="#2563eb" strokeWidth="4" strokeDasharray="8 8" />
        <text x="222" y="282" fill="#1d4ed8" fontSize="17" fontWeight="800">s={distanceCm.toFixed(0)}cm</text>

        <g transform={`translate(${carX} ${carY}) rotate(-15)`}>
          <rect x="-4" y="-36" width="88" height="42" rx="8" fill="url(#cartPaint)" stroke="#1f2937" strokeWidth="3" />
          <rect x="12" y="-50" width="38" height="14" rx="4" fill="#f6c58f" stroke="#1f2937" strokeWidth="2" />
          <circle cx="16" cy="10" r="12" fill="#e2e8f0" stroke="#1f2937" strokeWidth="4" />
          <circle cx="66" cy="10" r="12" fill="#e2e8f0" stroke="#1f2937" strokeWidth="4" />
        </g>

        <g>
          <rect x="548" y="42" width="100" height="24" rx="7" fill="url(#metal)" stroke="#334155" strokeWidth="3" />
          <circle cx="598" cy="132" r="68" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" />
          <circle cx="598" cy="132" r="52" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = ((i * 30 - 90) * Math.PI) / 180
            const x1 = 598 + Math.cos(angle) * 44
            const y1 = 132 + Math.sin(angle) * 44
            const x2 = 598 + Math.cos(angle) * 52
            const y2 = 132 + Math.sin(angle) * 52
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="2" />
          })}
          <line x1="598" y1="132" x2={needleX} y2={needleY} stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
          <circle cx="598" cy="132" r="6" fill="#2563eb" />
          <text x="568" y="142" fill="#0f172a" fontSize="20" fontWeight="900">t</text>
          <text x="552" y="222" fill="#1e293b" fontSize="18" fontWeight="800">{elapsedTime.toFixed(1)}s</text>
        </g>

        <g>
          <rect x="510" y="260" width="202" height="118" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <text x="528" y="288" fill="#334155" fontSize="17" fontWeight="900">实验记录</text>
          <line x1="528" y1="302" x2="692" y2="302" stroke="#cbd5e1" strokeWidth="2" />
          <text x="532" y="326" fill="#475569" fontSize="15" fontWeight="800">路程 s</text>
          <text x="630" y="326" fill="#0f172a" fontSize="15" fontWeight="900">{distanceCm.toFixed(0)} cm</text>
          <text x="532" y="350" fill="#475569" fontSize="15" fontWeight="800">时间 t</text>
          <text x="630" y="350" fill="#0f172a" fontSize="15" fontWeight="900">{totalTime.toFixed(1)} s</text>
          <text x="532" y="372" fill="#1d4ed8" fontSize="16" fontWeight="900">v = s / t = {speedCmS.toFixed(1)} cm/s</text>
        </g>
      </svg>
    </div>
  )
}

function KinematicsScene({ params }: { params: SimParams }) {
  const simulation = runKinematicsEngine(params)
  const strobe = simulation.samples.filter((_, index) => index % 2 === 0).slice(0, 7)
  const sensorX = 590
  const passedSensor = simulation.x + 84 >= sensorX

  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="匀变速直线运动模型">
        <defs>
          <linearGradient id="railMetal" x1="0" x2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="motionCart" x1="0" x2="1">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="70" y="288" width="622" height="18" rx="9" fill="#cbd5e1" />
        <line x1="82" y1="214" x2="678" y2="214" stroke="url(#railMetal)" strokeWidth="8" strokeLinecap="round" />
        <line x1="82" y1="244" x2="678" y2="244" stroke="url(#railMetal)" strokeWidth="8" strokeLinecap="round" />
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <line x1={96 + i * 56} y1="196" x2={96 + i * 56} y2="266" stroke="#94a3b8" strokeWidth="2" />
            <text x={88 + i * 56} y="188" fill="#64748b" fontSize="12" fontWeight="700">{i * 10}</text>
          </g>
        ))}

        {strobe.map((sample, index) => (
          <rect
            key={index}
            x={sample.x}
            y="172"
            width="74"
            height="42"
            rx="8"
            fill="#94a3b8"
            opacity={0.12 + index * 0.08}
          />
        ))}

        <rect x={simulation.x} y="168" width="86" height="46" rx="8" fill="url(#motionCart)" stroke="#1f2937" strokeWidth="3" />
        <circle cx={simulation.x + 18} cy="222" r="11" fill="#e2e8f0" stroke="#1f2937" strokeWidth="4" />
        <circle cx={simulation.x + 68} cy="222" r="11" fill="#e2e8f0" stroke="#1f2937" strokeWidth="4" />
        <Arrow x1={simulation.x + 46} y1={148} x2={simulation.x + 46 + simulation.v * 10} y2={148} color="#1f6feb" label="v" />
        <Arrow x1={simulation.x + 46} y1={124} x2={simulation.x + 46 + params.force * 0.9} y2={124} color="#f97316" label="a" />

        <line x1={sensorX} y1="120" x2={sensorX} y2="270" stroke={passedSensor ? '#16a34a' : '#475569'} strokeWidth="4" />
        <rect x={sensorX - 24} y="96" width="48" height="26" rx="6" fill={passedSensor ? '#dcfce7' : '#f1f5f9'} stroke="#475569" />
        <text x={sensorX - 20} y="114" fill="#334155" fontSize="13" fontWeight="800">光电门</text>

        <rect x="96" y="314" width="568" height="54" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="118" y="346" fill="#334155" fontSize="18" fontWeight="900">位移 x={Math.max(0, simulation.x - 80).toFixed(1)} m</text>
        <text x="322" y="346" fill="#334155" fontSize="18" fontWeight="900">速度 v={simulation.v.toFixed(1)} m/s</text>
        <text x="520" y="346" fill="#334155" fontSize="18" fontWeight="900">加速度 a={(params.force / 280).toFixed(2)}</text>
      </svg>
    </div>
  )
}

function SoundWaveScene({ params }: { params: SimParams }) {
  const amplitude = 12 + params.height * 0.34
  const wavelength = Math.max(56, 168 - params.force)
  const phase = params.time / 8
  const wavePoints = Array.from({ length: 128 }, (_, i) => {
    const x = 118 + i * 4.4
    const y = 92 + Math.sin(i / Math.max(5, wavelength / 12) - phase) * amplitude
    return `${x},${y}`
  }).join(' ')
  const scopePoints = Array.from({ length: 128 }, (_, i) => {
    const x = 118 + i * 4.4
    const y = 346 + Math.sin(i / Math.max(5, wavelength / 12) - phase) * amplitude * 0.7
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="声波传播模型">
        <defs>
          <linearGradient id="soundPanel" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#101827" />
            <stop offset="100%" stopColor="#05070a" />
          </linearGradient>
          <radialGradient id="speakerGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="760" height="430" fill="url(#soundPanel)" />
        <rect x="72" y="52" width="620" height="322" rx="14" fill="#0b1220" stroke="#334155" strokeWidth="2" />
        <rect x="102" y="278" width="572" height="84" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="112" y1="346" x2="662" y2="346" stroke="#94a3b8" strokeWidth="2" />
        <polyline points={scopePoints} fill="none" stroke="#2563eb" strokeWidth="4" />

        <circle cx="116" cy="206" r={58 + params.height * 0.18} fill="url(#speakerGlow)" />
        <rect x="76" y="148" width="38" height="116" rx="6" fill="#111827" stroke="#cbd5e1" strokeWidth="3" />
        <path d="M114 174 L164 144 L164 268 L114 238 Z" fill="#475569" stroke="#e5e7eb" strokeWidth="3" />
        <circle cx="154" cy="206" r="34" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
        <circle cx="154" cy="206" r={12 + params.height * 0.08} fill="#38bdf8" opacity="0.45" />

        {Array.from({ length: 15 }, (_, i) => (
          <path
            key={i}
            d={`M${186 + i * 34},126 C${204 + i * 34},160 ${204 + i * 34},252 ${186 + i * 34},286`}
            fill="none"
            stroke={i % 2 === 0 ? 'rgba(56,189,248,0.42)' : 'rgba(148,163,184,0.22)'}
            strokeWidth={i % 2 === 0 ? 3 : 2}
          />
        ))}

        {Array.from({ length: 86 }, (_, i) => {
          const row = i % 5
          const column = Math.floor(i / 5)
          const baseX = 196 + column * 28
          const localPhase = column / Math.max(2.2, wavelength / 38) - phase
          const shift = Math.sin(localPhase) * (params.height / 5)
          const density = Math.max(0.35, Math.abs(Math.cos(localPhase)))
          return (
            <circle
              key={i}
              cx={baseX + shift}
              cy={160 + row * 24 + Math.sin(i * 0.9) * 4}
              r={2.4 + density * 2.4}
              fill={density > 0.72 ? '#e0f2fe' : '#94a3b8'}
              opacity={0.45 + density * 0.42}
            />
          )
        })}
        <polyline points={wavePoints} fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.9" />
        <text x="104" y="84" fill="#e5edf7" fontSize="18" fontWeight="800">声源振动 → 空气疏密相间传播</text>
        <text x="516" y="336" fill="#334155" fontSize="15" fontWeight="800">示波器波形</text>
        <text x="498" y="396" fill="#e5edf7" fontSize="18" fontWeight="800">f={params.force}Hz  A={params.height}%</text>
      </svg>
    </div>
  )
}

function ProjectileScene({ params }: { params: SimParams }) {
  const simulation = runProjectileEngine(params)
  const path = simulation.trail.map((point) => `${Math.min(point.x, 690)},${Math.min(point.y, 352)}`).join(' ')
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="平抛和斜抛运动模型">
        <rect x="0" y="0" width="760" height="430" className="lab-bg light-bg" />
        <line x1="84" y1="352" x2="700" y2="352" className="axis" />
        <line x1="104" y1="70" x2="104" y2="352" className="axis" />
        <polyline points={path} className="trajectory" />
        <circle cx={simulation.x} cy={simulation.y} r="13" className="particle" />
        <Arrow x1={simulation.x} y1={simulation.y} x2={simulation.x + simulation.vx * 5} y2={simulation.y} color="#1f6feb" label="vx" />
        <Arrow x1={simulation.x} y1={simulation.y} x2={simulation.x} y2={simulation.y + 74} color="#7b3ff2" label="g" />
        <text x="360" y="70" className="caption-label">水平方向匀速，竖直方向自由落体</text>
        <text x="460" y="110" className="caption-label">Matter.js 刚体步进</text>
      </svg>
    </div>
  )
}

function CircularGravityScene({ params }: { params: SimParams }) {
  const r = 70 + params.height * 1.7
  const theta = params.time / 90 * Math.PI * 2
  const cx = 380
  const cy = 216
  const x = cx + Math.cos(theta) * r
  const y = cy + Math.sin(theta) * r
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="圆周运动和万有引力模型">
        <rect x="0" y="0" width="760" height="430" className="lab-bg" />
        <circle cx={cx} cy={cy} r={r} className="orbit" />
        <circle cx={cx} cy={cy} r="30" className="star-core" />
        <circle cx={x} cy={y} r="14" className="particle cyan" />
        <Arrow x1={x} y1={y} x2={x - Math.sin(theta) * params.force} y2={y + Math.cos(theta) * params.force} color="#1f6feb" label="v" />
        <Arrow x1={x} y1={y} x2={cx} y2={cy} color="#f97316" label="F向" />
        <text x="86" y="70" className="caption-label light">速度沿切线，合力指向圆心</text>
      </svg>
    </div>
  )
}

function ElectrostaticScene({ params }: { params: SimParams }) {
  const fieldCount = Math.round(7 + params.voltage * 1.2)
  const testProgress = Math.min(1, params.time / modelDurationSeconds)
  const testX = 150 + testProgress * 460
  const testY = 300 - Math.sin(testProgress * Math.PI) * (40 + params.height * 0.7)
  const positive = { x: 248, y: 216 }
  const negative = { x: 512, y: 216 }

  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="静电场模型">
        <defs>
          <radialGradient id="positiveGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="negativeGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="760" height="430" fill="#05070a" />
        <rect x="72" y="52" width="616" height="322" rx="16" fill="#0b1020" stroke="#1f2937" strokeWidth="2" />
        {Array.from({ length: 80 }, (_, i) => (
          <circle key={i} cx={84 + ((i * 67) % 604)} cy={64 + ((i * 43) % 298)} r={i % 4 === 0 ? 1.8 : 1.1} fill="#f8fafc" opacity="0.34" />
        ))}
        {Array.from({ length: fieldCount }, (_, i) => {
          const offset = (i - (fieldCount - 1) / 2) * 18
          const curve = Math.abs(offset) * 0.72 + 56
          return (
            <path
              key={i}
              d={`M${positive.x + 34},${positive.y + offset * 0.55} C${330},${positive.y - curve} ${430},${negative.y - curve} ${negative.x - 34},${negative.y + offset * 0.55}`}
              fill="none"
              stroke="#dbeafe"
              strokeWidth="1.6"
              opacity={0.22 + params.voltage * 0.035}
            />
          )
        })}
        {Array.from({ length: fieldCount }, (_, i) => {
          const offset = (i - (fieldCount - 1) / 2) * 18
          const curve = Math.abs(offset) * 0.72 + 56
          return (
            <path
              key={i}
              d={`M${positive.x + 34},${positive.y + offset * 0.55} C${330},${positive.y + curve} ${430},${negative.y + curve} ${negative.x - 34},${negative.y + offset * 0.55}`}
              fill="none"
              stroke="#dbeafe"
              strokeWidth="1.6"
              opacity={0.22 + params.voltage * 0.035}
            />
          )
        })}
        <circle cx={positive.x} cy={positive.y} r="74" fill="url(#positiveGlow)" />
        <circle cx={negative.x} cy={negative.y} r="74" fill="url(#negativeGlow)" />
        <circle cx={positive.x} cy={positive.y} r="30" fill="#e11d48" stroke="#fecdd3" strokeWidth="3" />
        <circle cx={negative.x} cy={negative.y} r="30" fill="#0891b2" stroke="#cffafe" strokeWidth="3" />
        <text x={positive.x - 8} y={positive.y + 9} className="label small light">+</text>
        <text x={negative.x - 7} y={negative.y + 7} className="label small light">-</text>
        <path
          d={`M150 300 C250 ${260 - params.height} 410 ${356 - params.height} 610 170`}
          fill="none"
          stroke="#f8fafc"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.45"
        />
        <circle cx={testX} cy={testY} r="12" fill="#f8fafc" stroke="#38bdf8" strokeWidth="3" />
        <Arrow x1={testX} y1={testY} x2={testX + 54} y2={testY - 18} color="#f8fafc" label="F" />
        <rect x="96" y="322" width="220" height="34" rx="8" fill="rgba(15,23,42,0.78)" stroke="#334155" />
        <text x="112" y="344" fill="#e5edf7" fontSize="17" fontWeight="800">场线密处场强大，正试探电荷沿 F 运动</text>
      </svg>
    </div>
  )
}

function ShmWaveScene({ params }: { params: SimParams }) {
  const amp = params.height * 0.8
  const phase = params.time / 9
  const points = Array.from({ length: 130 }, (_, i) => {
    const x = 80 + i * 5
    const y = 218 + Math.sin(i / Math.max(5, 135 / params.force) - phase) * amp
    return `${x},${y}`
  }).join(' ')
  const bobX = 160 + Math.sin(phase) * amp
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="机械振动与机械波模型">
        <rect x="0" y="0" width="760" height="430" className="lab-bg light-bg" />
        <line x1="160" y1="70" x2={bobX} y2="158" className="wire" />
        <circle cx={bobX} cy="158" r="18" className="particle" />
        <line x1="80" y1="218" x2="700" y2="218" className="axis faint" />
        <polyline points={points} className="graph-line" />
        <text x="92" y="360" className="caption-label">振幅决定偏离平衡位置的最大距离，频率决定振动快慢</text>
      </svg>
    </div>
  )
}

function MagneticInductionScene({ params }: { params: SimParams }) {
  const conductorX = 300 + params.force * 1.7
  const fluxWidth = Math.max(24, conductorX - 202)
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="磁场与电磁感应模型">
        <rect x="0" y="0" width="760" height="430" className="lab-bg" />
        <rect x="202" y="112" width="350" height="204" rx="8" className="field-region" />
        {Array.from({ length: 36 }, (_, i) => (
          <text key={i} x={226 + (i % 9) * 36} y={146 + Math.floor(i / 9) * 42} className="field-mark">×</text>
        ))}
        <rect x="202" y="112" width={fluxWidth} height="204" className="flux-area" />
        <line x1={conductorX} y1="102" x2={conductorX} y2="326" className="conductor" />
        <Arrow x1={conductorX} y1={84} x2={conductorX + 88} y2={84} color="#1f6feb" label="v" />
        <text x="92" y="366" className="caption-label light">导体切割磁感线，回路磁通量变化，产生感应电动势</text>
      </svg>
    </div>
  )
}

function StateChangeScene({ params }: { params: SimParams }) {
  const phase = params.temperature < 0 ? '固态' : params.temperature < 100 ? '液态' : '气态'
  const normalizedTemp = Math.max(0, Math.min(1, (params.temperature + 20) / 140))
  const spacing = params.temperature < 0 ? 22 : params.temperature < 100 ? 34 : 52
  const heatWidth = 74 + normalizedTemp * 396
  const vaporOpacity = params.temperature > 70 ? Math.min(0.75, (params.temperature - 70) / 60) : 0.08

  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="物态变化模型">
        <defs>
          <linearGradient id="hotplate" x1="0" x2="1">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="thermalWater" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.38" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="86" y="330" width="308" height="34" rx="10" fill="url(#hotplate)" />
        <rect x="138" y="104" width="206" height="232" rx="18" fill="rgba(255,255,255,0.62)" stroke="#64748b" strokeWidth="4" />
        <rect x="150" y="204" width="182" height="118" rx="10" fill="url(#thermalWater)" />
        <path d="M152 204 C188 194 224 214 260 204 C292 194 312 212 332 204" fill="none" stroke="#0284c7" strokeWidth="3" opacity="0.55" />
        {Array.from({ length: 15 }, (_, i) => (
          <path
            key={i}
            d={`M${174 + (i % 5) * 34} ${182 - Math.floor(i / 5) * 28} C${160 + (i % 5) * 34} ${156 - Math.floor(i / 5) * 32} ${190 + (i % 5) * 34} ${144 - Math.floor(i / 5) * 32} ${178 + (i % 5) * 34} ${118 - Math.floor(i / 5) * 24}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            opacity={vaporOpacity}
          />
        ))}
        {Array.from({ length: 20 }, (_, i) => {
          const row = Math.floor(i / 5)
          const col = i % 5
          const jitter = params.temperature > 0 ? Math.sin(params.time / 8 + i) * normalizedTemp * 10 : 0
          return (
            <circle
              key={i}
              cx={180 + col * spacing + jitter}
              cy={236 + row * Math.max(22, spacing * 0.62) + Math.cos(params.time / 10 + i) * normalizedTemp * 7}
              r="8"
              fill={params.temperature < 0 ? '#60a5fa' : params.temperature < 100 ? '#2563eb' : '#94a3b8'}
              opacity="0.82"
            />
          )
        })}
        <rect x="424" y="86" width="52" height="230" rx="20" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
        <rect x="442" y={274 - normalizedTemp * 162} width="16" height={36 + normalizedTemp * 162} rx="8" fill={params.temperature < 0 ? '#2563eb' : '#ef4444'} />
        <circle cx="450" cy="300" r="22" fill={params.temperature < 0 ? '#2563eb' : '#ef4444'} />
        <text x="498" y="130" fill="#101828" fontSize="24" fontWeight="900">{params.temperature}℃</text>
        <text x="498" y="168" fill="#334155" fontSize="20" fontWeight="900">当前：{phase}</text>
        <rect x="498" y="212" width="150" height="22" rx="11" fill="#e5e7eb" />
        <rect x="498" y="212" width={heatWidth * 0.36} height="22" rx="11" fill={params.temperature < 0 ? '#2563eb' : '#f97316'} />
        <text x="498" y="270" fill="#475569" fontSize="16" fontWeight="800">温度升高，粒子运动更剧烈</text>
      </svg>
    </div>
  )
}

function DensityScene({ params }: { params: SimParams }) {
  const volume = 30 + params.height
  const mass = Math.round((params.density / 100) * volume * 2.7)
  const liquidHeight = 246 - Math.min(112, params.height * 1.15)

  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="密度粒子模型">
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="78" y="318" width="600" height="20" rx="10" fill="#cbd5e1" />

        <line x1="198" y1="112" x2="198" y2="260" stroke="#334155" strokeWidth="5" />
        <line x1="130" y1="260" x2="266" y2="260" stroke="#334155" strokeWidth="5" />
        <line x1="144" y1="152" x2="252" y2="152" stroke="#334155" strokeWidth="4" />
        <path d="M144 152 L112 230 H176 Z" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
        <path d="M252 152 L220 230 H284 Z" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
        <rect x="124" y="196" width="40" height="28" rx="4" fill="#f97316" stroke="#1f2937" strokeWidth="2" />
        <text x="222" y="218" fill="#334155" fontSize="19" fontWeight="900">{mass}g</text>

        <rect x="354" y="90" width="118" height="220" rx="18" fill="rgba(255,255,255,0.68)" stroke="#64748b" strokeWidth="4" />
        <rect x="366" y={liquidHeight} width="94" height={300 - liquidHeight} rx="8" fill="rgba(37,99,235,0.34)" />
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1="472" y1={116 + i * 27} x2="492" y2={116 + i * 27} stroke="#64748b" strokeWidth={i % 2 === 0 ? 3 : 2} />
        ))}
        <rect x="386" y={liquidHeight - 28} width="54" height="54" rx="6" fill="#f97316" stroke="#1f2937" strokeWidth="3" opacity="0.88" />
        <text x="372" y="336" fill="#334155" fontSize="18" fontWeight="900">量筒读 V={volume.toFixed(0)}cm³</text>

        <rect x="540" y="116" width="146" height="132" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="564" y="154" fill="#334155" fontSize="20" fontWeight="900">ρ = m / V</text>
        <text x="564" y="196" fill="#1d4ed8" fontSize="26" fontWeight="900">{(mass / volume).toFixed(2)}</text>
        <text x="618" y="196" fill="#475569" fontSize="16" fontWeight="800">g/cm³</text>
        <text x="112" y="382" fill="#334155" fontSize="17" fontWeight="800">测密度的核心是：天平测质量，量筒测体积，再比较同体积质量。</text>
      </svg>
    </div>
  )
}

function BuoyancyScene({ params }: { params: SimParams }) {
  const immersion = Math.min(1, params.height / 90)
  const fluidDensity = params.density / 100
  const waterTop = 176
  const blockTop = 116 + immersion * 104
  const blockBottom = blockTop + 82
  const submerged = Math.max(0, blockBottom - waterTop)
  const displacedHeight = Math.min(82, submerged)
  const buoyancy = displacedHeight * fluidDensity
  const springLength = 58 + Math.max(0, 54 - buoyancy * 0.46)
  const reading = Math.max(0.4, 6.2 - buoyancy * 0.055)

  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="浮力模型">
        <defs>
          <linearGradient id="beakerGlass" x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
            <stop offset="55%" stopColor="#dbeafe" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.64" />
          </linearGradient>
          <linearGradient id="waterFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.36" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="70" y="352" width="620" height="18" rx="9" fill="#d1d5db" />
        <line x1="270" y1="52" x2="270" y2={springLength} stroke="#334155" strokeWidth="4" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M258 ${springLength + i * 8} C270 ${springLength + 4 + i * 8} 270 ${springLength + 4 + i * 8} 282 ${springLength + 8 + i * 8}`} fill="none" stroke="#64748b" strokeWidth="2" />
        ))}
        <line x1="270" y1={springLength + 76} x2="270" y2={blockTop} stroke="#334155" strokeWidth="3" />

        <rect x="126" y="92" width="288" height="264" rx="18" fill="url(#beakerGlass)" stroke="#64748b" strokeWidth="4" />
        <rect x="138" y={waterTop} width="264" height="168" rx="8" fill="url(#waterFill)" />
        <path d="M138 176 C178 166 218 186 262 176 C310 164 352 188 402 176" fill="none" stroke="#0284c7" strokeWidth="3" opacity="0.55" />

        <rect x="230" y={blockTop} width="80" height="82" rx="6" fill="#f97316" stroke="#1f2937" strokeWidth="3" />
        {displacedHeight > 0 ? (
          <rect x="230" y={Math.max(blockTop, waterTop)} width="80" height={displacedHeight} rx="4" fill="#1d4ed8" opacity="0.28" />
        ) : null}
        <Arrow x1={270} y1={blockTop + 50} x2={270} y2={blockTop + 50 - Math.max(28, buoyancy * 0.8)} color="#16a34a" label="F浮" />
        <Arrow x1={300} y1={blockTop + 44} x2={300} y2={blockTop + 116} color="#7b3ff2" label="G" />

        <rect x="482" y="78" width="158" height="96" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="506" y="112" fill="#334155" fontSize="18" fontWeight="900">弹簧测力计</text>
        <text x="526" y="148" fill="#1d4ed8" fontSize="28" fontWeight="900">{reading.toFixed(1)} N</text>
        <rect x="480" y="218" width="184" height="118" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="502" y="294" width={Math.max(24, buoyancy * 1.45)} height="22" rx="11" fill="#16a34a" />
        <text x="500" y="250" fill="#334155" fontSize="18" fontWeight="900">F浮 = G排</text>
        <text x="500" y="278" fill="#475569" fontSize="15" fontWeight="700">浸入体积越大，排开液体越多</text>
      </svg>
    </div>
  )
}

function ElectricPowerScene({ params }: { params: SimParams }) {
  const current = params.voltage / params.resistance
  const power = params.voltage * current
  const glow = Math.min(1, power / 18)
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="电功率模型">
        <defs>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="62%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity={0.95 * glow} />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="100" y="108" width="536" height="218" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <path d="M150 218 H256 M344 218 H424 M506 218 H612 M150 218 V286 H612 V218" fill="none" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
        <rect x="136" y="184" width="64" height="68" rx="8" fill="#e2e8f0" stroke="#334155" strokeWidth="3" />
        <line x1="152" y1="198" x2="152" y2="238" stroke="#334155" strokeWidth="4" />
        <line x1="180" y1="206" x2="180" y2="230" stroke="#334155" strokeWidth="8" />
        <circle cx="300" cy="218" r={78 + glow * 34} fill="url(#lampGlow)" />
        <circle cx="300" cy="218" r="44" fill="#fff7ed" stroke="#334155" strokeWidth="4" />
        <path d="M282 220 C290 194 308 194 318 220" fill="none" stroke="#f59e0b" strokeWidth="5" />
        <rect x="282" y="258" width="36" height="20" rx="4" fill="#64748b" />
        <rect x="424" y="190" width="82" height="56" rx="8" fill="#fee2e2" stroke="#334155" strokeWidth="3" />
        <path d="M438 218 H452 L462 204 L474 232 L486 204 L498 218" fill="none" stroke="#ef4444" strokeWidth="4" />
        <rect x="128" y="334" width="484" height="24" rx="12" fill="#e5e7eb" />
        <rect x="128" y="334" width={Math.min(484, 80 + power * 22)} height="24" rx="12" fill="#facc15" />
        <rect x="540" y="124" width="118" height="84" rx="10" fill="#0f172a" />
        <text x="558" y="158" fill="#e5edf7" fontSize="18" fontWeight="900">功率</text>
        <text x="558" y="190" fill="#fde68a" fontSize="27" fontWeight="900">{power.toFixed(1)} W</text>
        <text x="144" y="390" fill="#334155" fontSize="17" fontWeight="800">U={params.voltage}V  I={current.toFixed(2)}A  R={params.resistance}Ω</text>
      </svg>
    </div>
  )
}

function InclineScene({ params }: { params: SimParams }) {
  const forceEnd = 360 + params.force * 0.9
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
        <text x="626" y="337" className="label small">θ={params.angle}°</text>
        <Arrow x1={306} y1={314} x2={306} y2={386} color="#7b3ff2" label="mg" />
        <Arrow x1={306} y1={314} x2={350} y2={258} color="#7b3ff2" label="N" />
        <Arrow x1={306} y1={314} x2={246} y2={302} color="#e04a3f" label="f" />
        <Arrow x1={346} y1={340} x2={forceEnd} y2={356} color="#1f6feb" label={`F=${params.force}N`} />
      </svg>
    </div>
  )
}

function ForceScene({ params }: { params: SimParams }) {
  const rad = (params.angle * Math.PI) / 180
  const x2 = 356 + params.force * 1.28 * Math.cos(rad)
  const y2 = 214 - params.force * 1.28 * Math.sin(rad)
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="力的三要素模型">
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="92" y="286" width="586" height="28" rx="14" fill="#cbd5e1" />
        <rect x="286" y="194" width="140" height="92" rx="10" fill="#2563eb" stroke="#1f2937" strokeWidth="4" />
        <circle cx="356" cy="214" r="8" fill="#ef4444" />
        <Arrow x1={356} y1={214} x2={x2} y2={y2} color="#1f6feb" label={`F=${params.force}N`} />
        <Arrow x1={356} y1={286} x2={356} y2={352} color="#7b3ff2" label="G" />
        <Arrow x1={356} y1={286} x2={356} y2={136} color="#16a34a" label="N" />
        <line x1="426" y1="214" x2="520" y2="214" stroke="#334155" strokeWidth="5" />
        <rect x="520" y="184" width="100" height="60" rx="12" fill="#ffffff" stroke="#334155" strokeWidth="3" />
        <line x1="544" y1="214" x2="596" y2="214" stroke="#94a3b8" strokeWidth="3" />
        <circle cx={544 + params.force * 0.36} cy="214" r="8" fill="#ef4444" />
        <text x="536" y="172" fill="#334155" fontSize="16" fontWeight="900">弹簧测力计</text>
        <rect x="108" y="84" width="204" height="88" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="130" y="120" fill="#334155" fontSize="18" fontWeight="900">力的三要素</text>
        <text x="130" y="150" fill="#475569" fontSize="15" fontWeight="800">大小、方向、作用点</text>
      </svg>
    </div>
  )
}

function CircuitScene({ params }: { params: SimParams }) {
  const current = params.voltage / params.resistance
  const sliderX = 404 + params.resistance * 4.8
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="电路模型">
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="92" y="70" width="570" height="272" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <path d="M142 204 H224 M296 204 H392 M572 204 H622 M142 204 V298 H622 V204" fill="none" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
        <rect x="126" y="164" width="58" height="80" rx="8" fill="#e2e8f0" stroke="#334155" strokeWidth="3" />
        <line x1="144" y1="178" x2="144" y2="230" stroke="#334155" strokeWidth="4" />
        <line x1="166" y1="186" x2="166" y2="222" stroke="#334155" strokeWidth="8" />
        <circle cx="260" cy="204" r="36" fill="#ffffff" stroke="#334155" strokeWidth="4" />
        <text x="248" y="214" fill="#0f172a" fontSize="24" fontWeight="900">A</text>
        <path d={`M392 204 H572 M${sliderX} 178 L${sliderX - 38} 226`} stroke="#334155" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="410" y="170" width="132" height="68" rx="8" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
        <path d="M426 204 H442 L452 190 L464 218 L476 190 L488 218 L500 190 L512 204 H528" fill="none" stroke="#f97316" strokeWidth="4" />
        <circle cx={sliderX} cy="178" r="9" fill="#1f6feb" stroke="#dbeafe" strokeWidth="3" />
        <rect x="472" y="262" width="148" height="50" rx="8" fill="#0f172a" />
        <text x="492" y="293" fill="#e5edf7" fontSize="20" fontWeight="900">I={current.toFixed(2)} A</text>
        <text x="126" y="374" fill="#334155" fontSize="18" fontWeight="800">滑片向右，接入电阻增大，电流减小</text>
      </svg>
    </div>
  )
}

function MacroMicroScene({ params }: { params: SimParams }) {
  const particleCount = Math.round(4 + params.density / 10)
  const spread = 24 + params.temperature * 0.38 + params.time * 0.12
  const progress = Math.min(1, params.time / modelDurationSeconds)
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="宏观到微观模型">
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="104" y="80" width="184" height="258" rx="22" fill="rgba(255,255,255,0.66)" stroke="#64748b" strokeWidth="4" />
        <rect x="116" y="184" width="160" height="142" rx="10" fill="rgba(125,211,252,0.42)" />
        <path
          d={`M176 184 C${190 + progress * 48} 220 ${132 + progress * 28} 252 ${194 + progress * 34} 304 C${238 + progress * 26} 254 ${222 + progress * 52} 214 244 184`}
          fill="rgba(126,34,206,0.48)"
        />
        <line x1="194" y1="66" x2="194" y2="184" stroke="#334155" strokeWidth="5" />
        <path d="M184 184 C190 194 198 194 204 184 C200 170 188 170 184 184" fill="#7e22ce" />
        <circle cx="454" cy="202" r="124" fill="rgba(255,255,255,0.72)" stroke="#2563eb" strokeWidth="4" />
        <line x1="542" y1="290" x2="626" y2="362" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" />
        {Array.from({ length: particleCount }, (_, i) => (
          <circle
            key={i}
            cx={374 + (i % 5) * spread + Math.sin(params.time / 7 + i) * 8}
            cy={142 + Math.floor(i / 5) * 34 + Math.cos(params.time / 9 + i) * 8}
            r="8"
            fill={i % 3 === 0 ? '#7e22ce' : '#2563eb'}
            opacity="0.82"
          />
        ))}
        <text x="356" y="78" fill="#334155" fontSize="18" fontWeight="900">放大后看到粒子无规则运动</text>
        <text x="112" y="376" fill="#334155" fontSize="17" fontWeight="800">墨水由浓处向周围扩散，温度越高扩散越快。</text>
      </svg>
    </div>
  )
}

function GraphScene({ params }: { params: SimParams }) {
  const yEnd = 300 - params.force * 1.65
  const areaX = 180 + params.height * 3.8
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="运动图像模型">
        <line x1="84" y1="318" x2="676" y2="318" className="axis" />
        <line x1="118" y1="338" x2="118" y2="76" className="axis" />
        <polyline points={`118,318 248,270 388,206 560,${yEnd}`} className="graph-line" />
        <polygon points={`118,318 ${areaX},${Math.max(110, yEnd + 60)} ${areaX},318`} className="area" />
        <circle cx="248" cy="270" r="9" className="node red-node" />
        <circle cx="388" cy="206" r="9" className="node blue-node" />
        <rect x="126" y="350" width="72" height="34" rx="6" className="cart" />
        <Arrow x1={198} y1={367} x2={318} y2={367} color="#1f6feb" label="v" />
        <text x="520" y="142" className="caption-label">斜率和面积可视化</text>
      </svg>
    </div>
  )
}

function OpticsScene({ params }: { params: SimParams }) {
  const lensX = 380
  const objectX = 130 + params.angle * 1.7
  const objectTop = 164
  const axisY = 226
  const focalLength = 106
  const objectDistance = lensX - objectX
  const imageDistance = Math.min(250, Math.max(78, (focalLength * objectDistance) / Math.max(18, objectDistance - focalLength)))
  const imageX = lensX + imageDistance
  const imageHeight = Math.min(92, Math.max(28, (axisY - objectTop) * imageDistance / objectDistance))

  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="光路模型">
        <defs>
          <linearGradient id="lensGlass" x1="0" x2="1">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <line x1="76" y1={axisY} x2="690" y2={axisY} stroke="#475569" strokeWidth="3" />
        <line x1={lensX - focalLength} y1={axisY - 12} x2={lensX - focalLength} y2={axisY + 12} stroke="#64748b" strokeWidth="3" />
        <line x1={lensX + focalLength} y1={axisY - 12} x2={lensX + focalLength} y2={axisY + 12} stroke="#64748b" strokeWidth="3" />
        <text x={lensX - focalLength - 8} y={axisY + 34} fill="#64748b" fontSize="14" fontWeight="800">F</text>
        <text x={lensX + focalLength - 8} y={axisY + 34} fill="#64748b" fontSize="14" fontWeight="800">F</text>
        <rect x="96" y="310" width="580" height="16" rx="8" fill="#cbd5e1" />
        <path d="M 360 78 C 324 144 324 304 360 372" fill="url(#lensGlass)" stroke="#2563eb" strokeWidth="4" />
        <path d="M 400 78 C 436 144 436 304 400 372" fill="url(#lensGlass)" stroke="#2563eb" strokeWidth="4" />
        <line x1={lensX} y1="78" x2={lensX} y2="372" stroke="#60a5fa" strokeWidth="2" opacity="0.5" />
        <line x1={objectX} y1={axisY} x2={objectX} y2={objectTop} stroke="#111827" strokeWidth="5" />
        <path d={`M${objectX - 18} ${objectTop + 26} C${objectX - 4} ${objectTop - 10} ${objectX + 14} ${objectTop - 8} ${objectX + 18} ${objectTop + 24}`} fill="#f97316" stroke="#9a3412" strokeWidth="2" />
        <line x1={objectX} y1={objectTop} x2={lensX} y2={objectTop} stroke="#ef4444" strokeWidth="4" />
        <line x1={lensX} y1={objectTop} x2={imageX} y2={axisY + imageHeight} stroke="#ef4444" strokeWidth="4" />
        <line x1={objectX} y1={objectTop} x2={lensX} y2={axisY} stroke="#f97316" strokeWidth="4" />
        <line x1={lensX} y1={axisY} x2={imageX} y2={axisY + imageHeight} stroke="#f97316" strokeWidth="4" />
        <rect x={imageX - 34} y="120" width="68" height="188" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
        <line x1={imageX} y1={axisY} x2={imageX} y2={axisY + imageHeight} stroke="#1f2937" strokeWidth="5" opacity="0.85" />
        <path d={`M${imageX - 13} ${axisY + imageHeight - 18} C${imageX - 2} ${axisY + imageHeight + 14} ${imageX + 12} ${axisY + imageHeight + 10} ${imageX + 14} ${axisY + imageHeight - 18}`} fill="#fb923c" opacity="0.8" />
        <text x="104" y="58" fill="#334155" fontSize="18" fontWeight="900">凸透镜成像：平行光过焦点，过光心方向不变</text>
      </svg>
    </div>
  )
}

function FluidScene({ params }: { params: SimParams }) {
  const waterTop = 330 - params.height * 1.8
  const holeDepth = [34, 78, 122]
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="流体压强和浮力模型">
        <rect x="0" y="0" width="760" height="430" fill="#f8fafc" />
        <rect x="132" y="82" width="220" height="272" rx="18" fill="rgba(255,255,255,0.68)" stroke="#64748b" strokeWidth="4" />
        <rect x="144" y={waterTop} width="196" height={340 - waterTop} rx="10" fill="rgba(37,99,235,0.34)" />
        <path d={`M144 ${waterTop} C184 ${waterTop - 10} 222 ${waterTop + 10} 260 ${waterTop} C294 ${waterTop - 8} 318 ${waterTop + 8} 340 ${waterTop}`} fill="none" stroke="#0284c7" strokeWidth="3" opacity="0.62" />
        {holeDepth.map((depth, i) => {
          const y = waterTop + depth
          const jet = Math.max(0, (340 - y) * params.density * 0.008)
          return (
            <g key={depth}>
              <circle cx="352" cy={y} r="5" fill="#0f172a" />
              <path d={`M356 ${y} C${400 + jet} ${y + 8} ${430 + jet * 1.4} ${y + 26} ${462 + jet * 1.8} ${y + 46}`} fill="none" stroke="#2563eb" strokeWidth={3 + i} strokeLinecap="round" opacity="0.75" />
            </g>
          )
        })}
        <rect x="486" y="116" width="146" height="178" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="522" y1="252" x2="522" y2="152" stroke="#334155" strokeWidth="5" />
        <line x1="594" y1="252" x2="594" y2={252 - params.height} stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
        <line x1="522" y1="252" x2="594" y2="252" stroke="#334155" strokeWidth="5" />
        <text x="500" y="326" fill="#334155" fontSize="18" fontWeight="900">p=ρgh</text>
        <text x="500" y="354" fill="#475569" fontSize="15" fontWeight="800">越深，水柱压强越大，喷得越远</text>
      </svg>
    </div>
  )
}

function EnergyScene({ params }: { params: SimParams }) {
  const fillWidth = Math.max(40, params.force * 3.4)
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
        <rect x="210" y="302" width={fillWidth} height="28" rx="14" className="efficiency-fill" />
        <text x="284" y="360" className="caption-label">输入={params.temperature}%，输出={params.force}%</text>
      </svg>
    </div>
  )
}

function PulleyScene({ params }: { params: SimParams }) {
  const loadY = 330 - params.height
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="滑轮组模型">
        <line x1="140" y1="70" x2="590" y2="70" className="axis" />
        <circle cx="250" cy="150" r="44" className="pulley" />
        <circle cx="430" cy="236" r="44" className="pulley move" />
        <path d="M250 106 L430 192 L430 280 L250 194 L250 106" className="rope" />
        <rect x="390" y={loadY} width="80" height="72" rx="8" className="weight" />
        <Arrow x1={560} y1={140} x2={560 + params.force} y2={140} color="#e04a3f" label={`F=${params.force}N`} />
        <text x="292" y="384" className="caption-label">数绳段，建立力和位移关系</text>
      </svg>
    </div>
  )
}

function ParticleFieldScene({ params }: { params: SimParams }) {
  const curveEnd = 98 + (12 - params.voltage) * 10
  return (
    <div className="visual-canvas">
      <svg viewBox="0 0 760 430" role="img" aria-label="场中运动模型">
        <rect x="260" y="80" width="330" height="260" rx="10" className="field" />
        <path d={`M90 246 C210 246 260 246 332 226 C430 198 486 138 560 ${curveEnd}`} className="trajectory" />
        <circle cx="126" cy="246" r="12" className="particle" />
        <Arrow x1={126} y1={246} x2={218} y2={246} color="#1f6feb" label="v" />
        <Arrow x1={354} y1={220} x2={354} y2={220 - params.force} color="#7b3ff2" label="F" />
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
