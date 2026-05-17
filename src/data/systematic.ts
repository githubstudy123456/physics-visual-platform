export type ViewMode = 'subject' | 'chapter' | 'lesson' | 'knowledge' | 'practice' | 'model'

export type SubjectOverview = {
  subject: string
  tagline: string
  whatIsIt: string
  history: string[]
  framework: { title: string; items: string[] }[]
  studyMethod: string[]
}

export type QuestionPattern = {
  title: string
  type: '基础' | '提高' | '真题类型'
  method: string
  variation: string
}

export type ExerciseTask = {
  id: string
  title: string
  tier: '基础巩固' | '提高训练' | '真题类型'
  source: string
  pageOrRange: string
  target: string
  requirement: string
  passScore: number
  excellentScore: number
}

export type KnowledgePointDetail = {
  id: string
  chapterId: string
  lessonTitle: string
  title: string
  definition: string
  why: string
  howToUse: string[]
  formula?: string
  unit?: string
  needsModel: boolean
  modelIds: string[]
  specialCases: string[]
  mistakes: string[]
  example: {
    prompt: string
    solution: string
  }
  patterns: QuestionPattern[]
  exercises: ExerciseTask[]
}

export type ChapterLecture = {
  chapterId: string
  goal: string
  lectureVersion: string[]
  classroomScript: string[]
  practiceList: string[]
}

export const physicsSubjectOverview: SubjectOverview = {
  subject: '物理',
  tagline: '用可测量的量解释自然现象，用模型和实验把复杂世界变简单。',
  whatIsIt:
    '物理研究物质、运动、相互作用和能量。初中物理不是背概念，而是训练学生把生活现象拆成对象、物理量、关系式和实验依据。',
  history: [
    '古代：从观察天象、杠杆、浮力开始，人们先用经验解释自然。',
    '经典物理：伽利略、牛顿把运动和力写成可计算的规律。',
    '电磁与热学：人们理解电、磁、热和能量转化，形成现代技术基础。',
    '现代物理：相对论和量子理论解释高速、微观世界，也推动芯片、激光和核能发展。',
  ],
  framework: [
    { title: '运动与力', items: ['机械运动', '力', '运动和力', '压强', '浮力', '简单机械'] },
    { title: '声光热', items: ['声现象', '光现象', '透镜', '物态变化', '内能'] },
    { title: '电和磁', items: ['电流电路', '电压电阻', '欧姆定律', '电功率', '电与磁'] },
    { title: '能量与方法', items: ['能量转化', '实验测量', '模型建构', '图像分析'] },
  ],
  studyMethod: [
    '先问研究对象是谁，不要一上来套公式。',
    '每个公式都要说清物理量、单位、适用条件。',
    '实验题先看器材和测量量，再看数据处理。',
    '做错题时标注错因：概念混淆、单位错误、读数错误、过程判断错误。',
  ],
}

export const chapterLectures: ChapterLecture[] = [
  {
    chapterId: '8a-1',
    goal: '让学生建立“怎样描述运动、怎样测量运动快慢”的第一套物理方法。',
    lectureVersion: [
      '本章不是只学几个单位和公式，而是学会描述运动。物体有没有运动，取决于参照物；运动快慢，要用路程和时间比较。',
      '第一节解决“怎么测”：长度、时间、分度值、估读和误差。',
      '第二节解决“怎么说”：选参照物后，运动和静止才有意义。',
      '第三节解决“怎么算”：速度等于路程除以时间，平均速度看一段过程。',
      '第四节解决“怎么做实验”：用刻度尺测路程，用秒表测时间，再算平均速度。',
    ],
    classroomScript: [
      '先用校车、路边树和乘客举例，让学生发现运动和静止不是绝对的。',
      '再用同一段路程不同用时、同一时间不同路程比较快慢，引出速度。',
      '最后回到斜面小车实验，让学生知道物理公式来自可测量的数据。',
    ],
    practiceList: [
      '基础：单位换算、刻度尺读数、参照物判断、速度公式直接计算。',
      '提高：平均速度分段计算、图表读数、实验误差分析。',
      '真题类型：选择题中的参照物、填空题中的读数、实验题中的平均速度。',
    ],
  },
]

