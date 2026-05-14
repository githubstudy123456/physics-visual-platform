export type Stage = '初中' | '高中'

export type CanvasKind =
  | 'incline'
  | 'circuit'
  | 'macroMicro'
  | 'graph'
  | 'pulley'
  | 'field'
  | 'force'
  | 'optics'
  | 'fluid'
  | 'energy'

export type ModelTemplate = {
  id: string
  title: string
  domain: string
  level: '基础' | '高频' | '综合'
  canvasKind: CanvasKind
  description: string
  objects: string[]
  steps: string[]
  explainer: {
    goal: string
    narration: string[]
    commonTasks: string[]
  }
}

export type LessonSection = {
  title: string
  knowledge: string[]
  modelIds: string[]
}

export type Chapter = {
  id: string
  bookId: string
  stage: Stage
  grade: string
  volume: string
  chapterNo: string
  title: string
  domain: string
  sections: LessonSection[]
  modelIds: string[]
}

export type Book = {
  id: string
  title: string
  stage: Stage
  grade: string
  volume: string
  source: string
}

export const books: Book[] = [
  {
    id: 'rj8a',
    title: '人教版八年级物理上册',
    stage: '初中',
    grade: '八年级',
    volume: '上册',
    source: '本地 PDF：人教版八年级物理上册课本.pdf',
  },
  {
    id: 'rj8b',
    title: '新人教版八年级物理下册',
    stage: '初中',
    grade: '八年级',
    volume: '下册',
    source: '本地 PDF：新人教版八年级下最新电子课本.pdf',
  },
  {
    id: 'rj9',
    title: '新人教版九年级物理全一册',
    stage: '初中',
    grade: '九年级',
    volume: '全一册',
    source: '本地 PDF：新人教版九年级物理全一册-电子课本.pdf',
  },
  {
    id: 'rj-high-required-1',
    title: '人教版高中物理必修第一册',
    stage: '高中',
    grade: '高中',
    volume: '必修第一册',
    source: '高中物理教材结构：运动、相互作用、牛顿运动定律。',
  },
  {
    id: 'rj-high-required-2',
    title: '人教版高中物理必修第二册',
    stage: '高中',
    grade: '高中',
    volume: '必修第二册',
    source: '高中物理教材结构：曲线运动、万有引力、机械能。',
  },
  {
    id: 'rj-high-required-3',
    title: '人教版高中物理必修第三册',
    stage: '高中',
    grade: '高中',
    volume: '必修第三册',
    source: '高中物理教材结构：静电场、电路、电磁场与能源。',
  },
  {
    id: 'rj-high-selective-1',
    title: '人教版高中物理选择性必修第一册',
    stage: '高中',
    grade: '高中',
    volume: '选择性必修第一册',
    source: '高中物理教材结构：动量、机械振动、机械波、光。',
  },
  {
    id: 'rj-high-selective-2',
    title: '人教版高中物理选择性必修第二册',
    stage: '高中',
    grade: '高中',
    volume: '选择性必修第二册',
    source: '高中物理教材结构：磁场、电磁感应、交变电流。',
  },
]

