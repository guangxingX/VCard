# VCard
超级名片
作为备份

插件使用
 <w-image defaultText="{{text}}" originalImage="{{info.logo}}" width="100%" height="100%" plugStyle="font-size: 28rpx;
  border-radius: 10rpx;"/>

  <w-link-1 name="王清文" src="" subintr="cto/融资经理" call="123456789" size="1" />

  <w-image-text style="height: 100%" ImageTextItem="{{ImageTextItem}}" bind:onTapView="onTapView" bind:onTapSave="onTapSave"/>


<!-- 图文显示插件 -->
          <block wx:for="{{gallery}}" wx:for-item="item" wx:key="">
            <view class="part1 weui-fff">
              <w-head-programe name="{{item.name}}" />
              <bolck wx:for="{{item.gdata}}" wx:for-item="_i" wx:key="">
                <w-show-imageText imgData="{{_i}}" />
              </bolck>
            </view>
          </block>


<w-edit-programme name="{{item.name}}" rate="{{item.rate}}" info="{{item.tip}}" must="{{item.must}}">
  <!-- <view slot="after" class="edit">
    <text>预览</text>
    <text>|</text>
    <text>编辑</text>
  </view> -->
</w-edit-programme>