export const knowledgePoints: KnowledgePointDetail[] = [
  {
    id: '8a1-unit-conversion',
    chapterId: '8a-1',
    lessonTitle: '长度和时间的测量',
    title: '单位换算',
    definition: '把同一个物理量用不同单位表示，数值会变，但实际大小不变。',
    why: '物理计算必须先统一单位，否则公式代入会错。',
    howToUse: ['看清原单位和目标单位。', '写出进率，例如 1 m = 100 cm = 1000 mm。', '大单位变小单位乘进率，小单位变大单位除以进率。'],
    unit: '长度常用 m、cm、mm；时间常用 h、min、s。',
    needsModel: false,
    modelIds: [],
    specialCases: ['面积、体积单位不是简单乘 100 或 1000，例如 1 m² = 10000 cm²。'],
    mistakes: ['把 1 h = 100 min。', '速度计算时路程用 km，时间用 s，单位没统一。', '小数点移动方向反了。'],
    example: {
      prompt: '72 km/h 等于多少 m/s？',
      solution: '72 km/h = 72 × 1000 m / 3600 s = 20 m/s。',
    },
    patterns: [
      { title: '单纯单位换算', type: '基础', method: '写进率再移动小数点。', variation: '长度、时间、速度单位互换。' },
      { title: '公式前单位统一', type: '提高', method: '先统一成 m、s，再代入 v=s/t。', variation: '题目给 km、min、cm 等混合单位。' },
      { title: '速度单位换算', type: '真题类型', method: 'km/h 与 m/s 互换：除以 3.6 或乘以 3.6。', variation: '交通速度、跑步速度、列车速度。' },
    ],
    exercises: [
      exercise('ex-unit-basic', '单位换算 12 题', '基础巩固', '平台自编讲义', 'A1-A2', '单位换算', '限时 8 分钟，错题必须写出进率。'),
      exercise('ex-unit-raise', '速度单位混合计算 8 题', '提高训练', '平台自编讲义', 'A3', '速度计算前统一单位', '每题必须写单位换算过程。'),
      exercise('ex-unit-exam', '中考速度单位真题类型 6 题', '真题类型', '历年真题类型改编', 'T1-T6', 'km/h 与 m/s', '只做类型改编，不复制原题。'),
    ],
  },
  {
    id: '8a1-ruler-reading',
    chapterId: '8a-1',
    lessonTitle: '长度和时间的测量',
    title: '刻度尺分度值与估读',
    definition: '分度值是刻度尺相邻两条刻线表示的长度；读数要估读到分度值下一位。',
    why: '读数题和实验题都会考，错一位小数就是错答案。',
    howToUse: ['先看 1 大格分成几小格。', '确定最小一格表示多少。', '读准确值，再估读下一位。'],
    needsModel: false,
    modelIds: [],
    specialCases: ['起点不一定从 0 刻度开始，要用末端读数减起点读数。'],
    mistakes: ['忘记估读。', '把物体左端默认当 0。', '单位写错或漏写。'],
    example: {
      prompt: '物体左端在 1.00 cm，右端在 3.46 cm，长度是多少？',
      solution: '长度 = 3.46 cm - 1.00 cm = 2.46 cm。',
    },
    patterns: [
      { title: '直接读数', type: '基础', method: '确定分度值后读到下一位。', variation: 'cm 尺、mm 尺、起点为 0。' },
      { title: '非零起点读数', type: '提高', method: '长度等于末端读数减起点读数。', variation: '左端不对齐 0 刻度。' },
      { title: '实验读数题', type: '真题类型', method: '答案必须带单位和估读位。', variation: '刻度尺、秒表、温度计读数综合。' },
    ],
    exercises: [
      exercise('ex-ruler-basic', '刻度尺读数 10 题', '基础巩固', '平台自编讲义', 'B1-B2', '分度值和估读', '每题标出分度值。'),
      exercise('ex-ruler-raise', '非零起点读数 8 题', '提高训练', '平台自编讲义', 'B3', '差值读数', '必须写末端减起点。'),
      exercise('ex-ruler-exam', '实验读数真题类型 6 题', '真题类型', '历年真题类型改编', 'T7-T12', '读数规范', '答案必须含单位。'),
    ],
  },
  {
    id: '8a1-reference-frame',
    chapterId: '8a-1',
    lessonTitle: '运动的描述',
    title: '参照物与运动相对性',
    definition: '描述物体运动时，被选作标准的物体叫参照物。物体相对参照物位置改变，就说它运动。',
    why: '同一个物体可以同时被说成运动或静止，关键看参照物。',
    howToUse: ['找被研究物体。', '找题目指定或隐含的参照物。', '判断两者相对位置是否改变。'],
    needsModel: true,
    modelIds: ['measurement-scale'],
    specialCases: ['不能选择被研究物体本身作为参照物。', '“太阳东升西落”通常以地面为参照物。'],
    mistakes: ['只凭生活直觉判断，不看参照物。', '把运动方向和是否运动混在一起。'],
    example: {
      prompt: '坐在行驶公交车上的乘客，相对公交车是运动还是静止？相对路边树呢？',
      solution: '相对公交车位置不变，是静止；相对路边树位置改变，是运动。',
    },
    patterns: [
      { title: '指定参照物判断', type: '基础', method: '直接看相对位置变不变。', variation: '车、人、树、地面。' },
      { title: '反推参照物', type: '提高', method: '根据“运动/静止”的描述反推出参照物可能是谁。', variation: '电梯、船、飞机。' },
      { title: '古诗和生活情境', type: '真题类型', method: '把文字描述翻译成研究对象和参照物。', variation: '两岸青山、月亮、列车。' },
    ],
    exercises: [
      exercise('ex-ref-basic', '参照物判断 12 题', '基础巩固', '平台自编讲义', 'C1-C2', '运动相对性', '每题圈出研究对象和参照物。'),
      exercise('ex-ref-raise', '反推参照物 8 题', '提高训练', '平台自编讲义', 'C3', '参照物选择', '写出至少一种合理参照物。'),
      exercise('ex-ref-exam', '参照物真题类型 8 题', '真题类型', '历年真题类型改编', 'T13-T20', '情境判断', '错题归因到“对象/参照物”。'),
    ],
  },
  {
    id: '8a1-speed',
    chapterId: '8a-1',
    lessonTitle: '运动的快慢',
    title: '速度与平均速度',
    definition: '速度表示运动快慢，等于路程与时间的比值。平均速度描述一段过程的总体快慢。',
    why: '速度是初中物理第一个核心计算模型，也是后面力学、电学图像题的基础。',
    howToUse: ['确定路程 s 和时间 t。', '统一单位。', '代入 v=s/t，并写清单位。', '平均速度必须用总路程除以总时间。'],
    formula: 'v = s / t',
    unit: 'm/s、km/h；1 m/s = 3.6 km/h。',
    needsModel: true,
    modelIds: ['measurement-scale'],
    specialCases: ['往返路程平均速度不能简单求两个速度的平均值。', '中途停留时，时间要不要计入取决于题目问的是全程还是运动过程。'],
    mistakes: ['平均速度直接取速度平均数。', '单位不统一。', '把路程和位移混淆。'],
    example: {
      prompt: '小明 200 m 用时 40 s，平均速度是多少？',
      solution: 'v=s/t=200 m/40 s=5 m/s。',
    },
    patterns: [
      { title: '直接代公式', type: '基础', method: '找 s、t，统一单位，代 v=s/t。', variation: '求速度、求路程、求时间。' },
      { title: '分段平均速度', type: '提高', method: '总路程除以总时间。', variation: '两段路程、停留、往返。' },
      { title: '图表读数计算', type: '真题类型', method: '从表格或图像读出总路程和总时间。', variation: '实验表、列车时刻表、运动图像。' },
    ],
    exercises: [
      exercise('ex-speed-basic', '速度公式基础 12 题', '基础巩固', '平台自编讲义', 'D1-D2', 'v=s/t', '先写公式再代数。'),
      exercise('ex-speed-raise', '平均速度分段 10 题', '提高训练', '平台自编讲义', 'D3-D4', '总路程/总时间', '每题必须写总路程和总时间。'),
      exercise('ex-speed-exam', '速度图表真题类型 8 题', '真题类型', '历年真题类型改编', 'T21-T28', '图表提取信息', '先标出已知量。'),
    ],
  },
  {
    id: '8a1-average-speed-experiment',
    chapterId: '8a-1',
    lessonTitle: '测量平均速度',
    title: '测量平均速度实验',
    definition: '用刻度尺测小车通过的路程，用秒表测对应时间，再用 v=s/t 计算平均速度。',
    why: '这是学生第一次把测量、实验设计、数据处理和公式计算合在一起。',
    howToUse: ['明确测哪一段路程。', '让小车从斜面由静止释放。', '记录路程和时间。', '计算全程或某段平均速度。'],
    formula: 'v = s / t',
    needsModel: true,
    modelIds: ['measurement-scale'],
    specialCases: ['斜面坡度不能太大，否则时间太短，误差变大。', '下半程平均速度通常大于上半程。'],
    mistakes: ['路程和时间不是同一段。', '先放车后按表导致时间偏小。', '误把某一时刻速度当平均速度。'],
    example: {
      prompt: '小车通过 80 cm 用时 4.0 s，平均速度是多少？',
      solution: 'v=80 cm/4.0 s=20 cm/s=0.20 m/s。',
    },
    patterns: [
      { title: '实验数据计算', type: '基础', method: '用表格里的 s 和 t 算 v。', variation: '全程、上半程、下半程。' },
      { title: '实验误差分析', type: '提高', method: '判断坡度、计时、读数对结果的影响。', variation: '时间偏大/偏小导致速度偏小/偏大。' },
      { title: '实验设计题', type: '真题类型', method: '写器材、测量量、公式和注意事项。', variation: '补表格、补步骤、判断错误操作。' },
    ],
    exercises: [
      exercise('ex-exp-basic', '平均速度实验计算 8 题', '基础巩固', '平台自编讲义', 'E1-E2', '实验数据处理', '每题写 s、t、v 三列。'),
      exercise('ex-exp-raise', '实验误差分析 8 题', '提高训练', '平台自编讲义', 'E3', '误差判断', '写出偏大或偏小原因。'),
      exercise('ex-exp-exam', '平均速度实验真题类型 8 题', '真题类型', '历年真题类型改编', 'T29-T36', '实验综合', '按步骤、数据、结论三部分订正。'),
    ],
  },
]

function exercise(
  id: string,
  title: string,
  tier: ExerciseTask['tier'],
  source: string,
  pageOrRange: string,
  target: string,
  requirement: string,
): ExerciseTask {
  return {
    id,
    title,
    tier,
    source,
    pageOrRange,
    target,
    requirement,
    passScore: 80,
    excellentScore: 90,
  }
}