export const modelTemplates: ModelTemplate[] = [
  {
    id: 'measurement-scale',
    title: '刻度尺/秒表测量模型',
    domain: '机械运动',
    level: '基础',
    canvasKind: 'graph',
    description: '用简洁标尺、秒表和数轴展示单位换算、估读、误差和平均速度测量。',
    objects: ['刻度尺', '秒表', '小车', '斜面', 's-t 表格'],
    steps: ['显示测量工具', '标出分度值', '读取数据', '计算平均速度'],
    explainer: explain(
      '让学生看懂“测什么、怎么读、怎么算”。',
      ['先看测量对象，再看工具分度值。', '读数要估读到分度值下一位。', '平均速度只用总路程除以总时间。'],
      ['平均速度实验', '刻度尺读数', '单位换算'],
    ),
  },
  {
    id: 'sound-wave',
    title: '声波传播模型',
    domain: '声现象',
    level: '基础',
    canvasKind: 'graph',
    description: '用疏密波、振幅和频率展示声音产生、传播、音调、响度和音色。',
    objects: ['声源', '介质粒子', '波形', '振幅', '频率'],
    steps: ['声源振动', '介质传声', '改变频率', '改变振幅', '应用与噪声'],
    explainer: explain(
      '把看不见的声传播转成可见波形和粒子振动。',
      ['声音由物体振动产生。', '声音传播需要介质，真空不能传声。', '频率决定音调，振幅影响响度。'],
      ['音调响度辨析', '声速计算', '噪声控制'],
    ),
  },
  {
    id: 'state-change',
    title: '物态变化能量模型',
    domain: '物态变化',
    level: '基础',
    canvasKind: 'macroMicro',
    description: '宏观显示冰、水、蒸气，微观显示粒子间距和能量变化。',
    objects: ['温度计', '冰块', '水', '水蒸气', '粒子间距'],
    steps: ['温度读取', '熔化凝固', '汽化液化', '升华凝华', '吸放热总结'],
    explainer: explain(
      '用粒子间距和能量变化解释六种物态变化。',
      ['先判断初末状态。', '固体、液体、气体的粒子间距逐渐变大。', '向高能状态变化通常吸热，反向放热。'],
      ['物态变化判断', '吸热放热判断', '温度图像'],
    ),
  },
  {
    id: 'light-ray',
    title: '光路与成像模型',
    domain: '光学',
    level: '高频',
    canvasKind: 'optics',
    description: '用光线、法线、镜面、透镜和像点构建反射、折射、平面镜与凸透镜成像。',
    objects: ['入射光线', '反射光线', '折射光线', '法线', '透镜', '像'],
    steps: ['画主光线', '标角度', '形成像点', '总结规律'],
    explainer: explain(
      '把光学题统一成“画光线、找交点、判成像”。',
      ['先画法线或主光轴。', '反射看等角，折射看偏折方向。', '凸透镜成像用三条特殊光线确定像。'],
      ['平面镜成像', '凸透镜成像', '折射作图'],
    ),
  },
  {
    id: 'density-particle',
    title: '质量密度模型',
    domain: '质量与密度',
    level: '基础',
    canvasKind: 'macroMicro',
    description: '用相同体积不同粒子密集程度解释密度，并连接天平、量筒测量流程。',
    objects: ['天平', '量筒', '物块', '粒子密集程度', 'ρ=m/V'],
    steps: ['测质量', '测体积', '比较粒子密度', '计算密度'],
    explainer: explain(
      '把密度从公式变成“同体积装了多少质量”的直观比较。',
      ['质量表示物体含有物质多少。', '体积相同，质量越大，密度越大。', '测密度要分别测出质量和体积。'],
      ['密度计算', '空心实心判断', '测固体/液体密度'],
    ),
  },
  {
    id: 'force-vector',
    title: '力的三要素模型',
    domain: '力学',
    level: '基础',
    canvasKind: 'force',
    description: '用箭头展示力的大小、方向、作用点，以及弹力、重力的典型画法。',
    objects: ['物体', '力箭头', '作用点', '弹簧', '重心'],
    steps: ['确定对象', '画作用点', '画方向', '标大小', '判断效果'],
    explainer: explain(
      '训练学生先找受力对象，再用箭头表达力。',
      ['力不能离开物体单独存在。', '一个力至少要说明大小、方向、作用点。', '重力竖直向下，弹力来自形变。'],
      ['画力示意图', '相互作用力', '弹簧测力计读数'],
    ),
  },
  {
    id: 'newton-friction',
    title: '运动和力模型',
    domain: '运动和力',
    level: '高频',
    canvasKind: 'force',
    description: '展示惯性、二力平衡、摩擦力方向和大小变化。',
    objects: ['小车', '木块', '拉力', '摩擦力', '支持力', '重力'],
    steps: ['判断运动状态', '受力分析', '二力平衡', '摩擦力判断'],
    explainer: explain(
      '用运动状态反推受力关系，解决平衡和摩擦判断。',
      ['静止或匀速直线运动时合力为零。', '摩擦力总是阻碍相对运动或相对运动趋势。', '先判断状态，再画受力。'],
      ['二力平衡', '摩擦力方向', '惯性现象'],
    ),
  },
  {
    id: 'pressure-fluid',
    title: '压强与液体压强模型',
    domain: '压强',
    level: '高频',
    canvasKind: 'fluid',
    description: '用受力面积、液柱深度和连通器展示固体压强、液体压强和大气压。',
    objects: ['压力 F', '受力面积 S', '液柱', '深度 h', '压强计'],
    steps: ['比较面积', '显示液柱', '深度变化', '压强变化'],
    explainer: explain(
      '把压强题拆成压力、面积、深度三个可视变量。',
      ['固体压强看压力和受力面积。', '液体压强随深度增加而增大。', '流速越大的位置压强越小。'],
      ['固体压强比较', '液体压强计算', '流体压强现象'],
    ),
  },
  {
    id: 'buoyancy',
    title: '浮力与浮沉模型',
    domain: '浮力',
    level: '高频',
    canvasKind: 'fluid',
    description: '用排开液体体积、浮力箭头和重力箭头展示阿基米德原理与浮沉条件。',
    objects: ['物体', '液体', '排开体积', '浮力', '重力'],
    steps: ['浸入液体', '显示排开体积', '比较 F浮 和 G', '判断浮沉'],
    explainer: explain(
      '用“排开多少液体”和“浮力重力比较”统一浮力题。',
      ['浮力方向竖直向上。', '浮力大小等于排开液体所受重力。', '比较浮力和重力判断上浮、悬浮、下沉。'],
      ['称重法求浮力', '阿基米德原理', '浮沉条件'],
    ),
  },
  {
    id: 'work-energy',
    title: '功、功率和机械能模型',
    domain: '功和机械能',
    level: '综合',
    canvasKind: 'energy',
    description: '用力和位移同向关系、能量条和高度变化展示功、功率、动能、势能。',
    objects: ['力 F', '位移 s', '速度 v', '高度 h', '能量条'],
    steps: ['判断是否做功', '计算功率', '能量转化', '机械能守恒/损失'],
    explainer: explain(
      '用能量条展示做功和能量转化，而不是只背公式。',
      ['做功要同时有力和沿力方向的距离。', '功率表示做功快慢。', '动能看质量和速度，势能看高度或形变。'],
      ['是否做功', '功率计算', '机械能转化'],
    ),
  },
  {
    id: 'pulley-system',
    title: '杠杆/滑轮/机械效率模型',
    domain: '简单机械',
    level: '综合',
    canvasKind: 'pulley',
    description: '用杠杆力臂、滑轮绳段和机械效率条展示简单机械的省力与效率。',
    objects: ['杠杆', '支点', '力臂', '定滑轮', '动滑轮', '绳段'],
    steps: ['画结构', '标力臂/绳段', '列关系', '计算效率'],
    explainer: explain(
      '把简单机械问题统一成力、距离、效率三件事。',
      ['杠杆先找支点，再画力臂。', '滑轮组先数承担重物的绳段。', '机械效率等于有用功与总功之比。'],
      ['杠杆平衡', '滑轮组省力', '机械效率'],
    ),
  },
  {
    id: 'macro-micro',
    title: '分子热运动模型',
    domain: '内能',
    level: '基础',
    canvasKind: 'macroMicro',
    description: '先展示宏观扩散，再用放大镜推进到分子无规则运动。',
    objects: ['宏观实验图', '放大镜', '分子粒子', '运动轨迹', '扩散云团'],
    steps: ['宏观现象', '提出问题', '镜头放大', '粒子运动', '概念总结'],
    explainer: explain(
      '从宏观现象逐步放大到微观粒子，解释热运动。',
      ['先看香水或墨水扩散。', '再把镜头放大到水内部。', '粒子一直在无规则运动，温度越高运动越剧烈。'],
      ['扩散现象', '分子热运动', '温度影响扩散'],
    ),
  },
  {
    id: 'heat-engine',
    title: '热机与能量流模型',
    domain: '内能利用',
    level: '基础',
    canvasKind: 'energy',
    description: '用能量流向图展示燃料化学能、内能、机械能和效率损失。',
    objects: ['燃料', '气缸', '活塞', '能量箭头', '效率条'],
    steps: ['燃烧放热', '推动活塞', '能量转化', '效率分析'],
    explainer: explain(
      '用能量流向解释热机和热机效率。',
      ['燃料燃烧释放内能。', '内能推动活塞转化为机械能。', '一部分能量会散失，所以效率小于百分之百。'],
      ['四冲程热机', '热值', '热机效率'],
    ),
  },
  {
    id: 'circuit-basic',
    title: '电流和电路模型',
    domain: '电学',
    level: '基础',
    canvasKind: 'circuit',
    description: '用统一电路符号和高亮电流路径展示电荷、电流、串联和并联。',
    objects: ['电源', '开关', '灯泡', '导线', '电流方向'],
    steps: ['识别元件', '闭合电路', '电流路径', '串并联对比'],
    explainer: explain(
      '把电路图变成可追踪的电流路径。',
      ['先判断电路是否闭合。', '串联只有一条电流路径。', '并联有分支，干路电流等于各支路之和。'],
      ['串并联识别', '电流表接法', '电路故障'],
    ),
  },
  {
    id: 'voltage-resistance',
    title: '电压电阻与变阻器模型',
    domain: '电压 电阻',
    level: '高频',
    canvasKind: 'circuit',
    description: '展示电压表接法、电阻影响因素、滑动变阻器接入长度。',
    objects: ['电压表', '电阻', '滑动变阻器', '滑片', '电路路径'],
    steps: ['接入电压表', '比较电阻', '滑片移动', '读数变化'],
    explainer: explain(
      '用滑片和接入长度解释电阻变化。',
      ['电压表要并联在被测用电器两端。', '电阻与材料、长度、横截面积和温度有关。', '滑动变阻器改变的是接入电路的电阻丝长度。'],
      ['电压表读数', '滑动变阻器', '动态电路'],
    ),
  },
  {
    id: 'ohm-law',
    title: '欧姆定律图像模型',
    domain: '欧姆定律',
    level: '高频',
    canvasKind: 'circuit',
    description: '用电路和 U-I 图像同步展示电流、电压、电阻的定量关系。',
    objects: ['电源', '电阻', '电流表', '电压表', 'U-I 图像'],
    steps: ['控制变量', '记录数据', '生成图像', '应用公式'],
    explainer: explain(
      '把欧姆定律从公式变成电路和图像的同步关系。',
      ['电阻一定时，电流与电压成正比。', '电压一定时，电流与电阻成反比。', '计算前先确认是否同一段电路。'],
      ['I=U/R', '伏安法测电阻', '动态电路计算'],
    ),
  },
  {
    id: 'electric-power',
    title: '电功率与焦耳定律模型',
    domain: '电功率',
    level: '高频',
    canvasKind: 'circuit',
    description: '用灯泡亮度、功率条和发热量展示 P=UI 与 Q=I²Rt。',
    objects: ['灯泡', '电流', '电压', '功率条', '热量条'],
    steps: ['电功转化', '功率比较', '测小灯泡功率', '焦耳热'],
    explainer: explain(
      '用亮度和发热条解释电功率和焦耳定律。',
      ['电功率表示用电器消耗电能的快慢。', '灯泡亮暗主要看实际功率。', '电流热效应与电流平方、阻值和时间有关。'],
      ['额定/实际功率', '测小灯泡功率', '焦耳定律'],
    ),
  },
  {
    id: 'home-electric',
    title: '家庭电路安全模型',
    domain: '生活用电',
    level: '基础',
    canvasKind: 'circuit',
    description: '用火线零线、开关、保险丝、漏电保护器展示家庭电路安全。',
    objects: ['火线', '零线', '开关', '用电器', '保险丝', '人体触电路径'],
    steps: ['画家庭电路', '找危险接法', '过载短路', '安全用电'],
    explainer: explain(
      '用电流路径解释家庭电路危险点。',
      ['开关应接在火线上。', '电流过大常见原因是总功率过大或短路。', '安全用电核心是避免人体成为电流通路。'],
      ['家庭电路接法', '短路过载', '安全用电'],
    ),
  },
  {
    id: 'electromagnetism',
    title: '电与磁模型',
    domain: '电磁学',
    level: '综合',
    canvasKind: 'field',
    description: '用磁感线、通电螺线管、电动机和电磁感应展示电磁关系。',
    objects: ['磁体', '磁感线', '线圈', '电流方向', '运动方向'],
    steps: ['显示磁场', '通电生磁', '受力转动', '切割磁感线'],
    explainer: explain(
      '用磁感线、线圈和方向规则串起电与磁。',
      ['磁场用磁感线描述方向。', '电流周围存在磁场。', '通电导线在磁场中受力，切割磁感线会产生感应电流。'],
      ['电生磁', '电动机', '发电机'],
    ),
  },
  {
    id: 'info-energy',
    title: '信息与能源流模型',
    domain: '信息与能源',
    level: '基础',
    canvasKind: 'energy',
    description: '用信号链路和能源流向图展示电磁波通信、能源分类和可持续发展。',
    objects: ['发射端', '电磁波', '接收端', '能源流', '环境影响'],
    steps: ['信号产生', '传播接收', '能源分类', '可持续判断'],
    explainer: explain(
      '用流程图讲清信息传递和能源利用。',
      ['电话把声信号转化为电信号。', '电磁波可以在真空中传播。', '能源利用要同时考虑效率、储量和环境影响。'],
      ['电磁波通信', '能源分类', '可持续发展'],
    ),
  },
  {
    id: 'kinematics-graph',
    title: '匀变速直线运动模型',
    domain: '高中运动学',
    level: '高频',
    canvasKind: 'graph',
    description: '用小车轨迹、v-t 图像和面积关系展示位移、速度、加速度。',
    objects: ['小车', '位移 x', '速度 v', '加速度 a', 'v-t 图像'],
    steps: ['设定初速度', '调节加速度', '观察速度变化', '用图像面积求位移'],
    explainer: explain(
      '让学生把运动公式和 v-t 图像联系起来。',
      ['速度图像的斜率表示加速度。', '速度图像与时间轴围成的面积表示位移。', '先判运动类型，再选公式。'],
      ['匀变速计算', 'v-t 图像', '追及相遇'],
    ),
  },
  {
    id: 'projectile-motion',
    title: '平抛/斜抛运动模型',
    domain: '高中曲线运动',
    level: '高频',
    canvasKind: 'field',
    description: '把曲线运动分解为水平方向匀速和竖直方向自由落体。',
    objects: ['抛体', '初速度 v0', '重力 g', '水平位移', '竖直位移'],
    steps: ['分解运动', '调节初速度', '观察轨迹', '读出落点'],
    explainer: explain(
      '用运动分解解释抛体轨迹。',
      ['水平方向速度不变。', '竖直方向只受重力，做匀变速运动。', '两个方向共用同一个时间。'],
      ['平抛落点', '斜抛射程', '运动分解'],
    ),
  },
  {
    id: 'circular-gravity',
    title: '圆周运动/万有引力模型',
    domain: '高中力学',
    level: '综合',
    canvasKind: 'field',
    description: '用轨道、向心力和速度方向展示圆周运动与天体运动。',
    objects: ['轨道', '速度 v', '向心力 F', '半径 r', '天体'],
    steps: ['显示轨道', '标出速度切线', '标出向心力', '调节半径和速度'],
    explainer: explain(
      '把圆周运动看成速度方向不断改变的运动。',
      ['速度方向沿切线。', '合力指向圆心提供向心力。', '天体运动中万有引力充当向心力。'],
      ['向心力计算', '卫星运动', '临界速度'],
    ),
  },
  {
    id: 'electrostatic-field',
    title: '静电场与电势模型',
    domain: '高中电磁学',
    level: '高频',
    canvasKind: 'field',
    description: '用电场线、等势线和试探电荷运动展示电场强度与电势差。',
    objects: ['点电荷', '电场线', '等势线', '试探电荷', '电势差'],
    steps: ['放置电荷', '显示电场线', '移动试探电荷', '比较电势'],
    explainer: explain(
      '把抽象电场转成可读的方向和能量变化。',
      ['电场线方向表示正电荷受力方向。', '电场线越密，场强越大。', '沿电场方向电势降低。'],
      ['电场强度', '电势差', '带电粒子运动'],
    ),
  },
  {
    id: 'shm-wave',
    title: '机械振动与机械波模型',
    domain: '高中振动波动',
    level: '综合',
    canvasKind: 'graph',
    description: '用弹簧振子、位移图像和波形传播展示周期、频率、波长和波速。',
    objects: ['弹簧振子', '振幅 A', '周期 T', '波长 λ', '波速 v'],
    steps: ['调节振幅', '调节频率', '观察相位', '比较波速关系'],
    explainer: explain(
      '让振动和波从图像变成可操作的运动。',
      ['单个质点做周期性振动。', '波是振动形式在介质中的传播。', '波速满足 v=λf。'],
      ['简谐运动', '波长频率波速', '波形图像'],
    ),
  },
  {
    id: 'magnetic-induction',
    title: '磁场与电磁感应模型',
    domain: '高中电磁学',
    level: '综合',
    canvasKind: 'field',
    description: '用线圈、磁场和磁通量变化展示安培力、电磁感应和楞次定律。',
    objects: ['磁场 B', '线圈', '磁通量 Φ', '感应电流', '运动方向'],
    steps: ['显示磁场', '移动导体或磁体', '观察磁通变化', '判断感应电流方向'],
    explainer: explain(
      '用磁通量变化统一电磁感应判断。',
      ['闭合回路磁通量发生变化时产生感应电流。', '感应电流的磁场总是阻碍原磁通量的变化。', '方向判断用楞次定律或右手定则。'],
      ['感应电流方向', '法拉第电磁感应', '交流发电机'],
    ),
  },
]

