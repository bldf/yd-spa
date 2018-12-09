<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>本周访客</span>
                    </div>
                    <div>
                        <div id="userChart" style="font-size: 30px">324</div>
                    </div>
                    <div>
                        <span>平均每日 32</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>本周物资出门</span>
                    </div>
                    <div>
                        <div id="uvChart" style="font-size: 30px">5325</div>
                    </div>
                    <div>
                        <span>平均每日  180</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>本月访客</span>
                    </div>
                    <div>
                        <div id="pvChart" style="font-size: 30px">96546</div>
                    </div>
                    <div>
                        <span>转化率 78%</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>本月物资出门</span>
                    </div>
                    <div>
                        <div id="orderChart" style="font-size: 30px">¥ 645435</div>
                    </div>
                    <div>
                        <span>平均每日 6</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="18">
                <el-card>
                    <div slot="header">
                        <el-badge :value="3" :max="99" class="item">
                            带我审批
                        </el-badge>
                    </div>
                    <el-row class="item" :value="12" v-for="n in 3" :key="n">
                        <el-col :span="20">赵四 申请进门  <span class="text-primary">讨论物料项目</span></el-col>
                        <el-col :span="4" class="text-info"> 2018-3-1 13:43</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col>
                        <el-card>
                            <div slot="header">
                                <span>最近访客</span>
                            </div>
                            <div class="text-primary">讨论物流合资项目
                                <el-tag type="danger" size="mini" class="float-right">2018-10-20</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">讨论物流合资项目
                                <el-tag type="danger" size="mini" class="float-right">2018-10-20</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">讨论物流合资项目
                                <el-tag type="danger" size="mini" class="float-right">2018-10-20</el-tag>
                            </div>
                            <hr>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<style>
.el-row {
  margin-bottom: 20px;
 margin-left: 0 !important;
 margin-right: 0 !important;
}
.el-row:last-child {
    margin-bottom: 0;
  }
</style>
<script>
import G2 from "@antv/g2";
export default {
  name: "Dashboard",
  data() {
    return {
      data: [
        {
          date: "2018-1-1",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-2",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-3",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-4",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-5",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-6",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-7",
          value: Math.ceil(Math.random() * 10)
        }
      ],
      userChart: null,
      uvChart: null,
      pvChart: null,
      orderChart: null
    };
  },
  methods: {
    drawUserChart: function() {
      this.userChart = new G2.Chart({
        container: "userChart",
        forceFit: true,
        height: 100,
        padding: [40, 0, 0, 0]
      });
      this.userChart.source(this.data);
      this.userChart.scale({
        date: {
          type: "time",
          alias: "日期"
        }
      });
      this.userChart.area().position("date*value");
      this.userChart
        .line()
        .position("date*value")
        .size(2);
      this.userChart.render();
    },
    drawUvChart: function() {
      this.uvChart = new G2.Chart({
        container: "uvChart",
        forceFit: true,
        height: 100,
        padding: [40, 0, 0, 0]
      });
      this.uvChart.source(this.data);
      this.uvChart.scale({
        date: {
          type: "time",
          alias: "日期"
        }
      });
      this.uvChart.interval().position("date*value");
      //this.uvChart.axis(false);
      this.uvChart.render();
    },
    drawPvChart: function() {
      this.pvChart = new G2.Chart({
        container: "pvChart",
        forceFit: true,
        height: 100,
        padding: [40, 0, 0, 0]
      });
      this.pvChart.source(this.data);
      this.pvChart.scale({
        date: {
          type: "time",
          alias: "日期"
        }
      });
      this.pvChart.line().position("date*value");
      this.pvChart.render();
    },
    drawOrderChart: function() {
      this.orderChart = new G2.Chart({
        container: "orderChart",
        forceFit: true,
        height: 100,
        padding: [40, 0, 0, 0]
      });
      this.orderChart.source(this.data);
      this.orderChart.scale({
        date: {
          type: "time",
          alias: "日期"
        }
      });
      this.orderChart.interval().position("date*value");
      this.orderChart.render();
    }
  },
  mounted() {
    this.drawUserChart();
    this.drawUvChart();
    this.drawPvChart();
    this.drawOrderChart();
  }
};
</script>
