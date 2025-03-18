<template>
    <div class="container">
      <header-bar title="收货地址" :showBack="true"></header-bar>
      
      <div class="content address-content">
        <!-- 地址列表 -->
        <div v-if="addressList.length > 0" class="address-list">
          <div 
            v-for="address in addressList" 
            :key="address.id"
            class="address-item"
          >
            <div class="address-info">
              <div class="name-phone">
                <span class="name">{{ address.name }}</span>
                <span class="phone">{{ address.phone }}</span>
              </div>
              <div class="address-detail">
                <span v-if="address.isDefault" class="default-tag">默认</span>
                {{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}
              </div>
            </div>
            <div class="address-actions">
              <div class="edit-btn" @click="editAddress(address)">
                <i class="el-icon-edit"></i>
                <span>编辑</span>
              </div>
              <div class="delete-btn" @click="deleteAddress(address.id)">
                <i class="el-icon-delete"></i>
                <span>删除</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 空地址状态 -->
        <div v-else class="empty-address">
          <i class="el-icon-location-information"></i>
          <p>您还没有添加收货地址</p>
        </div>
        
        <!-- 添加地址按钮 -->
        <div class="add-address-btn" @click="showAddressForm">
          <i class="el-icon-plus"></i> 新增收货地址
        </div>
      </div>
      
      <!-- 地址表单对话框 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="90%">
        <el-form :model="addressForm" label-width="80px" label-position="left">
          <el-form-item label="收货人">
            <el-input v-model="addressForm.name" placeholder="请输入收货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="addressForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-cascader
              v-model="addressForm.region"
              :options="regionOptions"
              placeholder="请选择地区"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input 
              v-model="addressForm.detail" 
              type="textarea"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="addressForm.isDefault">设为默认收货地址</el-checkbox>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAddress">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import HeaderBar from '@/components/common/HeaderBar.vue'
  
  export default {
    name: 'Address',
    components: {
      HeaderBar
    },
    data() {
      return {
        addressList: [
          {
            id: 1,
            name: '张三',
            phone: '13812345678',
            province: '广东省',
            city: '深圳市',
            district: '南山区',
            detail: '科技园南路10号深圳大厦605室',
            isDefault: true
          },
          {
            id: 2,
            name: '李四',
            phone: '13911112222',
            province: '广东省',
            city: '广州市',
            district: '天河区',
            detail: '天河路385号天河城购物中心',
            isDefault: false
          }
        ],
        dialogVisible: false,
        dialogTitle: '新增收货地址',
        addressForm: {
          id: null,
          name: '',
          phone: '',
          region: [],
          detail: '',
          isDefault: false
        },
        // 简化版的地区选项
        regionOptions: [
          {
            value: '广东省',
            label: '广东省',
            children: [
              {
                value: '深圳市',
                label: '深圳市',
                children: [
                  { value: '南山区', label: '南山区' },
                  { value: '福田区', label: '福田区' },
                  { value: '罗湖区', label: '罗湖区' }
                ]
              },
              {
                value: '广州市',
                label: '广州市',
                children: [
                  { value: '天河区', label: '天河区' },
                  { value: '海珠区', label: '海珠区' },
                  { value: '越秀区', label: '越秀区' }
                ]
              }
            ]
          },
          {
            value: '北京市',
            label: '北京市',
            children: [
              {
                value: '北京市',
                label: '北京市',
                children: [
                  { value: '朝阳区', label: '朝阳区' },
                  { value: '海淀区', label: '海淀区' },
                  { value: '东城区', label: '东城区' }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      showAddressForm() {
        this.dialogTitle = '新增收货地址'
        this.addressForm = {
          id: null,
          name: '',
          phone: '',
          region: [],
          detail: '',
          isDefault: false
        }
        this.dialogVisible = true
      },
      editAddress(address) {
        this.dialogTitle = '编辑收货地址'
        this.addressForm = {
          id: address.id,
          name: address.name,
          phone: address.phone,
          region: [address.province, address.city, address.district],
          detail: address.detail,
          isDefault: address.isDefault
        }
        this.dialogVisible = true
      },
      saveAddress() {
        if (!this.addressForm.name || !this.addressForm.phone || 
            this.addressForm.region.length < 3 || !this.addressForm.detail) {
          this.$message.error('请填写完整的地址信息')
          return
        }
        
        // 构建保存的地址对象
        const addressToSave = {
          id: this.addressForm.id || Date.now(),
          name: this.addressForm.name,
          phone: this.addressForm.phone,
          province: this.addressForm.region[0],
          city: this.addressForm.region[1],
          district: this.addressForm.region[2],
          detail: this.addressForm.detail,
          isDefault: this.addressForm.isDefault
        }
        
        // 如果设为默认地址，需要将其他地址设为非默认
        if (addressToSave.isDefault) {
          this.addressList.forEach(item => {
            if (item.id !== addressToSave.id) {
              item.isDefault = false
            }
          })
        }
        
        // 保存或更新地址
        const index = this.addressList.findIndex(item => item.id === addressToSave.id)
        if (index !== -1) {
          this.addressList.splice(index, 1, addressToSave)
          this.$message.success('地址修改成功')
        } else {
          this.addressList.push(addressToSave)
          this.$message.success('地址添加成功')
        }
        
        this.dialogVisible = false
      },
      deleteAddress(id) {
        this.$confirm('确定要删除该地址吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const index = this.addressList.findIndex(item => item.id === id)
          if (index !== -1) {
            this.addressList.splice(index, 1)
            this.$message.success('地址删除成功')
          }
        }).catch(() => {
          // 取消删除
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .address-content {
    background-color: #f5f5f5;
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .address-list {
    flex: 1;
    overflow-y: auto;
  }
  .address-item {
    background-color: white;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  .name-phone {
    margin-bottom: 10px;
  }
  .name {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }
  .phone {
    color: #666;
  }
  .address-detail {
    color: #666;
    line-height: 1.5;
  }
  .default-tag {
    display: inline-block;
    background-color: #f56c6c;
    color: white;
    font-size: 12px;
    padding: 0 5px;
    border-radius: 3px;
    margin-right: 5px;
  }
  .address-actions {
    display: flex;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  .edit-btn, .delete-btn {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    margin-right: 20px;
  }
  .edit-btn i, .delete-btn i {
    font-size: 16px;
    margin-right: 5px;
  }
  .empty-address {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
  }
  .empty-address i {
    font-size: 50px;
    margin-bottom: 10px;
  }
  .add-address-btn {
    height: 45px;
    background-color: #2196F3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  }
  </style>
  