export const chapters: Chapter[] = [
  chapter('8a-1', 'rj8a', '八年级', '上册', '第一章', '机械运动', '机械运动', ['measurement-scale'], [
    section('长度和时间的测量', ['单位换算', '刻度尺分度值', '估读', '误差'], ['measurement-scale']),
    section('运动的描述', ['机械运动', '参照物', '运动和静止的相对性'], ['measurement-scale']),
    section('运动的快慢', ['速度', '匀速直线运动', 'v=s/t'], ['measurement-scale']),
    section('测量平均速度', ['实验设计', '路程时间测量', '平均速度'], ['measurement-scale']),
  ]),
  chapter('8a-2', 'rj8a', '八年级', '上册', '第二章', '声现象', '声学', ['sound-wave'], [
    section('声音的产生与传播', ['振动发声', '介质传播', '声速'], ['sound-wave']),
    section('声音的特性', ['音调', '响度', '音色'], ['sound-wave']),
    section('声的利用', ['传递信息', '传递能量'], ['sound-wave']),
    section('噪声的危害和控制', ['噪声来源', '控制途径'], ['sound-wave']),
  ]),
  chapter('8a-3', 'rj8a', '八年级', '上册', '第三章', '物态变化', '热学', ['state-change'], [
    section('温度', ['温度计', '摄氏温度', '读数'], ['state-change']),
    section('熔化和凝固', ['晶体非晶体', '熔点', '吸放热'], ['state-change']),
    section('汽化和液化', ['蒸发', '沸腾', '液化'], ['state-change']),
    section('升华和凝华', ['直接变气态/固态', '吸热放热'], ['state-change']),
  ]),
  chapter('8a-4', 'rj8a', '八年级', '上册', '第四章', '光现象', '光学', ['light-ray'], [
    section('光的直线传播', ['光源', '影子', '小孔成像'], ['light-ray']),
    section('光的反射', ['反射定律', '镜面反射', '漫反射'], ['light-ray']),
    section('平面镜成像', ['像物等大', '像距物距相等', '虚像'], ['light-ray']),
    section('光的折射', ['折射光线', '法线', '折射角'], ['light-ray']),
    section('光的色散', ['白光分解', '色光三原色'], ['light-ray']),
  ]),
  chapter('8a-5', 'rj8a', '八年级', '上册', '第五章', '透镜及其应用', '光学', ['light-ray'], [
    section('透镜', ['凸透镜', '凹透镜', '焦点焦距'], ['light-ray']),
    section('生活中的透镜', ['照相机', '投影仪', '放大镜'], ['light-ray']),
    section('凸透镜成像的规律', ['物距像距', '实像虚像', '放大缩小'], ['light-ray']),
    section('眼睛和眼镜', ['近视', '远视', '矫正'], ['light-ray']),
    section('显微镜和望远镜', ['物镜', '目镜', '放大原理'], ['light-ray']),
  ]),
  chapter('8a-6', 'rj8a', '八年级', '上册', '第六章', '质量与密度', '物质属性', ['density-particle'], [
    section('质量', ['质量概念', '天平使用'], ['density-particle']),
    section('密度', ['ρ=m/V', '物质特性'], ['density-particle']),
    section('测量物质的密度', ['测质量', '测体积', '误差分析'], ['density-particle']),
    section('密度与社会生活', ['鉴别物质', '空心实心', '材料选择'], ['density-particle']),
  ]),
  chapter('8b-7', 'rj8b', '八年级', '下册', '第七章', '力', '力学', ['force-vector'], [
    section('力', ['力的作用效果', '力的三要素', '相互作用'], ['force-vector']),
    section('弹力', ['形变', '弹力', '弹簧测力计'], ['force-vector']),
    section('重力', ['重力方向', '重心', 'G=mg'], ['force-vector']),
  ]),
  chapter('8b-8', 'rj8b', '八年级', '下册', '第八章', '运动和力', '力学', ['newton-friction'], [
    section('牛顿第一定律', ['惯性', '不受力运动状态'], ['newton-friction']),
    section('二力平衡', ['平衡条件', '同体等大反向共线'], ['newton-friction']),
    section('摩擦力', ['滑动摩擦', '方向判断', '影响因素'], ['newton-friction']),
  ]),
  chapter('8b-9', 'rj8b', '八年级', '下册', '第九章', '压强', '力学', ['pressure-fluid'], [
    section('压强', ['压力', '受力面积', 'p=F/S'], ['pressure-fluid']),
    section('液体的压强', ['深度', '密度', '连通器'], ['pressure-fluid']),
    section('大气压强', ['托里拆利实验', '大气压应用'], ['pressure-fluid']),
    section('流体压强与流速的关系', ['流速大压强小', '升力'], ['pressure-fluid']),
  ]),
  chapter('8b-10', 'rj8b', '八年级', '下册', '第十章', '浮力', '力学', ['buoyancy'], [
    section('浮力', ['浮力方向', '称重法'], ['buoyancy']),
    section('阿基米德原理', ['排开液体', 'F浮=G排'], ['buoyancy']),
    section('物体的浮沉条件及应用', ['漂浮', '悬浮', '下沉', '密度计'], ['buoyancy']),
  ]),
  chapter('8b-11', 'rj8b', '八年级', '下册', '第十一章', '功和机械能', '能量', ['work-energy'], [
    section('功', ['做功条件', 'W=Fs'], ['work-energy']),
    section('功率', ['做功快慢', 'P=W/t'], ['work-energy']),
    section('动能和势能', ['质量速度高度弹性形变'], ['work-energy']),
    section('机械能及其转化', ['动能势能转化', '机械能守恒'], ['work-energy']),
  ]),
  chapter('8b-12', 'rj8b', '八年级', '下册', '第十二章', '简单机械', '机械', ['pulley-system'], [
    section('杠杆', ['支点', '力臂', '杠杆平衡'], ['pulley-system']),
    section('滑轮', ['定滑轮', '动滑轮', '滑轮组'], ['pulley-system']),
    section('机械效率', ['有用功', '额外功', 'η'], ['pulley-system']),
  ]),
  chapter('9-13', 'rj9', '九年级', '全一册', '第十三章', '内能', '热学', ['macro-micro'], [
    section('分子热运动', ['扩散', '分子无规则运动', '温度影响'], ['macro-micro']),
    section('内能', ['分子动能势能', '改变内能方式'], ['macro-micro', 'work-energy']),
    section('比热容', ['吸放热', 'c', 'Q=cmΔt'], ['state-change']),
  ]),
  chapter('9-14', 'rj9', '九年级', '全一册', '第十四章', '内能的利用', '热学', ['heat-engine'], [
    section('热机', ['四冲程', '内能转机械能'], ['heat-engine']),
    section('热机的效率', ['燃料热值', '效率', '能量损失'], ['heat-engine']),
    section('能量的转化和守恒', ['能量形式', '守恒定律'], ['heat-engine', 'work-energy']),
  ]),
  chapter('9-15', 'rj9', '九年级', '全一册', '第十五章', '电流和电路', '电学', ['circuit-basic'], [
    section('两种电荷', ['摩擦起电', '电荷相互作用'], ['circuit-basic']),
    section('电流和电路', ['电流方向', '电路组成', '通路断路短路'], ['circuit-basic']),
    section('串联和并联', ['连接方式', '电流路径'], ['circuit-basic']),
    section('电流的测量', ['电流表接法', '量程读数'], ['circuit-basic']),
    section('串、并联电路中电流的规律', ['串联处处相等', '并联干路等于支路和'], ['circuit-basic']),
  ]),
  chapter('9-16', 'rj9', '九年级', '全一册', '第十六章', '电压 电阻', '电学', ['voltage-resistance'], [
    section('电压', ['电压作用', '电压表'], ['voltage-resistance']),
    section('串、并联电路中电压的规律', ['串联分压', '并联等压'], ['voltage-resistance']),
    section('电阻', ['导体阻碍作用', '影响因素'], ['voltage-resistance']),
    section('变阻器', ['滑动变阻器', '接法', '改变电阻'], ['voltage-resistance']),
  ]),
  chapter('9-17', 'rj9', '九年级', '全一册', '第十七章', '欧姆定律', '电学', ['ohm-law'], [
    section('电流与电压和电阻的关系', ['控制变量', 'I-U', 'I-R'], ['ohm-law']),
    section('欧姆定律', ['I=U/R', '公式变形'], ['ohm-law']),
    section('电阻的测量', ['伏安法', '电路设计'], ['ohm-law']),
    section('欧姆定律在串、并联电路中的应用', ['等效电阻', '动态电路'], ['ohm-law', 'voltage-resistance']),
  ]),
  chapter('9-18', 'rj9', '九年级', '全一册', '第十八章', '电功率', '电学', ['electric-power'], [
    section('电能 电功', ['电能表', 'W=UIt'], ['electric-power']),
    section('电功率', ['P=UI', '额定功率', '实际功率'], ['electric-power']),
    section('测量小灯泡的电功率', ['实验电路', '数据处理'], ['electric-power']),
    section('焦耳定律', ['电流热效应', 'Q=I²Rt'], ['electric-power']),
  ]),
  chapter('9-19', 'rj9', '九年级', '全一册', '第十九章', '生活用电', '电学', ['home-electric'], [
    section('家庭电路', ['火线零线', '开关接法', '插座'], ['home-electric']),
    section('家庭电路中电流过大的原因', ['总功率过大', '短路'], ['home-electric']),
    section('安全用电', ['触电', '接地', '安全原则'], ['home-electric']),
  ]),
  chapter('9-20', 'rj9', '九年级', '全一册', '第二十章', '电与磁', '电磁学', ['electromagnetism'], [
    section('磁现象 磁场', ['磁极', '磁感线', '地磁场'], ['electromagnetism']),
    section('电生磁', ['奥斯特实验', '通电螺线管'], ['electromagnetism']),
    section('电磁铁 电磁继电器', ['电磁铁强弱', '继电器'], ['electromagnetism']),
    section('电动机', ['通电导线受力', '换向器'], ['electromagnetism']),
    section('磁生电', ['电磁感应', '发电机'], ['electromagnetism']),
  ]),
  chapter('9-21', 'rj9', '九年级', '全一册', '第二十一章', '信息的传递', '信息', ['info-energy'], [
    section('现代顺风耳——电话', ['电信号', '话筒听筒'], ['info-energy']),
    section('电磁波的海洋', ['电磁波传播', '波速'], ['info-energy']),
    section('广播、电视和移动通信', ['调制', '发射接收'], ['info-energy']),
    section('越来越宽的信息之路', ['微波', '光纤', '网络通信'], ['info-energy']),
  ]),
  chapter('9-22', 'rj9', '九年级', '全一册', '第二十二章', '能源与可持续发展', '能源', ['info-energy'], [
    section('能源', ['一次能源', '二次能源', '可再生能源'], ['info-energy']),
    section('核能', ['裂变', '聚变', '核电站'], ['info-energy']),
    section('太阳能', ['太阳能转化', '利用方式'], ['info-energy']),
    section('能源与可持续发展', ['能源危机', '环境影响', '可持续'], ['info-energy']),
  ]),
  chapter('h1-1', 'rj-high-required-1', '高中', '必修第一册', '第一章', '运动的描述', '高中运动学', ['kinematics-graph'], [
    section('质点、参考系和坐标系', ['理想模型', '参考系', '位置'], []),
    section('时间和位移', ['时刻时间', '位移路程', '矢量'], ['kinematics-graph']),
    section('位置变化快慢的描述——速度', ['平均速度', '瞬时速度', 'v-t 图像'], ['kinematics-graph']),
    section('速度变化快慢的描述——加速度', ['加速度', '斜率', '方向'], ['kinematics-graph']),
  ]),
  chapter('h1-2', 'rj-high-required-1', '高中', '必修第一册', '第二章', '匀变速直线运动的研究', '高中运动学', ['kinematics-graph'], [
    section('实验：探究小车速度随时间变化', ['打点计时器', '数据处理', '图像拟合'], ['kinematics-graph']),
    section('匀变速直线运动规律', ['v=v0+at', 'x=v0t+1/2at²', 'v²-v0²=2ax'], ['kinematics-graph']),
    section('自由落体运动', ['重力加速度', '竖直向下', '匀加速'], ['kinematics-graph']),
  ]),
  chapter('h1-3', 'rj-high-required-1', '高中', '必修第一册', '第三章', '相互作用——力', '高中力学', ['force-vector'], [
    section('重力与弹力', ['重心', '形变', '胡克定律'], ['force-vector']),
    section('摩擦力', ['静摩擦', '滑动摩擦', '方向判断'], ['newton-friction']),
    section('力的合成和分解', ['平行四边形定则', '正交分解'], ['force-vector']),
  ]),
  chapter('h1-4', 'rj-high-required-1', '高中', '必修第一册', '第四章', '运动和力的关系', '高中力学', ['newton-friction'], [
    section('牛顿第一定律', ['惯性', '理想实验'], ['newton-friction']),
    section('牛顿第二定律', ['F=ma', '合力', '加速度方向'], ['newton-friction']),
    section('牛顿第三定律', ['相互作用力', '等大反向'], ['force-vector']),
  ]),
  chapter('h2-1', 'rj-high-required-2', '高中', '必修第二册', '第五章', '抛体运动', '高中曲线运动', ['projectile-motion'], [
    section('曲线运动', ['速度方向', '合力方向', '轨迹弯曲'], ['projectile-motion']),
    section('运动的合成与分解', ['独立性', '等时性'], ['projectile-motion']),
    section('平抛运动', ['水平匀速', '竖直自由落体'], ['projectile-motion']),
  ]),
  chapter('h2-2', 'rj-high-required-2', '高中', '必修第二册', '第六章', '圆周运动', '高中力学', ['circular-gravity'], [
    section('圆周运动', ['角速度', '线速度', '周期'], ['circular-gravity']),
    section('向心力', ['方向指向圆心', 'F=mv²/r'], ['circular-gravity']),
    section('生活中的圆周运动', ['临界问题', '竖直平面圆周'], ['circular-gravity']),
  ]),
  chapter('h2-3', 'rj-high-required-2', '高中', '必修第二册', '第七章', '万有引力与宇宙航行', '高中力学', ['circular-gravity'], [
    section('万有引力定律', ['平方反比', '引力常量'], ['circular-gravity']),
    section('宇宙航行', ['卫星', '环绕速度', '周期'], ['circular-gravity']),
  ]),
  chapter('h2-4', 'rj-high-required-2', '高中', '必修第二册', '第八章', '机械能守恒定律', '高中能量', ['work-energy'], [
    section('功和功率', ['W=Flcosθ', 'P=W/t'], ['work-energy']),
    section('动能和动能定理', ['合力做功', '动能变化'], ['work-energy']),
    section('机械能守恒', ['重力做功', '弹力做功', '能量转化'], ['work-energy']),
  ]),
  chapter('h3-1', 'rj-high-required-3', '高中', '必修第三册', '第九章', '静电场及其应用', '高中电磁学', ['electrostatic-field'], [
    section('电荷', ['库仑定律', '电荷守恒'], ['electrostatic-field']),
    section('电场', ['电场强度', '电场线'], ['electrostatic-field']),
    section('电势能和电势', ['电势差', '等势面'], ['electrostatic-field']),
  ]),
  chapter('h3-2', 'rj-high-required-3', '高中', '必修第三册', '第十章', '静电场中的能量', '高中电磁学', ['electrostatic-field'], [
    section('电容器', ['电容', '平行板电容器'], ['electrostatic-field']),
    section('带电粒子在电场中的运动', ['加速', '偏转', '类平抛'], ['electrostatic-field', 'projectile-motion']),
  ]),
  chapter('h3-3', 'rj-high-required-3', '高中', '必修第三册', '第十一章', '电路及其应用', '高中电路', ['ohm-law'], [
    section('电源和电流', ['恒定电流', '电动势'], ['circuit-basic']),
    section('导体电阻', ['电阻定律', '影响因素'], ['voltage-resistance']),
    section('闭合电路欧姆定律', ['内阻', '路端电压'], ['ohm-law']),
  ]),
  chapter('hs1-1', 'rj-high-selective-1', '高中', '选择性必修第一册', '第一章', '动量守恒定律', '高中力学', ['newton-friction'], [
    section('动量', ['p=mv', '冲量', '动量定理'], ['newton-friction']),
    section('动量守恒', ['系统', '内力外力', '碰撞'], ['newton-friction']),
  ]),
  chapter('hs1-2', 'rj-high-selective-1', '高中', '选择性必修第一册', '第二章', '机械振动', '高中振动波动', ['shm-wave'], [
    section('简谐运动', ['回复力', '周期', '振幅'], ['shm-wave']),
    section('单摆', ['周期公式', '小角度条件'], ['shm-wave']),
  ]),
  chapter('hs1-3', 'rj-high-selective-1', '高中', '选择性必修第一册', '第三章', '机械波', '高中振动波动', ['shm-wave'], [
    section('波的形成', ['介质', '波速', '波长'], ['shm-wave', 'sound-wave']),
    section('波的干涉和衍射', ['叠加', '稳定干涉', '明显衍射'], ['shm-wave']),
  ]),
  chapter('hs1-4', 'rj-high-selective-1', '高中', '选择性必修第一册', '第四章', '光', '高中光学', ['light-ray'], [
    section('光的折射和全反射', ['折射率', '临界角'], ['light-ray']),
    section('光的干涉和衍射', ['双缝干涉', '条纹间距'], ['shm-wave']),
  ]),
  chapter('hs2-1', 'rj-high-selective-2', '高中', '选择性必修第二册', '第一章', '安培力与洛伦兹力', '高中电磁学', ['magnetic-induction'], [
    section('磁场和磁感线', ['磁感应强度', '方向'], ['magnetic-induction']),
    section('安培力', ['左手定则', 'F=BIL'], ['magnetic-induction']),
    section('洛伦兹力', ['带电粒子偏转', '圆周运动'], ['magnetic-induction', 'circular-gravity']),
  ]),
  chapter('hs2-2', 'rj-high-selective-2', '高中', '选择性必修第二册', '第二章', '电磁感应', '高中电磁学', ['magnetic-induction'], [
    section('楞次定律', ['磁通量变化', '阻碍变化'], ['magnetic-induction']),
    section('法拉第电磁感应定律', ['感应电动势', '变化率'], ['magnetic-induction']),
  ]),
  chapter('hs2-3', 'rj-high-selective-2', '高中', '选择性必修第二册', '第三章', '交变电流', '高中电磁学', ['magnetic-induction'], [
    section('交变电流的产生', ['线圈转动', '正弦交流电'], ['magnetic-induction']),
    section('变压器和远距离输电', ['匝数比', '升压降压'], ['magnetic-induction']),
  ]),
]

