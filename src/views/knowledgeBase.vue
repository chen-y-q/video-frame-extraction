<template>
  <div class="box">
    <div class="search-box">
      <el-input
        v-model="searchValue"
        style="max-width: 600px;"
        placeholder="请输入题目"
        class="input-with-select"
        clearable
      >
        <template #append>
          <el-button :icon="Search" @click="searchBtn()" />
        </template>
      </el-input>
    </div>
    <div class="show-box">
      <div class="item" v-for="(i, index) in showData" :key="index">
        <div class="t-a">
          <div class="t">{{ i.topic }}</div>
          <div class="a"><span>答案：</span>{{ i.answer }}</div>
        </div>
        <div class="a-list" v-if="i.type != 'determine'">
          <div
            class="a-i"
            v-for="(subI, subIndex) in i.answer_arr"
            :key="subIndex"
            :class="{
              active: isOn(subI, i.answer, subIndex),
            }"
          >
            {{ subI }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';

// #region data-start
const data = ref([
  {
    topic:
      '数据源某张表在数据库中删除了一个字段，在系统同步表之后，对已经引用了该表字段的查询和报表不影响。',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '诊断性统计分析提供了有关趋势或关系为何发生的重要信息，解释为什么发生',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '即席查询能够进行时间计算',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '即席查询主要用于清单明细数据的查询',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '数据模型实现时间层次结构是在日期字段右键选择创建时间层次结构',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '关系数据源只能单表同步，不能批量同步表',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      'ETL 通常是将多来源的异构数据，进行处理后得到具备完整性、一致性的数据模型。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '自助ETL数据查询是指新建或编辑数据模型的私有查询，然后将新建的私有查询转换为表放到高速缓存库中作为数据源。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '自助ETL中的多表join组件能够跨接入点进行表关联。',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '设置过缓存的自助ETL对于已经执行过节点，再次执行（选择从头执行或节点上右键三种方式执行）时，还是需要从头执行一遍。',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '数据模型不能实现跨数据库查询',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '漏斗分析模型主要用于分析客户在购买过程中的流失点',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '即席查询只能实现字符串类型数据设置告警，不能实现数值类型数据设置告警',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '透视分析中可以通过维度去关联筛选度量，点击“开启维度和度量的关联筛选”后，勾选所需维度，可快速过滤出其在数据模型中有表关联关系的度量。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '在BI平台中，可通过新建分组的方式，对数值数据进行分组统计，以观察数据的分布特征',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '关键指标、分组、分散、相关性等描述分析属于图形选择决策树中描述系列的图形特性',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: 'Excel数据源指将数据文件导入到高速缓存库或关系数据源。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '在数据模型中可以通过创建计算度量的方式实现时间计算。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '数据模型创建层次结构是用于在仪表盘中可以实现层次下钻',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '进行数据建模之后，可以对不需要的原始表以及字段进行隐藏，避免进行业务分析时出现不必要的干扰。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '在数据模型中可以对度量字段以及计算度量字段修改数据格式。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '透视分析上创建的分组字段属于报表私有，不能和其它报表共用。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '在透视分析中，可以修改普通度量字段的汇总依据，当修改其汇总依据时系统会自动替换原有字段的汇总依据。',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '交互式仪表盘支持以组件或者字段作为筛选器',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '交互式仪表盘中需要多个相同风格组件，可以通过复制粘贴组件的方式提高效率。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: 'Web电子表格无法实现点击列头自动排序效果。',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '交互式仪表盘的指标看板或文本组件可以实现的条件格式类型有文字与图标集，不支持背景',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '用五个以W开头的英语单词和两个以H开头的英语单词进行设问，发现需要解决什么问题以及解决问题的线索 ',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '现代的自助式分析模式，业务问题引出的开发流程，是以业务为中心、解决问题为导向，IT提供数据服务、分析工具；业务自助式探索分析。 ',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '数据模型可以通过新建目录或者新建层次结构对维度字段进行归类划分，方便业务用户快速查找维度字段，提升分析效率',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '在数据模型中，可以新建目录来存放字段，且该目录下的字段拥有层次结构',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '即席查询一旦勾选完成需要查看的字段则无法再调整。',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '交互式仪表盘如果需要统一设计风格，可以在“主题”中进行相应设置',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '交互式仪表盘中的组件可以实现数据格式的调整以及实现数据排序',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '交互式仪表盘无法实现在饼图/圆环图计算占比数据',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '在BI平台中，可通过将维度转换为度量，并对此度量字段设置汇总依据（例如计数、唯一计数等）的方式，实现分类数据的统计',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '麦肯锡逻辑树又称问题树、演绎树或分解树等。逻辑树是将问题的所有子问题分层罗列，从最高层开始，并逐步向下扩展，发现需要解决的问题以及拆解演变。',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '数据模型中，包含以下哪一种子查询时，必须使用抽取模式',
    answer: 'ABCD',
    answer_arr: ['A.导入文件', 'B.脚本查询', 'C.ETL高级查询', 'D.存储过程查询'],
    type: 'multiple',
  },
  {
    topic: '交互式仪表盘的布局工具包括哪些功能，实现大屏精准排布，组件快速定位',
    answer: 'ABCD',
    answer_arr: [
      'A.鹰眼、画布缩放',
      'B.参考线、网格线、智能参考线',
      'C.组件锁定',
      'D.组件组合、对齐、分布、匹配大小',
    ],
    type: 'multiple',
  },
  {
    topic: '通过哪些方式可以实现交互式仪表盘的交互设计',
    answer: 'ABCD',
    answer_arr: ['A. 组件筛选', 'B. 组件联动', 'C. 组件下钻', 'D. 组件跳转'],
    type: 'multiple',
  },
  {
    topic:
      '业务人员存在一些线下数据需要合并分析，在数据模型中可以使用什么子查询进行模型的构建？',
    answer: 'A',
    answer_arr: [
      'A. 导入文件',
      'B. 可视化SQL查询',
      'C. 数据源表',
      'D. SQL查询',
    ],
    type: 'radio',
  },
  {
    topic: '交互式仪表盘中对图形数据实现预警使用的是什么功能',
    answer: 'D',
    answer_arr: ['A. 文字', 'B. 背景', 'C. 图标集', 'D. 标线'],
    type: 'radio',
  },
  {
    topic: '在数据模型中，维度字段的属性有',
    answer: 'A',
    answer_arr: ['A. 别名', 'B. 名称', 'C. 数据格式', 'D. 汇总依据'],
    type: 'radio',
  },
  {
    topic: '如果想要看一段时间的趋势，使用哪个图形呈现效果最佳',
    answer: 'B',
    answer_arr: ['A. 饼图', 'B. 线图', 'C. 雷达图', 'D. 热力图'],
    type: 'radio',
  },
  {
    topic:
      '[align=left][font=思源黑体 Normal]查询明细数据是最为常见的业务需求，业务人员一般可以使用[/font]Smartbi[font=思源黑体 Normal]平台哪项功能？[/font][/align]',
    answer: 'A',
    answer_arr: [
      'A. 即席查询',
      'B. 透视分析',
      'C. 交互式仪表盘',
      'D. Web电子表格',
    ],
    type: 'radio',
  },
  {
    topic:
      '制作交互式仪表盘的过程中，如果出现某一步操作失误想要回退到上一步或恢复到下一步时，可以如何操作',
    answer: 'A',
    answer_arr: [
      'A. 点击撤销/重做，可快速撤销或恢复30步以内的操作',
      'B. 点击回退/前进',
      'C. 点击撤销/重做，可快速撤销或恢复100步以内的操作',
      'D. 点击回退/前进，可快速撤销或恢复30步以内的操作',
    ],
    type: 'radio',
  },
  {
    topic:
      '在在数据集的字段过少或信息量不足时，为了便于分析师分析，通过计算衍生出更加直观的指标，以上是什么分析方法',
    answer: 'A',
    answer_arr: ['A. 增维法', 'B. 降维法', 'C. 交叉法', 'D. 分组法'],
    type: 'radio',
  },
  {
    topic:
      '数据源是指创建与业务数据库的连接，拿到数据进行分析，以下哪个不属于数据源连接的类型? ',
    answer: 'B',
    answer_arr: [
      'A. 本地数据库',
      'B. 多源数据库',
      'C. 关系数据库',
      'D. NoSQL数据库',
    ],
    type: 'radio',
  },
  {
    topic: '数据模型中，对度量字段不可修改的属性是 ',
    answer: 'C',
    answer_arr: ['A. 别名', 'B. 数据格式', 'C. 名称', 'D. 汇总依据'],
    type: 'radio',
  },
  {
    topic: '数据模型的创建步骤是什么',
    answer: 'C',
    answer_arr: [
      'A. 创建私有查询-构建模型',
      'B. 创建私有查询-设置查询关系',
      'C. 创建私有查询-设置查询关系-构建模型',
      'D. 设置查询关系-构建模型',
    ],
    type: 'radio',
  },
  {
    topic: '以下不是数据模型的子查询类型的是',
    answer: 'B',
    answer_arr: [
      'A. 可视化SQL查询',
      'B. 透视分析',
      'C. 数据源表',
      'D. SQL查询',
    ],
    type: 'radio',
  },
  {
    topic: '在即席查询中新建分组字段，能够选择的分组字段类型有什么',
    answer: 'A',
    answer_arr: ['A. 原表的字段', 'B. 层次字段', 'C. 分组字段', 'D. 计算字段'],
    type: 'radio',
  },
  {
    topic: '数据模型应用多样化，可以创建哪些分析报表',
    answer: 'ABCD',
    answer_arr: [
      'A. 交互式仪表盘',
      'B. 即席查询',
      'C. 电子表格',
      'D. 透视分析',
    ],
    type: 'radio',
  },
  {
    topic: '数据模型的价值有哪些',
    answer: 'ABCD',
    answer_arr: [
      'A. 解决原始数据看不懂的问题',
      'B. 解决数据不清晰的问题',
      'C. 解决数据太分散的问题',
      'D. 解决数据计算门槛高的问题',
    ],
    type: 'radio',
  },
  {
    topic: '透视分析中，合计行的显示位置有哪些可以选择',
    answer: 'ABCD',
    answer_arr: ['A. 顶部', 'B. 左侧', 'C. 底部', 'D. 右侧'],
    type: 'radio',
  },
  {
    topic: '以下是Web电子表格能支持的功能是',
    answer: 'ABCD',
    answer_arr: ['A. 迷你图', 'B. 条件格式', 'C. 跳转规则', 'D. 参数过滤'],
    type: 'radio',
  },
  {
    topic: '透视分析综合了哪些数据分析方法的进行数据分',
    answer: 'ABCD',
    answer_arr: [
      'A. 排序法',
      'B. 交叉法',
      'C. 对比法（时间计算）',
      'D. 分组法（分类汇总）',
    ],
    type: 'radio',
  },
  {
    topic:
      '连接了关系数据源后，需要选择数据库中的各类资源到系统中，数据库管理可以将数据库的什么资源添加到数据源下',
    answer: 'D',
    answer_arr: ['A. 表', 'B. 视图', 'C. 存储过程', 'D. 以上都可以'],
    type: 'radio',
  },
  {
    topic:
      '数据模型中的地理维度字段，为后续能在仪表盘中正常进行地图分析，需要在模型中做什么操作',
    answer: 'C',
    answer_arr: [
      'A. 在地理维度字段右键标记地位维度-无',
      'B. 在地理维度字段右键生成时间层次',
      'C. 在地理维度字段右键标记地理维-区域',
      'D. 无须操作',
    ],
    type: 'radio',
  },
  {
    topic:
      '.业务需要分析数据，但相关数据分散在不同地方，以不同形式存在，可以使用什么功能来解决',
    answer: 'B',
    answer_arr: ['A.  业务主题', 'B. 数据模型', 'C. 自助ETL', 'D. 指标模型'],
    type: 'radio',
  },
  {
    topic:
      '业务人员使用数据模型创建子查询时，如果只想要数据源表的部分列数据可以使用什么子查询',
    answer: 'B',
    answer_arr: [
      'A. 数据源表',
      'B. 可视化SQL查询',
      'C. java查询',
      'D. 导入文件',
    ],
    type: 'radio',
  },
  {
    topic: '透视分析中，新建分组字段时，“分组设置”有几种方式',
    answer: 'D',
    answer_arr: [
      'A. 添加分组',
      'B. 合并成一项',
      'C.  保持原值',
      'D. 以上都可以',
    ],
    type: 'radio',
  },
  {
    topic: '透视分析新建分组字段时，能够选择什么字段',
    answer: 'A',
    answer_arr: [
      'A. 目录下的字段',
      'B. 层次结构下的字段',
      'C. 派生字段',
      'D. 以上都可以',
    ],
    type: 'radio',
  },
  {
    topic: '以下哪个不属于Web电子表格单元格属性中的扩展方向',
    answer: 'C',
    answer_arr: ['A. 从上到下', 'B. 从左到右', 'C. 扩展', 'D. 不扩展'],
    type: 'radio',
  },
  {
    topic: 'Web电子表格通过什么设置实现告警效果',
    answer: 'D',
    answer_arr: ['A. 告警设置', 'B. 预警设置', 'C. 单元格设置', 'D. 条件格式'],
    type: 'radio',
  },
  {
    topic:
      '如果你想实现管理驾驶舱、KPI，并且项目要求周期短，希望业务人员也能快速实现，可使用Smartbi功能是',
    answer: 'D',
    answer_arr: [
      'A. 电子表格',
      'B. 即席查询',
      'C. 透视分析',
      'D. 交互式仪表盘',
    ],
    type: 'radio',
  },
  {
    topic: '进入即席查询界面，界面提示的创建流程是',
    answer: 'D',
    answer_arr: [
      'A. 添加过滤条件-选择输出字段-设置样式/完善报表-保存报表',
      'B. 添加过滤条件-设置样式/完善报表-选择输出字段-保存报表',
      'C. 选择输出字段-设置样式/完善报表-添加过滤条件-保存报表',
      'D. 选择输出字段-添加过滤条件-设置样式/完善报表-保存报表',
    ],
    type: 'radio',
  },
  {
    topic: '在即席查询中，设置条件格式的位置在哪里',
    answer: 'B',
    answer_arr: [
      'A. 设置面板-数据-条件格式',
      'B. 设置面板-属性-条件格式',
      'C. 设置面板-交互-条件格式',
      'D. 设置面板-属性-表格-条件格式',
    ],
    type: 'radio',
  },
  {
    topic: '在透视分析中，新建分组字段时，选择“合并成一项”后，可以设置哪些属性',
    answer: 'D',
    answer_arr: [
      'A. 合并项名称',
      'B. 合并项类型',
      'C. 合并项值',
      'D. 以上都可以',
    ],
    type: 'radio',
  },
  {
    topic:
      '交互式仪表盘中数据太多如柱子展现太多，如何设置来实现自由调整显示区域，使数据查看更清晰、更灵活',
    answer: 'B',
    answer_arr: ['A. Tab页', 'B. 缩略轴', 'C. 输出行设置', 'D.  排序设置'],
    type: 'radio',
  },
  {
    topic: '杜邦分析模型用于评估企业绩效的哪个方面',
    answer: 'B',
    answer_arr: [
      'A. 资本结构',
      'B. 资产回报率',
      'C. 员工满意度',
      'D. 市场份额',
    ],
    type: 'radio',
  },
  {
    topic: '数据分析微观方法中，通过TOPN找到分析的重点的分析方法是',
    answer: 'A',
    answer_arr: ['A. 排序法', 'B. 增维法', 'C. 降维法', 'D. 分组法'],
    type: 'radio',
  },
  {
    topic: '关系数据源允许对Schema进行操作，以下哪些说法是正确的',
    answer: 'BD',
    answer_arr: [
      'A. 关系数据源不允许存在多个Schema',
      'B. 执行同步Schema后，会把此Schema下的所有表都会添加进来',
      'C. 系统不支持关系数据源修改Schema名称',
      'D. 连接MySQL数据库后，默认的Schema名称为DEFAULT',
    ],
    type: 'radio',
  },
  {
    topic:
      '数据模型提供强大的计算能力，当数据库表的维度、度量数据不足以支撑我们进行分析时，我们可以通过自定义计算得到我们需要的数据，以下哪些是数据模型提供的自定义计算功能',
    answer: 'ABCD',
    answer_arr: [
      'A. 新建分组字段',
      'B. 新建计算列',
      'C. 新建计算度量',
      'D. 新建命名集',
    ],
    type: 'radio',
  },
  {
    topic: '数据模型的数据源表不支持哪些数据库类型',
    answer: 'BC',
    answer_arr: [
      'A. 关系数据库',
      'B. NoSQL 数据库',
      'C. 多维数据库',
      'D. 以上都是',
    ],
    type: 'radio',
  },
  {
    topic: '数据模型的哪些子查询可以设置参数',
    answer: 'AB',
    answer_arr: [
      'A. 可视化SQL查询',
      'B. SQL查询',
      'C. 导入文件',
      'D. 每个子查询都可以',
    ],
    type: 'radio',
  },
  {
    topic: '设置数据模型的表间关系时，可供选择的表关系类型有哪些',
    answer: 'ABC',
    answer_arr: ['A. 一对多', 'B. 多对一', 'C. 一对一', 'D. 多对多'],
    type: 'radio',
  },
  {
    topic: '即席查询能够选择的数据来源有哪些',
    answer: 'AC',
    answer_arr: ['A. 数据源表', 'B. 业务主题', 'C. 数据模型', 'D. 透视分析'],
    type: 'radio',
  },
  {
    topic:
      '当查询数据量较大时，对查询结果分页，可以提升查询效果。即席查询支持哪些分页效果',
    answer: 'AD',
    answer_arr: [
      'A.  鼠标滚动分页',
      'B. 拖拽分页',
      'C. 勾选分页',
      'D. 分页控件',
    ],
    type: 'radio',
  },
  {
    topic: 'Web电子表格支持的报表数据结果导出方式有哪些',
    answer: 'BCD',
    answer_arr: ['A. Word', 'B. Excel', 'C. PNG', 'D. PDF'],
    type: 'radio',
  },
  {
    topic: '交互式仪表盘的哪些组件类型可以实现条件格式',
    answer: 'ABC',
    answer_arr: [
      'A. 明细表、汇总表、交叉表',
      'B. 指标卡',
      'C. 文本',
      'D. 标签',
    ],
    type: 'radio',
  },
  {
    topic: 'Web电子表格目前支持的迷你图类型有哪些',
    answer: 'ABC',
    answer_arr: ['A. 折线图', 'B. 柱图', 'C. 盈亏图', 'D. 堆积柱图'],
    type: 'radio',
  },
  {
    topic:
      '交互式仪表盘中通过标线实现图形的预警效果，其中可以通过字段计算值动态实现标线，以下是支持的字段计算值类型的是',
    answer: 'ABD',
    answer_arr: [
      'A. 最大值、最小值',
      'B. 中位数、平均值',
      'C. 合计值',
      'D. 较小四分位数、较大四分位数',
    ],
    type: 'radio',
  },
  {
    topic: '即席查询支持将报表结果进行导出，导出的文件格式可以选择哪些类型',
    answer: 'BC',
    answer_arr: ['A. TXT', 'B. CSV', 'C. EXCEL', 'D. PDF'],
    type: 'radio',
  },
  {
    topic: '交互式仪表盘支持的导出类型有哪些',
    answer: 'ABC',
    answer_arr: ['A. PNG', 'B. PDF', 'C. Excel', 'D. Word'],
    type: 'radio',
  },
  {
    topic: '在统计学中，经过整理的统计数据，可以用什么加以呈现',
    answer: 'CD',
    answer_arr: ['A. 文字', 'B. 语音', 'C. 统计表', 'D. 统计图'],
    type: 'radio',
  },
  {
    topic:
      '1.数据源某张表在数据库中删除了一个字段，在系统同步表之后，对已经引用了该表字段的查询和报表不影响。(1.0 分)',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '2.Excel数据源指将数据文件导入到高速缓存库或关系数据源。 (1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '3.在数据模型中可以通过创建计算度量的方式实现时间计算。 (1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '4.进行数据建模之后，可以对不需要的原始表以及字段进行隐藏，避免进行业务分析时出现不必要的干扰。(1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '5.数据模型不能实现跨数据库查询。 (1.0 分)',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '6.数据模型实现时间层次结构是在日期字段右键选择创建时间层次结构(1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '7.数据模型创建层次结构是用于在仪表盘中可以实现层次下钻 (1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '8.交互式仪表盘支持以组件或者字段作为筛选器 (1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '9.Web电子表格无法实现函数计算。 (1.0 分)',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '10.即席查询能够进行时间计算。 (1.0 分)',
    answer: '错误',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '11.交互式仪表盘的指标看板或文本组件可以实现的条件格式类型有文字与图标集，不支持背景(1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '12.即席查询主要用于清单明细数据的查询。 (1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '13.透视分析中可以通过维度去关联筛选度量，点击“开启维度和度量的关联筛选”后，勾选所需维度，可快速过滤出其在数据模型中有表关联关系的度量。(1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic: '14.漏斗分析模型主要用于分析客户在购买过程中的流失点。 (1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '15.诊断性统计分析提供了有关趋势或关系为何发生的重要信息，解释为什么发生。(1.0 分)',
    answer: '正确',
    answer_arr: [],
    type: 'determine',
  },
  {
    topic:
      '16.连接了关系数据源后，需要选择数据库中的各类资源到系统中，数据库管理可以将数据库的什么资源添加到数据源下？(2.0 分)',
    answer: 'D',
    answer_arr: ['A. 表', 'B. 视图', 'C. 存储过程', 'D. 以上都可以'],
    type: 'radio',
  },
  {
    topic:
      '17.数据源是指创建与业务数据库的连接，拿到数据进行分析，以下哪个不属于数据源连接的类型?(2.0 分)',
    answer: 'B',
    answer_arr: [
      'A. 本地数据库',
      'B. 多源数据库',
      'C. 关系数据库',
      'D. NoSQL数据库',
    ],
    type: 'radio',
  },
  {
    topic: '18.数据模型中，对度量字段不可修改的属性是？ (2.0 分)',
    answer: 'C',
    answer_arr: ['A. 别名', 'B. 数据格式', 'C. 名称', 'D. 汇总依据'],
    type: 'radio',
  },
  {
    topic:
      '19.数据模型中的地理维度字段，为后续能在仪表盘中正常进行地图分析，需要在模型中做什么操作？(2.0 分)',
    answer: 'C',
    answer_arr: [
      'A. 在地理维度字段右键标记地位维度-无',
      'B. 在地理维度字段右键生成时间层次',
      'C. 在地理维度字段右键标记地理维-区域',
      'D. 无须操作',
    ],
    type: 'radio',
  },
  {
    topic:
      '20.业务需要分析数据，但相关数据分散在不同地方，以不同形式存在，可以使用什么功能来解决？(2.0 分)',
    answer: 'B',
    answer_arr: ['A. 业务主题', 'B. 数据模型', 'C. 自助ETL', 'D. 指标模型'],
    type: 'radio',
  },
  {
    topic: '21.数据模型的创建步骤是什么？ (2.0 分)',
    answer: 'C',
    answer_arr: [
      'A. 创建私有查询-构建模型',
      'B. 创建私有查询-设置查询关系',
      'C. 创建私有查询-设置查询关系-构建模型',
      'D. 设置查询关系-构建模型',
    ],
    type: 'radio',
  },
  {
    topic: '22.以下不是数据模型的子查询类型的是？ (2.0 分)',
    answer: 'B',
    answer_arr: [
      'A. 可视化SQL查询',
      'B. 透视分析',
      'C. 数据源表',
      'D. SQL查询',
    ],
    type: 'radio',
  },
  {
    topic:
      '23.业务人员使用数据模型创建子查询时，如果只想要数据源表的部分列数据可以使用什么子查询？(2.0 分)',
    answer: 'B',
    answer_arr: [
      'A. 数据源表',
      'B. 可视化SQL查询',
      'C. java查询',
      'D. 导入文件',
    ],
    type: 'radio',
  },
  {
    topic: '24.透视分析中，新建分组字段时，“分组设置”有几种方式？ (2.0 分)',
    answer: 'D',
    answer_arr: [
      'A. 添加分组',
      'B. 合并成一项',
      'C. 保持原值',
      'D. 以上都可以',
    ],
    type: 'radio',
  },
  {
    topic: '25.透视分析新建分组字段时，能够选择什么字段？ (2.0 分)',
    answer: 'A',
    answer_arr: [
      'A. 目录下的字段',
      'B. 层次结构下的字段',
      'C. 派生字段',
      'D. 以上都可以',
    ],
    type: 'radio',
  },
  {
    topic: '26.以下哪个不属于Web电子表格单元格属性中的扩展方向？ (2.0 分)',
    answer: 'C',
    answer_arr: ['A. 从上到下', 'B. 从左到右', 'C. 扩展', 'D. 不扩展'],
    type: 'radio',
  },
  {
    topic: '27.Web电子表格通过什么设置实现告警效果 (2.0 分)',
    answer: 'D',
    answer_arr: ['A. 告警设置', 'B. 预警设置', 'C. 单元格设置', 'D. 条件格式'],
    type: 'radio',
  },
  {
    topic:
      '28.如果你想实现管理驾驶舱、KPI，并且项目要求周期短，希望业务人员也能快速实现，可使用Smartbi功能是(2.0 分)',
    answer: 'D',
    answer_arr: [
      'A. 电子表格',
      'B. 即席查询',
      'C. 透视分析',
      'D. 交互式仪表盘',
    ],
    type: 'radio',
  },
  {
    topic: '29.进入即席查询界面，界面提示的创建流程是？ (2.0 分)',
    answer: 'D',
    answer_arr: [
      'A. 添加过滤条件-选择输出字段-设置样式/完善报表-保存报表',
      'B. 添加过滤条件-设置样式/完善报表-选择输出字段-保存报表',
      'C. 选择输出字段-设置样式/完善报表-添加过滤条件-保存报表',
      'D. 选择输出字段-添加过滤条件-设置样式/完善报表-保存报表',
    ],
    type: 'radio',
  },
  {
    topic: '30.在即席查询中，设置条件格式的位置在哪里？ (2.0 分)',
    answer: 'B',
    answer_arr: [
      'A. 设置面板-数据-条件格式',
      'B. 设置面板-属性-条件格式',
      'C. 设置面板-交互-条件格式',
      'D. 设置面板-属性-表格-条件格式',
    ],
    type: 'radio',
  },
  {
    topic:
      '31.[align=left][font=思源黑体Normal]查询明细数据是最为常见的业务需求，业务人员一般可以使用[/font]Smartbi[font=思源黑体Normal]平台哪项功能？[/font][/align] (2.0 分)',
    answer: 'A',
    answer_arr: [
      'A. 即席查询',
      'B. 透视分析',
      'C. 交互式仪表盘',
      'D. Web电子表格',
    ],
    type: 'radio',
  },
  {
    topic:
      '32.交互式仪表盘中数据太多如柱子展现太多，如何设置来实现自由调整显示区域，使数据查看更清晰、更灵活？(2.0 分)',
    answer: 'B',
    answer_arr: ['A. Tab页', 'B. 缩略轴', 'C. 输出行设置', 'D. 排序设置'],
    type: 'radio',
  },
  {
    topic: '33.如果想要看一段时间的趋势，使用哪个图形呈现效果最佳？ (2.0 分)',
    answer: 'B',
    answer_arr: ['A. 饼图', 'B. 线图', 'C. 雷达图', 'D. 热力图'],
    type: 'radio',
  },
  {
    topic: '34.杜邦分析模型用于评估企业绩效的哪个方面？ (2.0 分)',
    answer: 'B',
    answer_arr: [
      'A. 资本结构',
      'B. 资产回报率',
      'C. 员工满意度',
      'D. 市场份额',
    ],
    type: 'radio',
  },
  {
    topic:
      '35.数据分析微观方法中，通过TOPN找到分析的重点的分析方法是？ (2.0分)',
    answer: 'A',
    answer_arr: ['A. 排序法', 'B. 增维法', 'C. 降维法', 'D. 分组法'],
    type: 'radio',
  },
  {
    topic: '36.关系数据源允许对Schema进行操作，以下哪些说法是正确的？ (3.0 分)',
    answer: 'BD',
    answer_arr: [
      'A. 关系数据源不允许存在多个Schema',
      'B. 执行同步Schema后，会把此Schema下的所有表都会添加进来',
      'C. 系统不支持关系数据源修改Schema名称',
      'D. 连接MySQL数据库后，默认的Schema名称为DEFAULT',
    ],
    type: 'radio',
  },
  {
    topic:
      '37.数据模型提供强大的计算能力，当数据库表的维度、度量数据不足以支撑我们进行分析时，我们可以通过自定义计算得到我们需要的数据，以下哪些是数据模型提供的自定义计算功能？(3.0 分)',
    answer: 'ABCD',
    answer_arr: [
      'A. 新建分组字段',
      'B. 新建计算列',
      'C. 新建计算度量',
      'D. 新建命名集',
    ],
    type: 'radio',
  },
  {
    topic: '38.数据模型的数据源表不支持哪些数据库类型？ (3.0 分)',
    answer: 'BC',
    answer_arr: [
      'A. 关系数据库',
      'B. NoSQL 数据库',
      'C. 多维数据库',
      'D. 以上都是',
    ],
    type: 'radio',
  },
  {
    topic: '39.数据模型的哪些子查询可以设置参数？ (3.0 分)',
    answer: 'AB',
    answer_arr: [
      'A. 可视化SQL查询',
      'B. SQL查询',
      'C. 导入文件',
      'D. 每个子查询都可以',
    ],
    type: 'radio',
  },
  {
    topic: '40.设置数据模型的表间关系时，可供选择的表关系类型有哪些？ (3.0 分)',
    answer: 'ABC',
    answer_arr: ['A. 一对多', 'B. 多对一', 'C. 一对一', 'D. 多对多'],
    type: 'radio',
  },
  {
    topic: '41.即席查询能够选择的数据来源有哪些？ (3.0 分)',
    answer: 'AC',
    answer_arr: ['A. 数据源表', 'B. 业务主题', 'C. 数据模型', 'D. 透视分析'],
    type: 'radio',
  },
  {
    topic:
      '42.当查询数据量较大时，对查询结果分页，可以提升查询效果。即席查询支持哪些分页效果？(3.0 分)',
    answer: 'AD',
    answer_arr: [
      'A. 鼠标滚动分页',
      'B. 拖拽分页',
      'C. 勾选分页',
      'D. 分页控件',
    ],
    type: 'radio',
  },
  {
    topic: '43.Web电子表格支持的报表数据结果导出方式有哪些 (3.0 分)',
    answer: 'BCD',
    answer_arr: ['A. Word', 'B. Excel', 'C. PNG', 'D. PDF'],
    type: 'radio',
  },
  {
    topic: '44.交互式仪表盘的哪些组件类型可以实现条件格式？ (3.0 分)',
    answer: 'ABC',
    answer_arr: [
      'A. 明细表、汇总表、交叉表',
      'B. 指标卡',
      'C. 文本',
      'D. 标签',
    ],
    type: 'radio',
  },
  {
    topic: '45.Web电子表格目前支持的迷你图类型有哪些？ (3.0 分)',
    answer: 'ABC',
    answer_arr: ['A. 折线图', 'B. 柱图', 'C. 盈亏图', 'D. 堆积柱图'],
    type: 'radio',
  },
  {
    topic:
      '46.交互式仪表盘中通过标线实现图形的预警效果，其中可以通过字段计算值动态实现标线，以下是支持的字段计算值类型的是？(3.0 分)',
    answer: 'ABD',
    answer_arr: [
      'A. 最大值、最小值',
      'B. 中位数、平均值',
      'C. 合计值',
      'D. 较小四分位数、较大四分位数',
    ],
    type: 'radio',
  },
  {
    topic:
      '47.即席查询支持将报表结果进行导出，导出的文件格式可以选择哪些类型？(3.0 分)',
    answer: 'BC',
    answer_arr: ['A. TXT', 'B. CSV', 'C. EXCEL', 'D. PDF'],
    type: 'radio',
  },
  {
    topic: '48.透视分析综合了哪些数据分析方法的进行数据分析？ (3.0 分)',
    answer: 'ABCD',
    answer_arr: [
      'A. 排序法',
      'B. 交叉法',
      'C. 对比法（时间计算）',
      'D. 分组法（分类汇总）',
    ],
    type: 'radio',
  },
  {
    topic: '49.交互式仪表盘支持的导出类型有哪些? (3.0 分)',
    answer: 'ABC',
    answer_arr: ['A. PNG', 'B. PDF', 'C. Excel', 'D. Word'],
    type: 'radio',
  },
  {
    topic: '50.在统计学中，经过整理的统计数据，可以用什么加以呈现。 (3.0 分)',
    answer: 'CD',
    answer_arr: ['A. 文字', 'B. 语音', 'C. 统计表', 'D. 统计图'],
    type: 'radio',
  },
]);
const showData = ref();
const searchValue = ref();
// #endregion data-end

// #region methods-start
const searchBtn = () => {
  if (searchValue.value) {
    let filterData = data.value.filter((item) => {
      return item.topic.indexOf(searchValue.value) != -1;
    });
    showData.value = [filterData[0]];
  } else {
    showData.value = data.value;
  }
};
const isOn = (sunI: any, answer: any, index: any) => {
  return sunI.indexOf(answer.split('')[index]) != -1;
};
// #endregion methods-end
</script>

<style lang="less" scoped>
.box {
  padding-top: 20px;
  .show-box {
    width: 1200px;
    margin: 20px auto;
  }
  .a-list {
    text-align: left;
  }
  .t-a {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .t {
      text-align: left;
    }
  }
  .a {
    flex-shrink: 0;
    color: red;
    font-size: 20px;
    margin-left: 20px;
  }
  .a-i {
    margin-bottom: 10px;
    &.active {
      color: red;
      font-size: 20px;
    }
  }
}
</style>
