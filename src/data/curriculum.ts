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
    stage: '初中',
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