export const openAssetSources = [
  {
    title: 'PhET Interactive Simulations',
    url: 'https://phet.colorado.edu/zh_CN/simulations/filter?subjects=physics&type=html',
    note: '适合作为物理交互仿真参考，后续可按主题链接到平台。',
  },
  {
    title: 'Wikimedia Commons Physics diagrams',
    url: 'https://commons.wikimedia.org/wiki/Category:Physics_diagrams',
    note: '适合查找开放许可的物理示意图，使用前需要逐项确认授权。',
  },
  {
    title: 'OpenStax Physics',
    url: 'https://openstax.org/subjects/science',
    note: '可参考教材插图组织方式和知识点表达方式。',
  },
  {
    title: 'Manim Community',
    url: 'https://github.com/ManimCommunity/manim',
    note: '适合数学/物理公式动画参考。',
  },
]

function chapter(
  id: string,
  bookId: string,
  grade: string,
  volume: string,
  chapterNo: string,
  title: string,
  domain: string,
  modelIds: string[],
  sections: LessonSection[],
): Chapter {
  return {
    id,
    bookId,
    stage: grade === '高中' ? '高中' : '初中',
    grade,
    volume,
    chapterNo,
    title,
    domain,
    sections,
    modelIds,
  }
}

function section(title: string, knowledge: string[], modelIds: string[]): LessonSection {
  return { title, knowledge, modelIds }
}

function explain(goal: string, narration: string[], commonTasks: string[]) {
  return { goal, narration, commonTasks }
}
