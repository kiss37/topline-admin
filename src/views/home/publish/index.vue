<template>
  <div>
    <el-form v-loading="isLoading" ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <quillEditor v-model="form.content" :options="editorOption"></quillEditor>
      </el-form-item>
      <el-form-item label="内容"></el-form-item>
      <el-form-item label="频道">
        <ttchannel :channel_id="form.channel_id" @change="form.channel_id=$event"></ttchannel>
      </el-form-item>
      <el-form-item>
        <el-button>保存草稿</el-button>
        <el-button type="primary" @click="doPublish('form')">发布...</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入 富文本
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
// 导入小组件 所有文章类别
import ttchannel from "../../../components/ttchannel/index";

export default {
  name: "publish",
  components: {
    quillEditor,
    ttchannel
  },
  data() {
    return {
      isLoading:true,
      form: {
        title: "",
        content: "",
        channel_id: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "标题文字长度应在5至30之间",
            trigger: "blur"
          }
        ]
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ["image"],
            ["clean"], // remove formatting button
            ["video"]
          ]
        }
      }
    };
  },
  methods: {
    doPublish(formName) {
      // 先做个表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 做个判断是修改还是新增 通过路由命名 name:publish-edit
          if (this.$route.name == "publish-edit") {
            // 执行修改操作
            this.$axios.put(`/mp/v1_0/articles/${this.$route.params.id}`, {
              title: this.form.title,
              content: this.form.content,
              cover: {
                type: 1,
                images: [
                  "http://toutiao.meiduo.site/FkIzGUd35DLYUnrQQz40a2RYxHvY"
                ]
              },
              channel_id: this.form.channel_id
            }).then(res=>{
              if (res.data.message.toLowerCase() == "ok") {
                  this.$message.success("发布成功");
                  this.$router.push("/article");
                }
            });
          } else {
            // 执行新增操作
            // 来到这里表示都通过了验证可以发送axios了
            this.$axios
              .post(`/mp/v1_0/articles`, {
                title: this.form.title,
                content: this.form.content,
                cover: {
                  type: 1,
                  images: [
                    "http://toutiao.meiduo.site/FkIzGUd35DLYUnrQQz40a2RYxHvY"
                  ]
                },
                channel_id: this.form.channel_id
              })
              .then(res => {
                // console.log(res);
                if (res.data.message.toLowerCase() == "ok") {
                  this.$message.success("发布成功");
                  this.$router.push("/article");
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    // 新增不需要发请求渲染内容
    if(this.$route.name=="publish-edit"){
      this.$axios.get(`/mp/v1_0/articles/${this.$route.params.id}`).then(res=>{
        // console.log(res);
        // 直接把整个form替换了
        this.form=res.data.data;
        this.isLoading=false
      })
    }
    this.isLoading=false
  }

};
</script>

<style>
.ql-editor {
  height: 400px;
}
</style>